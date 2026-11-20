import React from 'react';
import { motion } from 'framer-motion';

export type PoodlePose = 'peek' | 'walk' | 'sit' | 'flip' | 'think' | 'basket';

interface PoodleMascotProps {
  pose?: PoodlePose;
  className?: string;
  bubbleText?: string;
  flipProgress?: number; // Optional 0 to 1 scroll-driven rotation
}

/**
 * PoodleMascot Component
 * 
 * The illustrated TeddyPups poodle mascot with modular poses:
 * - peek: Peeking over the quilt / windowsill with front paws visible
 * - walk: Walking along the floor with stride animations
 * - sit: Sitting patiently with front paws down
 * - flip: 3D Y-axis spinning pose tied to scroll
 * - think: Sitting thoughtfully with a speech bubble ("hm?", "?", "coming?")
 * - basket: Sleeping cozily in a woven basket under the stars
 */
export const PoodleMascot: React.FC<PoodleMascotProps> = ({
  pose = 'sit',
  className = 'w-32 h-28',
  bubbleText,
  flipProgress
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Optional Speech Bubble */}
      {bubbleText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 bg-cream-light border-2 border-espresso px-3 py-1 rounded-full shadow-hard-sm text-xs font-hand font-bold text-espresso whitespace-nowrap z-10"
        >
          {bubbleText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-cream-light border-b-2 border-r-2 border-espresso rotate-45" />
        </motion.div>
      )}

      {/* Basket Back Layer (if pose === 'basket') */}
      {pose === 'basket' && (
        <svg aria-hidden="true" viewBox="0 0 300 240" className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <ellipse cx="212" cy="145" rx="96" ry="12" fill="#8E3F15" />
          <path d="M116 145 A96 12 0 0 1 308 145" fill="none" stroke="#2A1A14" strokeWidth="3" />
        </svg>
      )}

      {/* Main Poodle SVG Body */}
      <motion.div
        className="w-full h-full flex items-center justify-center"
        animate={
          pose === 'walk'
            ? { y: [0, -4, 0] }
            : pose === 'peek'
              ? { y: [0, -3, 0] }
              : {}
        }
        transition={{
          repeat: Infinity,
          duration: pose === 'walk' ? 0.6 : 2.5,
          ease: 'easeInOut'
        }}
        style={{
          transform: flipProgress !== undefined ? `rotateY(${flipProgress * 360}deg)` : undefined
        }}
      >
        <svg
          viewBox="0 0 300 240"
          className="w-full h-full overflow-visible z-[1]"
          aria-label="TeddyPups mascot"
          role="img"
        >
          {/* Shadow (hidden when peeking or in basket) */}
          {pose !== 'peek' && pose !== 'basket' && (
            <ellipse
              cx="150"
              cy="230"
              rx={pose === 'sit' ? 88 : 75}
              ry="7"
              fill="#2A1A14"
              opacity="0.14"
            />
          )}

          {/* Body & Paws */}
          <g transform={pose === 'peek' ? 'translate(0, 32)' : 'translate(0, 0)'}>
            {/* Back Legs (walk / sit) */}
            {pose !== 'peek' && (
              <g className="poodle-back-legs">
                <path
                  d="M102 185 C102 165 116 150 130 150 C144 150 148 165 148 185 C148 198 142 205 132 205 C122 205 102 202 102 185 Z"
                  fill="#D9A773"
                  stroke="#2A1A14"
                  strokeWidth="3.2"
                />
                <path
                  d="M168 185 C168 165 182 150 196 150 C210 150 214 165 214 185 C214 198 208 205 198 205 C188 205 168 202 168 185 Z"
                  fill="#D9A773"
                  stroke="#2A1A14"
                  strokeWidth="3.2"
                />
              </g>
            )}

            {/* Torso */}
            <path
              d="M110 140 C110 100 135 85 150 85 C165 85 190 100 190 140 C190 178 175 196 150 196 C125 196 110 178 110 140 Z"
              fill="#F2BE6B"
              stroke="#2A1A14"
              strokeWidth="3.5"
            />

            {/* Fluffy Chest bib */}
            <path
              d="M130 115 C136 130 144 135 150 135 C156 135 164 130 170 115 C166 142 158 148 150 148 C142 148 134 142 130 115 Z"
              fill="#FFFDF8"
              opacity="0.85"
            />

            {/* Front Paws */}
            {pose === 'peek' ? (
              // Paws resting over fence/quilt
              <g className="poodle-peek-paws">
                <rect x="115" y="142" width="28" height="22" rx="11" fill="#F2BE6B" stroke="#2A1A14" strokeWidth="3" />
                <path d="M124 150 v8 M134 150 v8" stroke="#2A1A14" strokeWidth="2.2" strokeLinecap="round" />
                <rect x="157" y="142" width="28" height="22" rx="11" fill="#F2BE6B" stroke="#2A1A14" strokeWidth="3" />
                <path d="M166 150 v8 M176 150 v8" stroke="#2A1A14" strokeWidth="2.2" strokeLinecap="round" />
              </g>
            ) : (
              // Standing/Sitting paws
              <g className="poodle-front-paws">
                <path
                  d="M125 160 L125 215 C125 222 131 226 137 226 C143 226 148 222 148 215 L148 160 Z"
                  fill="#F2BE6B"
                  stroke="#2A1A14"
                  strokeWidth="3.2"
                />
                <path d="M132 218 v6 M140 218 v6" stroke="#2A1A14" strokeWidth="2.2" strokeLinecap="round" />
                <path
                  d="M152 160 L152 215 C152 222 158 226 164 226 C170 226 175 222 175 215 L175 160 Z"
                  fill="#F2BE6B"
                  stroke="#2A1A14"
                  strokeWidth="3.2"
                />
                <path d="M159 218 v6 M167 218 v6" stroke="#2A1A14" strokeWidth="2.2" strokeLinecap="round" />
              </g>
            )}

            {/* Head & Poodle Curls */}
            <g className="poodle-head">
              {/* Fluffy Round Ears */}
              <path
                d="M84 75 C70 85 70 120 85 135 C96 145 106 135 108 115 C110 95 100 70 84 75 Z"
                fill="#E4A352"
                stroke="#2A1A14"
                strokeWidth="3.2"
              />
              <path
                d="M216 75 C230 85 230 120 215 135 C204 145 194 135 192 115 C190 95 200 70 216 75 Z"
                fill="#E4A352"
                stroke="#2A1A14"
                strokeWidth="3.2"
              />

              {/* Main Head Circle */}
              <circle cx="150" cy="85" r="44" fill="#F2BE6B" stroke="#2A1A14" strokeWidth="3.4" />

              {/* Top Fluff Crown */}
              <path
                d="M125 52 C120 40 134 34 142 42 C146 32 158 32 162 42 C170 34 182 42 176 52 Z"
                fill="#F2BE6B"
                stroke="#2A1A14"
                strokeWidth="3"
              />

              {/* Eyes */}
              <circle cx="134" cy="80" r="5.5" fill="#2A1A14" />
              <circle cx="132" cy="78" r="2" fill="#FFFFFF" />

              <circle cx="166" cy="80" r="5.5" fill="#2A1A14" />
              <circle cx="164" cy="78" r="2" fill="#FFFFFF" />

              {/* Cute Eyebrows / Expression */}
              {pose === 'think' ? (
                <>
                  <path d="M128 72 Q134 68 140 72" stroke="#2A1A14" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M160 70 Q166 74 172 70" stroke="#2A1A14" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </>
              ) : (
                <>
                  <path d="M128 70 Q134 67 140 70" stroke="#2A1A14" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                  <path d="M160 70 Q166 67 172 70" stroke="#2A1A14" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                </>
              )}

              {/* Snout / Muzzle */}
              <ellipse cx="150" cy="96" rx="16" ry="12" fill="#FBE3B4" stroke="#2A1A14" strokeWidth="2.8" />

              {/* Nose */}
              <polygon points="144,92 156,92 150,98" fill="#2A1A14" />

              {/* Mouth & Tongue */}
              <path d="M150 98 v4.5 M150 102.5 Q145 107.5 141 103 M150 102.5 Q155 107.5 159 103" stroke="#2A1A14" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M146 104 Q150 112 154 104 Z" fill="#F9CDBF" stroke="#2A1A14" strokeWidth="1.8" />

              {/* Rosy Cheeks */}
              <circle cx="120" cy="94" r="6" fill="#F9CDBF" opacity="0.6" />
              <circle cx="180" cy="94" r="6" fill="#F9CDBF" opacity="0.6" />
            </g>
          </g>
        </svg>
      </motion.div>

      {/* Basket Front Layer (if pose === 'basket') */}
      {pose === 'basket' && (
        <svg aria-hidden="true" viewBox="0 0 300 240" className="absolute inset-0 w-full h-full pointer-events-none z-[2]">
          <path d="M116 145 C118 180 126 214 138 232 L286 232 C298 214 306 180 308 145 A96 12 0 0 1 116 145 Z" fill="#C68E56" stroke="#2A1A14" strokeWidth="3" />
          <path d="M121 178 Q212 197 303 178 M127 206 Q212 223 297 206" fill="none" stroke="#8E3F15" strokeWidth="2.5" />
          <path d="M150 164 L158 230 M182 168 L185 232 M212 169 V232 M242 168 L239 232 M274 164 L266 230" fill="none" stroke="#5A3A28" strokeWidth="2.5" />
          <path d="M116 145 A96 12 0 0 0 308 145" fill="none" stroke="#2A1A14" strokeWidth="3.5" />
        </svg>
      )}
    </div>
  );
};

