import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { StickerButton } from '../../components/ui/StickerButton';
import { useScrollStep } from '../../hooks/useScrollStep';

const STEPS = [
  {
    num: 1,
    title: 'Choose your breed',
    text: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
    botReply: "Welcome to TeddyPups U.A.E.! 🐾 Which breed has your heart today?",
    pills: ['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu']
  },
  {
    num: 2,
    title: 'Get photos & details',
    text: "Our team will share real photos, health details, and all necessary information directly on WhatsApp.",
    botReply: "Here are current video clips and verified health certificates for your favorite pups! 📹",
    pills: ['Watch video', 'View vet passport', 'Showroom appointment']
  },
  {
    num: 3,
    title: 'Secure & safe delivery',
    text: "Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.",
    botReply: "Everything is set! Safe air-conditioned delivery is booked to your doorstep. ❤️",
    pills: ['Confirm delivery', 'Meet at showroom']
  }
];

/**
 * PuppyJourneySection Component
 * 
 * Features:
 * - 3 numbered steps with scroll/tap synchronization
 * - Paired tilted smartphone mockup showing a live simulated WhatsApp concierge chat
 * - Typing indicators and interactive quick-reply breed pills
 * - Outlined "How it works" CTA button
 */
export const PuppyJourneySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeStep, setActiveStep } = useScrollStep(containerRef, 3);
  const [selectedBreed, setSelectedBreed] = useState<string>('Maltipoo');
  const currentStepData = STEPS[activeStep - 1] || STEPS[0];

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-28 bg-[#FFFDF8] border-b-2 border-espresso overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: 3 Numbered Steps */}
          <div className="lg:col-span-7">
            <span className="font-script text-terracotta text-xl sm:text-2xl font-bold">
              concierge service
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-espresso tracking-tight mt-1">
              Your puppy journey
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg text-espresso/75 max-w-xl leading-relaxed">
              A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
            </p>

            {/* Steps List */}
            <ol className="mt-10 space-y-6">
              {STEPS.map((step) => {
                const isActive = activeStep === step.num;
                return (
                  <motion.li
                    key={step.num}
                    onClick={() => setActiveStep(step.num)}
                    whileHover={{ x: 4 }}
                    className={`p-5 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer select-none ${isActive
                        ? 'bg-cream-soft border-espresso shadow-hard-md'
                        : 'bg-cream-light/60 border-espresso/30 hover:border-espresso'
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Step Number Circle */}
                      <div
                        className={`w-10 h-10 rounded-full border-2 border-espresso flex items-center justify-center font-display font-black text-lg shrink-0 ${isActive
                            ? 'bg-terracotta text-cream-light shadow-hard-sm'
                            : 'bg-honey-soft text-espresso'
                          }`}
                      >
                        {isActive ? <CheckCircle2 className="w-5 h-5 text-white" /> : step.num}
                      </div>

                      <div>
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-espresso">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 font-sans text-sm sm:text-base text-espresso/80 leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ol>

            <div className="mt-8">
              <StickerButton
                to="/how-it-works"
                variant="ghost"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                How it works
              </StickerButton>
            </div>
          </div>

          {/* Right Column: Tilted Smartphone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              animate={{ rotate: [-1.5, 1.5, -1.5] }}
              transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
              className="relative w-80 sm:w-88 rounded-[42px] border-[4px] border-espresso bg-espresso p-3 shadow-hard-xl select-none"
            >
              {/* Phone Speaker Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-4 bg-espresso rounded-full z-20 flex items-center justify-center">
                <div className="w-8 h-1 bg-white/20 rounded-full" />
              </div>

              {/* Phone Screen */}
              <div className="relative rounded-[34px] overflow-hidden bg-[#F2F5F8] h-[520px] flex flex-col justify-between border-2 border-espresso/20">

                {/* Phone Header (WhatsApp Style) */}
                <div className="bg-[#1E7F4F] text-white p-4 pt-7 flex items-center gap-3 shadow-sm z-10">
                  <div className="w-9 h-9 rounded-full border border-white/40 bg-honey-soft flex items-center justify-center text-espresso font-bold text-xs">
                    TP
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm tracking-tight">TeddyPups U.A.E.</h4>
                    <p className="font-sans text-[11px] text-white/80 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-light bg-green-300 animate-pulse" />
                      <span>online • concierge</span>
                    </p>
                  </div>
                </div>

                {/* Chat Message Stream */}
                <div className="p-4 flex-1 overflow-y-auto space-y-3 font-sans text-xs flex flex-col justify-end">

                  {/* Incoming Bot Message */}
                  <div className="self-start max-w-[85%] bg-white border border-espresso/15 p-3 rounded-2xl rounded-tl-xs shadow-sm">
                    <p className="text-espresso leading-relaxed">
                      {currentStepData.botReply}
                    </p>
                    <span className="block text-[9px] text-espresso/40 text-right mt-1">10:42 AM</span>
                  </div>

                  {/* Outgoing User Selection Message */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedBreed + activeStep}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="self-end max-w-[85%] bg-[#D7F8E4] border border-[#1E7F4F]/30 p-3 rounded-2xl rounded-tr-xs shadow-sm"
                    >
                      <p className="text-espresso font-medium">
                        I'm interested in the adorable {selectedBreed}! 🧸
                      </p>
                      <span className="block text-[9px] text-espresso/50 text-right mt-0.5">10:43 AM ✓✓</span>
                    </motion.div>
                  </AnimatePresence>

                  {/* Interactive Quick-Reply Breed Pills */}
                  <div className="pt-2">
                    <p className="text-[10px] text-espresso/60 font-semibold mb-1.5 uppercase tracking-wider">
                      Quick breed select:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {currentStepData.pills.map((pill) => (
                        <button
                          key={pill}
                          type="button"
                          onClick={() => setSelectedBreed(pill)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-display font-bold border transition-colors ${selectedBreed === pill
                              ? 'bg-terracotta text-white border-espresso shadow-xs'
                              : 'bg-white text-espresso border-espresso/20 hover:border-espresso'
                            }`}
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Phone Bottom Input Bar */}
                <div className="p-2.5 bg-white border-t border-espresso/15 flex items-center gap-2">
                  <div className="flex-1 bg-[#F2F5F8] px-3 py-1.5 rounded-full text-[11px] text-espresso/50">
                    Type a message...
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#1E7F4F] flex items-center justify-center text-white text-xs">
                    ➔
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

