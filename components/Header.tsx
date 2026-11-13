'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CLINIC } from '@/lib/clinicInfo';
import { SERVICES } from '@/lib/servicesData';
import './header-dropdown.css';

const Chevron = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); // mobile accordion
  const [openSub, setOpenSub] = useState<string | null>(null); // mobile accordion
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setOpenSub(null);
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <Link href="/" className="brand-meditro" onClick={closeMenu}>
          <Image
            src={CLINIC.logo}
            alt={CLINIC.name}
            width={220}
            height={56}
            priority
            unoptimized
            style={{
              height: 'clamp(36px, 4.5vw, 52px)',
              width: 'auto',
              maxWidth: '65vw',
              objectFit: 'contain',
            }}
          />
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="main-nav"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav
          id="main-nav"
          className={`main-nav ${isMenuOpen ? 'open' : ''}`}
          aria-label="Main"
        >
          <ul>
            <li>
              <Link
                href="/"
                className={pathname === '/' ? 'active' : ''}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={pathname === '/about' ? 'active' : ''}
                onClick={closeMenu}
              >
                About Us
              </Link>
            </li>

            {/* ===== Services dropdown (4 pages, sub-items are sections on those pages) ===== */}
            <li className={`has-dropdown ${isServicesOpen ? 'open' : ''}`}>
              <div className="nav-parent-row">
                <Link
                  href="/services"
                  className={pathname?.startsWith('/services') ? 'active' : ''}
                  onClick={closeMenu}
                >
                  Services
                </Link>
                <button
                  type="button"
                  className="dropdown-toggle"
                  aria-label="Toggle services menu"
                  aria-expanded={isServicesOpen}
                  onClick={() => setIsServicesOpen((prev) => !prev)}
                >
                  <Chevron />
                </button>
              </div>

              <ul className="dropdown-menu">
                {SERVICES.map((service) => (
                  <li
                    key={service.slug}
                    className={`has-flyout ${openSub === service.slug ? 'open' : ''}`}
                  >
                    <div className="nav-parent-row">
                      <Link
                        href={`/services/${service.slug}`}
                        className={pathname === `/services/${service.slug}` ? 'active' : ''}
                        onClick={closeMenu}
                      >
                        {service.title}
                      </Link>
                      <button
                        type="button"
                        className="dropdown-toggle"
                        aria-label={`Toggle ${service.title} menu`}
                        aria-expanded={openSub === service.slug}
                        onClick={() =>
                          setOpenSub((prev) => (prev === service.slug ? null : service.slug))
                        }
                      >
                        <Chevron />
                      </button>
                    </div>

                    <ul className="flyout-menu">
                      {service.sections.map((sec) => (
                        <li key={sec.id}>
                          <Link href={`/services/${service.slug}#${sec.id}`} onClick={closeMenu}>
                            {sec.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
            {/* ===== end Services dropdown ===== */}

            <li>
              <Link
                href="/news"
                className={pathname?.startsWith('/news') ? 'active' : ''}
                onClick={closeMenu}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href="/appointment"
                className={pathname === '/appointment' ? 'active' : ''}
                onClick={closeMenu}
              >
                Booking
              </Link>
            </li>
            {/* <li>
              <Link
                href="/admin"
                className={pathname?.startsWith('/admin') ? 'active' : ''}
                onClick={closeMenu}
              >
                Admin Panel
              </Link>
            </li> */}
          </ul>

          <div className="header-actions-group">
            <a href={`tel:${CLINIC.phone.tel}`} className="header-phone-item">
              <span className="header-phone-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span className="header-phone-number">{CLINIC.phone.display}</span>
            </a>

            <Link
              href="/appointment"
              className="btn-meditro-nav"
              onClick={closeMenu}
            >
              <span>Book Visit</span>
              <span className="btn-arrow-box" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}