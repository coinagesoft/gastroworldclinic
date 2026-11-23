'use client';

import React, { useState, useEffect, useMemo } from 'react';
import CalendarPicker from '../CalendarPicker';
import { Appointment } from '@/lib/storage';
import { DoctorOverride } from '@/lib/availability';
import { toast } from '@/components/ui/Toast';
import { useClinicSettings } from '@/lib/useClinicSettings';
import {
  areAllSlotsOccupied,
  DEFAULT_CLINIC_SETTINGS,
  generateSlots,
  isClinicClosedOn,
  getWeekday,
  WEEKDAY_NAMES,
  ClinicSettings,
  getSlotStep,
} from '@/lib/slots';
import { CLINIC } from '@/lib/clinicInfo';
import '../booking.css';
import './AdminBookAppointmentModal.css';

const DEFAULT_SLOT_VALUES = generateSlots(DEFAULT_CLINIC_SETTINGS).map((s) => s.value);
const DEFAULT_STEP = getSlotStep(DEFAULT_CLINIC_SETTINGS);

const DEFAULT_REASON = 'Other / General Consultation';

// Same list as the public booking form (AppointmentForm)
const CONSULTATION_REASONS = [
  'Gastroenterology diseases',
  'Liver related diseases',
  'Liver transplant counselling',
  'Gallbladder & Pancreas diseases',
  'Gastrointestinal cancers',
  'Endoscopy / Colonoscopy / ERCP',
  'Nutritional counselling',
  'Other / General Consultation',
];

export function isClinicDateUnavailable(
  dateIso: string,
  overrides: DoctorOverride[] = [],
  appointments: Appointment[] = [],
  slotValues: string[] = DEFAULT_SLOT_VALUES,
  step: number = DEFAULT_STEP,
  settings?: ClinicSettings
): { unavailable: boolean; reason?: string } {
  if (!dateIso) return { unavailable: true, reason: 'Please select an appointment date.' };
  const d = new Date(`${dateIso}T00:00:00`);
  if (isNaN(d.getTime())) return { unavailable: true, reason: 'Invalid date format.' };

  // 1. Weekly off - day-wise schedule decides which weekdays the doctor sits (Sunday by default)
  const closed = settings ? isClinicClosedOn(settings, dateIso) : d.getDay() === 0;
  if (closed) {
    const dayName = settings ? WEEKDAY_NAMES[getWeekday(dateIso)] : 'Sunday';
    return { unavailable: true, reason: `The doctor does not take appointments on ${dayName}s (Weekly Off).` };
  }
  // Only this weekday's slots count when checking "fully booked"
  if (settings) slotValues = generateSlots(settings, dateIso).map((s) => s.value);

  // 2. Doctor on leave
  const override = overrides.find((o) => o.date === dateIso);
  if (override?.type === 'full_day') {
    return { unavailable: true, reason: `Doctor is on leave: ${override.reason || 'Unavailable'}.` };
  }

  // 3. Fully booked
  const activeAppts = appointments.filter((a) => a.date === dateIso && a.status !== 'cancelled');
  const blockedSlots = override?.type === 'specific_slots' ? (override.blockedSlots || []) : [];
  if (
    areAllSlotsOccupied(
      slotValues,
      activeAppts.map((a) => a.time),
      blockedSlots,
      step
    )
  ) {
    return { unavailable: true, reason: 'All appointment slots are fully booked for this date.' };
  }

  return { unavailable: false };
}

export function findNextAvailableClinicDate(
  startDateIso: string,
  overrides: DoctorOverride[] = [],
  appointments: Appointment[] = [],
  slotValues: string[] = DEFAULT_SLOT_VALUES,
  step: number = DEFAULT_STEP,
  settings?: ClinicSettings
): string {
  let curr = new Date(`${startDateIso}T00:00:00`);
  if (isNaN(curr.getTime())) {
    curr = new Date();
    curr.setDate(curr.getDate() + 1);
  }

  for (let i = 0; i < 60; i++) {
    const iso = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(curr);
    const check = isClinicDateUnavailable(iso, overrides, appointments, slotValues, step, settings);
    if (!check.unavailable) {
      return iso;
    }
    curr.setDate(curr.getDate() + 1);
  }

  return startDateIso;
}

interface AdminBookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialDate?: string;
  appointments?: Appointment[];
  overrides?: DoctorOverride[];
}

