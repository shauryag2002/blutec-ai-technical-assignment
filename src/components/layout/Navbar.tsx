import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { NAV_LINKS, CONTACT_DETAILS } from '../../data/navigation';
import { ScallopedDivider } from '../ui/ScallopedDivider';

/**
 * Navbar Component
 * 
 * Upgrades:
 * - Sticky navigation (`sticky top-0 z-40`) across all pages
 * - Clean brand wordmark "TeddyPups" (removed "U.A.E." sub-label)
 * - Refined geometric sans-serif (Plus Jakarta Sans, weight 500-600) for links and CTAs
 * - Emerald green pill button with subtle bottom lip shadow
 * - Scalloped bottom hem edge along the entire width
 */
export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-40 bg-[#FDF6EC] border-b border-espresso-border/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand Logo & Clean "TeddyPups" Wordmark */}
          <NavLink to="/" className="flex items-center gap-3 group">
            {/* Mascot Emblem */}
            <div className="w-10 h-10 rounded-full border-[1.5px] border-espresso-border bg-honey-soft flex items-center justify-center shadow-lip-sm group-hover:scale-105 transition-transform overflow-hidden">
              <svg viewBox="0 0 64 64" className="w-6 h-6 text-espresso" fill="currentColor">
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z" />
                <circle cx="16" cy="30" r="5" />
                <circle cx="26" cy="18" r="5" />
                <circle cx="38" cy="18" r="5" />
                <circle cx="48" cy="30" r="5" />
              </svg>
            </div>
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
              className="inline-flex items-center gap-2 bg-emerald text-white px-5 py-2.5 rounded-full font-sans font-semibold text-sm border-[1.5px] border-espresso-border shadow-lip-md hover:bg-emerald-hover hover:shadow-lip-lg active:translate-y-[2px] active:shadow-lip-press transition-all"
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
              className="p-2 rounded-xl border-[1.5px] border-espresso-border bg-cream-light shadow-lip-sm text-espresso focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-light border-b border-espresso-border px-6 py-6 shadow-md animate-in slide-in-from-top-2 duration-200">
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
      )}

      {/* Subtle Scalloped Edge Band Along Bottom Edge of Sticky Navbar */}
      <div className="w-full pointer-events-none -mb-3 relative z-10">
        <ScallopedDivider fillColor="#FDF6EC" borderColor="#3A261B" className="h-3" />
      </div>
    </header>
  );
};
