import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS, CONTACT_DETAILS } from '../../data/navigation';

/**
 * Navbar Component
 * 
 * Exact replication of https://puppy.instabizweb.com/ header system:
 * - Scalloped hem with #tp-hem pattern.
 * - Route-aware: on home page (data-home="true"), background is transparent at scroll 0
 *   and transitions in when scrolled (data-scrolled="true").
 * - On non-home pages (:not([data-home])), background and scalloped hem are always opaque.
 * - Nav links include .tp-nav-link__paw indicator on hover & active state.
 * - Mobile menu uses native <dialog> with circular wipe transitions (tp-menu-in / tp-menu-out).
 */
export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleOpenMenu = () => {
    setIsClosing(false);
    setMobileMenuOpen(true);
  };

  const handleCloseMenu = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 420);
  };

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;

          // Clouds/background fade in when scrolled past 20px
          setScrolled(currentY > 20);

          // Collapse upward when scrolling down past 220px
          if (Math.abs(currentY - lastY) > 6) {
            if (currentY > lastY && currentY > 220) {
              setHidden(true);
            } else if (currentY < lastY) {
              setHidden(false);
            }
            lastY = currentY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="site-header"
      data-scrolled={scrolled ? 'true' : 'false'}
      data-hidden={hidden ? 'true' : 'false'}
      data-home={isHome ? 'true' : undefined}
      className="tp-header fixed inset-x-0 top-0 z-50 select-none"
    >
      <div className="tp-header__bar gutter">
        {/* Brand Logo & Clean "TeddyPups" Wordmark */}
        <NavLink
          to="/"
          className="tp-header__brand"
          aria-label="TeddyPups U.A.E. — home"
        >
          <img
            src="/brand/logo.png"
            alt="TeddyPups U.A.E."
            width={56}
            height={56}
            decoding="async"
            className="tp-header__logo"
          />
          <span className="font-plush tp-header__name">TeddyPups</span>
        </NavLink>

        {/* Desktop Nav Links */}
        <nav aria-label="Main" className="tp-header__nav">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className="tp-nav-link"
                  data-active={location.pathname === link.href ? 'true' : 'false'}
                  aria-current={location.pathname === link.href ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  <svg viewBox="0 0 64 64" className="tp-nav-link__paw" aria-hidden="true" fill="currentColor">
                    <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                  </svg>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header End: WhatsApp button + Mobile Menu Toggle */}
        <div className="tp-header__end">
          <a
            href={CONTACT_DETAILS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp tp-header__wa"
          >
            WhatsApp us
          </a>

          <button
            type="button"
            onClick={handleOpenMenu}
            className="inline-flex h-10 items-center gap-2 rounded-full border-2 border-cocoa bg-milk px-4 text-[0.95rem] font-semibold lg:hidden"
            aria-haspopup="dialog"
            aria-expanded={mobileMenuOpen}
          >
            <svg viewBox="0 0 64 64" className="size-4" aria-hidden="true" fill="currentColor">
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
            </svg>
            Menu
          </button>

          {/* Full Screen Dialog Mobile Menu with Circular Wipe */}
          <dialog
            open={mobileMenuOpen}
            data-closing={isClosing ? 'true' : undefined}
            aria-label="Site menu"
            className="top-0 z-10 tp-menu m-0 h-dvh max-h-none w-screen max-w-none bg-honey p-0 text-cocoa backdrop:bg-cocoa/40"
          >
            <div className="flex h-full flex-col gutter pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5">
              <div className="flex items-center justify-between">
                <span className="font-scrawl text-lg">where to, friend?</span>
                <button
                  type="button"
                  onClick={handleCloseMenu}
                  className="h-11 rounded-full bg-cocoa px-5 font-semibold text-milk"
                >
                  Close
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-10 flex-1">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <NavLink
                        to={link.href}
                        onClick={handleCloseMenu}
                        data-active={location.pathname === link.href ? 'true' : 'false'}
                        aria-current={location.pathname === link.href ? 'page' : undefined}
                        className="tp-menu-link font-plush block py-2 text-[clamp(2.4rem,11vw,3.4rem)]"
                      >
                        <span>{link.label}</span>
                        <svg viewBox="0 0 64 64" className="tp-nav-link__paw" aria-hidden="true" fill="currentColor">
                          <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                        </svg>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="space-y-3">
                <a
                  href={CONTACT_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp w-full  px-7 py-3 text-base font-semibold shrink-0"
                >
                  WhatsApp us
                </a>
                <p className="text-center text-sm font-medium">+971 50 000 0000</p>
              </div>
            </div>
          </dialog>
        </div>
      </div>

      {/* Scalloped Hem SVG Pattern */}
      <svg
        aria-hidden="true"
        className="tp-header__hem"
        width="100%"
        height="14"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="tp-hem" width="44" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 0H44V2A22 11 0 0 1 0 2Z" className="tp-header__hem-fill" />
            <path d="M0 2A22 11 0 0 0 44 2" className="tp-header__hem-line" />
          </pattern>
        </defs>
        <rect width="100%" height="14" fill="url(#tp-hem)" />
      </svg>
    </header>
  );
};
