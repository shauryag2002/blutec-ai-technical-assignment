import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_DETAILS } from '../../data/navigation';
import { PoodleMascot } from '../../components/mascot/PoodleMascot';

interface LineupPuppy {
  name: string;
  breed: string;
  image: string;
  slug: string;
}

const HERO_SEATS = [
  [9, 8.6, 0.62, -5],
  [22.5, 10.4, 0.8, 3],
  [35, 9.2, 0.7, -2],
  [65, 9.4, 0.74, 3],
  [77.5, 10.6, 0.82, -3],
  [91, 8.4, 0.6, 4]
] as const;

const HERO_LINEUP: LineupPuppy[] = [
  {
    name: 'Max',
    breed: 'Maltipoo',
    image: '/puppies/hero-seat-0.webp',
    slug: 'maltipoo-max-male'
  },
  {
    name: 'Korean Teacup Maltipoo',
    breed: 'Korean Teacup Maltipoo',
    image: '/puppies/hero-seat-1.jpg',
    slug: 'korean-teacup-maltipoo-female'
  },
  {
    name: 'Korean Teacup Poodle',
    breed: 'Korean Teacup Poodle',
    image: '/puppies/hero-seat-2.jpg',
    slug: 'korean-teacup-poodle-female'
  },
  {
    name: 'Maltipoo & Cavapoo',
    breed: 'Maltipoo & Cavapoo',
    image: '/puppies/hero-seat-3.jpg',
    slug: 'maltipoo-cavapoo-male'
  },
  {
    name: 'Pomeranian',
    breed: 'Pomeranian',
    image: '/puppies/hero-seat-4.jpg',
    slug: 'toy-poodle-male-female'
  },
  {
    name: 'Maltipoo',
    breed: 'Maltipoo',
    image: '/puppies/hero-seat-5.jpg',
    slug: 'maltipoo-female-2'
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
 *    hover & auto-popping tags, duck/pop state animations, and Teddy peeking over quilt in center.
 * 5. Scalloped stitched quilt pattern band transitioning into Section 2.
 */
export const HeroSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [poppedIdx, setPoppedIdx] = useState<number | null>(null);
  const [cardStates, setCardStates] = useState<Record<number, 'duck' | 'pop' | undefined>>({});
  const [isHere, setIsHere] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const timeoutsRef = useRef<number[]>([]);

  // Monitor scroll to update data-here state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsHere(scrollY < 380);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-cycling duck/pop animation matching live site
  useEffect(() => {
    let active = true;

    const clearAll = () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };

    const runPopCycle = () => {
      if (!active || !isHere || document.hidden) {
        timeoutsRef.current.push(setTimeout(runPopCycle, 1200));
        return;
      }

      // Pick a random card index to duck and pop
      const randomIndex = Math.floor(Math.random() * HERO_LINEUP.length);

      // 1. Duck card
      setCardStates(prev => ({ ...prev, [randomIndex]: 'duck' }));

      // 2. Pop up card after 360ms
      timeoutsRef.current.push(
        setTimeout(() => {
          if (!active) return;
          setCardStates(prev => ({ ...prev, [randomIndex]: 'pop' }));
          setPoppedIdx(randomIndex);

          // 3. Hide tag tooltip after 1800ms
          timeoutsRef.current.push(
            setTimeout(() => {
              if (!active) return;
              setPoppedIdx(prev => (prev === randomIndex ? null : prev));
            }, 1800)
          );

          // 4. Reset card state after 700ms
          timeoutsRef.current.push(
            setTimeout(() => {
              if (!active) return;
              setCardStates(prev => ({ ...prev, [randomIndex]: undefined }));
            }, 700)
          );
        }, 360)
      );

      // Schedule next random pop in 2.2 - 3.2s
      const delay = 2200 + Math.random() * 1000;
      timeoutsRef.current.push(setTimeout(runPopCycle, delay));
    };

    // Initial delay before first pop
    timeoutsRef.current.push(setTimeout(runPopCycle, 1800));

    return () => {
      active = false;
      clearAll();
    };
  }, [isHere]);

  const getSeatStyle = (idx: number): React.CSSProperties => {
    const [x, w, peek, tilt] = HERO_SEATS[idx];
    return {
      '--x': `${x}%`,
      '--w': `${w}rem`,
      '--peek': peek,
      '--tilt': `${tilt}deg`,
      '--i': idx
    } as React.CSSProperties;
  };

  return (
    <section
      ref={sectionRef}
      data-pup-scene="true"
      data-tone="light"
      data-here={isHere ? 'true' : 'false'}
      className="tp-scene tp-hero relative pt-24 sm:pt-28 pb-0 overflow-hidden flex flex-col justify-between min-h-[calc(100vh-5rem)]"
      style={{
        '--sky-top': '#fffdf8',
        '--sky-bottom': '#fbe3b4'
      } as React.CSSProperties}
    >
      {/* Upper Copy & CTAs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">

        {/* Handwritten Tagline with Wavy Underline */}
        <div className="inline-flex flex-col items-center select-none mb-3">
          <span className="font-scrawl text-2xl sm:text-3xl text-terracotta font-medium tracking-wide">
            every puppy is family
          </span>
          <svg className="w-48 h-3 text-honey-deep -mt-0.5" viewBox="0 0 220 24" fill="none">
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

        {/* Subheadline */}
        <p className="mt-4 text-base sm:text-lg text-espresso-soft max-w-2xl mx-auto leading-relaxed">
          Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
        </p>

        {/* CTA Buttons */}
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
      <div className="tp-hero__stage select-none z-10">

        {/* Lineup of Seated Puppies */}
        <ul className="tp-lineup" aria-label="Some of the puppies in our showroom">
          {HERO_LINEUP.map((pup, idx) => (
            <li
              key={pup.slug}
              className="tp-lineup__seat"
              style={getSeatStyle(idx)}
            >
              <Link
                to={`/puppies/${pup.slug}`}
                className="tp-lineup__pup"
                data-pup-friend="true"
                data-state={cardStates[idx]}
                aria-label={`Meet ${pup.name}, ${pup.breed}`}
                onPointerEnter={() => setHoveredIdx(idx)}
                onPointerLeave={() => setHoveredIdx(null)}
                onFocus={() => setHoveredIdx(idx)}
                onBlur={() => setHoveredIdx(null)}
              >
                <span className="tp-lineup__photo">
                  <img
                    src={pup.image}
                    alt={`${pup.name}, ${pup.breed}`}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Lineup Tags List for Smooth Independent Tooltips */}
        <ul aria-hidden="true" className="tp-lineup tp-lineup--tags">
          {HERO_LINEUP.map((pup, idx) => (
            <li
              key={pup.slug}
              className="tp-lineup__seat"
              style={getSeatStyle(idx)}
            >
              <span
                className="tp-lineup__ghost"
                data-state={cardStates[idx]}
                data-tag={hoveredIdx === idx || poppedIdx === idx ? 'show' : undefined}
              >
                <span className="tp-lineup__name font-scrawl">
                  {pup.name}
                </span>
              </span>
            </li>
          ))}
        </ul>

        {/* Center Mascot Anchor: Stop 1 for Global Puppy Actor */}
        <div
          id="pup-stop-hero"
          data-pup-stop="true"
          data-pose="peek"
          data-facing="right"
          data-act="hero"
          data-behind="true"
          data-lane="true"
          className="pup-stop tp-hero__teddy"
        >
          <div className="pup-buddy" data-facing="right" data-live="">
            <PoodleMascot pose="peek" />
          </div>
        </div>

        {/* The Quilt: Scalloped Stitched Edge Pattern */}
        <div aria-hidden="true" className="tp-quilt">
          <svg
            className="tp-quilt__edge"
            width="100%"
            height="40"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: 'var(--quilt, #fbe3b4)' }} />
                <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
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
