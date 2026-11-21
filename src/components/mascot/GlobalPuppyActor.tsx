import React, { useEffect, useState, useRef } from 'react';
import { PoodleMascot, type PoodlePose } from './PoodleMascot';

interface StopConfig {
  id: string;
  defaultPose: PoodlePose;
  facing: 'left' | 'right';
  act?: string;
  behind?: boolean;
}

const STOP_CONFIGS: StopConfig[] = [
  { id: 'pup-stop-hero', defaultPose: 'peek', facing: 'right', act: 'hero', behind: true },
  { id: 'pup-stop-meet', defaultPose: 'walk', facing: 'right', act: 'treadmill' },
  { id: 'pup-stop-paths', defaultPose: 'sit', facing: 'right' },
  { id: 'pup-stop-journey', defaultPose: 'sit', facing: 'right' },
  { id: 'pup-stop-trust', defaultPose: 'sit', facing: 'right' },
  { id: 'pup-stop-families', defaultPose: 'sit', facing: 'right' },
  { id: 'pup-stop-questions', defaultPose: 'sit', facing: 'right', act: 'tilt' },
  { id: 'pup-stop-cta', defaultPose: 'bow', facing: 'right' },
  { id: 'pup-stop-footer', defaultPose: 'snug', facing: 'right', act: 'basket', behind: true }
];

/**
 * GlobalPuppyActor Component (Single Roaming Actor)
 * 
 * Replicates the authentic PupJourney architecture from https://puppy.instabizweb.com/:
 * 1. ONLY ONE puppy actor travels continuously between stops across all sections.
 * 2. When html[data-pup] is active, all static placeholder SVGs are hidden.
 * 3. In Hero Stage (scrollY <= 60px):
 *    - Teddy peeks over the quilt blanket in the center.
 *    - Footprints layer is hidden and clear.
 * 4. Moving to Next Section (Hero -> Meet The Pups footpath / section-to-section):
 *    - Teddy walks toward the destination stop.
 *    - Stamps authentic puppy footprints along its exact walking trajectory.
 * 5. Arrived at Next Section (e.g. landed on footpath in Meet The Pups):
 *    - Instantly clears all footprints so the section and footpath remain 100% clean.
 * 6. Mobile Lane Mode:
 *    - Docks above the sticky bottom WhatsApp bar, peeking from alternating margins
 *      without obstructing any text, buttons, or cards.
 */
