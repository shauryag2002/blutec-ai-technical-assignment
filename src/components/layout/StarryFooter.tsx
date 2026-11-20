import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { FOOTER_EXPLORE_LINKS, CONTACT_DETAILS } from '../../data/navigation';
import { PoodleMascot } from '../mascot/PoodleMascot';

export const StarryFooter: React.FC = () => {
  return (
    <footer className="relative bg-[#23170F] text-cream-light pt-16 pb-12 overflow-hidden border-t border-cream/10">
      {/* Starry Night Sky Decor & Twinkling Gold Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-90">
        {/* Crescent Moon */}
        <div className="absolute top-8 right-16 sm:right-28 w-16 h-16 rounded-full shadow-[inset_-8px_8px_0_0_#F2BE6B] opacity-80" />

        {/* Twinkling Gold 4-Point Stars */}
        <div className="absolute top-12 left-16 text-honey text-xs animate-twinkle">✦</div>
        <div className="absolute top-28 left-1/4 text-honey text-base animate-twinkle" style={{ animationDelay: '0.8s' }}>✦</div>
        <div className="absolute top-8 left-1/2 text-honey text-sm animate-twinkle" style={{ animationDelay: '1.4s' }}>✦</div>
        <div className="absolute top-24 right-1/3 text-honey text-xs animate-twinkle" style={{ animationDelay: '0.4s' }}>✦</div>
        <div className="absolute bottom-24 right-20 text-honey text-sm animate-twinkle" style={{ animationDelay: '0.6s' }}>✦</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Heading & Walking Mascot with "coming?" bubble */}
          <div className="lg:col-span-5">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-cream-light tracking-tight">
              Home, at last.
            </h2>
            <p className="font-sans text-sm sm:text-base text-cream/70 mt-3 max-w-md leading-relaxed">
              Every teacup and teddy-bear puppy deserves a life filled with endless love, warm cuddles, and joyful adventures across the Emirates.
            </p>

            {/* Walking Poodle Mascot with "coming?" speech bubble */}
            <div className="mt-8 flex items-center">
              <PoodleMascot
                pose="side-walk"
                className="w-32 h-28"
                bubbleText="coming? 🐾"
              />
            </div>
          </div>

          {/* Center Column: Explore Links with Gold Bold Display Serif Heading */}
          <div className="lg:col-span-3 sm:col-span-6">
            <h3 className="font-display font-bold text-[#D8A24A] text-xl mb-4 tracking-wide">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-cream/80 hover:text-honey hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Say Hello with Gold Bold Display Serif Heading */}
          <div className="lg:col-span-4 sm:col-span-6">
            <h3 className="font-display font-bold text-[#D8A24A] text-xl mb-4 tracking-wide">
              Say hello
            </h3>
            <ul className="space-y-3 font-sans text-sm text-cream/85">
              <li>
                <a
                  href={CONTACT_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-honey transition-colors font-semibold"
                >
                  <MessageCircle className="w-4 h-4 text-emerald" />
                  <span>WhatsApp {CONTACT_DETAILS.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_DETAILS.email}`}
                  className="flex items-center gap-2 hover:text-honey transition-colors"
                >
                  <Mail className="w-4 h-4 text-honey" />
                  <span>{CONTACT_DETAILS.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-cream/75">
                <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <span>{CONTACT_DETAILS.address}</span>
              </li>
            </ul>

            {/* Social Pill Buttons */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {CONTACT_DETAILS.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full border border-cream/25 text-xs font-sans font-semibold text-cream hover:border-honey hover:text-honey transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Clean Bottom Bar: Brand Copyright & Gold Script Tagline */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-cream/30 bg-honey-soft/20 flex items-center justify-center">
              <span className="text-honey text-xs font-bold">TP</span>
            </div>
            <span className="font-sans text-xs text-cream/60">
              © 2026 TeddyPups U.A.E. All rights reserved.
            </span>
          </div>

          <div className="font-script text-lg sm:text-xl text-honey/90 font-bold tracking-wide">
            every puppy is family
          </div>
        </div>
      </div>
    </footer>
  );
};
