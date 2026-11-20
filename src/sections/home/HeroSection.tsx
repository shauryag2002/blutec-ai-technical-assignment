import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { StickerButton } from '../../components/ui/StickerButton';
import { ScallopedDivider } from '../../components/ui/ScallopedDivider';
import { PoodleMascot } from '../../components/mascot/PoodleMascot';
import { CONTACT_DETAILS } from '../../data/navigation';

// 6 Featured breeds cycling through the hero arches
const HERO_ARCHES = [
  {
    breed: 'Maltipoo',
    images: [
      'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FZ0ToauDx7Eve%2F5fffe4d022%2Fb942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp&w=640&q=75',
      'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F3WJNmn6VVgVu%2F732f779474%2Fb942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg&w=640&q=75'
    ]
  },
  {
    breed: 'Shih Tzu',
    images: [
      'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FqNrTCSrsYyzY%2F168fa8c4ff%2Fb942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg&w=640&q=75',
      'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fcrgs9ih6as_M%2Fe37bafb1bf%2Fb942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg&w=640&q=75'
    ]
  },
  {
    breed: 'Pomeranian',
    images: [
      'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2F3yOfnmoyPooH%2F81e0c7e00c%2Fb942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg&w=640&q=75',
      'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2Fvzf7P8SPCZ-Q%2Fa8db4ee114%2Fb942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg&w=640&q=75'
    ]
  },
  {
    breed: 'Korean Teacup',
    images: [
      'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FgAaGwoGej2g6%2F5523e884dd%2Fb942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg&w=640&q=75',
      'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FEsAq2LSRvVCJ%2F4d553ed044%2Fb942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg&w=640&q=75'
    ]
  },
  {
    breed: 'Cavapoo',
    images: [
      'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FYQhey4j7uWvZ%2F3ea10db6c1%2Fb942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg&w=640&q=75',
      'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FO-6w4FYqE10j%2Fbe76f399cc%2Fb942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg&w=640&q=75'
    ]
  },
  {
    breed: 'Toy Poodle',
    images: [
      'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FxeMJCapr5vcU%2Fe618c653b2%2Fb942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg&w=640&q=75',
      'https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FvMu0BPvkAZ-j%2Fc65e53967d%2Fb942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg&w=640&q=75'
    ]
  }
];

/**
 * HeroSection Component
 * 
 * Features:
 * - Handwritten "every puppy is family" tagline with hand-drawn wavy underline
 * - Editorial serif headline & friendly subtitle
 * - Primary CTA to /puppies and secondary cream CTA to WhatsApp
 * - Poodle mascot peeking over center and performing smooth 3D flip tied to scroll
 * - 6 arched puppy portraits cycling breeds periodically
 * - Storybook diamond-grid quilt and scalloped hem border
 */
export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cycleIndex, setCycleIndex] = useState(0);

  // Periodically cycle puppy photos in the 6 arches
  useEffect(() => {
    const timer = setInterval(() => {
      setCycleIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Scroll-linked 3D flip transform for the peeking mascot
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  const mascotRotateY = useTransform(scrollYProgress, [0, 0.6], [0, 180]);

  return (
    <section ref={containerRef} className="relative pt-8 pb-16 sm:pb-24 overflow-hidden bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Handwritten Tagline with Wavy Underline */}
        <div className="inline-flex flex-col items-center select-none mb-3">
          <span className="font-script text-2xl sm:text-3xl text-terracotta-ink font-bold tracking-wide">
            every puppy is family
          </span>
          <svg className="w-44 sm:w-56 h-3 text-honey-deep -mt-1" viewBox="0 0 220 24" fill="none">
            <path
              d="M4 14 Q 55 4, 110 14 T 216 14"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Display Serif Headline */}
        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-espresso tracking-tight leading-[1.08] max-w-4xl mx-auto">
          <span>Premium teacup </span>
          <br className="hidden sm:inline" />
          <span className="text-terracotta">puppies in Dubai</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-5 text-base sm:text-lg lg:text-xl text-espresso/80 font-sans max-w-2xl mx-auto leading-relaxed">
          Meet your new best friend in our Downtown Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 select-none">
          <StickerButton
            to="/puppies"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            View available puppies
          </StickerButton>

          <StickerButton
            href={CONTACT_DETAILS.whatsappUrl}
            isExternal
            variant="ghost"
            size="lg"
            icon={<MessageCircle className="w-5 h-5 text-emerald" />}
          >
            Enquire on WhatsApp
          </StickerButton>
        </div>

        {/* Peeking Mascot Over The Arched Quilt */}
        <div className="relative mt-12 sm:mt-16 z-20 flex justify-center">
          <motion.div
            style={{ rotateY: mascotRotateY }}
            className="w-36 h-28 cursor-pointer select-none"
          >
            <PoodleMascot pose="peek" className="w-full h-full" bubbleText="hello! 🐾" />
          </motion.div>
        </div>

        {/* 6 Arched Puppy Portraits Strip */}
        <div className="relative -mt-6 z-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-6xl mx-auto">
            {HERO_ARCHES.map((arch) => (
              <div
                key={arch.breed}
                className="relative flex flex-col items-center bg-cream-light border-2 border-espresso rounded-t-full rounded-b-2xl p-2 pb-3 shadow-hard-md hover:shadow-hard-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Arched Photo Frame */}
                <div className="relative w-full aspect-[3/4] rounded-t-full rounded-b-xl overflow-hidden border border-espresso/20 bg-espresso/5">
                  <motion.img
                    key={cycleIndex}
                    initial={{ opacity: 0.4, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    src={arch.images[cycleIndex]}
                    alt={arch.breed}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  {/* Subtle inner top arch highlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25 pointer-events-none" />
                </div>

                {/* Breed Tag Under Arch */}
                <span className="mt-2 text-xs font-display font-bold text-espresso tracking-tight">
                  {arch.breed}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Scalloped Divider Band at bottom */}
      <div className="mt-14 w-full">
        <ScallopedDivider fillColor="#FFF1D8" borderColor="#2A1A14" />
      </div>
    </section>
  );
};
