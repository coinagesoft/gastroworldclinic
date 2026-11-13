import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CLINIC } from '@/lib/clinicInfo';

export const metadata: Metadata = {
  title: 'About Gastroworld Clinic | Dr. Manoj Kolhe, Gastroenterologist & Liver Specialist, Akurdi, Pimpri-Chinchwad, Pune',
  description:
    'About Gastroworld Clinic and Dr. Manoj Kolhe, Gastroenterologist, Hepatologist (Liver Specialist) and Therapeutic Endoscopist in Akurdi, Pimpri-Chinchwad, Pune.',
};

/**
 * Cropped 4:5 photos in /public/assets/about/ (800x1000 each).
 *  procedure : Dr. Kolhe doing an endoscopy with the team
 *  standing  : Dr. Kolhe standing, arms crossed
 *  anatomy   : body / liver illustration
 */
const IMG = {
  procedure: '/assets/about-procedure.jpg',
  standing: '/assets/about-doctor.jpg',
  anatomy: '/assets/about-story.jpg',
};

const ADDRESS = 'Ecorb Millenia Tower, Vivek Nagar, Akurdi, Pimpri-Chinchwad, Pune';

const STRENGTHS = [
  'Specialised care',
  'Experienced team',
  'Advanced facilities',
  'Comprehensive services',
  'Patient-centric approach',
  'Follow-up care',
];

// Each card links to its own service page (see lib/servicesData.ts for the slugs)
const SERVICES = [
  {
    title: 'Consultation',
    text: 'Digestive, liver, gallbladder, pancreas and GI cancer consultations.',
    href: '/services/consultation',
  },
  {
    title: 'Endoscopic Procedures',
    text: 'Upper GI endoscopy, colonoscopy, ERCP and endo ultrasound.',
    href: '/services/endoscopic-procedures',
  },
  {
    title: 'Day Care GI Procedures',
    text: 'Ascitic tapping, albumin infusion, vaccination, Fibroscan and more.',
    href: '/services/day-care-gi-procedures',
  },
  {
    title: 'Nutritional Counselling',
    text: 'Diet plans for liver, pancreatic and common gastro illnesses.',
    href: '/services/nutritional-counselling',
  },
];

const Check = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="8 12.5 11 15.5 16 9.5" />
  </svg>
);

