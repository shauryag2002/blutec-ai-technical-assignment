import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Puppy } from '../../types/puppy';

interface PuppyDoorCardProps {
  puppy: Puppy;
  doorColor?: string;
  isOpenControlled?: boolean;
  onToggleOpen?: () => void;
  className?: string;
}

/**
 * PuppyDoorCard Component
 * 
 * Features:
 * - Distinct warm wood tones (rust-brown, espresso, warm tan, terracotta)
 * - Subtle engraved paw watermark & simple round brass doorknob (no keyhole)
 * - Sentence case "Available" badge
 * - Clean lowercase comma-separated subtitle
 * - 3D swing-open rotateY (-105deg) from left origin
 */
export const PuppyDoorCard: React.FC<PuppyDoorCardProps> = ({
  puppy,
  doorColor = '#9E4B2E',
  isOpenControlled,
  onToggleOpen,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const open = isOpenControlled !== undefined ? isOpenControlled : isHovered;

  // Clean lowercase comma-separated subtitle
  const metaText = `${puppy.breed}, ${puppy.gender}, ${puppy.age}${puppy.hasVideo ? ', with video' : ''}`;

  return (
    <div
      className={`puppy-door relative flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onToggleOpen}
    >
      {/* Puppy Name & Metadata Plate */}
      <div className="mb-3 text-center">
        <h3 className="font-display font-extrabold text-2xl text-espresso tracking-tight">
          {puppy.name}
        </h3>
        <p className="font-sans text-xs text-espresso-soft mt-0.5 max-w-[24ch]">
          {metaText}
        </p>
      </div>

      {/* Arched Door Frame Container with 3D Perspective */}
      <div
        className="relative w-56 sm:w-64 h-80 sm:h-92 rounded-t-[100px] rounded-b-xl border-[1.5px] border-espresso-border shadow-card-soft bg-[#EBD8C1] overflow-hidden"
        style={{ perspective: 1200 }}
      >
        {/* ROOM INSIDE (REVEALED WHEN DOOR SWINGS) */}
        <Link
          to={`/puppies/${puppy.slug}`}
          className="absolute inset-0 block w-full h-full cursor-pointer"
          tabIndex={open ? 0 : -1}
        >
          <img
            src={puppy.image}
            alt={puppy.name}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent" />

          {/* View Details Hover Badge inside room */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-cream-light/95 backdrop-blur-xs border-[1.5px] border-espresso-border px-4 py-1.5 rounded-full shadow-lip-sm text-xs font-sans font-bold text-espresso hover:bg-honey-soft">
            Meet {puppy.name} →
          </div>
        </Link>

        {/* 3D SWINGING WOODEN DOOR */}
        <motion.div
          className="absolute inset-0 w-full h-full origin-left rounded-t-[100px] rounded-b-xl border-r-[1.5px] border-espresso-border cursor-pointer z-10"
          animate={{
            rotateY: open ? -105 : 0,
            transition: { type: 'spring', damping: 20, stiffness: 120 }
          }}
          style={{
            backgroundColor: doorColor,
            transformStyle: 'preserve-3d',
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent 0,
              transparent 36px,
              rgba(35, 23, 15, 0.15) 37px,
              rgba(35, 23, 15, 0.25) 38px
            )`
          }}
        >
          {/* Subtle Engraved Paw Watermark in Center */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full border border-black/20 bg-black/10 flex items-center justify-center opacity-85 shadow-inner">
            <svg viewBox="0 0 64 64" className="w-5 h-5 text-cream-light/70" fill="currentColor">
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z" />
              <circle cx="16" cy="30" r="5" />
              <circle cx="26" cy="18" r="5" />
              <circle cx="38" cy="18" r="5" />
              <circle cx="48" cy="30" r="5" />
            </svg>
          </div>

          {/* Simple Round Brass Doorknob (No Keyhole) */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6 rounded-full bg-honey-deep border border-espresso shadow-sm flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-honey" />
          </div>

          {/* Tilted Sentence-Case "Available" Badge on Door */}
          {puppy.isAvailable && (
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-cream-light border-[1.5px] border-espresso-border px-3.5 py-0.5 rounded-md shadow-lip-sm -rotate-4"
            >
              <span className="font-sans font-bold text-xs tracking-wide text-terracotta">
                Available
              </span>
            </div>
          )}
        </motion.div>
      </div>

      <span className="mt-2 text-[11px] font-sans text-espresso/50 sm:hidden">
        {open ? 'Tap to close' : 'Tap to open door'}
      </span>
    </div>
  );
};
