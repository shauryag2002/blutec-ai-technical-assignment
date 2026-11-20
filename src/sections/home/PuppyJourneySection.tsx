import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { StickerButton } from '../../components/ui/StickerButton';
import { PoodleMascot } from '../../components/mascot/PoodleMascot';
import { useScrollStep } from '../../hooks/useScrollStep';

const STEPS = [
  {
    num: 1,
    title: 'Choose your breed',
    text: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
    botReply: "Welcome to TeddyPups! 🐾 Which breed has your heart today?",
    pills: ['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu']
  },
  {
    num: 2,
    title: 'Get photos & details',
    text: "Our team will share real photos, health details, and all necessary information directly on WhatsApp.",
    botReply: "Here are current video clips and verified health certificates for your favorite pups! 📹",
    pills: ['Watch video', 'View vet passport', 'Showroom visit']
  },
  {
    num: 3,
    title: 'Secure & safe delivery',
    text: "Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.",
    botReply: "Everything is set! Safe air-conditioned delivery is booked to your doorstep. ❤️",
    pills: ['Confirm delivery', 'Meet at showroom']
  }
];

export const PuppyJourneySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeStep, setActiveStep } = useScrollStep(containerRef, 3);
  const [selectedBreed, setSelectedBreed] = useState<string>('Maltipoo');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const currentStepData = STEPS[activeStep - 1] || STEPS[0];

  // Animate online -> typing... -> message on step change
  React.useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, 0);
    const stopTimer = setTimeout(() => {
      setIsTyping(false);
    }, 700);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(stopTimer);
    };
  }, [activeStep]);

  return (
    <section
      id="puppy-journey"
      ref={containerRef}
      className="relative py-20 sm:py-28 bg-[#FFFDF8] border-b-[1.5px] border-espresso-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Clean Editorial Numbered Steps on Cream Background (NO Heavy Boxes) */}
          <div className="lg:col-span-6">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-espresso tracking-tight">
              Your puppy journey
            </h2>
            <p className="mt-3 font-sans text-base sm:text-lg text-espresso-soft max-w-xl leading-relaxed">
              A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
            </p>

            {/* Clean Numbered Steps */}
            <ol className="mt-10 space-y-7">
              {STEPS.map((step) => {
                const isActive = activeStep === step.num;
                return (
                  <li
                    key={step.num}
                    onClick={() => setActiveStep(step.num)}
                    className="flex items-start gap-4 cursor-pointer select-none group"
                  >
                    {/* Step Number Circle */}
                    <div
                      className={`w-9 h-9 rounded-full border-[1.5px] border-espresso-border flex items-center justify-center font-display font-bold text-sm shrink-0 transition-colors ${
                        isActive
                          ? 'bg-terracotta text-cream-light shadow-lip-sm'
                          : 'bg-honey-soft text-espresso group-hover:bg-honey'
                      }`}
                    >
                      {step.num}
                    </div>

                    <div className="pt-0.5">
                      <h3
                        className={`font-display font-bold text-xl transition-colors ${
                          isActive ? 'text-espresso' : 'text-espresso/70 group-hover:text-espresso'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="mt-1 font-sans text-sm sm:text-base text-espresso-soft leading-relaxed max-w-md">
                        {step.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-9">
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

          {/* Center Mascot: Walking Down Steps Beside Smartphone */}
          <div className="hidden lg:flex lg:col-span-1 justify-center items-center">
            <PoodleMascot
              pose={activeStep === 3 ? 'sit' : 'side-walk'}
              className="w-24 h-20"
              bubbleText={activeStep === 3 ? 'all set! ❤️' : 'step ' + activeStep}
            />
          </div>

          {/* Right Column: Tilted Smartphone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              animate={{ rotate: [-1, 1, -1] }}
              transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
              className="relative w-76 sm:w-84 rounded-[38px] border-[3px] border-espresso-border bg-[#23170F] p-2.5 shadow-xl select-none"
            >
              {/* Phone Speaker Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-18 h-3.5 bg-[#23170F] rounded-full z-20 flex items-center justify-center">
                <div className="w-6 h-1 bg-white/20 rounded-full" />
              </div>

              {/* Phone Screen */}
              <div className="relative rounded-[30px] overflow-hidden bg-[#F2F5F8] h-[490px] flex flex-col justify-between border border-espresso/20">
                
                {/* Header (WhatsApp Style) */}
                <div className="bg-[#1E7F4F] text-white p-3.5 pt-6 flex items-center gap-3 shadow-xs z-10">
                  <div className="w-8 h-8 rounded-full border border-white/40 bg-honey-soft flex items-center justify-center text-espresso font-bold text-xs">
                    TP
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs tracking-tight">TeddyPups Concierge</h4>
                    <p className="font-sans text-[10px] text-white/80 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                      <span>{isTyping ? 'typing...' : 'online'}</span>
                    </p>
                  </div>
                </div>

                {/* Chat Message Stream */}
                <div className="p-3.5 flex-1 overflow-y-auto space-y-2.5 font-sans text-xs flex flex-col justify-end">
                  
                  {/* Incoming Bot Message */}
                  <div className="self-start max-w-[85%] bg-white border border-espresso/10 p-2.5 rounded-2xl rounded-tl-xs shadow-xs">
                    <p className="text-espresso leading-relaxed">
                      {isTyping ? '...' : currentStepData.botReply}
                    </p>
                    <span className="block text-[8px] text-espresso/40 text-right mt-0.5">10:42 AM</span>
                  </div>

                  {/* Outgoing User Selection Message */}
                  <AnimatePresence mode="wait">
                    {!isTyping && (
                      <motion.div
                        key={selectedBreed + activeStep}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="self-end max-w-[85%] bg-[#D7F8E4] border border-[#1E7F4F]/25 p-2.5 rounded-2xl rounded-tr-xs shadow-xs"
                      >
                        <p className="text-espresso font-medium">
                          I'm interested in the adorable {selectedBreed}! 🧸
                        </p>
                        <span className="block text-[8px] text-espresso/50 text-right mt-0.5">10:43 AM ✓✓</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Clean Breed Reply Pills (No "QUICK BREED SELECT:" Header) */}
                  <div className="pt-1.5">
                    <div className="flex flex-wrap gap-1.5">
                      {currentStepData.pills.map((pill) => (
                        <button
                          key={pill}
                          type="button"
                          onClick={() => setSelectedBreed(pill)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-sans font-semibold border transition-colors ${
                            selectedBreed === pill
                              ? 'bg-terracotta text-white border-espresso-border shadow-xs'
                              : 'bg-white text-espresso border-espresso/20 hover:border-espresso'
                          }`}
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Input Bar */}
                <div className="p-2.5 bg-white border-t border-espresso/10 flex items-center gap-2">
                  <div className="flex-1 bg-[#F2F5F8] px-3 py-1 rounded-full text-[11px] text-espresso/50 font-sans">
                    Type a message...
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#1E7F4F] flex items-center justify-center text-white text-xs">
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
