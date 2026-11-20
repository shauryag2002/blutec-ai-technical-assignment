import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PoodleMascot } from '../../components/mascot/PoodleMascot';
import { CONTACT_DETAILS } from '../../data/navigation';

interface LineupPuppy {
  name: string;
  breed: string;
  image: string;
  x: string;
  w: string;
  peek: number;
  tilt: string;
  slug: string;
}

const HERO_LINEUP: LineupPuppy[] = [
  {
    name: 'Toy Poodle',
    breed: 'Toy Poodle',
    image: '/puppies/seat-0.jpg',
    x: '9%',
    w: '8.6rem',
    peek: 0.62,
    tilt: '-5deg',
    slug: 'toy-poodle-male-female'
  },
  {
    name: 'Max',
    breed: 'Maltipoo',
    image: '/puppies/seat-1.webp',
    x: '22.5%',
    w: '10.4rem',
    peek: 0.8,
    tilt: '3deg',
    slug: 'maltipoo-max-male'
  },
  {
    name: 'Korean Teacup Pomeranian',
    breed: 'Korean Teacup Pomeranian',
    image: '/puppies/seat-2.jpg',
    x: '35%',
    w: '9.2rem',
    peek: 0.7,
    tilt: '-2deg',
    slug: 'korean-teacup-pomeranian'
  },
  {
    name: 'Copper',
    breed: 'Cavapoo',
    image: '/puppies/seat-3.jpg',
    x: '65%',
    w: '9.4rem',
    peek: 0.74,
    tilt: '3deg',
    slug: 'copper-male'
  },
  {
    name: 'Maltipoo',
    breed: 'Maltipoo',
    image: '/puppies/seat-4.jpg',
    x: '77.5%',
    w: '10.6rem',
    peek: 0.82,
    tilt: '-3deg',
    slug: 'maltipoo-female'
  },
  {
    name: 'Pomeranian',
    breed: 'Pomeranian',
    image: '/puppies/seat-5.jpg',
    x: '91%',
    w: '8.4rem',
    peek: 0.6,
    tilt: '4deg',
    slug: 'pomeranian-female'
  }
];

/**
 * HeroSection Component
 * 
 * Accurately replicates https://puppy.instabizweb.com/ hero:
 * 1. Shantell Sans handwritten "every puppy is family" with wavy stroke
 * 2. Solid single-color Fraunces headline
 * 3. Primary & ghost tactile pill buttons with responsive shadow hover
 * 4. Interactive Hero Stage (<div class="tp-hero__stage">) with 6 arched puppy seats,
 *    hover popup tags, and Teddy the mascot peeking over the quilt in the center.
 * 5. Scalloped stitched quilt pattern band transitioning into Section 2.
 */
