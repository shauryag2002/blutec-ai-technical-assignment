import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useEyeTracking } from '../../hooks/useEyeTracking';

export type PoodlePose = 
  | 'hero-peek'
  | 'side-walk'
  | 'signpost-peek'
  | 'journey-step'
  | 'passport-stand'
  | 'shelf-walk'
  | 'footer-walk'
  | 'sit'
  | 'peek'
  | 'walk'
  | 'think'
  | 'basket';

interface PoodleMascotProps {
  pose?: PoodlePose;
  className?: string;
  bubbleText?: string;
  flipProgress?: number;
}

/**
 * PoodleMascot Component
 * 
 * Richly illustrated SVG poodle with:
 * - Caramel/golden fur (#D89A5B & #C27E3E shading) with 2px espresso outline (#23170F)
 * - Cloud-like fluffy top head puff with layered scallops
 * - Fluffy scalloped ear puffs framing both cheeks
 * - Cream muzzle patch (#FBF0DF), soft pink rosy cheeks (#F2A2A2)
 * - Mouse eye-tracking specular highlights (via useEyeTracking hook)
 * - Rust collar (#A8462A) with cream heart tag
 * - Fluffy pom-pom tail with interactive hover wiggle
 * - Distinct section poses (hero-peek, side-walk, signpost-peek, journey-step, passport-stand, footer-walk)
 */
