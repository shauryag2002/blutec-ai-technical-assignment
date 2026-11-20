import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin, Sparkles } from 'lucide-react';
import { FOOTER_EXPLORE_LINKS, CONTACT_DETAILS } from '../../data/navigation';
import { PoodleMascot } from '../mascot/PoodleMascot';

/**
 * StarryFooter Component
 * 
 * Deep espresso starry night footer:
 * - Headline "Home, at last." with twinkling stars and crescent moon
 * - Poodle mascot resting peacefully in a woven basket
 * - Explore links & Say hello contact channels
 * - Social pills: Instagram, TikTok, Facebook
 * - Bottom copyright with gold handwritten "every puppy is family" tagline
 */
export const StarryFooter: React.FC = () => {
  return (
    <footer className="relative bg-espresso text-cream-light pt-20 pb-12 overflow-hidden border-t-4 border-espresso">
      {/* Starry Night Sky Decor & Twinkling Gold Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-90">
        {/* Crescent Moon */}
        <div className="absolute top-10 right-16 sm:right-28 w-16 h-16 rounded-full shadow-[inset_-8px_8px_0_0_#F2BE6B] opacity-80" />

        {/* Twinkling Gold 4-Point Stars */}
        <div className="absolute top-12 left-16 text-honey text-xs animate-twinkle">✦</div>
        <div className="absolute top-28 left-1/4 text-honey text-base animate-twinkle" style={{ animationDelay: '0.8s' }}>✦</div>
        <div className="absolute top-8 left-1/2 text-honey text-sm animate-twinkle" style={{ animationDelay: '1.4s' }}>✦</div>
        <div className="absolute top-24 right-1/3 text-honey text-xs animate-twinkle" style={{ animationDelay: '0.4s' }}>✦</div>
        <div className="absolute top-16 right-48 text-honey text-lg animate-twinkle" style={{ animationDelay: '1.1s' }}>✦</div>
        <div className="absolute bottom-36 left-20 text-honey text-xs animate-twinkle" style={{ animationDelay: '1.7s' }}>✦</div>
        <div className="absolute bottom-24 right-20 text-honey text-sm animate-twinkle" style={{ animationDelay: '0.6s' }}>✦</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* Left Column: Heading & Poodle Resting in Basket */}
          <div className="lg:col-span-5">
            <span className="font-script text-honey text-xl sm:text-2xl font-bold flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-honey" />
              <span>TeddyPups Forever</span>
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-cream-light tracking-tight mt-2">
              Home, at last.
            </h2>
            <p className="font-sans text-sm sm:text-base text-cream/70 mt-3 max-w-md leading-relaxed">
              Every teacup and teddy-bear puppy deserves a life filled with endless love, warm cuddles, and joyful adventures across the Emirates.
            </p>

            {/* Poodle Mascot Sleeping in Woven Basket */}
            <div className="mt-8 flex items-center">
              <PoodleMascot pose="basket" className="w-48 h-36" bubbleText="sweet dreams 🧸" />
            </div>
          </div>

          {/* Center Column: Explore Links */}
          <div className="lg:col-span-3 sm:col-span-6">
            <h3 className="font-script text-honey text-2xl font-bold mb-4">
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

          {/* Right Column: Say Hello */}
          <div className="lg:col-span-4 sm:col-span-6">
            <h3 className="font-script text-honey text-2xl font-bold mb-4">
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
                  className="px-4 py-1.5 rounded-full border-2 border-cream/30 text-xs font-display font-bold text-cream hover:border-honey hover:text-honey transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Handwritten Tagline */}
        <div className="mt-16 pt-8 border-t border-cream/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-cream/30 bg-honey-soft/20 flex items-center justify-center">
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

