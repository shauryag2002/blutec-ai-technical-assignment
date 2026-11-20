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
 * Refined 1.5px dashed border and subtle vintage tilt.
 */
export const PassportStamp: React.FC<PassportStampProps> = ({
  title,
  description,
  icon,
  color = '#B8502D',
  shape = 'seal',
  tiltDeg = 3,
  className = ''
}) => {
  return (
    <div
      style={{
        transform: `rotate(${tiltDeg}deg)`,
        borderColor: color,
        color: color
      }}
      className={`relative inline-flex flex-col items-center justify-center p-3.5 border-[2px] border-dashed rounded-xl select-none transition-transform hover:scale-105 duration-200 ${
        shape === 'seal' ? 'rounded-full w-36 h-36' : 'w-40 min-h-[125px]'
      } ${className}`}
    >
      {/* Inner thin decorative ring */}
      <div
        className="absolute inset-1.5 border border-current rounded-inherit pointer-events-none opacity-50"
      />

      {/* Stamp Icon */}
      {icon && <div className="mb-1.5 opacity-90">{icon}</div>}

      {/* Stamp Heading in soft display serif */}
      <span className="font-display font-bold text-center text-xs tracking-wide uppercase leading-tight">
        {title}
      </span>

      {/* Description */}
      {description && (
        <p className="mt-1 font-sans text-[10px] text-center text-espresso-soft leading-snug max-w-[20ch]">
          {description}
        </p>
      )}

      {/* Verified Ink Micro-Watermark */}
      <span className="mt-1 text-[8px] font-mono tracking-widest uppercase opacity-75">
        ★ VERIFIED ★
      </span>
    </div>
  );
};