export default function AdminBookAppointmentModal({
  isOpen,
  onClose,
  onSuccess,
  initialDate,
  overrides = [],
}: AdminBookAppointmentModalProps) {
  // Same clinic settings source as the public booking form
  const clinic = useClinicSettings('default');

  const todayIso = useMemo(() => {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
  }, []);

  const tomorrowIso = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(d);
  }, []);

  const [location, setLocation] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [reason, setReason] = useState(DEFAULT_REASON);
  const [visitType, setVisitType] = useState<'first' | 'follow_up'>('first');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  // Calendar stays collapsed; the admin works on today's slots by default
  const [showCalendar, setShowCalendar] = useState(false);
  // Email + notes stay tucked away so the common walk-in takes a few taps
  const [showMore, setShowMore] = useState(false);
  // Which date|location the loaded slot data belongs to (used to auto-pick the first free slot)
  const [loadedKey, setLoadedKey] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'UPI' | 'Card' | 'Pending'>('Cash');
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'pending'>('paid');
  const [amount, setAmount] = useState('800');
  const [notes, setNotes] = useState('');

  // Slot availability for the chosen date + location (loaded from the backend)
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [doctorBlockedSlots, setDoctorBlockedSlots] = useState<string[]>([]);
  const [isDoctorDateBlocked, setIsDoctorDateBlocked] = useState(false);
  const [doctorBlockReason, setDoctorBlockReason] = useState('');
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successResult, setSuccessResult] = useState<{ id: string; location?: string } | null>(null);

  // Full-day leaves from the admin overrides (calendar greys these out)
  const doctorBlockedDates = useMemo(
    () =>
      overrides
        .filter((o) => o.type === 'full_day')
        .map((o) => ({ date: o.date, reason: o.reason || '' })),
    [overrides]
  );

  // First date from tomorrow on that the doctor sits at the chosen location
  const findFirstOpenDate = (loc: string): string => {
    const leaveDates = new Set(doctorBlockedDates.map((b) => b.date));
    const probe = new Date(`${todayIso}T00:00:00`);
    for (let i = 0; i < 90; i++) {
      const iso = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(probe);
      if (!clinic.isClosedOn(iso, loc) && !leaveDates.has(iso)) return iso;
      probe.setDate(probe.getDate() + 1);
    }
    return '';
  };

  const handleLocationSelect = (loc: string) => {
    if (loc === location) return;
    setLocation(loc);
    const leaveDates = new Set(doctorBlockedDates.map((b) => b.date));
    const preferred =
      initialDate &&
      initialDate >= todayIso &&
      !clinic.isClosedOn(initialDate, loc) &&
      !leaveDates.has(initialDate)
        ? initialDate
        : findFirstOpenDate(loc);
    setDate(preferred);
    setTime('');
    setShowCalendar(false);
    if (errorMsg) setErrorMsg('');
  };

  // With a single location there is nothing to choose, so it is selected automatically
  useEffect(() => {
    if (isOpen && clinic.isLoaded && !location && clinic.bookableLocations.length === 1) {
      handleLocationSelect(clinic.bookableLocations[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, clinic.isLoaded, clinic.bookableLocations.join('|'), location]);

  const handleDateSelect = (dateIso: string) => {
    setDate(dateIso);
    setTime('');
    setShowCalendar(false);
    if (errorMsg) setErrorMsg('');
  };

  // Day-wise timings: only the slots of the chosen weekday at the chosen location
  const SLOTS = clinic.slotsForDate(date, location);
  const isClosedDay = date && location ? clinic.isClosedOn(date, location) : false;
  const closedDayName = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'long' })
    : '';
  const dateIsBookable = !!date && !!location && !isClosedDay && !isDoctorDateBlocked && date >= todayIso;
  const dayLocations = Array.from(new Set(SLOTS.map((s) => s.location).filter(Boolean))) as string[];
  const hasMultipleLocations = dayLocations.length > 1;
  const selectedSlotLabel = SLOTS.find((s) => s.value === time)?.label || '';

  // Slots whose start time has already passed today cannot be booked
  const isPastSlot = (value: string): boolean => {
    if (date !== todayIso) return false;
    const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)?/i.exec(value);
    if (!m) return false;
    let h = Number(m[1]);
    const ap = m[3]?.toUpperCase();
    if (ap === 'PM' && h < 12) h += 12;
    if (ap === 'AM' && h === 12) h = 0;
    const nowParts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
      .format(new Date())
      .split(':')
      .map(Number);
    return h * 60 + Number(m[2]) < nowParts[0] * 60 + nowParts[1];
  };

  const prettyDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';
  const leaveDateSet = new Set(doctorBlockedDates.map((b) => b.date));
  const dateOptionDisabled = (iso: string) =>
    !location || clinic.isClosedOn(iso, location) || leaveDateSet.has(iso);

  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleResetAndClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Load booked / blocked slots for the chosen date + location
  useEffect(() => {
    if (!isOpen || !date || !location || clinic.isClosedOn(date, location)) {
      setBookedSlots([]);
      setDoctorBlockedSlots([]);
      setIsDoctorDateBlocked(false);
      setDoctorBlockReason('');
      return;
    }

    let isCancelled = false;

    async function fetchSlots() {
      setIsLoadingSlots(true);
      try {
        const res = await fetch(
          `/api/appointments?date=${date}&location=${encodeURIComponent(location)}&t=${Date.now()}`,
          { cache: 'no-store' }
        );
        if (res.ok) {
          const data = await res.json();
          if (!isCancelled) {
            setBookedSlots(Array.isArray(data.bookedSlots) ? data.bookedSlots : []);
            setDoctorBlockedSlots(Array.isArray(data.doctorBlockedSlots) ? data.doctorBlockedSlots : []);
            setIsDoctorDateBlocked(Boolean(data.isDoctorBlocked));
            setDoctorBlockReason(data.doctorBlockReason || '');
            setLoadedKey(`${date}|${location}`);
          }
        }
      } catch (err) {
        console.error('Failed to fetch slot availability:', err);
      } finally {
        if (!isCancelled) setIsLoadingSlots(false);
      }
    }

    fetchSlots();
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, location, isOpen, clinic.settings]);

  // Quick booking: once slots are loaded, pre-select the first free slot
  useEffect(() => {
    if (!isOpen || !dateIsBookable || loadedKey !== `${date}|${location}`) return;
    const isFree = (v: string) =>
      !bookedSlots.includes(v) && !doctorBlockedSlots.includes(v) && !isPastSlot(v);
    const firstFree = SLOTS.find((s) => isFree(s.value));
    setTime((curr) =>
      curr && SLOTS.some((s) => s.value === curr) && isFree(curr) ? curr : firstFree?.value ?? ''
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedKey, date, location, bookedSlots, doctorBlockedSlots, isOpen, time]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Patient Name Validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      const msg = 'Please enter a valid patient full name (minimum 2 characters).';
      setErrorMsg(msg);
      toast.warning(msg, 'Name Required');
      return;
    }

    // 2. Mobile Number Validation (Indian / 10-digit mobile)
    const rawPhone = phone.trim();
    if (!/^[6-9]\d{9}$/.test(rawPhone)) {
      const msg = 'Please provide a valid 10-digit mobile number starting with 6, 7, 8, or 9.';
      setErrorMsg(msg);
      toast.warning(msg, 'Invalid Mobile');
      return;
    }
    const cleanPhone = rawPhone;

    // 3. Email (optional - walk-ins are identified by phone)
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (trimmedEmail && !emailRegex.test(trimmedEmail)) {
      const msg = 'Please enter a valid email address (e.g. name@example.com).';
      setErrorMsg(msg);
      setShowMore(true);
      toast.warning(msg, 'Invalid Email');
      return;
    }

    // 4. Age (optional)
    let validatedAge = 0;
    if (age.trim()) {
      const parsedAge = Number(age.trim());
      if (!Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 120) {
        const msg = 'Please enter a valid age between 1 and 120 years.';
        setErrorMsg(msg);
        toast.warning(msg, 'Invalid Age');
        return;
      }
      validatedAge = parsedAge;
    }

    if (!reason.trim()) {
      const msg = 'Please select a reason for consultation.';
      setErrorMsg(msg);
      toast.warning(msg, 'Reason Required');
      return;
    }
    const fee = Number(amount);
    if (!amount.trim() || !Number.isFinite(fee) || fee <= 0) {
      const msg = 'Please enter a valid consultation fee.';
      setErrorMsg(msg);
      toast.warning(msg, 'Fee Required');
      return;
    }

    // 5. Location, Date & Time Validation
    if (!location) {
      const msg = 'Please choose a clinic location.';
      setErrorMsg(msg);
      toast.warning(msg, 'Location Required');
      return;
    }
    if (!date || !time) {
      const msg = 'Please select both an appointment date and time slot.';
      setErrorMsg(msg);
      toast.warning(msg, 'Slot Required');
      return;
    }
    if (date < todayIso) {
      const msg = 'Appointments cannot be scheduled for past dates.';
      setErrorMsg(msg);
      toast.warning(msg, 'Invalid Date');
      return;
    }
    if (clinic.isClosedOn(date, location)) {
      const msg = `The doctor does not take appointments at ${location} on ${closedDayName}s. Please choose another day.`;
      setErrorMsg(msg);
      toast.warning(msg, 'Date Unavailable');
      return;
    }
    if (isDoctorDateBlocked) {
      const msg = `Doctor is unavailable on ${date}${doctorBlockReason ? ` (${doctorBlockReason})` : ''}.`;
      setErrorMsg(msg);
      toast.warning(msg, 'Date Unavailable');
      return;
    }
    if (isPastSlot(time)) {
      const msg = 'This time slot has already passed today. Please select a later slot.';
      setErrorMsg(msg);
      toast.warning(msg, 'Slot Passed');
      return;
    }
    if (bookedSlots.includes(time) || doctorBlockedSlots.includes(time)) {
      const msg = 'This time slot is booked or blocked. Please select another available slot.';
      setErrorMsg(msg);
      toast.warning(msg, 'Slot Unavailable');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: cleanPhone,
          // Walk-ins without an email are keyed by phone so repeat visits stay with the same patient
          email: trimmedEmail || `${cleanPhone}@walkin.clinic`,
          age: validatedAge || undefined,
          reason,
          date,
          time,
          location,
          visitType,
          // Always in-clinic: no online meeting / Google Meet is created
          consultationType: 'offline',
          paymentMethod,
          paymentStatus,
          amount: Number(amount) || 800,
          notes: notes.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to schedule appointment.');
      }

      toast.success(
        `Appointment scheduled successfully for ${fullName.trim()} on ${date} at ${selectedSlotLabel || time}.`,
        'Appointment Created'
      );

      setSuccessResult({
        id: data.appointment?.id || '',
        location: data.appointment?.location || location,
      });

      onSuccess();
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : 'Failed to schedule appointment.';
      setErrorMsg(errText);
      toast.error(errText, 'Booking Failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetPatientFields = () => {
    setSuccessResult(null);
    setErrorMsg('');
    setFullName('');
    setPhone('');
    setEmail('');
    setAge('');
    setReason(DEFAULT_REASON);
    setVisitType('first');
    setShowMore(false);
    setTime('');
    setShowCalendar(false);
    setNotes('');
  };

  const handleResetAndClose = () => {
    resetPatientFields();
    onClose();
  };

  const handleBookAnother = () => {
    resetPatientFields();
  };

  if (!isOpen) return null;

  const slotNote = !location
    ? 'Choose a location first to see available times.'
    : !date
    ? 'Select a date to see available times.'
    : date < todayIso
    ? 'Past dates cannot be booked.'
    : isClosedDay
    ? `The doctor does not take appointments at ${location} on ${closedDayName}. Please choose another date.`
    : isDoctorDateBlocked
    ? `Doctor is unavailable on ${date} (${doctorBlockReason || 'on leave'}).`
    : isLoadingSlots
    ? 'Checking real-time availability...'
    : `Available times on ${date}`;

  return (
    <div className="admin-drawer-overlay" onClick={handleResetAndClose}>
      <aside
        className="admin-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        {/* Drawer Header */}
        <header className="drawer-header">
          <div className="drawer-title-wrap">
            <span className="drawer-icon-badge" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <line x1="12" y1="14" x2="12" y2="18" />
                <line x1="10" y1="16" x2="14" y2="16" />
              </svg>
            </span>
            <div>
              <h3 id="drawer-title">Schedule New Appointment</h3>
              <p className="drawer-subtitle">
                Book in-clinic walk-in visits with cash or digital payment.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn-drawer-close"
            onClick={handleResetAndClose}
            title="Close Panel"
            aria-label="Close booking panel"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        {/* Success Confirmation State */}
        {successResult ? (
          <div className="drawer-scroll-body drawer-success-state">
            <div className="success-icon-badge">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h4>Appointment Confirmed!</h4>
            <p className="success-patient-desc">
              Scheduled for <strong>{fullName}</strong> on <strong>{date} at {selectedSlotLabel || time}</strong>.
            </p>

            <div className="success-details-card">
              <div className="detail-row">
                <span>Consultation Mode:</span>
                <strong>In-Clinic (Offline Consultation)</strong>
              </div>
              <div className="detail-row">
                <span>Visit Type:</span>
                <strong>{visitType === 'first' ? 'First Visit' : 'Follow-up / Another Visit'}</strong>
              </div>
              <div className="detail-row">
                <span>Location:</span>
                <strong>{successResult.location || '-'}</strong>
              </div>
              <div className="detail-row">
                <span>Payment Settlement:</span>
                <strong className="text-green">
                  {paymentMethod} • ₹{amount} ({paymentStatus.toUpperCase()})
                </strong>
              </div>
              <div className="detail-row">
                <span>Clinic Address:</span>
                <span className="text-muted">{CLINIC.address.full}</span>
              </div>
            </div>

            <div className="drawer-success-actions">
              <div className="drawer-success-btns-row">
                <button type="button" className="btn-book-another" onClick={handleBookAnother}>
                  Book Another
                </button>
                <button type="button" className="btn-modal-done" onClick={handleResetAndClose}>
                  Done / Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="drawer-form-layout" id="admin-booking-form">
            <div className="drawer-scroll-body">
              {errorMsg && (
                <div className="modal-alert-error" role="alert">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Patient */}
              <section className="abk-section">
                <div className="abk-grid-2">
                  <div className="abk-field">
                    <label>
                      Patient name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      autoFocus
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="modal-input"
                      required
                    />
                  </div>

                  <div className="abk-field">
                    <label>
                      Phone <span className="req">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile"
                      value={phone}
                      inputMode="numeric"
                      maxLength={10}
                      onChange={(e) => {
                        setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                        if (errorMsg) setErrorMsg('');
                      }}
                      className="modal-input"
                      required
                    />
                  </div>
                </div>

                <div className="abk-grid-2">
                  <div className="abk-field">
                    <label>Age</label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      placeholder="optional"
                      value={age}
                      onChange={(e) => {
                        setAge(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      className="modal-input"
                    />
                  </div>

                  <div className="abk-field">
                    <label>Visit</label>
                    <div className="abk-seg" role="radiogroup" aria-label="Visit type">
                      <button
                        type="button"
                        role="radio"
                        aria-checked={visitType === 'first'}
                        className={visitType === 'first' ? 'is-active' : ''}
                        disabled={isSubmitting}
                        onClick={() => setVisitType('first')}
                      >
                        First
                      </button>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={visitType === 'follow_up'}
                        className={visitType === 'follow_up' ? 'is-active' : ''}
                        disabled={isSubmitting}
                        onClick={() => setVisitType('follow_up')}
                      >
                        Follow-up
                      </button>
                    </div>
                  </div>
                </div>

                <div className="abk-field">
                  <label>Reason for consultation</label>
                  <select
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="modal-input modal-select"
                  >
                    {CONSULTATION_REASONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              {/* When */}
              <section className="abk-section">
                {clinic.isLoaded && clinic.bookableLocations.length > 1 && (
                  <div className="abk-field">
                    <label>Location</label>
                    <div className="abk-chips" role="radiogroup" aria-label="Clinic location">
                      {clinic.bookableLocations.map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          role="radio"
                          aria-checked={location === loc}
                          className={`abk-chip ${location === loc ? 'is-active' : ''}`}
                          disabled={isSubmitting}
                          onClick={() => handleLocationSelect(loc)}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {!clinic.isLoaded && <p className="abk-note">Loading...</p>}

                <div className="abk-field">
                  <label>Date</label>
                  {location ? (
                    <>
                      <div className="abk-chips">
                        <button
                          type="button"
                          className={`abk-chip ${date === todayIso ? 'is-active' : ''}`}
                          disabled={isSubmitting || dateOptionDisabled(todayIso)}
                          onClick={() => handleDateSelect(todayIso)}
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          className={`abk-chip ${date === tomorrowIso ? 'is-active' : ''}`}
                          disabled={isSubmitting || dateOptionDisabled(tomorrowIso)}
                          onClick={() => handleDateSelect(tomorrowIso)}
                        >
                          Tomorrow
                        </button>
                        <button
                          type="button"
                          className={`abk-chip is-ghost ${showCalendar || (date !== todayIso && date !== tomorrowIso) ? 'is-active' : ''}`}
                          disabled={isSubmitting}
                          onClick={() => setShowCalendar((v) => !v)}
                        >
                          {date !== todayIso && date !== tomorrowIso && prettyDate
                            ? prettyDate
                            : showCalendar
                            ? 'Hide calendar'
                            : 'Other date'}
                        </button>
                      </div>
                      {showCalendar && (
                        <div className="abk-calendar-wrap">
                          <CalendarPicker
                            selectedDate={date}
                            onSelectDate={handleDateSelect}
                            minDate={todayIso}
                            disabled={isSubmitting}
                            doctorBlockedDates={doctorBlockedDates}
                            closedWeekdays={clinic.closedWeekdaysFor(location)}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="abk-note">Choose a location to see its dates.</p>
                  )}
                </div>

                <div className="abk-field">
                  <div className="abk-slots-head">
                    <label>Time slot</label>
                    {isLoadingSlots && <span className="abk-note">Checking...</span>}
                  </div>

                  {!dateIsBookable ? (
                    <p className={`abk-note ${isClosedDay || isDoctorDateBlocked ? 'is-warn' : ''}`}>{slotNote}</p>
                  ) : (
                    <>
                      {SLOTS.length === 0 && (
                        <p className="abk-note is-warn">No time slots on this day. Please pick another date.</p>
                      )}
                      <div className="abk-slots">
                        {SLOTS.map((slot) => {
                          const isDoctorBlocked = doctorBlockedSlots.includes(slot.value);
                          const isBooked = bookedSlots.includes(slot.value);
                          const isPast = isPastSlot(slot.value);
                          const isUnavailable = isBooked || isDoctorBlocked || isPast;
                          const isSelected = time === slot.value;
                          return (
                            <button
                              key={slot.value}
                              type="button"
                              disabled={isUnavailable || isSubmitting}
                              className={`abk-slot ${isSelected ? 'is-selected' : ''}`}
                              onClick={() => {
                                setTime(slot.value);
                                if (errorMsg) setErrorMsg('');
                              }}
                            >
                              <span>{slot.label}</span>
                              {isPast ? (
                                <small>Passed</small>
                              ) : isDoctorBlocked ? (
                                <small>Unavailable</small>
                              ) : isBooked ? (
                                <small>Booked</small>
                              ) : hasMultipleLocations && slot.location ? (
                                <small>{slot.location}</small>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Payment */}
              <section className="abk-section">
                <div className="abk-grid-3">
                  <div className="abk-field">
                    <label>Fee (₹)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="modal-input font-bold"
                      required
                    />
                  </div>

                  <div className="abk-field">
                    <label>Payment</label>
                    <div className="abk-seg" role="radiogroup" aria-label="Payment method">
                      {(['Cash', 'UPI', 'Card'] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          role="radio"
                          aria-checked={paymentMethod === m}
                          className={paymentMethod === m ? 'is-active' : ''}
                          onClick={() => {
                            setPaymentMethod(m);
                            if (m === 'Cash') setPaymentStatus('paid');
                          }}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="abk-field">
                    <label>Status</label>
                    <div className="abk-seg" role="radiogroup" aria-label="Payment status">
                      <button
                        type="button"
                        role="radio"
                        aria-checked={paymentStatus === 'paid'}
                        className={paymentStatus === 'paid' ? 'is-active' : ''}
                        onClick={() => setPaymentStatus('paid')}
                      >
                        Paid
                      </button>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={paymentStatus === 'pending'}
                        className={paymentStatus === 'pending' ? 'is-active' : ''}
                        onClick={() => setPaymentStatus('pending')}
                      >
                        Pending
                      </button>
                    </div>
                  </div>
                </div>

                <button type="button" className="abk-more" onClick={() => setShowMore((v) => !v)}>
                  {showMore ? '− Hide email & notes' : '+ Add email / notes (optional)'}
                </button>

                {showMore && (
                  <div className="abk-grid-2" style={{ marginTop: 10 }}>
                    <div className="abk-field">
                      <label>Email</label>
                      <input
                        type="email"
                        autoComplete="email"
                        maxLength={254}
                        placeholder="patient@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMsg) setErrorMsg('');
                        }}
                        className="modal-input"
                      />
                    </div>
                    <div className="abk-field">
                      <label>Notes</label>
                      <input
                        type="text"
                        placeholder="e.g. Walk-in, paid at reception"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="modal-input"
                      />
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Sticky Bottom Actions Bar */}
            <footer className="drawer-footer-actions">
              <button
                type="button"
                className="btn-cancel-drawer"
                onClick={handleResetAndClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn-submit-booking"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Scheduling...</span>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>
                      Schedule &amp; Confirm ({paymentMethod} ₹{amount})
                    </span>
                  </>
                )}
              </button>
            </footer>
          </form>
        )}
      </aside>
    </div>
  );
}