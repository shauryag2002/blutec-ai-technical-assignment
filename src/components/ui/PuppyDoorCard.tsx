import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
 * Replicates the exact 3D arched door from https://puppy.instabizweb.com/:
 * - Arched frame with 3px espresso border and #3b2215 room backing
 * - 3D doorway with perspective: 700px and transform-origin: 0px center (left hinge)
 * - Swinging wooden door leaf with vertical plank stripes and inner inset line
 * - Swings open to rotateY(78deg) so the wooden panel remains partially visible in 3D
 * - Paw peephole and round honey brass doorknob
 * - Arched room inside with puppy photograph
 * - Sentence-case tilted "Available" pill badge
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

  const metaText = `${puppy.name ? `${puppy.breed}, ` : ''}${puppy.gender}, ${puppy.age}${puppy.hasVideo ? ', with video' : ''}`;

  return (
    <li
      className={`tp-door list-none relative shrink-0 select-none ${className}`}
      data-open={open ? 'true' : 'false'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onToggleOpen}
    >
      <div className="tp-door__link block rounded-2xl cursor-pointer">
        {/* Puppy Name & Metadata Plate */}
        <span className="tp-door__plate block text-center mb-3">
          <span className="font-display font-extrabold text-2xl text-espresso block leading-tight tracking-tight">
            {puppy.name}
          </span>
          <span className="font-sans text-xs font-semibold text-espresso-soft block mt-1">
            {metaText}
          </span>
        </span>

        {/* Arched Door Frame Container */}
        <div
          className="tp-door__frame relative aspect-[4/5.2] w-52 sm:w-60 rounded-t-full border-[3px] border-b-0 border-[#2a170e] bg-[#3b2215]"
        >
          {/* Room Inside: Clipped Arched Photo */}
          <div className="tp-door__room absolute inset-0 rounded-t-full overflow-hidden">
            <Link
              to={`/puppies/${puppy.slug}`}
              className="block w-full h-full cursor-pointer"
              tabIndex={open ? 0 : -1}
            >
              <img
                src={puppy.image}
                alt={puppy.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  open ? 'scale-105' : 'scale-100'
                }`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </Link>
          </div>

          {/* 3D Way & Swinging Wooden Door Leaf */}
          <div
            className="tp-door__way absolute -inset-[3px] inset-b-0 rounded-t-full pointer-events-none"
            style={{
              perspective: 700,
              perspectiveOrigin: '0px center'
            }}
          >
            <div
              className="tp-door__leaf absolute inset-0 rounded-t-full border-[3px] border-b-0 border-[#2a170e] transition-transform duration-700 ease-[cubic-bezier(0.3,1.32,0.48,1)] pointer-events-auto"
              style={{
                backgroundColor: doorColor,
                backgroundImage: `repeating-linear-gradient(90deg, transparent 0 calc(25% - 1.5px), rgba(42, 23, 14, 0.18) calc(25% - 1.5px) 25%)`,
                transformOrigin: '0px center',
                transform: open ? 'rotateY(78deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Inner Inset Border Line */}
              <div className="absolute inset-x-[14%] top-[12%] bottom-[9%] rounded-t-full rounded-b-lg border-2 border-cream-light/30 pointer-events-none" />

              {/* Paw Peephole */}
              <div className="tp-door__peephole absolute top-[19%] left-1/2 -translate-x-1/2 w-8 h-8 text-cream-light/45 pointer-events-none">
                <svg viewBox="0 0 64 64" fill="currentColor">
                  <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                </svg>
              </div>

              {/* Round Brass Doorknob */}
              <div className="tp-door__knob absolute top-[56%] right-[11%] w-4 h-4 rounded-full border-2 border-[#2a170e] bg-honey shadow-sm pointer-events-none" />
            </div>
          </div>

          {/* Available Pill Badge on Upper Right */}
          <span className="tp-door__tag absolute top-[16%] -right-2.5 z-10 font-scrawl text-xs font-bold bg-[#fffdf8] text-[#2a170e] px-2.5 py-0.5 rounded-full border-2 border-[#2a170e] rotate-[7deg] shadow-[2px_3px_0_rgba(42,23,14,0.2)]">
            Available
          </span>
        </div>
      </div>

      <span className="mt-2 text-[11px] font-sans text-espresso/50 sm:hidden">
        {open ? 'Tap to close' : 'Tap to open door'}
      </span>
    </li>
  );
};
