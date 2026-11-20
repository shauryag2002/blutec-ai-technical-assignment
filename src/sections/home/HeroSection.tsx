import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { StickerButton } from '../../components/ui/StickerButton';
import { ScallopedDivider } from '../../components/ui/ScallopedDivider';
import { PoodleMascot } from '../../components/mascot/PoodleMascot';
import { CONTACT_DETAILS } from '../../data/navigation';

// Varied-height arched puppy portraits with floating rotated breed pills
const MARQUEE_PUPPIES = [
  {
    breed: 'Shih Tzu',
    height: 'h-64 sm:h-72',
    tilt: '-rotate-2',
    image: 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FqNrTCSrsYyzY%2F168fa8c4ff%2Fb942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg&w=640&q=75'
  },
  {
    breed: 'Pomeranian',
    height: 'h-72 sm:h-84',
    tilt: 'rotate-3',
    image: 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F3yOfnmoyPooH%2F81e0c7e00c%2Fb942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg&w=640&q=75'
  },
  {
    breed: 'Korean Teacup Pomeranian',
    height: 'h-60 sm:h-68',
    tilt: '-rotate-1',
    image: 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FEsAq2LSRvVCJ%2F4d553ed044%2Fb942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg&w=640&q=75'
  },
  {
    breed: 'Maltipoo',
    height: 'h-76 sm:h-88',
    tilt: 'rotate-2',
    image: 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FZ0ToauDx7Eve%2F5fffe4d022%2Fb942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp&w=640&q=75'
  },
  {
    breed: 'Cavapoo',
    height: 'h-64 sm:h-74',
    tilt: '-rotate-3',
    image: 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FYQhey4j7uWvZ%2F3ea10db6c1%2Fb942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg&w=640&q=75'
  },
  {
    breed: 'Toy Poodle',
    height: 'h-72 sm:h-80',
    tilt: 'rotate-1',
    image: 'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FxeMJCapr5vcU%2Fe618c653b2%2Fb942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg&w=640&q=75'
  }
];

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll bobbing for peeking mascot
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  const mascotBobY = useTransform(scrollYProgress, [0, 0.5], [0, 18]);

  return (
    <section ref={containerRef} className="relative pt-8 sm:pt-12 pb-0 overflow-hidden bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Handwritten Tagline with Wavy Underline */}
        <div className="inline-flex flex-col items-center select-none mb-3">
          <span className="font-script text-2xl sm:text-3xl text-terracotta-ink font-bold tracking-wide">
            every puppy is family
          </span>
          <svg className="w-48 sm:w-56 h-3 text-honey-deep -mt-1" viewBox="0 0 220 24" fill="none">
            <path
              d="M4 14 Q 55 4, 110 14 T 216 14"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Display Serif Headline in Solid Single-Color Espresso (#23170F) */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-espresso tracking-tight leading-[1.08] max-w-2xl mx-auto">
          Premium teacup puppies in Dubai
        </h1>

        {/* Subheadline in medium-readable sans-serif */}
        <p className="mt-4 text-base sm:text-md text-espresso-soft max-w-2xl mx-auto leading-relaxed">
          Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4 select-none">
          <StickerButton
            to="/puppies"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            View available puppies
          </StickerButton>

          <StickerButton
            href={CONTACT_DETAILS.whatsappUrl}
            isExternal
            variant="ghost"
            size="lg"
            icon={<MessageCircle className="w-4 h-4 text-emerald" />}
          >
            Enquire on WhatsApp
          </StickerButton>
        </div>

        {/* Large (~220px) Peeking Poodle Mascot Resting Paws on Stitched Divider */}
        <div className="relative mt-12 sm:mt-16 z-20 flex justify-center">
          <motion.div
            style={{ y: mascotBobY }}
            className="w-56 h-36 cursor-pointer select-none"
          >
            <PoodleMascot
              pose="hero-peek"
              className="w-full h-full"
              bubbleText="hello! 🐾"
            />
          </motion.div>
        </div>

      </div>

      {/* Scalloped Divider Band ABOVE the Marquee */}
      <div className="w-full -mt-4 relative z-10">
        <ScallopedDivider fillColor="#FFFDF8" borderColor="#3A261B" className="h-6 sm:h-8" />
      </div>

      {/* Continuous Horizontal Auto-Scrolling Marquee of Varied-Height Puppy Arches */}
      <div className="relative bg-[#FFFDF8] py-8 sm:py-10 overflow-hidden marquee-container select-none">
        <div className="flex w-max marquee-track animate-marquee hover:[animation-play-state:paused]">
          {/* Double list for seamless infinite loop */}
          {[...MARQUEE_PUPPIES, ...MARQUEE_PUPPIES].map((pup, idx) => (
            <div
              key={idx}
              className="shrink-0 px-3 sm:px-4 flex flex-col items-center justify-end"
            >
              {/* Arched Photo with organic staggered height */}
              <div
                className={`relative w-44 sm:w-52 ${pup.height} rounded-t-full rounded-b-2xl overflow-hidden border-[1.5px] border-espresso-border bg-espresso/5 shadow-sm transition-transform duration-300 hover:scale-105`}
              >
                <img
                  src={pup.image}
                  alt={pup.breed}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Slightly-Rotated Pill Breed Label */}
              <div
                className={`-mt-4 z-10 px-3 py-1 rounded-full bg-cream-light border-[1.5px] border-espresso-border shadow-lip-sm ${pup.tilt}`}
              >
                <span className="font-sans font-semibold text-xs text-espresso whitespace-nowrap">
                  {pup.breed}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warm Cream Diagonal-Diamond Grid Band Transitioning into Section 2 */}
      <div className="w-full h-12 bg-diamond-grid border-b-[1.5px] border-espresso-border" />
    </section>
  );
};
