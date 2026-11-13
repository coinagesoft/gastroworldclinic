import Link from 'next/link';
import Image from 'next/image';
import { SERVICES, type Service } from '@/lib/servicesData';
import { CLINIC } from '@/lib/clinicInfo';
import '@/components/service-page.css';

// Same look as the "Book Visit" button in the header: label + white arrow box
function BookButton({ light = false }: { light?: boolean }) {
  return (
    <Link href="/appointment" className={`svc-btn ${light ? 'svc-btn-light' : ''}`}>
      <span>Book Visit</span>
      <span className="svc-btn-arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </span>
    </Link>
  );
}

export default function ServicePage({ service }: { service: Service }) {
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <main className="svc-page">
      {/* ---------- HERO ---------- */}
      <section className="svc-hero">
        <div className="container">
          <p className="svc-crumbs">
            <Link href="/">Home</Link> <span>›</span> <Link href="/services">Services</Link>{' '}
            <span>›</span> <strong>{service.title}</strong>
          </p>
          <h1>{service.title}</h1>
          <p className="svc-hero-tag">{service.tagline}</p>
        </div>
      </section>

      {/* ---------- INTRO ---------- */}
      <section className="container svc-intro">
        {service.introImage && (
          <Image
            className="svc-img svc-intro-img"
            src={service.introImage}
            alt={service.introImageAlt ?? service.title}
            width={800}
            height={1000}
            sizes="(max-width: 900px) 100vw, 380px"
            priority
          />
        )}
        <div className="svc-intro-body">
          <span className="svc-kicker">What is {service.title}?</span>
          {service.introHeading && <h2>{service.introHeading}</h2>}
          <p>{service.intro}</p>
          {service.introChecklist && (
            <ul className="svc-checklist">
              {service.introChecklist.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          )}
          <div className="svc-intro-actions">
            <BookButton />
            <a href={`tel:${CLINIC.phone.tel}`} className="svc-phone">
              {CLINIC.phone.display}
            </a>
          </div>
        </div>
      </section>

      {/* ---------- SECTION MENU ---------- */}
      <nav className="svc-tabs" aria-label={`${service.title} sections`}>
        <div className="container">
          <ul>
            {service.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ---------- SECTIONS ---------- */}
      {service.sections.map((s, i) => {
        const reverse = i % 2 === 1;
        const isPortrait = !!s.image && (s.imageHeight ?? 625) > (s.imageWidth ?? 1000);
        return (
          <section key={s.id} id={s.id} className={`svc-band ${reverse ? 'is-alt' : ''}`}>
            <div className="container">
              <div className={`svc-row ${reverse ? 'is-reverse' : ''} ${isPortrait ? 'has-portrait' : ''}`}>
                <div className="svc-media">
                  {s.image ? (
                    <Image
                      className={`svc-img ${isPortrait ? 'is-portrait' : ''}`}
                      src={s.image}
                      alt={s.imageAlt ?? s.title}
                      width={s.imageWidth ?? 1000}
                      height={s.imageHeight ?? 625}
                      sizes="(max-width: 900px) 100vw, 560px"
                    />
                  ) : (
                    <div className="svc-img svc-img-placeholder" aria-hidden="true">
                      Image placeholder
                    </div>
                  )}
                </div>

                <div className="svc-text">
                  <h2>{s.title}</h2>
                  <p>{s.summary}</p>

                  {!s.groups && s.points.length > 0 && (
                    <ul className="svc-checklist">
                      {s.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}

                  {/* Extra content beside the portrait image */}
                  {s.highlights && s.highlights.length > 0 && (
                    <>
                      <h3 className="svc-sub">Key points</h3>
                      <ul className="svc-checklist">
                        {s.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    </>
                  )}


                  {(s.highlights || s.facts) && (
                    <div className="svc-text-actions">
                      <BookButton />
                    </div>
                  )}
                </div>
              </div>

              {/* Quick facts strip, full width under the image + text */}
              {s.facts && s.facts.length > 0 && (
                <>
                  <div className="svc-facts">
                    {s.facts.map((f) => (
                      <div key={f.label} className="svc-fact">
                        <span className="svc-fact-label">{f.label}</span>
                        <span className="svc-fact-value">{f.value}</span>
                      </div>
                    ))}
                  </div>
                  {s.facts.some((f) => f.label === 'Duration') && (
                    <p className="svc-facts-note">
                      Timings are approximate and vary from patient to patient.
                    </p>
                  )}
                </>
              )}

              {/* Cards stay below the row, full width */}
              {s.groups && (
                <div className="svc-groups">
                  {s.groups.map((g) => (
                    <div key={g.heading} className="svc-group">
                      <h3>{g.heading}</h3>
                      <ul>
                        {g.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* ---------- CTA ---------- */}
      <section className="container svc-cta-wrap">
        <div className="svc-cta-box">
          <div>
            <h2>Have a digestive or liver concern?</h2>
            <p>Book a consultation with our specialists for a clear diagnosis and treatment plan.</p>
          </div>
          <BookButton light />
        </div>
      </section>

      {/* ---------- OTHER SERVICES ---------- */}
      <section className="container svc-others">
        <h2>Our other services</h2>
        <div className="svc-others-grid">
          {others.map((o) => (
            <Link key={o.slug} href={`/services/${o.slug}`} className="svc-mini">
              <h3>{o.title}</h3>
              <p>{o.tagline}</p>
              <span>View details ›</span>
            </Link>
          ))}
        </div>
        <p className="svc-note">
          This information is for general awareness and is not a substitute for medical advice.
          Please consult your doctor for diagnosis and treatment.
        </p>
      </section>
    </main>
  );
}