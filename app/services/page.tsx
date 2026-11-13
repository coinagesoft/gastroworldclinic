import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/lib/servicesData';
import { CLINIC } from '@/lib/clinicInfo';
import '@/components/services-index.css';

export const metadata: Metadata = {
  title: `Services | ${CLINIC.name}`,
  description: 'Our consultation, endoscopy, day care and nutrition services.',
};

const iconProps = {
  width: 30,
  height: 30,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

/** Icon for each service, keyed by its slug in servicesData. */
const ICONS: Record<string, ReactNode> = {
  consultation: (
    <svg {...iconProps}>
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  ),
  'endoscopic-procedures': (
    <svg {...iconProps}>
      <path d="M10.5 20.5 10 22l-4-2.5L2 17l1.5-.5" />
      <path d="m14 6 4 4" />
      <path d="M19 5 9 15l-4 1 1-4L16 2z" />
    </svg>
  ),
  'day-care-gi-procedures': (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <line x1="12" y1="9" x2="12" y2="15" />
      <line x1="9" y1="12" x2="15" y2="12" />
    </svg>
  ),
  'nutritional-counselling': (
    <svg {...iconProps}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  ),
};

const FALLBACK_ICON = (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <polyline points="8 12.5 11 15.5 16 9.5" />
  </svg>
);

export default function ServicesPage() {
  return (
    <main className="sv-page">
      {/* Hero */}
      <section className="sv-hero">
        <div className="container">
          <p className="sv-crumbs">
            <Link href="/">Home</Link> <span aria-hidden="true">&rsaquo;</span> <span>Services</span>
          </p>
          <h1>Our Services</h1>
          <p className="sv-hero-lead">
            Consultations, endoscopic procedures, day care GI procedures and nutritional counselling with {CLINIC.doctor.name} in {CLINIC.address.area}.
          </p>
          <div className="sv-hero-actions">
            <Link href="/appointment" className="sv-btn sv-btn-orange">
              Book Appointment
            </Link>
            <a href={`tel:${CLINIC.phone.tel}`} className="sv-btn sv-btn-outline">
              Call {CLINIC.phone.display}
            </a>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <div className="container sv-grid">
        {SERVICES.map((s) => (
          <article key={s.slug} className="sv-card">
            <div className="sv-icon">{ICONS[s.slug] ?? FALLBACK_ICON}</div>
            <h2>{s.title}</h2>
            <p className="sv-tagline">{s.tagline}</p>

            <ul className="sv-list">
              {s.sections.map((sec) => (
                <li key={sec.id}>
                  <Link href={`/services/${s.slug}#${sec.id}`}>
                    <span>{sec.title}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>

            <Link href={`/services/${s.slug}`} className="sv-btn sv-btn-outline">
              View details
            </Link>
          </article>
        ))}
      </div>

      {/* Bottom call-to-action */}
      <section className="sv-cta">
        <div className="container sv-cta-inner">
          <div>
            <h2>Not sure which service you need?</h2>
            <p>
              Book a consultation and {CLINIC.doctor.name} will review your symptoms and reports and suggest the right next step.
            </p>
          </div>
          <div className="sv-cta-actions">
            <Link href="/appointment" className="sv-btn sv-btn-orange">
              Book Appointment
            </Link>
            <a href={`tel:${CLINIC.phone.tel}`} className="sv-btn sv-btn-light">
              Call {CLINIC.phone.display}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}