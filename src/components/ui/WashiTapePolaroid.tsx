import React from 'react';
import { motion } from 'framer-motion';

interface WashiTapePolaroidProps {
  image: string;
  caption: string;
  washiColor?: string;
  tiltDeg?: number;
  clientName?: string;
  location?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * WashiTapePolaroid Component
 * 
 * Storybook Polaroid photo frame with pastel washi tape strip at top,
 * realistic 2px espresso border, hard offset shadow, and handwritten caption.
 */
export const WashiTapePolaroid: React.FC<WashiTapePolaroidProps> = ({
  image,
  caption,
  washiColor = '#F6D79A',
  tiltDeg = -2,
  clientName,
  location,
  onClick,
  className = ''
}) => {
  return (
    <motion.figure
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      style={{ rotate: `${tiltDeg}deg` }}
      onClick={onClick}
      className={`relative bg-cream-light p-3 sm:p-4 pb-4 sm:pb-6 border-2 border-espresso rounded-xl shadow-hard-md hover:shadow-hard-lg transition-shadow cursor-pointer select-none inline-block ${className}`}
    >
      {/* Pastel Washi Tape Strip at Top */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-6 border border-espresso/40 shadow-sm opacity-90 transform -rotate-1 pointer-events-none z-10"
        style={{
          backgroundColor: washiColor,
          clipPath: 'polygon(0 0, 100% 0, 96% 100%, 4% 100%)'
        }}
      />

      {/* Photo Frame with subtle inner shadow */}
      <div className="relative w-full aspect-square overflow-hidden rounded-md border border-espresso/20 bg-espresso/5">
        <img
          src={image}
          alt={caption}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // High-resolution Unsplash puppy fallback if needed
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </div>

      {/* Handwritten Caption in Caveat script */}
      <figcaption className="mt-3 text-center">
        <p className="font-script text-base sm:text-lg font-bold text-espresso leading-snug">
          {caption}
        </p>
        {clientName && (
          <p className="font-sans text-xs text-espresso/70 mt-0.5">
            {clientName} {location && `• ${location}`}
          </p>
        )}
      </figcaption>
    </motion.figure>
  );
};

