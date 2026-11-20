import React from 'react';
import { motion } from 'framer-motion';
import { Store, Plane, ArrowRight } from 'lucide-react';
import { StickerButton } from '../../components/ui/StickerButton';

/**
 * TwoWaysSection Component
 * 
 * Features:
 * - Illustrated wooden signpost pointing to two adoption paths:
 *   1. "Puppies in Dubai" (Downtown Dubai showroom with striped awning & Dubai skyline)
 *   2. "Imported for you" (Airplane carrying puppy photo along dashed arc from Korea to Dubai)
 */
export const TwoWaysSection: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-28 bg-[#FDF6EC] border-b-2 border-espresso overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading & Central Signpost Icon */}
        <div className="text-center max-w-2xl mx-auto mb-16 select-none">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-espresso bg-honey-soft shadow-hard-sm mb-4">
            <span className="text-2xl">🧭</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-espresso tracking-tight">
            Two ways to meet your puppy
          </h2>
          <p className="mt-3 font-sans text-base sm:text-lg text-espresso/80">
            Whether you want to cuddle local puppies today or reserve a rare teacup import from Korea.
          </p>
        </div>

        {/* 2-Column Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* Card 1: Puppies in Dubai (In our showroom) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="sticker-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden bg-cream-light"
          >
            {/* Striped Shop Awning at top */}
            <div className="w-full h-8 rounded-t-xl overflow-hidden border-b-2 border-espresso flex mb-6">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-full ${i % 2 === 0 ? 'bg-terracotta' : 'bg-cream-light'
                    }`}
                />
              ))}
            </div>

            <div>
              {/* Badge & Title */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-espresso bg-honey-soft text-xs font-display font-bold text-espresso shadow-hard-sm">
                  <Store className="w-3.5 h-3.5 text-terracotta" />
                  <span>In our showroom</span>
                </span>
                <span className="font-sans text-xs text-espresso/60 font-semibold">Downtown Dubai</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-espresso mb-3">
                Puppies in Dubai
              </h3>
              <p className="font-sans text-sm sm:text-base text-espresso/80 leading-relaxed mb-6">
                Meet our locally available puppies in person! Visit our clean, welcoming Downtown Dubai showroom, spend time playing and bonding, and take your puppy home the very same day.
              </p>

              {/* Puppy in Showroom Photo with Dubai Skyline SVG Lineart */}
              <div className="relative rounded-2xl border-2 border-espresso overflow-hidden bg-espresso/5 mb-6 aspect-[16/9]">
                <img
                  src="https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FFHyoHcIosLZE%2F60f6e7e00a%2F27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg&w=1200&q=75"
                  alt="Puppies in Dubai Showroom"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                {/* Overlay Dubai Skyline Silhouette */}
                <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none opacity-85">
                  <svg viewBox="0 0 300 120" className="w-full h-full text-espresso" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28" />
                  </svg>
                </div>
              </div>
            </div>

            <StickerButton
              to="/puppies?collection=dubai"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Meet local puppies
            </StickerButton>
          </motion.div>

          {/* Card 2: Imported for you (Korea to Dubai) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="sticker-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden bg-cream-light"
          >
            {/* Top Passport Ribbon */}
            <div className="w-full h-8 rounded-t-xl bg-honey-soft border-b-2 border-espresso flex items-center justify-between px-4 mb-6">
              <span className="font-mono text-xs font-bold text-espresso tracking-widest uppercase">
                ICN ➔ DXB EXPRESS
              </span>
              <span className="text-sm">✈</span>
            </div>

            <div>
              {/* Badge & Title */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-espresso bg-[#BFDDF5] text-xs font-display font-bold text-espresso shadow-hard-sm">
                  <Plane className="w-3.5 h-3.5 text-sky-deep" />
                  <span>Imported upon request</span>
                </span>
                <span className="font-sans text-xs text-espresso/60 font-semibold">Korea ➔ Dubai</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-espresso mb-3">
                Imported for you
              </h3>
              <p className="font-sans text-sm sm:text-base text-espresso/80 leading-relaxed mb-6">
                Looking for an ultra-rare doll-face Korean Teacup or specific bloodline? We source directly from certified ethical breeders in Seoul, managing all flight logistics, permits, and nanny care.
              </p>

              {/* Flight Route Graphic: Airplane Arc from Korea to Dubai */}
              <div className="relative rounded-2xl border-2 border-espresso bg-[#EBF4FA] p-4 mb-6 aspect-[16/9] flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 660 300"
                  className="w-full h-full"
                  role="img"
                  aria-label="Plane bringing Korean Teacup puppy from Korea to Dubai"
                >
                  <defs>
                    <clipPath id="porthole-circle">
                      <circle cx="0" cy="0" r="28" />
                    </clipPath>
                  </defs>

                  {/* Flight Curve */}
                  <path
                    d="M40 250 C 170 40, 470 20, 620 168"
                    fill="none"
                    stroke="#2A1A14"
                    strokeWidth="3.5"
                    strokeDasharray="6 8"
                  />
                  {/* Origin & Destination Dots */}
                  <circle cx="40" cy="250" r="8" fill="#B8502D" stroke="#2A1A14" strokeWidth="2.5" />
                  <circle cx="620" cy="168" r="8" fill="#1E7F4F" stroke="#2A1A14" strokeWidth="2.5" />

                  <text x="40" y="286" textAnchor="middle" className="font-display font-bold text-sm fill-current text-espresso">
                    Seoul, Korea
                  </text>
                  <text x="620" y="206" textAnchor="middle" className="font-display font-bold text-sm fill-current text-espresso">
                    Dubai, UAE
                  </text>

                  {/* Airplane flying along arc with puppy porthole */}
                  <g transform="translate(390, 75)">
                    {/* Plane Wings & Body */}
                    <path d="M-60 -15 L-90 -50 L-65 -50 L-30 -20 Z" fill="#D9A773" stroke="#2A1A14" strokeWidth="2.5" />
                    <path d="M-80 0 C-80 -25 -50 -32 -20 -32 L60 -32 C90 -32 110 -15 118 0 C110 15 90 25 60 25 L-20 25 C-50 25 -80 18 -80 0 Z" fill="#FFFDF8" stroke="#2A1A14" strokeWidth="3" />
                    <path d="M-30 20 L0 55 L25 55 L10 20 Z" fill="#D9A773" stroke="#2A1A14" strokeWidth="2.5" />

                    {/* Circular Porthole Window with Puppy Picture */}
                    <g transform="translate(20, -5)">
                      <circle r="30" fill="#2A1A14" />
                      <image
                        href="https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FgAaGwoGej2g6%2F5523e884dd%2Fb942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg&w=128&q=75"
                        x="-28"
                        y="-28"
                        width="56"
                        height="56"
                        clipPath="url(#porthole-circle)"
                        preserveAspectRatio="xMidYMid slice"
                      />
                      <circle r="28" fill="none" stroke="#F2BE6B" strokeWidth="3" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            <StickerButton
              to="/puppies?collection=korean-teacup"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              See imported puppies
            </StickerButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

