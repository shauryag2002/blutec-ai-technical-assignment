import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PoodleMascot } from './PoodleMascot';

/**
 * MobileStickyPup Component
 * 
 * Replicates the authentic mobile lane puppy from https://puppy.instabizweb.com/:
 * - Sits on the top border of the mobile sticky bottom bar (WhatsApp & Call).
 * - Sits on the left side above the green WhatsApp button with front paws resting on the rim.
 * - Hides when in the Hero quilt blanket at scroll 0 on homepage.
 * - Hides smoothly when reaching the StarryFooter basket at the bottom of the page.
 * - Tappable/interactive with cute speech bubble responses ("woof! 🐾", "I like you! ❤️", etc.).
 * - Strictly hidden on tablet and desktop (md:hidden) so desktop behaviour is 100% unaffected.
 */
export const MobileStickyPup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [bubbleText, setBubbleText] = useState<string | undefined>(undefined);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handlePupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const quotes = ['woof! 🐾', 'coming? 🐶', 'I like you! ❤️', 'yip! ✨', 'achoo! 🐕'];
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    setBubbleText(q);
    setTimeout(() => setBubbleText(undefined), 2200);
  };

  useEffect(() => {
    const checkVisibility = () => {
      // Strictly mobile only (< 768px)
      if (window.innerWidth >= 768) {
        setVisible(false);
        return;
      }

      const scrollY = window.scrollY;

      // On homepage: hide when at the hero blanket (scrollY <= 80px)
      if (isHome && scrollY <= 80) {
        setVisible(false);
        return;
      }

      // Hide when scrolled near the footer basket (so it docks naturally into the basket)
      const footerBasket = document.querySelector('.tp-basket');
      if (footerBasket) {
        const rect = footerBasket.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 30) {
          setVisible(false);
          return;
        }
      }

      setVisible(true);
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [isHome, location.pathname]);

  return (
    <div
      className={`absolute transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-auto cursor-pointer select-none md:hidden ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-7 scale-90 pointer-events-none'
      }`}
      style={{
        top: '-86px',
        left: '-64px',
        width: '165px',
        height: '132px',
        zIndex: 20
      }}
      onClick={handlePupClick}
      role="button"
      tabIndex={0}
      aria-label="Teddy, sitting on the sticky bar"
    >
      <div className="w-full h-full relative">
        <PoodleMascot
          pose="peek"
          facing="right"
          bubbleText={bubbleText}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

