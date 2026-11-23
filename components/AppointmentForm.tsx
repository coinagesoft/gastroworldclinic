'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import CalendarPicker from './CalendarPicker';
import { toast } from '@/components/ui/Toast';
import { useClinicSettings } from '@/lib/useClinicSettings';
import { formatSlotLabel } from '@/lib/slots';
import { CLINIC } from '@/lib/clinicInfo';
import './booking.css';
import './booking-doctor.css';
import './booking-paymode.css';

// Single-doctor clinic: there is no doctor picker. Timings, leave and booked slots are clinic-wide.
// Change this name if the doctor shown on the confirmation / Razorpay notes should differ.
const DOCTOR_NAME = 'Dr. Manoj Kolhe';

// Key used for the client-side slot cache (one doctor, so one bucket)
const CACHE_PREFIX = 'clinic';

interface FormData {
  location: string;
  fullName: string;
  phone: string;
  email: string;
  age: string;
  reason: string;
  date: string;
  time: string;
  message: string;
}

type PaymentMode = 'online' | 'clinic';

interface ConfirmedBooking {
  id: string;
  fullName: string;
  email: string;
  date: string;
  time: string;
  reason: string;
  location?: string;
  doctorName?: string;
  paid?: boolean;
  paymentId?: string;
  amount?: number;
  meetLink?: string;
  googleCalendarUrl?: string;
  googleConnected?: boolean;
  doctorEmail?: string;
  calendarError?: string;
}

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayFailureResponse {
  error?: {
    code?: string;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;
  };
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
  handler: (response: RazorpaySuccessResponse) => void;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (response: RazorpayFailureResponse) => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

// Set NEXT_PUBLIC_RAZORPAY_KEY_ID in .env.local with Gastroworld's own Razorpay key.
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';

// TODO: confirm Gastroworld's actual consultation fee (carried over from the old project).
const CONSULTATION_FEE_INR = 500;

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

function loadRazorpayCheckoutScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const existingScript = document.getElementById('razorpay-checkout-js') as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-checkout-js';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function AppointmentForm() {
  const [formData, setFormData] = useState<FormData>({
    location: '',
    fullName: '',
    phone: '',
    email: '',
    age: '',
    reason: '',
    date: '',
    time: '',
    message: '',
  });
  // Timings (days, hours, locations) come from the clinic defaults
  const clinic = useClinicSettings('default');

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isCheckingSlot, setIsCheckingSlot] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);
  const [tomorrowIso, setTomorrowIso] = useState('');

  // Payment is optional: pay online now (Razorpay) or book and pay at the clinic
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('online');

  // Real booked slots loaded from backend
  const [serverBookedSlots, setServerBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Doctor availability overrides loaded from backend
  const [doctorBlockedDates, setDoctorBlockedDates] = useState<{ date: string; reason: string }[]>([]);
  const [doctorBlockedSlots, setDoctorBlockedSlots] = useState<string[]>([]);
  const [isDoctorDateBlocked, setIsDoctorDateBlocked] = useState(false);
  const [doctorBlockReason, setDoctorBlockReason] = useState('');

  // Instant client-side slots cache for sub-millisecond date switching
  const slotsCacheRef = useRef<
    Map<
      string,
      {
        bookedSlots: string[];
        doctorBlockedSlots: string[];
        isDoctorBlocked: boolean;
        doctorBlockReason: string;
      }
    >
  >(new Map());

  // Google status for doctor
  const [googleStatus, setGoogleStatus] = useState<{
    connected: boolean;
    hasConfig: boolean;
    doctorEmail: string;
  } | null>(null);
  const [googleMessage, setGoogleMessage] = useState<string | null>(null);

  const successBoxRef = useRef<HTMLDivElement>(null);
  const locationSectionRef = useRef<HTMLDivElement>(null);
  const calendarSectionRef = useRef<HTMLDivElement>(null);
  const slotSectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const paymentStepRef = useRef<HTMLDivElement>(null);

  // Check URL params for Google OAuth feedback & status, fetch doctor availability, and preload Razorpay script
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('google_connected') === 'true') {
        setGoogleMessage('Google Calendar successfully connected!');
      } else if (params.get('google_error')) {
        setGoogleMessage(`Google Authorization Notice: ${params.get('google_error')}`);
      }
    }

    fetchGoogleStatus();
    fetchDoctorAvailability();
    preloadBulkCalendar();
    loadRazorpayCheckoutScript();
  }, []);

  // Keep an already-open booking page in sync with doctor blackouts set in admin.
  useEffect(() => {
    const refreshAvailability = () => {
      if (document.visibilityState !== 'visible') return;
      fetchDoctorAvailability();
      preloadBulkCalendar();
    };

    window.addEventListener('focus', refreshAvailability);
    document.addEventListener('visibilitychange', refreshAvailability);
    const intervalId = window.setInterval(refreshAvailability, 15_000);

    return () => {
      window.removeEventListener('focus', refreshAvailability);
      document.removeEventListener('visibilitychange', refreshAvailability);
      window.clearInterval(intervalId);
    };
  }, []);

  // Confirmation dialog: Esc closes it and the page behind does not scroll
  useEffect(() => {
    if (!confirmedBooking) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setConfirmedBooking(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [confirmedBooking]);

  const preloadBulkCalendar = () => {
    fetch(`/api/appointments?bulk=true&t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.blockedDates)) {
          setDoctorBlockedDates(data.blockedDates);
        }
        if (data.bookedSlotsByDate) {
          const docSlotsByDate = data.doctorBlockedSlotsByDate || {};
          const fullLeaves = new Set((data.blockedDates || []).map((b: { date: string }) => b.date));

          Object.keys(data.bookedSlotsByDate).forEach((d) => {
            const booked = data.bookedSlotsByDate[d] || [];
            const docBlocked = docSlotsByDate[d] || [];
            const isDocBlocked = fullLeaves.has(d);
            slotsCacheRef.current.set(`${CACHE_PREFIX}|${d}`, {
              bookedSlots: Array.from(new Set([...booked, ...docBlocked])),
              doctorBlockedSlots: docBlocked,
              isDoctorBlocked: isDocBlocked,
              doctorBlockReason: isDocBlocked ? 'Doctor on leave' : '',
            });
          });

          // If current form date is already in cache, set immediately
          if (formData.date && slotsCacheRef.current.has(`${CACHE_PREFIX}|${formData.date}`)) {
            const initialSlot = slotsCacheRef.current.get(`${CACHE_PREFIX}|${formData.date}`)!;
            setServerBookedSlots(initialSlot.bookedSlots);
            setDoctorBlockedSlots(initialSlot.doctorBlockedSlots);
            setIsDoctorDateBlocked(initialSlot.isDoctorBlocked);
            setDoctorBlockReason(initialSlot.doctorBlockReason);
          }
        }
      })
      .catch((err) => console.error('Bulk calendar preload error:', err));
  };

  const fetchDoctorAvailability = () => {
    fetch(`/api/availability?t=${Date.now()}&doctor=default`, {
      cache: 'no-store',
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.blockedDates)) {
          setDoctorBlockedDates(data.blockedDates);
        }
      })
      .catch((err) => console.error('Error fetching doctor availability:', err));
  };

  const fetchGoogleStatus = () => {
    fetch('/api/auth/google/status', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setGoogleStatus(data))
      .catch((err) => console.error('Error fetching Google status:', err));
  };

  const toIsoDate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  // Only allow booking from tomorrow onwards
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setTomorrowIso(toIsoDate(tomorrow));
  }, []);

  // First date from tomorrow on that the doctor sits at the chosen location
  const findFirstOpenDate = (location: string): string => {
    const probe = new Date();
    probe.setDate(probe.getDate() + 1);
    const leaveDates = new Set(doctorBlockedDates.map((b) => b.date));
    for (let i = 0; i < 90; i++) {
      const iso = toIsoDate(probe);
      if (!clinic.isClosedOn(iso, location) && !leaveDates.has(iso)) return iso;
      probe.setDate(probe.getDate() + 1);
    }
    return '';
  };

  // Patient picks a location first; dates and slots then follow that location only
  const handleLocationSelect = (location: string) => {
    if (location === formData.location) return;
    setFormData((prev) => ({
      ...prev,
      location,
      date: findFirstOpenDate(location),
      time: '',
    }));
    setErrors((prev) => ({ ...prev, location: '', date: '', time: '' }));
  };

  // With a single location there is nothing to choose, so it is selected automatically
  useEffect(() => {
    if (clinic.isLoaded && !formData.location && clinic.bookableLocations.length === 1) {
      handleLocationSelect(clinic.bookableLocations[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinic.isLoaded, clinic.bookableLocations.join('|'), formData.location]);

  // Fetch booked slots whenever the selected date changes (instant 0ms from cache)
  const fetchBookedSlots = React.useCallback((dateString: string) => {
    if (!dateString) return;
    if (!formData.location || clinic.isClosedOn(dateString, formData.location)) {
      setServerBookedSlots([]);
      setDoctorBlockedSlots([]);
      setIsDoctorDateBlocked(false);
      setDoctorBlockReason('');
      return;
    }

    const cacheKey = `${CACHE_PREFIX}|${dateString}`;

    // Check fast cache first (< 0.1ms instant UI)
    const cached = slotsCacheRef.current.get(cacheKey);
    if (cached) {
      setServerBookedSlots(cached.bookedSlots);
      setDoctorBlockedSlots(cached.doctorBlockedSlots);
      setIsDoctorDateBlocked(cached.isDoctorBlocked);
      setDoctorBlockReason(cached.doctorBlockReason);
      setIsLoadingSlots(false);
      return;
    }

    setIsLoadingSlots(true);
    fetch(`/api/appointments?date=${dateString}`)
      .then((res) => res.json())
      .then((data) => {
        const slotData = {
          bookedSlots: Array.isArray(data.bookedSlots) ? data.bookedSlots : [],
          doctorBlockedSlots: Array.isArray(data.doctorBlockedSlots) ? data.doctorBlockedSlots : [],
          isDoctorBlocked: Boolean(data.isDoctorBlocked),
          doctorBlockReason: data.doctorBlockReason || '',
        };
        slotsCacheRef.current.set(cacheKey, slotData);
        setServerBookedSlots(slotData.bookedSlots);
        setDoctorBlockedSlots(slotData.doctorBlockedSlots);
        setIsDoctorDateBlocked(slotData.isDoctorBlocked);
        setDoctorBlockReason(slotData.doctorBlockReason);
      })
      .catch((err) => console.error('Failed to load booked slots:', err))
      .finally(() => setIsLoadingSlots(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinic.settings, formData.location]);

  useEffect(() => {
    if (formData.date) {
      fetchBookedSlots(formData.date);
    }
  }, [formData.date, fetchBookedSlots]);

  const validateField = (
    name: keyof FormData,
    value: string,
    currentTomorrow: string = tomorrowIso
  ): string => {
    const trimmed = value.trim();

    switch (name) {
      case 'location':
        return trimmed ? '' : 'Please choose a clinic location.';

      case 'fullName':
        if (!trimmed) return 'Please enter your full name.';
        if (trimmed.length < 3) return 'At least 3 characters.';
        if (!/^[A-Za-z][A-Za-z .'-]*$/.test(trimmed)) return 'Use letters and spaces only.';
        return '';

      case 'phone': {
        if (!trimmed) return 'Please enter your phone number.';
        if (!/^[6-9]\d{9}$/.test(trimmed))
          return 'Enter a valid 10-digit mobile number.';
        return '';
      }

      case 'email':
        if (!trimmed) return 'Please enter your email address.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
          return 'Enter a valid email, e.g. name@example.com.';
        }
        return '';

      case 'age': {
        if (!trimmed) return 'Please enter your age.';
        const ageNum = Number(trimmed);
        if (!Number.isInteger(ageNum) || ageNum < 1 || ageNum > 120) {
          return 'Please enter an age between 1 and 120.';
        }
        return '';
      }

      case 'reason':
        return trimmed ? '' : 'Please select a reason for consultation.';

      case 'date': {
        if (!trimmed) return 'Please choose a preferred date.';
        if (currentTomorrow && trimmed < currentTomorrow) {
          return 'Appointments must be booked from tomorrow onwards. Same-day or past bookings are not allowed.';
        }
        const d = new Date(`${trimmed}T00:00:00`);
        if (formData.location && clinic.isClosedOn(trimmed, formData.location)) {
          const dayName = d.toLocaleDateString('en-IN', { weekday: 'long' });
          return `The doctor does not take appointments at ${formData.location} on ${dayName}s. Please choose another day.`;
        }
        return '';
      }

      case 'time':
        if (!trimmed) return 'Please choose an available appointment slot.';
        if (serverBookedSlots.includes(trimmed))
          return 'This slot is already booked. Please pick another available time.';
        return '';

      case 'message':
        return trimmed.length > 300 ? 'Please keep your message under 300 characters.' : '';

      default:
        return '';
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    const nextValue = fieldName === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;

    setFormData((prev) => {
      const next = { ...prev, [fieldName]: nextValue };
      if (fieldName === 'date') {
        next.time = '';
      }
      return next;
    });

    if (errors[fieldName]) {
      const errorMsg = validateField(fieldName, nextValue);
      setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
    }
  };

  const handleCalendarDateSelect = (dateIso: string) => {
    setFormData((prev) => ({
      ...prev,
      date: dateIso,
      time: '',
    }));
    setErrors((prev) => ({ ...prev, date: '', time: '' }));
  };

  const handleSlotSelect = (slotValue: string) => {
    if (serverBookedSlots.includes(slotValue)) return;
    setFormData((prev) => ({ ...prev, time: slotValue }));
    setErrors((prev) => ({ ...prev, time: '' }));
  };

  // Day-wise timings: only the slots of the chosen weekday, each with its visiting location
  const SLOTS = clinic.slotsForDate(formData.date, formData.location);
  // "closed day": no timings at the chosen location on that weekday
  const isSunday = formData.date && formData.location ? clinic.isClosedOn(formData.date, formData.location) : false;
  const closedDayName = formData.date
    ? new Date(`${formData.date}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'long' })
    : '';
  const selectedSlotLabel = SLOTS.find((s) => s.value === formData.time)?.label || '';
  const selectedLocation = formData.location || undefined;
  const dayLocations = Array.from(new Set(SLOTS.map((s) => s.location).filter(Boolean))) as string[];
  const hasMultipleLocations = dayLocations.length > 1;

  const prettyDate = React.useMemo(() => {
    if (!formData.date || isSunday) return '';
    try {
      return new Date(`${formData.date}T00:00:00`).toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  }, [formData.date, isSunday]);

  const shortDate = React.useMemo(() => {
    if (!formData.date || isSunday) return '';
    try {
      return new Date(`${formData.date}T00:00:00`).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  }, [formData.date, isSunday]);

  // Validate form, verify slot availability, then either book directly (pay at clinic)
  // or open Razorpay Checkout (pay now)
  const handlePayAndBookSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPaymentError(null);

    const newErrors: Partial<Record<keyof FormData, string>> = {};
    const fieldKeys = Object.keys(formData) as (keyof FormData)[];

    let firstInvalidKey: keyof FormData | null = null;

    fieldKeys.forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        if (!firstInvalidKey) {
          firstInvalidKey = key;
        }
      }
    });

    setErrors(newErrors);

    if (firstInvalidKey) {
      const errorMsg = newErrors[firstInvalidKey] || 'Please check and complete all required fields.';
      toast.warning(errorMsg, 'Required Information');
      if (firstInvalidKey === 'location') {
        locationSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (firstInvalidKey === 'time') {
        slotSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (firstInvalidKey === 'date') {
        calendarSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const inputElement = formRef.current?.elements.namedItem(firstInvalidKey) as HTMLElement | null;
        inputElement?.focus();
      }
      return;
    }

    // Verify real-time slot availability before booking / opening Razorpay
    setIsCheckingSlot(true);
    try {
      const res = await fetch(
        `/api/appointments?date=${formData.date}&location=${encodeURIComponent(formData.location)}`
      );
      const data = await res.json();
      if (data.isDoctorBlocked) {
        setIsDoctorDateBlocked(true);
        setDoctorBlockReason(data.doctorBlockReason || '');
        const blockedMsg = `Doctor is unavailable on ${formData.date}. Please choose another date.`;
        setErrors((prev) => ({
          ...prev,
          date: blockedMsg,
        }));
        toast.error(blockedMsg, 'Doctor Unavailable');
        calendarSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setIsCheckingSlot(false);
        return;
      }
      if (Array.isArray(data.bookedSlots) && data.bookedSlots.includes(formData.time)) {
        setServerBookedSlots(data.bookedSlots);
        const slotMsg = 'This time slot was just booked or blocked. Please select another available slot.';
        setErrors((prev) => ({
          ...prev,
          time: slotMsg,
        }));
        toast.error(slotMsg, 'Slot Unavailable');
        slotSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setIsCheckingSlot(false);
        return;
      }
    } catch (err) {
      console.error('Error checking slot availability:', err);
    } finally {
      setIsCheckingSlot(false);
    }

    setConfirmedBooking(null);

    if (paymentMode === 'clinic') {
      // No online payment: book the slot directly, patient pays at the clinic
      setIsProcessingPayment(true); // keeps the form locked while booking
      await createAppointmentAfterPayment();
    } else {
      await handleRazorpayPayment();
    }
  };

  // Create appointment on backend.
  // With a Razorpay payment ID -> paid booking. Without one -> "pay at clinic" booking.
  const createAppointmentAfterPayment = async (razorpayPaymentId?: string) => {
    setIsSubmitting(true);
    setPaymentError(null);
    const isPaid = Boolean(razorpayPaymentId);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          // Gastroworld is an in-clinic (offline) only clinic: never online / Google Meet
          consultationType: 'offline',
          paymentMethod: isPaid ? 'Razorpay' : 'Pay at clinic',
          paymentStatus: isPaid ? 'paid' : 'pending',
          amount: isPaid ? CONSULTATION_FEE_INR : 0,
          ...(isPaid ? { paymentId: razorpayPaymentId } : {}),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          const conflictMsg = 'This time slot is already booked for this date. Please choose another slot.';
          setErrors((prev) => ({
            ...prev,
            time: conflictMsg,
          }));
          toast.error(conflictMsg, 'Slot Already Booked');
          fetchBookedSlots(formData.date);
          slotSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          const errDetail =
            result.error ||
            (isPaid
              ? `Payment (${razorpayPaymentId}) succeeded, but booking encountered an error. Please contact the clinic.`
              : 'Could not book your appointment. Please try again or call the clinic.');
          setPaymentError(errDetail);
          toast.error(errDetail, 'Booking Error');
        }
        setIsSubmitting(false);
        return;
      }

      // Booking confirmed!
      toast.success(
        `Appointment confirmed for ${result.appointment.fullName} on ${result.appointment.date} at ${result.appointment.time}!`,
        'Booking Confirmed'
      );

      setConfirmedBooking({
        id: result.appointment.id,
        fullName: result.appointment.fullName,
        email: result.appointment.email,
        date: result.appointment.date,
        time: result.appointment.time,
        reason: result.appointment.reason,
        location: result.appointment.location,
        doctorName: result.appointment.doctorName || DOCTOR_NAME,
        paid: isPaid,
        paymentId: result.appointment.paymentId || razorpayPaymentId,
        amount: isPaid ? result.appointment.amount || CONSULTATION_FEE_INR : 0,
        meetLink: result.meetLink,
        googleCalendarUrl: result.googleCalendarUrl,
        googleConnected: result.googleConnected,
        doctorEmail: result.doctorEmail || CLINIC.email,
      });

      // Refresh booked slots on this date so it's locked immediately
      fetchBookedSlots(formData.date);

      // Reset form fields
      setFormData({
        location: formData.location,
        fullName: '',
        phone: '',
        email: '',
        age: '',
        reason: '',
        date: formData.date,
        time: '',
        message: '',
      });
      setErrors({});

      setTimeout(() => {
        successBoxRef.current?.focus({ preventScroll: true });
      }, 80);
    } catch (err) {
      console.error('Error submitting appointment:', err);
      const errMsg = isPaid
        ? `Network error while finalizing booking (Payment ID: ${razorpayPaymentId}). Please try again.`
        : 'Network error while booking your appointment. Please try again.';
      setPaymentError(errMsg);
      toast.error(errMsg, 'Booking Finalization Error');
    } finally {
      setIsSubmitting(false);
      setIsProcessingPayment(false);
    }
  };

  // Launch Razorpay Checkout for the consultation fee
  const handleRazorpayPayment = async () => {
    setPaymentError(null);
    setIsProcessingPayment(true);

    if (!RAZORPAY_KEY_ID) {
      const keyError =
        'Online payment is not configured yet. Please choose "Pay at clinic" or call the clinic to book your appointment.';
      console.error('NEXT_PUBLIC_RAZORPAY_KEY_ID is not set.');
      setPaymentError(keyError);
      toast.error(keyError, 'Payment Not Configured');
      setIsProcessingPayment(false);
      return;
    }

    const scriptLoaded = await loadRazorpayCheckoutScript();
    if (!scriptLoaded || !window.Razorpay) {
      const loadError =
        'Unable to load Razorpay payment gateway. Please check your internet connection and try again, or choose "Pay at clinic".';
      setPaymentError(loadError);
      toast.error(loadError, 'Payment Gateway Error');
      setIsProcessingPayment(false);
      return;
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');

    const options: RazorpayOptions = {
      key: RAZORPAY_KEY_ID,
      amount: CONSULTATION_FEE_INR * 100, // amount in paise
      currency: 'INR',
      name: CLINIC.name,
      description: `Consultation on ${formData.date} at ${selectedSlotLabel}`,
      prefill: {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        contact: cleanPhone,
      },
      notes: {
        patient_name: formData.fullName.trim(),
        phone: cleanPhone,
        email: formData.email.trim(),
        age: formData.age,
        reason: formData.reason,
        appointment_date: formData.date,
        appointment_time: formData.time,
        location: formData.location,
        doctor: DOCTOR_NAME,
      },
      theme: {
        color: '#565ACF',
      },
      modal: {
        ondismiss: () => {
          setIsProcessingPayment(false);
          toast.warning('Payment was cancelled or closed. Appointment booking was not completed.', 'Booking Cancelled');
        },
      },
      handler: (response: RazorpaySuccessResponse) => {
        if (response && response.razorpay_payment_id) {
          createAppointmentAfterPayment(response.razorpay_payment_id);
        } else {
          const failMsg = 'Payment verification did not return a payment ID. Please try again.';
          setPaymentError(failMsg);
          toast.error(failMsg, 'Payment Failed');
          setIsProcessingPayment(false);
        }
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (failure: RazorpayFailureResponse) => {
        const msg =
          failure?.error?.description ||
          'Payment failed or was declined. Please try again to complete your booking.';
        setPaymentError(msg);
        toast.error(msg, 'Payment Declined');
        setIsProcessingPayment(false);
      });
      rzp.open();
    } catch (err) {
      console.error('Failed to open Razorpay checkout:', err);
      const errMsg = 'Could not initialize Razorpay checkout. Please try again.';
      setPaymentError(errMsg);
      toast.error(errMsg, 'Checkout Error');
      setIsProcessingPayment(false);
    }
  };

  const isBusy = isCheckingSlot || isProcessingPayment || isSubmitting;
  const dateIsBookable =
    !!formData.date && !isSunday && !isDoctorDateBlocked && (!tomorrowIso || formData.date >= tomorrowIso);

  const slotNote = !formData.location
    ? 'Choose a location first to see available times.'
    : !formData.date
    ? 'Select a date to see available times.'
    : tomorrowIso && formData.date < tomorrowIso
    ? 'Same-day and past dates cannot be booked online.'
    : isSunday
    ? `The doctor does not take appointments at ${formData.location} on ${closedDayName}. Please choose another date.`
    : isDoctorDateBlocked
    ? `Doctor is unavailable on ${shortDate || formData.date} (${doctorBlockReason || 'on leave'}).`
    : isLoadingSlots
    ? 'Checking real-time availability...'
    : `Available times on ${shortDate}`;

  const fieldCls = (name: keyof FormData, extra = '') =>
    `bk-field ${extra} ${errors[name] ? 'invalid' : ''}`.trim();

  const submitLabel = isSubmitting
    ? paymentMode === 'online'
      ? 'Payment Successful! Booking Appointment...'
      : 'Booking Appointment...'
    : isProcessingPayment
    ? paymentMode === 'online'
      ? 'Opening Razorpay...'
      : 'Booking Appointment...'
    : isCheckingSlot
    ? 'Checking Slot...'
    : paymentMode === 'online'
    ? `Pay ₹${CONSULTATION_FEE_INR} & Book Appointment`
    : 'Book Appointment';

  return (
    <div className="bk">
      <div className="bk-card" ref={paymentStepRef}>
        {/* Booking confirmation (replaces the form inside the same card so the page never grows) */}
        {confirmedBooking && typeof document !== 'undefined' && createPortal(
          <div
            className="bk-success"
            id="success-box"
            role="dialog"
            aria-modal="true"
            aria-label="Appointment confirmed"
            tabIndex={-1}
            ref={successBoxRef}
            onClick={(e) => {
              if (e.target === e.currentTarget) setConfirmedBooking(null);
            }}
          >
            <div className="bk-success-inner">
              <button
                type="button"
                className="bk-success-close"
                aria-label="Close"
                onClick={() => setConfirmedBooking(null)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <header className="bk-success-head">
                <span className="bk-success-check" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div>
                  <h2>Appointment confirmed</h2>
                  <p>
                    Thank you, <strong>{confirmedBooking.fullName}</strong>. Your consultation is booked.
                  </p>
                </div>
              </header>

              <dl className="bk-success-list">
                <div>
                  <dt>Date</dt>
                  <dd>
                    {new Date(`${confirmedBooking.date}T00:00:00`).toLocaleDateString('en-IN', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{formatSlotLabel(confirmedBooking.time)}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{confirmedBooking.location || '-'}</dd>
                </div>
                <div>
                  <dt>Doctor</dt>
                  <dd>{confirmedBooking.doctorName || DOCTOR_NAME}</dd>
                </div>
                <div>
                  <dt>Payment</dt>
                  <dd>
                    {confirmedBooking.paid ? (
                      <>
                        <span className="bk-success-paid">₹{confirmedBooking.amount || CONSULTATION_FEE_INR} paid</span>
                        {confirmedBooking.paymentId ? (
                          <small>ID {confirmedBooking.paymentId}</small>
                        ) : null}
                      </>
                    ) : (
                      <span>₹{CONSULTATION_FEE_INR} to be paid at the clinic</span>
                    )}
                  </dd>
                </div>
              </dl>

              <div className="bk-success-actions">
                {confirmedBooking.googleCalendarUrl ? (
                  <a
                    className="bk-success-btn is-primary"
                    href={confirmedBooking.googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Add to Google Calendar
                  </a>
                ) : null}
                <button
                  type="button"
                  className={`bk-success-btn ${confirmedBooking.googleCalendarUrl ? '' : 'is-primary'}`}
                  onClick={() => setConfirmedBooking(null)}
                >
                  Book another appointment
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

        <div className="bk-top">
          <div>
            <h2>Schedule your consultation</h2>
            <p>Pick your location, date and time, then tell us a little about you.</p>
          </div>
          <div className="bk-top-meta">
            <span className="bk-fee">Consultation fee ₹{CONSULTATION_FEE_INR}</span>
          </div>
        </div>

        <form id="appointment-form" className="bk-form" noValidate ref={formRef} onSubmit={handlePayAndBookSubmit}>
          <div className="bk-cols">
            <div className="bk-panel bk-panel-when">
            {/* Single column now that the doctor picker is gone */}
            <div className="bk-pick-row" style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
            {/* 1. LOCATION */}
            <section className={`bk-loc ${errors.location ? 'invalid' : ''}`} ref={locationSectionRef}>
              <header className="bk-col-head">
                <span className="bk-step">1</span>
                <div>
                  <h2>Choose a location</h2>
                  <p>Where would you like to meet the doctor?</p>
                </div>
              </header>

              {!clinic.isLoaded || clinic.bookableLocations.length === 0 ? (
                <p className="bk-loc-note">Loading locations...</p>
              ) : (
                <div className="bk-loc-options" role="radiogroup" aria-label="Clinic location">
                  {clinic.bookableLocations.map((loc) => {
                    const closed = clinic.closedWeekdaysFor(loc);
                    const openDays = [1, 2, 3, 4, 5, 6, 0]
                      .filter((d) => !closed.includes(d))
                      .map((d) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d])
                      .join(', ');
                    const isSelected = formData.location === loc;
                    return (
                      <button
                        key={loc}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        title={`${loc}: ${openDays}`}
                        className={`bk-loc-option ${isSelected ? 'is-selected' : ''}`}
                        disabled={isBusy}
                        onClick={() => handleLocationSelect(loc)}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{loc}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              <input type="hidden" name="location" value={formData.location} />

              {errors.location && (
                <p className="bk-col-error" id="location-error">
                  {errors.location}
                </p>
              )}
            </section>
            </div>

            {/* 2. DATE */}
            <section className={`bk-col bk-col-date ${errors.date ? 'invalid' : ''}`} ref={calendarSectionRef}>
              <header className="bk-col-head">
                <span className="bk-step">2</span>
                <div>
                  <h2>Choose a date</h2>
                  <p>{formData.location ? `Days ${DOCTOR_NAME} sits at ${formData.location}` : "Doctor's visiting days, from tomorrow onwards"}</p>
                </div>
              </header>

              {formData.location ? (
                <CalendarPicker
                  selectedDate={formData.date}
                  onSelectDate={handleCalendarDateSelect}
                  minDate={tomorrowIso}
                  disabled={isBusy}
                  doctorBlockedDates={doctorBlockedDates}
                  closedWeekdays={clinic.closedWeekdaysFor(formData.location)}
                />
              ) : (
                <div className="bk-slots-empty">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Choose a location to see its available dates</span>
                </div>
              )}
              <input type="hidden" name="date" value={formData.date} />

              {errors.date && (
                <p className="bk-col-error" id="date-error">
                  {errors.date}
                </p>
              )}
            </section>

            {/* 3. TIME */}
            <section className={`bk-col bk-col-time ${errors.time ? 'invalid' : ''}`} ref={slotSectionRef}>
              <header className="bk-col-head">
                <span className="bk-step">3</span>
                <div>
                  <h2>Choose a time</h2>
                  <p id="slot-date-note">{slotNote}</p>
                </div>
              </header>
              <input type="hidden" name="time" value={formData.time} />

              {dateIsBookable ? (
                <>
                  <div className="bk-slots" id="slot-grid">
                    {SLOTS.map((slot) => {
                      const isDoctorBlocked = doctorBlockedSlots.includes(slot.value);
                      const isBooked = serverBookedSlots.includes(slot.value);
                      const isUnavailable = isBooked || isDoctorBlocked;
                      const isSelected = formData.time === slot.value;
                      return (
                        <button
                          key={slot.value}
                          type="button"
                          className={`bk-slot ${
                            isDoctorBlocked ? 'is-blocked' : isBooked ? 'is-booked' : 'is-open'
                          } ${isSelected ? 'is-selected' : ''}`}
                          disabled={isUnavailable || isBusy}
                          aria-pressed={isSelected}
                          aria-label={
                            isDoctorBlocked
                              ? `${slot.label} (Doctor Unavailable)`
                              : isBooked
                              ? `${slot.label} (Booked)`
                              : `${slot.label} (Available)`
                          }
                          onClick={() => handleSlotSelect(slot.value)}
                        >
                          <span className="bk-slot-time">{slot.label}</span>
                          {hasMultipleLocations && slot.location ? (
                            <span className="bk-slot-loc">{slot.location}</span>
                          ) : null}
                          <span className="bk-slot-tag">
                            {isSelected ? 'Selected' : isDoctorBlocked ? 'Unavailable' : isBooked ? 'Booked' : 'Available'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="bk-slot-legend">
                    <span><i className="bkc-dot d-avail" />Available</span>
                    <span><i className="bkc-dot d-selected" />Selected</span>
                    <span><i className="bkc-dot d-off" />Booked / blocked</span>
                  </div>
                </>
              ) : (
                <div className="bk-slots-empty">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>
                    {!formData.location
                      ? 'Choose a location to see its time slots'
                      : isDoctorDateBlocked
                      ? 'Doctor unavailable on this date'
                      : 'Pick an available date to see time slots'}
                  </span>
                </div>
              )}

              {errors.time && (
                <p className="bk-col-error" id="time-error">
                  {errors.time}
                </p>
              )}
            </section>

            </div>

            {/* 4. DETAILS */}
            <section className="bk-panel bk-panel-details bk-col-details">
              <header className="bk-col-head">
                <span className="bk-step">4</span>
                <div>
                  <h2>Your details</h2>
                  <p>All fields required except the message</p>
                </div>
              </header>

              <div className={`bk-summary ${formData.date && formData.time && !isSunday ? 'is-set' : ''}`} aria-live="polite">
                {formData.date && formData.time && !isSunday ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>
                      <strong>{shortDate}</strong> at <strong>{selectedSlotLabel}</strong>
                      {selectedLocation ? <> &middot; {selectedLocation}</> : null}
                    </span>
                  </>
                ) : (
                  <span>Your selected date and time will appear here</span>
                )}
              </div>

              <div className="bk-fields">
                <div className={fieldCls('fullName', 'span-2')}>
                  <label htmlFor="fullName">Full name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.fullName}
                    aria-describedby="fullName-error"
                    disabled={isBusy}
                  />
                  <p className="bk-err" id="fullName-error">{errors.fullName}</p>
                </div>

                <div className={fieldCls('phone')}>
                  <label htmlFor="phone">Phone number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.phone}
                    aria-describedby="phone-error"
                    disabled={isBusy}
                  />
                  <p className="bk-err" id="phone-error">{errors.phone}</p>
                </div>

                <div className={fieldCls('email')}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                    disabled={isBusy}
                  />
                  <p className="bk-err" id="email-error">{errors.email}</p>
                </div>

                <div className={fieldCls('age')}>
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    min="1"
                    max="120"
                    inputMode="numeric"
                    placeholder="e.g. 30"
                    value={formData.age}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.age}
                    aria-describedby="age-error"
                    disabled={isBusy}
                  />
                  <p className="bk-err" id="age-error">{errors.age}</p>
                </div>

                <div className={fieldCls('reason')}>
                  <label htmlFor="reason">Reason for consultation</label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.reason}
                    aria-describedby="reason-error"
                    disabled={isBusy}
                  >
                    <option value="">Select a reason</option>
                    {CONSULTATION_REASONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <p className="bk-err" id="reason-error">{errors.reason}</p>
                </div>

                <div className={fieldCls('message', 'span-2')}>
                  <label htmlFor="message">
                    Message <span>(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={2}
                    maxLength={300}
                    placeholder="Anything you would like the doctor to know"
                    value={formData.message}
                    onChange={handleInputChange}
                    aria-describedby="message-error"
                    disabled={isBusy}
                  ></textarea>
                  <p className="bk-err" id="message-error">{errors.message}</p>
                </div>
              </div>

              {/* Payment option: pay online now, or book and pay at the clinic */}
              <div className="bk-paymode" role="radiogroup" aria-label="Payment option">
                <button
                  type="button"
                  role="radio"
                  aria-checked={paymentMode === 'online'}
                  className={`bk-paymode-opt ${paymentMode === 'online' ? 'is-selected' : ''}`}
                  disabled={isBusy}
                  onClick={() => setPaymentMode('online')}
                >
                  <strong>Pay now</strong>
                  <span>₹{CONSULTATION_FEE_INR} online via Razorpay</span>
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={paymentMode === 'clinic'}
                  className={`bk-paymode-opt ${paymentMode === 'clinic' ? 'is-selected' : ''}`}
                  disabled={isBusy}
                  onClick={() => setPaymentMode('clinic')}
                >
                  <strong>Pay at clinic</strong>
                  <span>Book now, pay during your visit</span>
                </button>
              </div>

              {paymentError && (
                <div className="payment-error-banner bk-pay-error" role="alert">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{paymentError}</span>
                </div>
              )}

              <button type="submit" className="bk-pay" disabled={isBusy}>
                {submitLabel}
              </button>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
}