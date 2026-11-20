import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { StickerButton } from '../../components/ui/StickerButton';
import { PoodleMascot } from '../../components/mascot/PoodleMascot';

export const TwoWaysSection: React.FC = () => {
  return (
    <section id="two-ways" className="relative py-20 sm:py-28 bg-[#FDF6EC] border-b-[1.5px] border-espresso-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 select-none">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-espresso tracking-tight">
            Two ways to meet your puppy
          </h2>
          <p className="mt-3 font-sans text-base sm:text-lg text-espresso-soft">
            Whether you want to cuddle local puppies today or reserve a rare teacup import from Korea.
          </p>
        </div>

        {/* Central Illustrated Wooden Signpost with Peeking Poodle Mascot */}
        <div className="relative flex justify-center items-center mb-12 select-none">
          <div className="relative flex flex-col items-center">
            
            {/* Wooden Signpost Arms */}
            <div className="relative flex items-center justify-center z-10">
              {/* Left Sign Arm */}
              <div className="bg-wood text-cream-light font-display font-bold text-sm sm:text-base px-6 py-2.5 rounded-l-full border-[1.5px] border-espresso-border shadow-lip-sm -mr-2">
                ← Puppies in Dubai
              </div>

              {/* Central Wooden Post Pole */}
              <div className="w-6 h-28 bg-[#9E4B2E] border-[1.5px] border-espresso-border rounded-t-lg shadow-sm z-20" />

              {/* Right Sign Arm */}
              <div className="bg-[#4A2C20] text-cream-light font-display font-bold text-sm sm:text-base px-6 py-2.5 rounded-r-full border-[1.5px] border-espresso-border shadow-lip-sm -ml-2">
                Imported for you →
              </div>
            </div>

            {/* Mascot Peeking from Behind the Signpost */}
            <div className="absolute -top-16 z-0">
              <PoodleMascot pose="signpost-peek" className="w-28 h-24" bubbleText="which way? 🐾" />
            </div>
          </div>
        </div>

        {/* 2 Open, Airy Illustrated Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Card: Puppies in Dubai (In our showroom) */}
          <motion.div
            whileHover={{ y: -3 }}
            className="story-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden bg-cream-light"
          >
            {/* Striped Shop Awning at Top */}
            <div className="w-full h-8 rounded-t-xl overflow-hidden border-b-[1.5px] border-espresso-border flex mb-5">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-full ${
                    i % 2 === 0 ? 'bg-terracotta' : 'bg-cream-light'
                  }`}
                />
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-script text-terracotta text-lg font-bold">
                  In our showroom
                </span>
                <span className="font-sans text-xs text-espresso-soft/80 font-medium">Downtown Dubai</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-espresso mb-2.5">
                Puppies in Dubai
              </h3>
              <p className="font-sans text-sm sm:text-base text-espresso-soft leading-relaxed mb-6">
                Meet our locally available puppies in person! Visit our clean, welcoming Downtown Dubai showroom, spend time playing and bonding, and take your puppy home the very same day.
              </p>

              {/* Puppy in Showroom Photo with Dubai Skyline SVG Lineart */}
              <div className="relative rounded-2xl border-[1.5px] border-espresso-border overflow-hidden bg-espresso/5 mb-6 aspect-[16/9]">
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
                  <svg viewBox="0 0 300 120" className="w-full h-full text-espresso" fill="none" stroke="currentColor" strokeWidth="2">
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

          {/* Right Card: Imported for you (Korea to Dubai) */}
          <motion.div
            whileHover={{ y: -3 }}
            className="story-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden bg-cream-light"
          >
            {/* Top Plane Header Ribbon */}
            <div className="w-full h-8 rounded-t-xl bg-[#BFDDF5]/40 border-b-[1.5px] border-espresso-border flex items-center justify-between px-4 mb-5">
              <span className="font-sans text-xs font-semibold text-espresso">
                Seoul to Dubai express
              </span>
              <span className="text-sm">✈</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-script text-sky-deep text-lg font-bold">
                  Imported upon request
                </span>
                <span className="font-sans text-xs text-espresso-soft/80 font-medium">Korea ➔ Dubai</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-espresso mb-2.5">
                Imported for you
              </h3>
              <p className="font-sans text-sm sm:text-base text-espresso-soft leading-relaxed mb-6">
                Looking for an ultra-rare doll-face Korean Teacup or specific bloodline? We source directly from certified ethical breeders in Seoul, managing all flight logistics, permits, and nanny care.
              </p>

              {/* Flight Route Graphic: Airplane Arc from Korea to Dubai */}
              <div className="relative rounded-2xl border-[1.5px] border-espresso-border bg-[#F2F7FC] p-4 mb-6 aspect-[16/9] flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 660 300"
                  className="w-full h-full"
                  role="img"
                  aria-label="Plane bringing Korean Teacup puppy from Korea to Dubai"
                >
                  <defs>
                    <clipPath id="porthole-circle-two-ways">
                      <circle cx="0" cy="0" r="28" />
                    </clipPath>
                  </defs>

                  {/* Flight Curve */}
                  <path
                    d="M40 250 C 170 40, 470 20, 620 168"
                    fill="none"
                    stroke="#23170F"
                    strokeWidth="3"
                    strokeDasharray="6 8"
                  />
                  <circle cx="40" cy="250" r="7" fill="#B8502D" stroke="#23170F" strokeWidth="2" />
                  <circle cx="620" cy="168" r="7" fill="#1E7F4F" stroke="#23170F" strokeWidth="2" />

                  <text x="40" y="286" textAnchor="middle" className="font-sans font-bold text-xs fill-current text-espresso">
                    Seoul, Korea
                  </text>
                  <text x="620" y="206" textAnchor="middle" className="font-sans font-bold text-xs fill-current text-espresso">
                    Dubai, UAE
                  </text>

                  {/* Airplane flying along arc with puppy porthole */}
                  <g transform="translate(390, 75)">
                    <path d="M-60 -15 L-90 -50 L-65 -50 L-30 -20 Z" fill="#D9A773" stroke="#23170F" strokeWidth="2" />
                    <path d="M-80 0 C-80 -25 -50 -32 -20 -32 L60 -32 C90 -32 110 -15 118 0 C110 15 90 25 60 25 L-20 25 C-50 25 -80 18 -80 0 Z" fill="#FFFDF8" stroke="#23170F" strokeWidth="2" />
                    <path d="M-30 20 L0 55 L25 55 L10 20 Z" fill="#D9A773" stroke="#23170F" strokeWidth="2" />

                    <g transform="translate(20, -5)">
                      <circle r="30" fill="#23170F" />
                      <image
                        href="https://puppy.instabizweb.com/_next/image?url=%2Fmedia%2FgAaGwoGej2g6%2F5523e884dd%2Fb942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg&w=128&q=75"
                        x="-28"
                        y="-28"
                        width="56"
                        height="56"
                        clipPath="url(#porthole-circle-two-ways)"
                        preserveAspectRatio="xMidYMid slice"
                      />
                      <circle r="28" fill="none" stroke="#F2BE6B" strokeWidth="2.5" />
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