export const GlobalPuppyActor: React.FC = () => {
  const [pupState, setPupState] = useState<{
    visible: boolean;
    x: number;
    y: number;
    scale: number;
    pose: PoodlePose;
    facing: 'left' | 'right';
    origin?: string;
    bubbleText?: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    scale: 1,
    pose: 'peek',
    facing: 'right',
    origin: 'center center'
  });

  const [clickBubble, setClickBubble] = useState<string | undefined>(undefined);
  const printsContainerRef = useRef<HTMLDivElement>(null);
  const printsPoolRef = useRef<(SVGSVGElement | null)[]>([]);
  const printIndexRef = useRef(0);
  const stepCountRef = useRef(0);
  const lastStepRef = useRef<{ x: number; y: number } | null>(null);
  const wasTravelingRef = useRef(false);

  const clearAllFootprints = () => {
    lastStepRef.current = null;
    if (printsContainerRef.current) {
      printsContainerRef.current.style.display = 'none';
    }
    printsPoolRef.current.forEach(svg => {
      if (svg) {
        svg.style.opacity = '0';
        try {
          svg.getAnimations().forEach(anim => anim.cancel());
        } catch {
          // ignore
        }
      }
    });
  };

  const stampFootprint = (footDocX: number, footDocY: number, angle: number, scale: number) => {
    if (printsContainerRef.current) {
      printsContainerRef.current.style.display = 'block';
    }
    const pool = printsPoolRef.current;
    if (pool.length === 0) return;

    const svg = pool[printIndexRef.current % pool.length];
    printIndexRef.current++;
    if (!svg) return;

    const sz = 16 * Math.max(0.75, scale);
    svg.style.transform = `translate3d(${(footDocX - sz / 2).toFixed(1)}px, ${(footDocY - sz / 2).toFixed(1)}px, 0px) rotate(${angle.toFixed(3)}rad)`;
    svg.style.width = `${sz.toFixed(1)}px`;
    svg.style.height = `${sz.toFixed(1)}px`;
    svg.style.opacity = '0.55';

    try {
      svg.animate([
        { opacity: 0 },
        { opacity: 0.55, offset: 0.1 },
        { opacity: 0.55, offset: 0.65 },
        { opacity: 0 }
      ], {
        duration: 2600,
        easing: 'ease-out'
      });
    } catch {
      // fallback
    }
  };

  const handlePupClick = () => {
    const quotes = ['woof! 🐾', 'coming? 🐾', 'I like you! ❤️', 'yip! ✨', 'achoo! 🐶'];
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    setClickBubble(q);
    setTimeout(() => setClickBubble(undefined), 2200);
  };

  useEffect(() => {
    let animId = 0;

    const updatePupPosition = () => {
      const scrollY = window.scrollY;
      const isMobile = window.innerWidth < 768;

      // Set global dataset flag to ensure ONLY ONE puppy is visible
      document.documentElement.dataset.pup = isMobile ? 'lane' : 'live';

      // 1. Locate all stop elements in the DOM
      const activeStops: {
        config: StopConfig;
        el: HTMLElement;
        docX: number;
        docY: number;
        rect: DOMRect;
        scale: number;
      }[] = [];

      for (const cfg of STOP_CONFIGS) {
        const el = document.getElementById(cfg.id);
        if (el && el.offsetParent !== null) {
          const rect = el.getBoundingClientRect();
          const docX = rect.left + rect.width / 2;
          const docY = rect.top + scrollY + rect.height / 2;
          const scale = cfg.id === 'pup-stop-hero' || cfg.id === 'pup-stop-footer'
            ? rect.width / 300
            : cfg.id === 'pup-stop-meet' ? 0.78
            : Math.min(1.0, Math.max(0.72, rect.width / 240));

          activeStops.push({
            config: cfg,
            el,
            docX,
            docY,
            rect,
            scale
          });
        }
      }

      // If on mobile or on pages with fewer than 2 stops (non-home pages),
      // disable roaming actor and let natural section buddies render with zero flicker/disappearing
      if (activeStops.length < 2 || isMobile) {
        clearAllFootprints();
        delete document.documentElement.dataset.pup;
        setPupState(prev => ({ ...prev, visible: false }));
        return;
      }

      const heroStop = activeStops.find(s => s.config.id === 'pup-stop-hero');
      const meetStop = activeStops.find(s => s.config.id === 'pup-stop-meet');

      // 2. HERO STAGE (scrollY <= 60px)
      if (scrollY <= 60 && heroStop) {
        clearAllFootprints();
        wasTravelingRef.current = false;
        const heroRect = heroStop.el.getBoundingClientRect();
        setPupState({
          visible: true,
          x: heroRect.left,
          y: heroRect.top,
          scale: heroRect.width / 300,
          pose: 'peek',
          facing: 'right',
          origin: '0 0',
          bubbleText: undefined
        });
        return;
      }

      // 4. DESKTOP HERO -> MEET THE PUPS TRANSITION WITH AUTHENTIC FOOTPRINTS
      // Calculate exact scroll range for the walking journey to Meet The Pups footpath
      let meetArrivalScroll = 780;
      if (meetStop) {
        const meetSection = meetStop.el.closest('section');
        if (meetSection) {
          const sRect = meetSection.getBoundingClientRect();
          meetArrivalScroll = sRect.top + scrollY - window.innerHeight * 0.15;
        }
      }

      // Traveling between Hero and Meet The Pups footpath
      if (scrollY < meetArrivalScroll && heroStop && meetStop) {
        wasTravelingRef.current = true;
        const t = Math.min(Math.max((scrollY - 60) / (meetArrivalScroll - 60), 0), 1);
        // Smoothstep interpolation
        const ease = t * t * (3 - 2 * t);

        const pupDocX = heroStop.docX + (meetStop.docX - heroStop.docX) * ease;
        const pupDocY = heroStop.docY + (meetStop.docY - heroStop.docY) * ease;

        const currentX = pupDocX - 150;
        const currentY = pupDocY - scrollY - 120;
        const currentScale = heroStop.scale + (meetStop.scale - heroStop.scale) * ease;
        const currentPose: PoodlePose = t > 0.08 ? 'side-walk' : 'peek';

        setPupState({
          visible: true,
          x: currentX,
          y: currentY,
          scale: currentScale,
          pose: currentPose,
          facing: 'right',
          bubbleText: undefined
        });

        // Stamp footprints along the journey
        if (currentPose === 'side-walk') {
          const footXDoc = pupDocX;
          const footYDoc = pupDocY + 68 * currentScale;

          if (!lastStepRef.current) {
            lastStepRef.current = { x: footXDoc, y: footYDoc };
          } else {
            const dx = footXDoc - lastStepRef.current.x;
            const dy = footYDoc - lastStepRef.current.y;
            const dist = Math.hypot(dx, dy);

            // Stamp every 28px of travel
            if (dist >= 28) {
              stepCountRef.current++;
              const n = stepCountRef.current % 2;
              const angle = Math.atan2(dy, dx) + Math.PI / 2;

              // Alternating left/right paws
              const normX = -dy / dist;
              const normY = dx / dist;
              const sideOffset = (n === 0 ? 1 : -1) * 7.5 * currentScale;
              const pawX = footXDoc + normX * sideOffset;
              const pawY = footYDoc + normY * sideOffset;

              stampFootprint(pawX, pawY, angle, currentScale);
              lastStepRef.current = { x: footXDoc, y: footYDoc };
            }
          }
        }
        return;
      }

      // 5. ARRIVED ON MEET THE PUPS FOOTPATH: IMMEDIATELY REMOVE FOOTPRINTS!
      if (wasTravelingRef.current) {
        clearAllFootprints();
        wasTravelingRef.current = false;
      }

      // Check if inside Meet The Pups pinned/treadmill zone
      if (meetStop) {
        const meetSection = meetStop.el.closest('section');
        if (meetSection) {
          const sRect = meetSection.getBoundingClientRect();
          // If Meet The Pups is currently active in viewport
          if (sRect.top <= 100 && sRect.bottom >= window.innerHeight * 0.4) {
            clearAllFootprints();
            const rect = meetStop.el.getBoundingClientRect();
            setPupState({
              visible: true,
              x: rect.left + rect.width / 2 - 150,
              y: rect.top + rect.height / 2 - 120,
              scale: meetStop.scale,
              pose: 'walk',
              facing: 'right',
              bubbleText: undefined
            });
            return;
          }
        }
      }

      // Check if user has scrolled near the footer / basket:
      // Hand off cleanly to native basket puppy nestled inside .tp-basket
      const footerStop = activeStops.find(s => s.config.id === 'pup-stop-footer');
      const isAtBottom = (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 100) ||
                         (footerStop && footerStop.rect.top <= window.innerHeight);

      if (footerStop && isAtBottom) {
        clearAllFootprints();
        setPupState(prev => ({ ...prev, visible: false }));
        return;
      }

      // 6. MULTI-STOP DESKTOP TRAVELER FOR SUBSEQUENT SECTIONS
      // Find active section stop
      const viewportMidY = scrollY + window.innerHeight * 0.5;
      let currStopIdx = 0;
      for (let i = 0; i < activeStops.length; i++) {
        if (activeStops[i].docY <= viewportMidY) {
          currStopIdx = i;
        } else {
          break;
        }
      }

      const fromStop = activeStops[currStopIdx];
      if (!fromStop) {
        setPupState(prev => ({ ...prev, visible: false }));
        return;
      }
      const toStop = activeStops[currStopIdx + 1];

      if (!toStop) {
        // Reached Final Stop: Starry Night Woven Basket
        clearAllFootprints();
        setPupState(prev => ({ ...prev, visible: false }));
        return;
      }

      // Interpolation between stops
      const dist = Math.max(1, toStop.docY - fromStop.docY);
      const rawT = (viewportMidY - fromStop.docY) / dist;
      const t = Math.min(Math.max(rawT, 0), 1);
      const ease = t * t * (3 - 2 * t);

      // Settle into footer basket when approaching footer stop
      if (toStop.config.id === 'pup-stop-footer' && (t >= 0.5 || (footerStop && footerStop.rect.top <= window.innerHeight))) {
        clearAllFootprints();
        setPupState(prev => ({ ...prev, visible: false }));
        return;
      }

      // Section Hold Windows: Holding at a stop vs Traveling between stops
      const isHoldingFrom = t < 0.2;
      const isHoldingTo = t > 0.8;

      if (isHoldingFrom || isHoldingTo) {
        // Holding at stop: footprints removed!
        clearAllFootprints();
        const stop = isHoldingFrom ? fromStop : toStop;
        if (stop.config.id === 'pup-stop-footer') {
          setPupState(prev => ({ ...prev, visible: false }));
          return;
        }
        const rect = stop.el.getBoundingClientRect();
        setPupState({
          visible: true,
          x: rect.left + rect.width / 2 - 150,
          y: rect.top + rect.height / 2 - 120,
          scale: stop.scale,
          pose: stop.config.defaultPose,
          facing: stop.config.facing,
          origin: 'center center',
          bubbleText: undefined
        });
        return;
      }

      // In transit between sections: walk and stamp footprints
      const pupDocX = fromStop.docX + (toStop.docX - fromStop.docX) * ease;
      const pupDocY = fromStop.docY + (toStop.docY - fromStop.docY) * ease;
      const currentX = pupDocX - 150;
      const currentY = pupDocY - scrollY - 120;
      const currentScale = fromStop.scale + (toStop.scale - fromStop.scale) * ease;
      const facing = toStop.docX >= fromStop.docX ? 'right' : 'left';

      setPupState({
        visible: true,
        x: currentX,
        y: currentY,
        scale: currentScale,
        pose: 'side-walk',
        facing,
        bubbleText: undefined
      });

      // Stamp footprints while traveling to the next section
      const footXDoc = pupDocX;
      const footYDoc = pupDocY + 68 * currentScale;

      if (!lastStepRef.current) {
        lastStepRef.current = { x: footXDoc, y: footYDoc };
      } else {
        const dx = footXDoc - lastStepRef.current.x;
        const dy = footYDoc - lastStepRef.current.y;
        const stepDist = Math.hypot(dx, dy);

        if (stepDist >= 28) {
          stepCountRef.current++;
          const n = stepCountRef.current % 2;
          const angle = Math.atan2(dy, dx) + Math.PI / 2;
          const normX = -dy / stepDist;
          const normY = dx / stepDist;
          const sideOffset = (n === 0 ? 1 : -1) * 7.5 * currentScale;
          const pawX = footXDoc + normX * sideOffset;
          const pawY = footYDoc + normY * sideOffset;

          stampFootprint(pawX, pawY, angle, currentScale);
          lastStepRef.current = { x: footXDoc, y: footYDoc };
        }
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(updatePupPosition);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    updatePupPosition();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Absolute Document Footprints Layer */}
      <div
        ref={printsContainerRef}
        aria-hidden="true"
        className="pup-prints absolute inset-0 pointer-events-none z-25 overflow-clip"
        style={{ display: 'none' }}
      >
        {Array.from({ length: 36 }).map((_, idx) => (
          <svg
            key={idx}
            ref={el => { printsPoolRef.current[idx] = el; }}
            viewBox="0 0 64 64"
            className="absolute top-0 left-0 w-4 h-4 fill-[#C2622B] opacity-0 pointer-events-none will-change-transform"
            aria-hidden="true"
          >
            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
          </svg>
        ))}
      </div>

      {/* Viewport Fixed Roaming Mascot Layer */}
      {pupState.visible && (
        <div
          className="pup-layer fixed inset-0 pointer-events-none z-[15] overflow-clip"
          aria-hidden="true"
        >
          <div
            className="pup-actor absolute top-0 left-0 pointer-events-auto cursor-pointer"
            onClick={handlePupClick}
            style={{
              transform: `translate3d(${pupState.x.toFixed(2)}px, ${pupState.y.toFixed(2)}px, 0px)`,
              willChange: 'transform'
            }}
          >
            <div
              className="pup-actor__body"
              style={{
                transform: `scale(${pupState.scale.toFixed(4)}) ${pupState.facing === 'left' ? 'scaleX(-1)' : ''}`,
                transformOrigin: pupState.origin || 'center center'
              }}
            >
              <PoodleMascot
                pose={pupState.pose}
                bubbleText={clickBubble}
                className="w-[300px] h-[240px]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