export const PoodleMascot: React.FC<PoodleMascotProps> = ({
  pose = 'sit',
  className = 'w-36 h-32',
  bubbleText,
  flipProgress
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic eye tracking that moves specular highlights toward the mouse cursor
  const { highlightX, highlightY, pupilX, pupilY } = useEyeTracking(containerRef);

  // Normalize pose mappings
  const normalizedPose = 
    pose === 'peek' ? 'hero-peek' :
    pose === 'walk' ? 'side-walk' :
    pose === 'think' ? 'journey-step' :
    pose === 'basket' ? 'footer-walk' :
    pose;

  const isPeeking = normalizedPose === 'hero-peek' || normalizedPose === 'signpost-peek';

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer ${className}`}
    >
      {/* Speech Bubble */}
      {bubbleText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute -top-11 left-1/2 -translate-x-1/2 bg-cream-light border-[1.5px] border-espresso-border px-3.5 py-1 rounded-full shadow-lip-sm text-xs font-sans font-bold text-espresso whitespace-nowrap z-30 pointer-events-none"
        >
          {bubbleText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-cream-light border-b-[1.5px] border-r-[1.5px] border-espresso-border rotate-45" />
        </motion.div>
      )}

      {/* Main Mascot Motion Container */}
      <motion.div
        className="w-full h-full flex items-center justify-center"
        animate={
          isPeeking
            ? { y: [0, -5, 0] }
            : normalizedPose === 'side-walk' || normalizedPose === 'shelf-walk' || normalizedPose === 'footer-walk'
            ? { y: [0, -3.5, 0] }
            : {}
        }
        transition={{
          repeat: Infinity,
          duration: isPeeking ? 3.5 : 0.6,
          ease: 'easeInOut'
        }}
        style={{
          transform: flipProgress !== undefined ? `rotateY(${flipProgress * 360}deg)` : undefined
        }}
      >
        <svg
          viewBox="0 0 280 240"
          className="w-full h-full overflow-visible"
          role="img"
          aria-label="TeddyPups illustrated poodle mascot"
        >
          {/* Soft Ground Shadow (for standing/sitting poses) */}
          {normalizedPose !== 'hero-peek' && (
            <ellipse
              cx="140"
              cy="224"
              rx="78"
              ry="7"
              fill="#23170F"
              opacity="0.12"
            />
          )}

          {/* Pom-Pom Tail with Hover Wiggle */}
          {normalizedPose !== 'hero-peek' && (
            <motion.g
              style={{ transformOrigin: '70px 172px' }}
              animate={
                isHovered
                  ? { rotate: [-14, 18, -14, 18, 0] }
                  : { rotate: [-3, 3, -3] }
              }
              transition={
                isHovered
                  ? { repeat: Infinity, duration: 0.45, ease: 'easeInOut' }
                  : { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
              }
            >
              {/* Tail Stem */}
              <path
                d="M84 172 C74 165 64 162 56 160"
                fill="none"
                stroke="#23170F"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Fluffy Pom-Pom Ball at tip */}
              <circle cx="50" cy="158" r="14" fill="#D89A5B" stroke="#23170F" strokeWidth="2" />
              <circle cx="46" cy="154" r="8" fill="#F2BE6B" opacity="0.6" />
            </motion.g>
          )}

          {/* Back Body & Hind Legs */}
          {!isPeeking && (
            <g className="mascot-body">
              {/* Hind Leg Left */}
              <path
                d="M96 182 C96 164 108 152 120 152 C132 152 136 164 136 184 C136 198 130 204 122 204 C114 204 96 200 96 182 Z"
                fill="#C27E3E"
                stroke="#23170F"
                strokeWidth="2"
              />
              {/* Hind Leg Right */}
              <path
                d="M156 182 C156 164 168 152 180 152 C192 152 196 164 196 184 C196 198 190 204 182 204 C174 204 156 200 156 182 Z"
                fill="#C27E3E"
                stroke="#23170F"
                strokeWidth="2"
              />

              {/* Main Fluffy Torso */}
              <path
                d="M104 140 C104 102 126 88 140 88 C154 88 176 102 176 140 C176 174 162 192 140 192 C118 192 104 174 104 140 Z"
                fill="#D89A5B"
                stroke="#23170F"
                strokeWidth="2"
              />

              {/* Front Stepping / Sitting Legs */}
              <g className="front-legs">
                <rect x="118" y="156" width="16" height="52" rx="8" fill="#D89A5B" stroke="#23170F" strokeWidth="2" />
                <path d="M123 202 v4 M129 202 v4" stroke="#23170F" strokeWidth="1.6" strokeLinecap="round" />

                <rect x="146" y="156" width="16" height="52" rx="8" fill="#D89A5B" stroke="#23170F" strokeWidth="2" />
                <path d="M151 202 v4 M157 202 v4" stroke="#23170F" strokeWidth="1.6" strokeLinecap="round" />
              </g>

              {/* Rust Collar with Cream Heart Tag */}
              <g className="collar">
                <path
                  d="M122 134 Q140 144 158 134"
                  fill="none"
                  stroke="#A8462A"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Heart Tag hanging from collar */}
                <path
                  d="M140 142 c-2-3-6-2-5 2 c1 3 5 5 5 5 s4-2 5-5 c1-4-3-5-5-2 z"
                  fill="#FFFDF8"
                  stroke="#23170F"
                  strokeWidth="1.5"
                />
              </g>
            </g>
          )}

          {/* HEAD & FACIAL FEATURES */}
          <g transform={isPeeking ? 'translate(0, 32)' : 'translate(0, 0)'}>
            
            {/* Scalloped Fluffy Ear Puffs Framing Both Cheeks */}
            {/* Left Ear Puffs */}
            <g className="left-ear">
              <circle cx="82" cy="74" r="16" fill="#D89A5B" stroke="#23170F" strokeWidth="2" />
              <circle cx="74" cy="94" r="18" fill="#C27E3E" stroke="#23170F" strokeWidth="2" />
              <circle cx="84" cy="114" r="17" fill="#D89A5B" stroke="#23170F" strokeWidth="2" />
              <circle cx="94" cy="126" r="13" fill="#C27E3E" stroke="#23170F" strokeWidth="2" />
            </g>

            {/* Right Ear Puffs */}
            <g className="right-ear">
              <circle cx="198" cy="74" r="16" fill="#D89A5B" stroke="#23170F" strokeWidth="2" />
              <circle cx="206" cy="94" r="18" fill="#C27E3E" stroke="#23170F" strokeWidth="2" />
              <circle cx="196" cy="114" r="17" fill="#D89A5B" stroke="#23170F" strokeWidth="2" />
              <circle cx="186" cy="126" r="13" fill="#C27E3E" stroke="#23170F" strokeWidth="2" />
            </g>

            {/* Main Face Base */}
            <circle cx="140" cy="88" r="48" fill="#D89A5B" stroke="#23170F" strokeWidth="2" />

            {/* Top Head Cloud Puffs (Layered Soft Scallops) */}
            <g className="top-puffs">
              <circle cx="114" cy="48" r="18" fill="#F2BE6B" stroke="#23170F" strokeWidth="2" />
              <circle cx="140" cy="40" r="22" fill="#F2BE6B" stroke="#23170F" strokeWidth="2" />
              <circle cx="166" cy="48" r="18" fill="#F2BE6B" stroke="#23170F" strokeWidth="2" />
              <circle cx="128" cy="42" r="17" fill="#D89A5B" opacity="0.4" />
              <circle cx="152" cy="42" r="17" fill="#D89A5B" opacity="0.4" />
            </g>

            {/* Cream-Colored Muzzle Patch */}
            <ellipse cx="140" cy="100" rx="20" ry="15" fill="#FBF0DF" stroke="#23170F" strokeWidth="2" />

            {/* Prominent Soft Pink Rosy Cheeks */}
            <circle cx="106" cy="98" r="8.5" fill="#F2A2A2" opacity="0.85" />
            <circle cx="174" cy="98" r="8.5" fill="#F2A2A2" opacity="0.85" />

            {/* Dark Rounded Eyes with Interactive Eye-Tracking */}
            {/* Left Eye */}
            <g className="left-eye">
              <circle cx="121" cy="82" r="7" fill="#23170F" />
              {/* Pupil shift */}
              <motion.circle
                cx="121"
                cy="82"
                r="5.5"
                fill="#1A1009"
                style={{ x: pupilX, y: pupilY }}
              />
              {/* Crisp White Specular Highlight Dot (tracks mouse) */}
              <motion.circle
                cx="119"
                cy="80"
                r="2.5"
                fill="#FFFFFF"
                style={{ x: highlightX, y: highlightY }}
              />
            </g>

            {/* Right Eye */}
            <g className="right-eye">
              <circle cx="159" cy="82" r="7" fill="#23170F" />
              {/* Pupil shift */}
              <motion.circle
                cx="159"
                cy="82"
                r="5.5"
                fill="#1A1009"
                style={{ x: pupilX, y: pupilY }}
              />
              {/* Crisp White Specular Highlight Dot (tracks mouse) */}
              <motion.circle
                cx="157"
                cy="80"
                r="2.5"
                fill="#FFFFFF"
                style={{ x: highlightX, y: highlightY }}
              />
            </g>

            {/* Rounded-T Dark Brown Nose */}
            <path
              d="M133 94 C133 91 147 91 147 94 C147 98 142 101 140 101 C138 101 133 98 133 94 Z"
              fill="#23170F"
            />

            {/* Wide Friendly Smile */}
            <path
              d="M140 101 v4 M140 105 Q133 111 127 106 M140 105 Q147 111 153 106"
              fill="none"
              stroke="#23170F"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Subtle Pink Tongue */}
            <path
              d="M137 107 Q140 113 143 107 Z"
              fill="#F2A2A2"
              stroke="#23170F"
              strokeWidth="1.2"
            />

            {/* Two Front Paws Peeking (in hero-peek and signpost-peek) */}
            {isPeeking && (
              <g className="peeking-front-paws">
                {/* Left Paw */}
                <rect x="100" y="134" width="30" height="22" rx="11" fill="#D89A5B" stroke="#23170F" strokeWidth="2" />
                <path d="M109 142 v6 M118 142 v6" stroke="#23170F" strokeWidth="2" strokeLinecap="round" />

                {/* Right Paw */}
                <rect x="150" y="134" width="30" height="22" rx="11" fill="#D89A5B" stroke="#23170F" strokeWidth="2" />
                <path d="M159 142 v6 M168 142 v6" stroke="#23170F" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}

          </g>
        </svg>
      </motion.div>
    </div>
  );
};