export const HeroSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative pt-6 sm:pt-10 pb-0 overflow-hidden bg-cream flex flex-col justify-between min-h-[calc(100vh-5rem)]">
      {/* Upper Copy & CTAs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        
        {/* Handwritten Tagline with Wavy Underline */}
        <div className="inline-flex flex-col items-center select-none mb-3">
          <span className="font-scrawl text-2xl sm:text-3xl text-terracotta font-bold tracking-wide">
            every puppy is family
          </span>
          <svg className="w-48 sm:w-56 h-3 text-honey-deep -mt-0.5" viewBox="0 0 220 24" fill="none">
            <path
              d="M4 14 Q 55 4, 110 14 T 216 14"
              stroke="#B8502D"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Display Serif Headline in Solid Single-Color Espresso (#23170F) */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-espresso tracking-tight leading-[1.08] max-w-3xl mx-auto">
          Premium teacup puppies in Dubai
        </h1>

        {/* Subheadline in medium-readable sans-serif */}
        <p className="mt-4 text-base sm:text-lg text-espresso-soft max-w-2xl mx-auto leading-relaxed">
          Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
        </p>

        {/* CTA Buttons with Exact Reference Site Tactile Press Physics */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4 select-none">
          <Link
            to="/puppies"
            className="btn-primary px-8 py-3.5 text-base sm:text-lg min-w-[14rem]"
          >
            View available puppies
          </Link>

          <a
            href={CONTACT_DETAILS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-8 py-3.5 text-base sm:text-lg min-w-[14rem]"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>

      {/* Hero Stage Section (<div class="tp-hero__stage">) */}
      <div className="tp-hero__stage relative w-full h-[18rem] sm:h-[22rem] lg:h-[26rem] mt-6 select-none overflow-hidden">
        
        {/* Lineup of Seated Puppies */}
        <ul className="tp-lineup absolute inset-0 z-10 pointer-events-none" aria-label="Some of the puppies in our showroom">
          {HERO_LINEUP.map((pup, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <li
                key={pup.slug}
                className="tp-lineup__seat pointer-events-auto absolute"
                style={{
                  left: pup.x,
                  bottom: 'calc(clamp(4.5rem, 12vh, 8rem) - 1.5rem)',
                  width: `clamp(6.5rem, 10vw, ${pup.w})`,
                  transform: `translateX(-50%) rotate(${pup.tilt})`,
                  zIndex: isHovered ? 30 : 15
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Floating Breed Name Tag */}
                <div
                  className="absolute bottom-[calc(100%+0.6rem)] left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none whitespace-nowrap"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translate(-50%, -6px)' : 'translate(-50%, 8px)'
                  }}
                >
                  <span className="font-scrawl text-xs sm:text-sm font-bold bg-[#FFFDF8] text-espresso px-3 py-1 rounded-full border-2 border-espresso-border shadow-sm">
                    {pup.name}
                  </span>
                </div>

                {/* Puppy Portrait Arched Frame */}
                <Link
                  to={`/puppies/${pup.slug}`}
                  className="block rounded-t-full overflow-hidden transition-transform duration-300"
                  style={{
                    transform: isHovered ? 'translateY(-14%)' : 'translateY(0%)'
                  }}
                >
                  <div
                    className="relative w-full aspect-[3/4] rounded-t-full bg-honey-soft border-t-2 border-x-2 border-espresso-border shadow-[inset_0_0_0_4px_#FFFDF8] overflow-hidden"
                  >
                    <img
                      src={pup.image}
                      alt={`${pup.name} puppy`}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Center Mascot: Teddy Peeking over the Quilt */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20 cursor-pointer pointer-events-auto"
          style={{
            bottom: 'calc(clamp(4.5rem, 12vh, 8rem) - 1.2rem)'
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-44 sm:w-56 h-36 sm:h-44 flex items-center justify-center"
          >
            <PoodleMascot
              pose="peek"
              className="w-full h-full"
            />
          </motion.div>
        </div>

        {/* The Quilt: Scalloped Stitched Edge Pattern and Diamond Grid Body */}
        <div
          className="tp-quilt absolute inset-x-0 bottom-0 z-25 h-[clamp(4.5rem,12vh,8rem)]"
          style={{
            background:
              'repeating-linear-gradient(45deg, transparent 0 46px, rgba(42, 23, 14, 0.08) 46px 48px), repeating-linear-gradient(-45deg, transparent 0 46px, rgba(42, 23, 14, 0.08) 46px 48px), #FBE3B4'
          }}
        >
          {/* Top Scalloped Stitched Quilt Hem SVG */}
          <svg
            className="tp-quilt__edge absolute -top-[39px] left-0 w-full h-10 pointer-events-none"
            width="100%"
            height="40"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
                {/* Quilt Fill Semicircle */}
                <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#FBE3B4" />
                {/* Thick Espresso Outline */}
                <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
                {/* Dashed Stitched Inner Line */}
                <path
                  d="M11 33A27 19 0 0 1 65 33"
                  fill="none"
                  stroke="#2a170e"
                  strokeWidth="1.6"
                  strokeDasharray="3.5 5.5"
                  strokeLinecap="round"
                  opacity="0.45"
                />
              </pattern>
            </defs>
            <rect width="100%" height="40" fill="url(#tp-scallop)" />
          </svg>
        </div>
      </div>
    </section>
  );
};
