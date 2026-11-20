import React from 'react';
import { ShieldCheck, Plane, HeartHandshake, Globe } from 'lucide-react';
import { PassportStamp } from '../../components/ui/PassportStamp';
import { PoodleMascot } from '../../components/mascot/PoodleMascot';

const STAMPS_DATA = [
  {
    title: 'Vet-checked & healthy',
    description: 'Every puppy comes vaccinated, dewormed, and with a verified health certificate.',
    icon: <ShieldCheck className="w-8 h-8 text-emerald" />,
    color: '#1E7F4F',
    tiltDeg: -3
  },
  {
    title: 'Korea to Dubai, safely',
    description: 'Trusted breeders, safe travel, and premium care from start to finish.',
    icon: <Plane className="w-8 h-8 text-sky-deep" />,
    color: '#2F6E9E',
    tiltDeg: 4
  },
  {
    title: 'Support 24/7',
    description: 'Always here to help, from choosing your puppy to post-delivery support.',
    icon: <HeartHandshake className="w-8 h-8 text-terracotta" />,
    color: '#B8502D',
    tiltDeg: -4
  },
  {
    title: 'Trusted worldwide',
    description: 'Puppies delivered to loving homes all around the UAE and worldwide.',
    icon: <Globe className="w-8 h-8 text-honey-deep" />,
    color: '#D8A24A',
    tiltDeg: 3
  }
];

/**
 * PuppyPassportSection Component
 * 
 * Features:
 * - Styled as an open leather-bound Puppy Passport spread
 * - Sitting poodle mascot perched on the center passport spine
 * - 4 inked verified stamps with micro-watermarks
 * - Layered sunset silhouette of the Dubai skyline at the horizon
 */
export const PuppyPassportSection: React.FC = () => {
  return (
    <section className="relative pt-20 pb-0 bg-cream border-b-2 border-espresso overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center select-none">

        {/* Kicker & Headline */}
        <span className="font-script text-terracotta text-xl sm:text-2xl font-bold">
          puppy passport
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-espresso tracking-tight mt-1">
          Why families trust TeddyPups
        </h2>
        <p className="mt-3 font-sans text-base sm:text-lg text-espresso/80 max-w-2xl mx-auto">
          Every puppy carries a verified medical history, international microchip registry, and our lifelong commitment to your family.
        </p>

        {/* OPEN LEATHER PASSPORT BOOKLET */}
        <div className="relative mt-12 sm:mt-16 max-w-5xl mx-auto rounded-3xl border-[3px] border-espresso bg-[#FAF3E8] p-6 sm:p-10 shadow-hard-xl">

          {/* Leather Book Spine Crease Down Center */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-espresso/10 via-espresso/25 to-espresso/10 pointer-events-none z-10" />

          {/* Poodle Mascot Perched on Center Spine */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20">
            <PoodleMascot pose="sit" className="w-28 h-24" bubbleText="verified! 🐾" />
          </div>

          {/* Passport Top Banner */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-espresso/25 pb-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-xl">🐾</span>
              <span className="font-display font-black text-sm sm:text-base uppercase tracking-widest text-espresso">
                UNITED ARAB EMIRATES • PUPPY PASSPORT
              </span>
            </div>
            <span className="font-mono text-xs font-bold text-terracotta">
              SERIES 2026-DXB
            </span>
          </div>

          {/* 4 Inked Stamps Grid (2 Pages of Passport) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
            {STAMPS_DATA.map((stamp) => (
              <PassportStamp
                key={stamp.title}
                title={stamp.title}
                description={stamp.description}
                icon={stamp.icon}
                color={stamp.color}
                tiltDeg={stamp.tiltDeg}
              />
            ))}
          </div>

          {/* Official Footnote Stamp */}
          <div className="mt-8 pt-4 border-t border-espresso/15 flex items-center justify-between text-[11px] font-mono text-espresso/60">
            <span>ISSUED BY TEDDYPUPS CONCIERGE</span>
            <span>MOCCAE COMPLIANT & VET CERTIFIED</span>
          </div>

        </div>

      </div>

      {/* Layered Sunset Gradient & Dubai Skyline Silhouette */}
      <div className="relative mt-16 sm:mt-24 w-full h-36 sm:h-48 overflow-hidden pointer-events-none">
        {/* Warm Sunset Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#B8502D]/20 via-[#F2BE6B]/20 to-transparent" />

        {/* Dubai Skyline SVG */}
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-full text-espresso opacity-90"
          fill="currentColor"
        >
          <path d="M0 160V118h34v-14h22v-22h30v34h18V96h26v30h22v-18h16v-30h34v40h20V70h28v56h24V98h18v-26h30v54h20v-38h26v-40l14-6 14 6v40h22v46h18V84h26v-30h22v50h24V76h36v50h20V96h18v-58h30v44h14V96h22v-30h16v56h24V88h20v44h28V64l16-8 16 8v68h24v-40h20V50h28v72h20V88h18v-38h32v62h20V74h26v48h22V66h18v-32h32v78h18V76h26v46h24V84h18v-40h28v68h22V78h20V42h30v70h22v-44h26v56h20V90h16v42h32V58h28v74h20V94h24v38h20V62l14-6 14 6v64h22v-38h20V54h28v78h22V86h18v-28h30v64h24V84h22v48h30v-40h22V58h28v74h22V96h18v-44h30v60h24V78h20v54h28V72h22v60h18V90h26v42h22V76h16v-28h32v64h20V74h28v58h22V92h18v-44h32v64h24V74h20v58h28V84h22v48h18V96h26v36h22V84h16v-36h30v64h24V74h22v58h30v-42h20V60h28v72h22V88h18v-36h32v60h24V82h22v50h28V74h22v58h18V92h26v40h22V78h16v-30h32v64h20V72h28v60h22V94h18v-46h32v64h24V76h20v56h28V82h22v50h18V94h26v38h22V82h16v-34h30v64h24V72h22v60h30v-44h20V58h28v74h22V86h18v-38h32v64h24V80h22v52h28V72h22v60h18V90h26v42h22V76h16v-28h32v64h20V74h28v58h22V92h18v-44h32v64h24V74h20v58h28V84h22v48h18V96h26v36h22V84h16v-36h30v64h24V74h22v58h30v-42h20V60h28v72h22V88h18v-36h32v60h24V82h22v50h28V74h22v58h18V92h26v40h22V78h16v-30h32v64h20V72h28v60h22V94h18v-46h32v64h24V76h20v56h28V82h22v50h18V94h26v38h22V82h16v-34h30v64h24V72h22v60h30v-44h20V58h28v74h22V86h18v-38h32v64h24V80h22v52h28V72h22v60h18V90h26v42h22V76h16v-28h32v64h20V74h28v58h22V92h18v-44h32v64h24V74h20v58h28V84h22v48h18V96h26v36h22V84h16v-36h30v64h24V74h22v58h30v-42h20V60h28v72h22V88h18v-36h32v60h24V82h22v50h28V74h22v58h18V92h26v40h22V78h16v-30h32v64h20V72h28v60h22V94h18v-46h32v64h24V76h20v56h28V82h22v50h18V94h26v38h22V82h16v-34h30v64h24V72h22v60h30v-44h20V58h28v74h22V86h18v-38h32v64h24V80h22v52h28V72h22v60H0Z" />
        </svg>
      </div>
    </section>
  );
};

