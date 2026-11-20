import React from 'react';

export type StampShape = 'seal' | 'ticket' | 'oval' | 'scallop';

interface PassportStampProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
  shape?: StampShape;
  tiltDeg?: number;
  className?: string;
}

/**
 * PassportStamp Component
 * 
 * Recreates the inked rubber-stamp aesthetic for the open leather Puppy Passport.
 * Includes distressed double-ring border and slight random tilt.
 */
export const PassportStamp: React.FC<PassportStampProps> = ({
  title,
  description,
  icon,
  color = '#B8502D',
  shape = 'seal',
  tiltDeg = 4,
  className = ''
}) => {
  return (
    <div
      style={{
        transform: `rotate(${tiltDeg}deg)`,
        borderColor: color,
        color: color
      }}
      className={`relative inline-flex flex-col items-center justify-center p-4 border-[2.5px] border-dashed rounded-2xl select-none transition-transform hover:scale-105 duration-200 ${shape === 'seal' ? 'rounded-full w-40 h-40' : 'w-44 min-h-[140px]'
        } ${className}`}
    >
      {/* Inner thin decorative ring */}
      <div
        className="absolute inset-1.5 border border-current rounded-inherit pointer-events-none opacity-60"
      />

      {/* Stamp Icon */}
      {icon && <div className="mb-2 opacity-90">{icon}</div>}

      {/* Stamp Heading */}
      <span className="font-display font-bold text-center text-xs sm:text-sm tracking-wide uppercase leading-tight">
        {title}
      </span>

      {/* Description */}
      {description && (
        <p className="mt-1 font-sans text-[11px] text-center text-espresso/80 leading-snug max-w-[24ch]">
          {description}
        </p>
      )}

      {/* Verified Ink Micro-Watermark */}
      <span className="mt-1.5 text-[9px] font-mono tracking-widest uppercase opacity-75">
        ★ VERIFIED ★
      </span>
    </div>
  );
};

