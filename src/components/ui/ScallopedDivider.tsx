import React from 'react';

interface ScallopedDividerProps {
  fillColor?: string;
  borderColor?: string;
  inverted?: boolean;
  className?: string;
}

/**
 * ScallopedDivider Component
 * 
 * Reusable storybook scalloped / stitched border band with dashed stitching line.
 * Matches the reference site's custom SVG scallop pattern perfectly.
 */
export const ScallopedDivider: React.FC<ScallopedDividerProps> = ({
  fillColor = '#FBE3B4',
  borderColor = '#2A1A14',
  inverted = false,
  className = 'w-full h-8 sm:h-10'
}) => {
  const patternId = React.useId();

  return (
    <div className={`w-full overflow-hidden leading-none select-none ${inverted ? 'rotate-180' : ''} ${className}`}>
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={patternId}
            width="76"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            {/* Scallop Arch Fill */}
            <path
              d="M0 40 V27 A38 25 0 0 1 76 27 V40 Z"
              fill={fillColor}
            />
            {/* Solid Scallop Rim */}
            <path
              d="M0 27 A38 25 0 0 1 76 27"
              fill="none"
              stroke={borderColor}
              strokeWidth="3"
            />
            {/* Storybook Dashed Stitching Line */}
            <path
              d="M11 33 A27 19 0 0 1 65 33"
              fill="none"
              stroke={borderColor}
              strokeWidth="1.6"
              strokeDasharray="3.5 5.5"
              strokeLinecap="round"
              opacity="0.45"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};

