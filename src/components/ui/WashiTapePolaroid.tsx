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
 * warm 1.5px espresso border, gentle shadow, and handwritten caption.
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
      className={`relative bg-cream-light p-3 sm:p-3.5 pb-4 sm:pb-5 border-[1.5px] border-espresso-border rounded-xl shadow-card-soft hover:shadow-card-hover transition-shadow cursor-pointer select-none inline-block ${className}`}
    >
      {/* Pastel Washi Tape Strip at Top */}
      <div
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 sm:w-22 h-5 border border-black/20 shadow-xs opacity-90 transform -rotate-1 pointer-events-none z-10"
        style={{
          backgroundColor: washiColor,
          clipPath: 'polygon(0 0, 100% 0, 96% 100%, 4% 100%)'
        }}
      />

      {/* Photo Frame */}
      <div className="relative w-full aspect-square overflow-hidden rounded-md border border-espresso/15 bg-espresso/5">
        <img
          src={image}
          alt={caption}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80';
          }}
        />
      </div>

      {/* Handwritten Caption in Caveat script */}
      <figcaption className="mt-2.5 text-center">
        <p className="font-script text-base sm:text-lg font-bold text-espresso leading-snug">
          {caption}
        </p>
        {clientName && (
          <p className="font-sans text-[11px] text-espresso-soft/80 mt-0.5">
            {clientName} {location && `• ${location}`}
          </p>
        )}
      </figcaption>
    </motion.figure>
  );
};
