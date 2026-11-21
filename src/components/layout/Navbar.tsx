import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { NAV_LINKS, CONTACT_DETAILS } from '../../data/navigation';

/**
 * Navbar Component
 * 
 * Replicates reference site behavior:
 * - Initially at scroll 0, header background is transparent and clouds are hidden.
 * - On scroll (scrollY > 20), milk background and cloud hem smoothly fade in.
 * - When scrolling down past hero text (scrollY > 220), header collapses upward (-120%).
 * - When scrolling up, header smoothly slides back down.
 */
export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;

          // Clouds and background fade in after scrolling > 20px
          setScrolled(currentY > 20);

          // Header collapses upward when scrolling down past ~220px (after hero text)
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
      data-scrolled={scrolled ? 'true' : 'false'}
      data-hidden={hidden ? 'true' : 'false'}
      className={`fixed top-0 inset-x-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.3,1,0.4,1)] select-none ${hidden ? '-translate-y-[120%]' : 'translate-y-0'
        }`}
    >
      {/* Background fill that fades in when scrolled */}
      <div
        className={`absolute inset-0 bg-white border-b border-espresso-border/10 transition-opacity duration-350 pointer-events-none ${scrolled ? 'opacity-100' : 'opacity-0'
          }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 relative z-10">
        <div className="flex items-center justify-between h-20">

          {/* Brand Logo & Clean "TeddyPups" Wordmark */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <img
              src="/brand/logo.png"
              alt="TeddyPups U.A.E."
              className="w-12 h-12 object-contain transition-transform duration-500 group-hover:rotate-[-8deg]"
            />
            <span className="font-display font-black text-2xl text-espresso tracking-tight">
              TeddyPups
            </span>
          </NavLink>

          {/* Desktop Center Links in Clean Sans-Serif */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `relative flex flex-col items-center py-2 text-sm font-sans font-semibold transition-colors ${isActive ? 'text-terracotta' : 'text-espresso-soft hover:text-terracotta'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1.5 text-terracotta w-3.5 h-3.5">
                        <svg viewBox="0 0 64 64" fill="currentColor">
                          <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z" />
                        </svg>
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Emerald WhatsApp Pill CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={CONTACT_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-5 py-2.5 text-sm gap-2"
            >
              <span>WhatsApp us</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full border-2 border-cocoa bg-milk px-4 text-[0.95rem] font-semibold lg:hidden shadow-sm text-cocoa"
              aria-haspopup="dialog"
            >
              <svg viewBox="0 0 64 64" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Mobile Menu Dialog matching reference site */}
      {mobileMenuOpen && (
        <dialog
          open
          aria-label="Site menu"
          className="tp-menu fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-honey p-0 text-cocoa z-50 flex flex-col outline-none"
        >
          <div className="flex h-full flex-col gutter pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5 px-6">
            <div className="flex items-center justify-between">
              <span className="font-scrawl text-lg text-cocoa">where to, friend?</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="h-11 rounded-full bg-cocoa px-5 font-semibold text-milk hover:bg-cocoa/90 transition-colors"
              >
                Close
              </button>
            </div>
            <nav className="my-auto">
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="tp-menu-link font-plush block py-2 text-[clamp(2.4rem,11vw,3.4rem)] text-cocoa hover:text-terracotta transition-colors leading-tight"
                    >
                      <span>{link.label}</span>
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
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-whatsapp w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-base shadow-sm"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp us</span>
              </a>
              <p className="text-center text-sm font-medium text-cocoa/80">{CONTACT_DETAILS.whatsappDisplay || '+971 50 000 0000'}</p>
            </div>
          </div>
        </dialog>
      )}

      {/* Cloud Scalloped Hem Edge that fades in when scrolled */}
      <svg
        aria-hidden="true"
        className={`tp-header__hem absolute top-[calc(100%-1px)] left-0 w-full h-3.5 transition-opacity duration-350 pointer-events-none ${scrolled ? 'opacity-100' : 'opacity-0'
          }`}
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
    </header >
  );
};
