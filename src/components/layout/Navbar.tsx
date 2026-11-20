import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { NAV_LINKS, CONTACT_DETAILS } from '../../data/navigation';
import { ScallopedDivider } from '../ui/ScallopedDivider';

/**
 * Navbar Component
 * 
 * Features:
 * - Brand emblem + bold serif wordmark
 * - Center desktop navigation with active terracotta highlighting and small paw indicator underneath
 * - Emerald green WhatsApp pill CTA with hard offset shadow
 * - Mobile hamburger drawer with full-width links
 * - Natural scroll on homepage, scalloped bottom hem on subpages
 */
export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={`relative w-full z-40 bg-cream ${isHome ? '' : 'border-b-2 border-espresso'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">

          {/* Brand Logo & Wordmark */}
          <NavLink to="/" className="flex items-center gap-3 group select-none">
            {/* Circular Mascot Emblem */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-espresso bg-honey-soft flex items-center justify-center shadow-hard-sm group-hover:scale-105 transition-transform overflow-hidden">
              <svg viewBox="0 0 64 64" className="w-8 h-8 text-espresso" fill="currentColor">
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z" />
                <circle cx="16" cy="30" r="5" />
                <circle cx="26" cy="18" r="5" />
                <circle cx="38" cy="18" r="5" />
                <circle cx="48" cy="30" r="5" />
              </svg>
            </div>
            <div>
              <span className="font-display font-black text-xl sm:text-2xl text-espresso tracking-tight">
                TeddyPups
              </span>
              <span className="block font-sans text-[10px] tracking-widest uppercase text-terracotta font-extrabold -mt-1">
                U.A.E.
              </span>
            </div>
          </NavLink>

          {/* Desktop Center Links with Active Paw Indicator */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `relative flex flex-col items-center py-2 text-sm font-display font-bold transition-colors select-none ${isActive ? 'text-terracotta' : 'text-espresso hover:text-terracotta'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-2 text-terracotta w-4 h-4">
                        <svg viewBox="0 0 64 64" fill="currentColor">
                          <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
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
              className="inline-flex items-center gap-2 bg-emerald text-white px-5 py-2.5 rounded-full font-display font-bold text-sm border-2 border-espresso shadow-hard-sm hover:shadow-hard-md hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-hard-press transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp us</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border-2 border-espresso bg-cream-light shadow-hard-sm text-espresso focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-light border-b-2 border-espresso shadow-hard-lg px-6 py-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between py-2.5 px-4 rounded-xl border-2 border-espresso font-display font-bold text-base transition-all ${isActive
                    ? 'bg-terracotta text-cream-light shadow-hard-sm'
                    : 'bg-cream text-espresso hover:bg-honey-soft'
                  }`
                }
              >
                <span>{link.label}</span>
                <span className="text-sm">→</span>
              </NavLink>
            ))}

            <a
              href={CONTACT_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 bg-emerald text-white py-3 px-4 rounded-xl border-2 border-espresso shadow-hard-md font-display font-bold text-base"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp us (+971 50 000 0000)</span>
            </a>
          </nav>
        </div>
      )}

      {/* Scalloped Edge Band on Subpages */}
      {!isHome && (
        <div className="absolute -bottom-4 left-0 w-full z-10 pointer-events-none">
          <ScallopedDivider fillColor="#FDF6EC" borderColor="#2A1A14" className="h-4" />
        </div>
      )}
    </header>
  );
};

