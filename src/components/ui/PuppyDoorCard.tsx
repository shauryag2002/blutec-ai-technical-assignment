import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video } from 'lucide-react';
import type { Puppy } from '../../types/puppy';

interface PuppyDoorCardProps {
  puppy: Puppy;
  isOpenControlled?: boolean; // When controlled externally (e.g., mobile tap or horizontal scroll)
  onToggleOpen?: () => void;
  className?: string;
}

/**
 * PuppyDoorCard Component
 * 
 * An arched wooden-plank doorway with 3D perspective.
 * When hovered or tapped, the door swings open in 3D (`rotateY: -78deg`)
 * revealing the puppy photo inside the cozy room.
 */
export const PuppyDoorCard: React.FC<PuppyDoorCardProps> = ({
  puppy,
  isOpenControlled,
  onToggleOpen,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const open = isOpenControlled !== undefined ? isOpenControlled : isHovered;

  return (
    <div
      className={`puppy-door relative flex flex-col items-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onToggleOpen}
    >
      {/* Puppy Name & Metadata Plate */}
      <div className="mb-3 text-center">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-espresso tracking-tight">
          {puppy.name}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-espresso/75 mt-0.5 flex items-center justify-center gap-1.5 flex-wrap">
          <span>{puppy.breed}</span>
          <span>•</span>
          <span className="capitalize">{puppy.gender}</span>
          <span>•</span>
          <span>{puppy.age}</span>
          {puppy.hasVideo && (
            <span className="inline-flex items-center gap-0.5 text-terracotta font-semibold text-xs bg-terracotta/10 px-1.5 py-0.5 rounded-full">
              <Video className="w-3 h-3" /> video
            </span>
          )}
        </p>
      </div>

      {/* Arched Door Frame Container with 3D Perspective */}
      <div
        className="relative w-56 sm:w-64 h-80 sm:h-92 rounded-t-[100px] rounded-b-xl border-[3px] border-espresso shadow-hard-lg bg-[#EBD8C1] overflow-hidden"
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
          {/* Subtle inside warm ambient gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />

          {/* View Details Hover Badge inside room */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-cream-light/95 backdrop-blur-xs border-2 border-espresso px-4 py-1.5 rounded-full shadow-hard-sm text-xs font-display font-bold text-espresso hover:bg-honey-soft">
            Meet {puppy.name} →
          </div>
        </Link>

        {/* 3D SWINGING WOODEN DOOR */}
        <motion.div
          className="absolute inset-0 w-full h-full origin-left bg-wood rounded-t-[100px] rounded-b-xl border-r-[3px] border-espresso cursor-pointer z-10"
          animate={{
            rotateY: open ? -78 : 0,
            transition: { type: 'spring', damping: 18, stiffness: 140 }
          }}
          style={{
            transformStyle: 'preserve-3d',
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent 0,
              transparent 38px,
              rgba(42, 26, 20, 0.25) 39px,
              rgba(42, 26, 20, 0.4) 40px
            )`
          }}
        >
          {/* Wood Grain Texture Lines */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/15 pointer-events-none" />

          {/* Peephole / Paw Motif */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-espresso bg-honey-soft shadow-inner flex items-center justify-center">
            <svg viewBox="0 0 64 64" className="w-5 h-5 text-espresso" fill="currentColor">
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z" />
              <circle cx="16" cy="30" r="5" />
              <circle cx="26" cy="18" r="5" />
              <circle cx="38" cy="18" r="5" />
              <circle cx="48" cy="30" r="5" />
            </svg>
          </div>

          {/* Brass Doorknob */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6 rounded-full bg-honey-deep border-2 border-espresso shadow-hard-sm flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-honey" />
          </div>

          {/* Keyhole Plate */}
          <div className="absolute top-[56%] right-5 w-4 h-6 rounded bg-espresso/30 border border-espresso/60 flex flex-col items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-espresso" />
            <div className="w-1 h-2 bg-espresso rounded-b" />
          </div>

          {/* Tilted "Available" Stamp Badge on Door */}
          {puppy.isAvailable && (
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-cream-light border-2 border-espresso px-3.5 py-1 rounded-md shadow-hard-sm -rotate-6"
            >
              <span className="font-display font-extrabold text-xs tracking-wider uppercase text-terracotta">
                Available
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Tap hint for mobile */}
      <span className="mt-2 text-[11px] font-sans text-espresso/50 sm:hidden">
        {open ? 'Tap to close' : 'Tap door to peek inside'}
      </span>
    </div>
  );
};
