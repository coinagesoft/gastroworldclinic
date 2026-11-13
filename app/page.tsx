import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import NewsCarousel from '@/components/NewsCarousel';
import SymptomCards from '@/components/SymptomCards';
import { CLINIC } from '@/lib/clinicInfo';

export const metadata: Metadata = {
  title: 'Gastroworld Clinic | Gastroenterologist & Liver Specialist in Akurdi, Nigdi, Pimpri Chinchwad, Pune',
  description: 'Dr. Manoj Kolhe, Gastroenterologist, Hepatologist (Liver Specialist) and Therapeutic Endoscopist. Consultations, advanced endoscopic procedures, day care GI procedures and nutritional counselling. Ecorb Millenia Tower, Vivek Nagar, Akurdi, Pimpri-Chinchwad.',
};

const iconProps = {
  width: 32,
  height: 32,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** "Why Choose Us" cards, taken from the old gastroworldclinic.com home page (typos fixed). */
const WHY_CHOOSE_US = [
  {
    title: 'Expert Leadership',
    text: 'The Gastroworld team has extensive experience and expertise. Patients can trust in receiving top-notch care in a clinic.',
    icon: (
      <svg {...iconProps}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
      </svg>
    ),
  },
  {
    title: 'Comprehensive Services',
    text: 'At Gastroworld Clinic we provide everything from routine check-ups to advanced therapeutic procedures for our patients.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    title: 'Cutting-edge Technology',
    text: 'Gastroworld Clinic is equipped with state-of-the-art technology and facilities, which makes it unique from other clinics.',
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
  },
  {
    title: 'Personalized Care',
    text: 'Our team develops personalized treatment plans tailored to each patient’s specific condition and lifestyle.',
    icon: (
      <svg {...iconProps}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: 'Empathetic Approach',
    text: 'At Gastroworld Clinic, patients are treated with empathy, respect and dignity throughout their journey.',
    icon: (
      <svg {...iconProps}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Convenient Location',
    text: 'Gastroworld Clinic offers a convenient location in Pimpri-Chinchwad for patients in the surrounding areas.',
    icon: (
      <svg {...iconProps}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
] as const;

/** Service cards. Each one links to its own page under app/services/<slug>. */
const SERVICES = [
  {
    title: 'Consultation',
    badge: 'Gastro & Liver',
    text: 'Our health care consultation service blends expertise with empathy, ensuring every patient feels heard and understood.',
    href: '/services/consultation',
    icon: (
      <>
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
        <circle cx="20" cy="10" r="2" />
      </>
    ),
  },
  {
    title: 'Endoscopic Procedures',
    badge: 'Endoscopy',
    text: 'We offer premier endoscopic procedures, ensuring precise diagnoses and effective treatments for disorders.',
    href: '/services/endoscopic-procedures',
    icon: (
      <>
        <path d="M10.5 20.5 10 22l-4-2.5L2 17l1.5-.5" />
        <path d="m14 6 4 4" />
        <path d="M19 5 9 15l-4 1 1-4L16 2z" />
      </>
    ),
  },
  {
    title: 'Day Care GI Procedures',
    badge: 'Day Care',
    text: 'At Gastroworld Clinic, we specialize in providing advanced day care gastrointestinal procedures.',
    href: '/services/day-care-gi-procedures',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <line x1="12" y1="9" x2="12" y2="15" />
        <line x1="9" y1="12" x2="15" y2="12" />
      </>
    ),
  },
  {
    title: 'Nutritional Counselling',
    badge: 'Nutrition',
    text: 'Our nutritional counselling service plays a crucial role in managing gastroenterology diseases by providing dietary guidance.',
    href: '/services/nutritional-counselling',
    icon: (
      <>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      </>
    ),
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* =========================================================
          1. HERO SECTION (MediTro Wavy Lavender Hero)
         ========================================================= */}
      <section className="meditro-hero">
        {/* Floating Decorative Shapes */}
        <span className="deco-shape deco-hero-circle" aria-hidden="true"></span>
        <span className="deco-shape deco-hero-square" aria-hidden="true"></span>
        <span className="deco-shape deco-hero-plus" aria-hidden="true">+</span>
        <span className="deco-shape deco-hero-triangle" aria-hidden="true"></span>

        <div className="container meditro-hero-grid">
          <div className="meditro-hero-copy">
            <span className="meditro-badge-blue">
              {CLINIC.tagline}
            </span>
            <h1>
              Expert Digestive &amp; Liver Care in Pimpri Chinchwad, Pune
            </h1>
            <p className="meditro-hero-lead">
              {CLINIC.doctor.name}, {CLINIC.doctor.title}. Consultations, advanced endoscopic procedures, day care GI procedures and nutritional counselling in {CLINIC.address.area}.
            </p>
            {/* <p className="meditro-hero-lead" lang="mr" style={{ fontWeight: 700 }}>
              {CLINIC.doctor.titleMr} &bull; {CLINIC.taglineMr}
            </p> */}
            <div className="meditro-hero-actions">
              <Link href="/appointment" className="btn-meditro-orange">
                Book Appointment
              </Link>
              <Link href="/services" className="btn-meditro-outline">
                Our Services
              </Link>
              <a href={`tel:${CLINIC.phone.tel}`} className="btn-meditro-outline">
                Call {CLINIC.phone.display}
              </a>
            </div>
          </div>

          <div className="meditro-hero-visual">
            <div className="hero-organic-backing">
              {/* Banner is not square, so width/height are only an aspect-ratio hint.
                  Change them to the real pixel size of gastroworldlogobanner.webp. */}
              <Image
                src={CLINIC.banner}
                alt={`${CLINIC.name} banner`}
                width={1200}
                height={675}
                priority
                unoptimized
                className="hero-doctor-img"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
            <span className="deco-waves-orange" aria-hidden="true">
              &#x2248;&#x2248;&#x2248;
            </span>
          </div>
        </div>

        {/* Bottom Wavy SVG Divider */}
        <div className="hero-wave-bottom" aria-hidden="true">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path
              d="M0 50C240 120 480 0 720 60C960 120 1200 20 1440 70V120H0V50Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* =========================================================
          2. ABOUT US SECTION (Elaborated Profile + Experience)
         ========================================================= */}
      <section className="meditro-section meditro-about">
        {/* Styles for the left panel. Can be moved to globals.css. */}
        <style>{`
          /* Light lavender card, same top and bottom edge as the text column */
          .meditro-about .meditro-about-grid { align-items: stretch; }
          .gw-about-panel {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 24px;
            height: 100%;
            background: #f3f2ff;
            border-radius: 28px;
            padding: 36px;
          }
          .gw-clinic-logo { display: inline-block; line-height: 0; }
          /* multiply drops any white background baked into the logo file */
          .gw-clinic-logo img { width: 280px; max-width: 100%; height: auto; mix-blend-mode: multiply; }
          .gw-clinic-loc {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 16px;
            font-size: 15px;
            font-weight: 600;
            color: #1f1a6e;
          }
          .gw-clinic-loc svg { color: #f47c3c; flex: 0 0 auto; }
          .gw-stats {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            padding: 24px 0;
            border-top: 1px solid #dcdaf5;
            border-bottom: 1px solid #dcdaf5;
          }
          .gw-stat { padding: 0 14px; }
          .gw-stat:first-child { padding-left: 0; }
          .gw-stat + .gw-stat { border-left: 1px solid #dcdaf5; }
          .gw-stat strong { display: block; font-size: 32px; line-height: 1.1; color: #4749bd; }
          .gw-stat span { display: block; margin-top: 6px; font-size: 13px; line-height: 1.3; color: #4b4f73; }
          .gw-treat h4 { margin: 0 0 14px; font-size: 22px; color: #1f1a6e; }
          .gw-treat-list { display: flex; flex-direction: column; }
          .gw-treat-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 15px 0;
            border-top: 1px solid #dcdaf5;
            font-size: 17px;
            font-weight: 600;
            color: #1f1a6e;
            line-height: 1.3;
          }
          .gw-treat-item:last-child { padding-bottom: 0; }
          .gw-treat-item svg { flex: 0 0 auto; color: #f47c3c; }
          @media (max-width: 560px) {
            .gw-about-panel { padding: 24px 20px; }
            .gw-stat strong { font-size: 24px; }
            .gw-stat { padding: 0 10px; }
          }
        `}</style>
        <span className="deco-shape deco-about-square-left" aria-hidden="true"></span>
        <span className="deco-shape deco-about-square-right" aria-hidden="true"></span>

        <div className="container meditro-about-grid">
          {/* Left: logo, key numbers and conditions treated */}
          <div className="gw-about-panel">
            <div>
            <div className="gw-clinic-logo">
              <Image
                src={CLINIC.logo}
                alt={`${CLINIC.name} logo`}
                width={420}
                height={146}
                unoptimized
              />
            </div>
            <div className="gw-clinic-loc">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {CLINIC.address.area}
            </div>
            </div>

            <div className="gw-stats">
              <div className="gw-stat">
                <strong>10+</strong>
                <span>Years of Experience</span>
              </div>
              <div className="gw-stat">
                <strong>{CLINIC.stats.patients}</strong>
                <span>Happy Patients</span>
              </div>
              <div className="gw-stat">
                <strong>{CLINIC.stats.endoscopies}</strong>
                <span>Endoscopies Done</span>
              </div>
            </div>

            <div className="gw-treat">
              <h4>We Treat</h4>
              <div className="gw-treat-list">
                <div className="gw-treat-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="8 12.5 11 15.5 16 9.5" />
                  </svg>
                  Digestive Diseases
                </div>
                <div className="gw-treat-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="8 12.5 11 15.5 16 9.5" />
                  </svg>
                  Liver Diseases
                </div>
                <div className="gw-treat-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="8 12.5 11 15.5 16 9.5" />
                  </svg>
                  Gallbladder &amp; Pancreas
                </div>
                <div className="gw-treat-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="8 12.5 11 15.5 16 9.5" />
                  </svg>
                  GI Cancers
                </div>
              </div>
            </div>
          </div>

          {/* Right: Elaborated Profile Summary */}
          <div className="about-content-wrap">
            <span className="meditro-badge-orange">About {CLINIC.name}</span>
            <h2>Digestive &amp; Liver Care, Clearly Explained</h2>
            <p className="credential-pill">
              {CLINIC.doctor.name} &bull; {CLINIC.doctor.title}
            </p>
            <p>
              {CLINIC.name} offers complete digestive and liver care in {CLINIC.address.area}, led by {CLINIC.doctor.name}. The clinic provides consultations, advanced endoscopic procedures, day care GI procedures and personalised nutritional counselling.
            </p>
            <p style={{ marginTop: '10px' }}>
              Dr. Kolhe&apos;s expertise includes ERCP, CBD and pancreatic duct stenting, enteral stenting, oesophageal and anorectal manometry, and biofeedback therapy.
            </p>

            <div className="about-features-grid">
              <div className="about-feature-pill">
                <span className="feature-icon-box icon-cyan" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </span>
                <strong>ERCP &amp; Stenting</strong>
              </div>

              <div className="about-feature-pill">
                <span className="feature-icon-box icon-green" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <strong>Endo Ultrasound</strong>
              </div>

              <div className="about-feature-pill">
                <span className="feature-icon-box icon-pink" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </span>
                <strong>Liver Specialist</strong>
              </div>

              <div className="about-feature-pill">
                <span className="feature-icon-box icon-purple" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </span>
                <strong>Manometry &amp; Biofeedback</strong>
              </div>
            </div>

            <div className="about-actions-group">
              <Link href="/about" className="btn-meditro-blue">
                About the Clinic &rarr;
              </Link>
              {/* <Link href="/appointment" className="btn-meditro-orange">
                Book Visit
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. WORKING PROCESS SECTION ("How we works?" 01 / 02 / 03)
         ========================================================= */}
      <section className="meditro-section meditro-process" id="process">
        <div className="container">
          <div className="meditro-section-header">
            <span className="meditro-badge-orange">Working Process</span>
            <h2>How Care Works</h2>
          </div>

          <div className="process-cards-grid">
            {/* Step 01 */}
            <div className="process-card">
              <div className="process-num">01</div>
              <h3>Make Appointment</h3>
              <p>
                Choose your preferred date and an available slot online, or call the clinic on {CLINIC.phone.display}.
              </p>
              <Link href="/appointment" className="btn-process-link">
                <span>Book Slot</span>
                <span className="process-arrow-box" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Step 02 (Active Orange Center Card) */}
            <div className="process-card process-card-active">
              <div className="process-num">02</div>
              <h3>Examination &amp; Consultation</h3>
              <p>
                Meet {CLINIC.doctor.name} to discuss your symptoms and reports, so the right diagnosis and treatment plan can be made for you.
              </p>
              <Link href="/about" className="btn-process-link">
                <span>About the Clinic</span>
                <span className="process-arrow-box" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Step 03 */}
            <div className="process-card">
              <div className="process-num">03</div>
              <h3>Procedure &amp; Follow-up</h3>
              <p>
                Advanced endoscopic or day care GI procedures when needed, along with nutritional counselling and follow-up care.
              </p>
              <Link href="/services" className="btn-process-link">
                <span>View Services</span>
                <span className="process-arrow-box" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. SERVICES SECTION (each card links to /services/<slug>)
         ========================================================= */}
      <section className="meditro-section gw-services" id="services">
        {/* Styles for this section. Can be moved to globals.css. */}
        <style>{`
          .gw-services.meditro-section { background: #4749bd; position: relative; overflow: hidden; }
          .gw-services .meditro-section-header h2 { color: #fff; }
          .gw-services .meditro-section-header .section-lead-p { color: rgba(255, 255, 255, 0.85); }
          .gw-services-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 24px;
            align-items: stretch;
          }
          .gw-services-grid > .meditro-service-card { height: 100%; }
          .gw-services-cta { text-align: center; margin-top: 48px; }
          @media (max-width: 1100px) {
            .gw-services-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 640px) {
            .gw-services-grid { grid-template-columns: 1fr; }
          }
        `}</style>

        <div className="container">
          <div className="meditro-section-header">
            <span className="meditro-badge-orange">Our Services</span>
            <h2>Explore Our Top Services</h2>
            <p className="section-lead-p">
              Consultations, advanced endoscopic procedures and day care GI procedures, backed by personalised nutritional counselling.
            </p>
          </div>

          <div className="gw-services-grid">
            {SERVICES.map((service) => (
              <article className="meditro-service-card" key={service.href}>
                <div className="service-icon-frame">
                  <svg {...iconProps} aria-hidden="true">
                    {service.icon}
                  </svg>
                </div>
                <span className="card-cat-badge">{service.badge}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link href={service.href} className="btn-service-more">
                  Service Details &rarr;
                </Link>
              </article>
            ))}
          </div>

          <div className="gw-services-cta">
            <Link href="/services" className="btn-meditro-orange">
              Explore All Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          4b. WHY CHOOSE US
         ========================================================= */}
      <section className="meditro-section meditro-why-us" id="why-choose-us">
        {/* Styles for this section. Can be moved to globals.css. */}
        <style>{`
          .why-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
          .why-grid > .why-card {
            display: flex !important;
            flex-direction: row !important;
            align-items: flex-start;
            gap: 20px;
            padding: 28px;
          }
          .why-grid .why-card .service-icon-frame { flex: 0 0 auto; width: 64px; height: 64px; margin: 0; }
          .why-grid .why-card h3 { margin: 0 0 8px; }
          .why-grid .why-card p { margin: 0; }
          @media (max-width: 991px) {
            .why-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
          @media (max-width: 600px) {
            .why-grid { grid-template-columns: 1fr; }
          }
        `}</style>

        <div className="container">
          <div className="meditro-section-header">
            <span className="meditro-badge-orange">Our Features</span>
            <h2>Why Choose Us</h2>
          </div>

          <div className="why-grid">
            {WHY_CHOOSE_US.map((item) => (
              <article className="meditro-service-card why-card" key={item.title}>
                <div className="service-icon-frame">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          5. MAIN SYMPTOMS
         ========================================================= */}
      {/* <section className="meditro-section meditro-testimonials" id="symptoms">
        <span className="deco-shape deco-testi-plus" aria-hidden="true">+</span>
        <span className="deco-shape deco-testi-circle" aria-hidden="true"></span>

        <div className="container">
          <div className="meditro-section-header">
            <span className="meditro-badge-orange">Symptoms</span>
            <h2>Troubled by Stomach or Liver Problems?</h2> */}
            {/* <p className="section-lead-p" lang="mr">
              पोटाच्या किंवा यकृताच्या त्रासाने त्रस्त आहात का? &bull; पेट या लिवर की समस्या से परेशान हैं?
            </p> */}
          {/* </div> */}

          {/* Animated symptom cards (components/SymptomCards.tsx) */}
          {/* <SymptomCards />
        </div> */}

        {/* <div className="symptoms-note-wrap">
          <p className="symptoms-note symptoms-note--right">
            <strong>Note:</strong> Persistent stomach pain, jaundice or blood in stool can have more than one cause, so please get examined by a doctor.
          </p>
        </div>
      </section> */}

      {/* =========================================================
          6. LATEST NEWS & INSIGHTS (Auto-Scroll Carousel View)
         ========================================================= */}
      <section className="meditro-section meditro-news" id="news">
        <div className="container">
          <div className="meditro-section-header">
            <span className="meditro-badge-orange">Health Guides</span>
            <h2>Learn About Digestive &amp; Liver Health</h2>
            <p className="section-lead-p">
              Simple guides on digestive, liver, gallbladder and pancreas health.
            </p>
          </div>

          {/* Interactive Auto-Scroll News Carousel Component */}
          <NewsCarousel />

          <div className="news-browse-all-row">
            <Link href="/news" className="btn-meditro-blue">
              Browse All Guides &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}