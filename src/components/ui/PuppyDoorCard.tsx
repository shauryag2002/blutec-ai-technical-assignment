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
 * Exact 3D Arched Door component matching https://puppy.instabizweb.com/:
 * - Arched frame with espresso cocoa border (#2a170e) and #3b2215 room backing
 * - 3D swinging wooden door leaf with perspective: 700px, transform-origin: 0px center (left hinge)
 * - Vertical plank grooves, inner dashed inset line, paw peephole & honey brass knob
 * - Swinging open to rotateY(78deg) so the wooden leaf edge remains visible in 3D
 * - Sentence-case tilted "Available" pill badge rotated at 7deg
 * - Overhead name in Fraunces and metadata in sans-serif
 */
export const PuppyDoorCard: React.FC<PuppyDoorCardProps> = ({
  puppy,
  doorColor = '#a24a1a',
  isOpenControlled,
  onToggleOpen,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const open = isOpenControlled !== undefined ? isOpenControlled : isHovered;

  const metaText = `${puppy.name ? `${puppy.breed}, ` : ''}${puppy.gender}, ${puppy.age}${
    puppy.hasVideo ? ', with video' : ''
  }`;

  return (
    <li
      className={`tp-door shrink-0 select-none ${className}`}
      data-open={open ? 'true' : 'false'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onToggleOpen}
    >
      <Link
        to={`/puppies/${puppy.slug}`}
        className="tp-door__link block"
        style={{ '--door': doorColor } as React.CSSProperties}
      >
        {/* Name & Metadata Overhead Plate */}
        <span className="tp-door__plate">
          <span className="font-plush tp-door__name">{puppy.name}</span>
          <span className="tp-door__meta">{metaText}</span>
        </span>

        {/* Arched Door Frame Container */}
        <span className="tp-door__frame">
          {/* Inner Room with Puppy Photo */}
          <span className="tp-door__room">
            <img
              alt={`${puppy.name}, ${puppy.breed} puppy`}
              src={puppy.image}
              loading="lazy"
              decoding="async"
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                inset: 0,
                objectFit: 'cover',
                backgroundColor: '#785838'
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </span>

          {/* 3D Way & Swinging Wooden Door Leaf */}
          <span aria-hidden="true" className="tp-door__way">
            <span className="tp-door__leaf">
              {/* Paw Peephole SVG */}
              <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
              {/* Honey Brass Doorknob */}
              <span className="tp-door__knob" />
            </span>
          </span>

          {/* Available Pill Tag */}
          <span className="tp-door__tag font-scrawl">Available</span>
        </span>
      </Link>
    </li>
  );
};