export default function AboutPage() {
  return (
    <>
      <style>{`
        .gw-ab-split { display: grid; grid-template-columns: 5fr 7fr; gap: 56px; align-items: center; }
        .gw-ab-split.is-reverse { grid-template-columns: 7fr 5fr; }
        .gw-ab-photo {
          position: relative;
          width: 100%;
          max-width: 440px;
          justify-self: start;
          aspect-ratio: 4 / 5;
          border-radius: 28px;
          overflow: hidden;
          background: #f3f2ff;
          box-shadow: 0 18px 40px rgba(40, 40, 120, 0.14);
        }
        .gw-ab-photo img { object-fit: cover; }
        .gw-ab-split.is-reverse .gw-ab-photo { justify-self: end; }
        .gw-ab-copy h2 { margin: 12px 0 10px; }
        .gw-ab-copy p { margin: 0 0 14px; line-height: 1.75; }
        .gw-ab-checks { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px 24px; margin-top: 22px; }
        .gw-ab-check { display: flex; align-items: center; gap: 10px; font-weight: 600; color: #1f1a6e; }
        .gw-ab-check svg { color: #f47c3c; flex: 0 0 auto; }
        .gw-ab-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 26px; }
        .gw-ab-mv { display: grid; gap: 18px; margin-top: 26px; }
        .gw-ab-mv-item { display: flex; gap: 14px; align-items: flex-start; }
        .gw-ab-mv-item svg { color: #f47c3c; flex: 0 0 auto; margin-top: 2px; }
        .gw-ab-mv-item h4 { margin: 0 0 4px; color: #1f1a6e; font-size: 19px; }
        .gw-ab-mv-item p { margin: 0; }
        .gw-ab-tint { background: #f3f2ff; }
        .gw-ab-services { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; }
        .gw-ab-service {
          background: #fff;
          border: 1px solid #e4e6f6;
          border-radius: 22px;
          padding: 24px;
        }
        .gw-ab-service h4 { margin: 0 0 8px; color: #1f1a6e; font-size: 18px; }
        .gw-ab-service p { margin: 0 0 14px; font-size: 15px; line-height: 1.6; color: #4b4f73; }
        .gw-ab-service a { color: #4749bd; font-weight: 700; }
        .gw-ab-visit {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 28px;
          align-items: center;
          background: #4749bd;
          color: #fff;
          border-radius: 28px;
          padding: 40px 44px;
        }
        .gw-ab-visit h3 { margin: 0 0 14px; color: #fff; font-size: 26px; }
        .gw-ab-visit p { margin: 0 0 6px; color: rgba(255, 255, 255, 0.9); }
        .gw-ab-visit a.gw-ab-tel { color: #fff; font-weight: 700; }
        @media (max-width: 991px) {
          .gw-ab-split, .gw-ab-split.is-reverse { grid-template-columns: 1fr; gap: 32px; }
          .gw-ab-photo, .gw-ab-split.is-reverse .gw-ab-photo { max-width: 420px; justify-self: center; }
          .gw-ab-services { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .gw-ab-visit { grid-template-columns: 1fr; padding: 32px 26px; }
        }
        @media (max-width: 560px) {
          .gw-ab-checks, .gw-ab-services { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Page Banner */}
      <section className="meditro-page-banner">
        <span className="deco-shape deco-hero-circle" aria-hidden="true"></span>
        <span className="deco-shape deco-hero-plus" aria-hidden="true">+</span>
        <div className="container meditro-banner-inner">
          <span className="meditro-badge-orange">{CLINIC.tagline}</span>
          <h1>About {CLINIC.name}</h1>
          <p className="banner-subtext">
            {CLINIC.doctor.name} &bull; {CLINIC.doctor.title} &bull; {CLINIC.address.area}
          </p>

          <div className="meditro-breadcrumb">
            <Link href="/">
              <span>Home</span>
            </Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">About</span>
          </div>
        </div>

        <div className="hero-wave-bottom" aria-hidden="true">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 40C240 100 480 0 720 50C960 100 1200 15 1440 60V100H0V40Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* 1. Doctor profile */}
      <section className="meditro-section">
        <div className="container gw-ab-split">
          <div className="gw-ab-photo">
            <Image
              src={IMG.standing}
              alt={`${CLINIC.doctor.name}, ${CLINIC.doctor.title}`}
              fill
              sizes="(max-width: 991px) 100vw, 40vw"
              priority
              unoptimized
            />
          </div>

          <div className="gw-ab-copy">
            <span className="meditro-badge-orange">Our Specialist</span>
            <h2>{CLINIC.doctor.name}</h2>
            <p className="credential-pill">{CLINIC.doctor.title}</p>
            <p>
              {CLINIC.doctor.name} is a Gastroenterologist, Hepatologist (Liver Specialist) and Therapeutic Endoscopist serving patients in Nigdi, Ravet, Chikhali, Pimpri-Chinchwad and Pune.
            </p>
            <p>
              His expertise includes ERCP, CBD and pancreatic duct stenting, and enteral stenting for oesophageal, duodenal and colonic narrowing or malignancy. He also has deep experience with oesophageal and anorectal manometry and biofeedback therapy.
            </p>

            <div className="gw-ab-actions">
              <Link href="/appointment" className="btn-meditro-orange">
                Book Appointment
              </Link>
              <a href={`tel:${CLINIC.phone.tel}`} className="btn-meditro-outline">
                Call {CLINIC.phone.display}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About the clinic */}
      <section className="meditro-section gw-ab-tint">
        <div className="container gw-ab-split is-reverse">
          <div className="gw-ab-copy">
            <span className="meditro-badge-orange">About the Clinic</span>
            <h2>Digestive &amp; Liver Care Under One Roof</h2>
            <p>
              {CLINIC.name} provides diagnosis and treatment for diseases of the digestive system and liver. Patients get consultations, advanced endoscopic procedures, day care GI procedures and nutritional counselling in one place, with treatment plans made around their condition and lifestyle.
            </p>
            <p>
              {CLINIC.doctor.name} stays up to date with the latest advances in gastroenterology, so patients with a wide range of digestive problems get careful, modern care.
            </p>

            <div className="gw-ab-checks">
              {STRENGTHS.map((s) => (
                <div className="gw-ab-check" key={s}>
                  <Check />
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className="gw-ab-photo">
            <Image
              src={IMG.procedure}
              alt={`${CLINIC.doctor.name} performing an endoscopy with the clinic team`}
              fill
              sizes="(max-width: 991px) 100vw, 40vw"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* 3. Our story, mission and vision */}
      <section className="meditro-section">
        <div className="container gw-ab-split">
          <div className="gw-ab-photo">
            <Image
              src={IMG.anatomy}
              alt="Illustration of the liver and digestive system"
              fill
              sizes="(max-width: 991px) 100vw, 40vw"
              unoptimized
            />
          </div>

          <div className="gw-ab-copy">
            <span className="meditro-badge-orange">Our Story</span>
            <h2>Early Diagnosis Makes Treatment Easier</h2>
            <p>
              {CLINIC.doctor.name} stresses early diagnosis and treatment of GI disorders. When the underlying cause is found promptly, patients can get the right treatment and complications can be prevented. Diagnosis uses endoscopy, colonoscopy and other tests suited to each patient.
            </p>

            <div className="gw-ab-mv">
              <div className="gw-ab-mv-item">
                <Check />
                <div>
                  <h4>Our Mission</h4>
                  <p>To deliver comprehensive and personalised gastroenterology and hepatology services to individuals of all ages.</p>
                </div>
              </div>
              <div className="gw-ab-mv-item">
                <Check />
                <div>
                  <h4>Our Vision</h4>
                  <p>To lead the way in gastrointestinal care, setting the standard for excellence in Gastroenterology, Hepatology and Therapeutic Endoscopy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services */}
      <section className="meditro-section gw-ab-tint">
        <div className="container">
          <div className="meditro-section-header">
            <span className="meditro-badge-orange">Our Services</span>
            <h2>How We Can Help</h2>
          </div>

          <div className="gw-ab-services">
            {SERVICES.map((s) => (
              <article className="gw-ab-service" key={s.title}>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
                <Link href={s.href}>Learn more &rarr;</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Visit */}
      <section className="meditro-section">
        <div className="container">
          <div className="gw-ab-visit">
            <div>
              <h3>Visit {CLINIC.name}</h3>
              <p>{ADDRESS}</p>
              <p>
                Phone: <a className="gw-ab-tel" href={`tel:${CLINIC.phone.tel}`}>{CLINIC.phone.display}</a>
              </p>
            </div>
            <Link href="/appointment" className="btn-meditro-orange">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}