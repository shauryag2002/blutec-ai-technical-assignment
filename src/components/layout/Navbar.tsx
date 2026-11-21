import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border-[1.5px] border-espresso-border bg-white shadow-lip-sm text-espresso focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div >

      {/* Mobile Drawer */}
      {
        mobileMenuOpen && (
          <div className="lg:hidden bg-cream-light border-b border-espresso-border px-6 py-6 shadow-md animate-in slide-in-from-top-2 duration-200 relative z-20">
            <nav className="flex flex-col gap-3 font-sans">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-2.5 px-4 rounded-xl border-[1.5px] border-espresso-border font-semibold text-sm transition-all ${isActive
                      ? 'bg-terracotta text-cream-light shadow-lip-sm'
                      : 'bg-cream text-espresso hover:bg-honey-soft'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <span className="text-xs">→</span>
                </NavLink>
              ))}

              <a
                href={CONTACT_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 bg-emerald text-white py-3 px-4 rounded-xl border-[1.5px] border-espresso-border shadow-lip-md font-semibold text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp us</span>
              </a>
            </nav>
          </div>
        )
      }

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
