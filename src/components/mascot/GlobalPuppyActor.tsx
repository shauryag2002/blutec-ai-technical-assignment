import React, { useEffect, useState, useRef } from 'react';
import { PoodleMascot, type PoodlePose } from './PoodleMascot';

const STOP_CONFIGS: { id: string; defaultPose: PoodlePose; facing: 'left' | 'right'; act?: string; behind?: boolean }[] = [
  { id: 'pup-stop-hero', defaultPose: 'peek', facing: 'right', act: 'peekaboo', behind: true },
  { id: 'pup-stop-meet', defaultPose: 'side-walk', facing: 'right', act: 'treadmill' },
  { id: 'pup-stop-paths', defaultPose: 'sit', facing: 'right' },
  { id: 'pup-stop-journey', defaultPose: 'sit', facing: 'right' },
  { id: 'pup-stop-trust', defaultPose: 'sit', facing: 'right' },
  { id: 'pup-stop-families', defaultPose: 'sit', facing: 'right' },
  { id: 'pup-stop-questions', defaultPose: 'sit', facing: 'right', act: 'tilt' },
  { id: 'pup-stop-cta', defaultPose: 'bow', facing: 'right' },
  { id: 'pup-stop-footer', defaultPose: 'snug', facing: 'right', act: 'basket', behind: true }
];

/**
 * GlobalPuppyActor Component (Single Travelling Actor)
 * 
 * Replicates the PupJourney architecture from https://puppy.instabizweb.com/:
 * 1. Only ONE puppy actor travels continuously between stops across all sections.
 * 2. In Hero Stage (scrollY <= 80px):
 *    - Teddy peeks over the quilt blanket.
 *    - Footprints layer is hidden and clear.
 * 3. Moving to Next Section (Hero -> Meet The Pups footpath):
 *    - Teddy steps down and walks toward Meet The Pups.
 *    - Stamps authentic puppy footprints along its exact walking trajectory.
 * 4. Arrived at Next Section (scrollY >= meetArrival):
 *    - Once Teddy lands on the footpath in Meet The Pups, ALL footprints are immediately cleared.
 *    - Footprints layer hidden so sky and cards stay 100% clean.
 * 5. Fast Scroll Protection:
 *    - Instant clear on scroll threshold prevents ghost or stuck footprints.
 * 6. Responsive:
 *    - On desktop: travels through all stops down to the starry night woven basket.
 *    - On mobile: lane-aware edge docking and basket snuggle.
 */
export const GlobalPuppyActor: React.FC = () => {
  const [pupState, setPupState] = useState<{
    visible: boolean;
    x: number;
    y: number;
    scale: number;
    pose: PoodlePose;
    bubbleText?: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    scale: 1,
    pose: 'peek'
  });

  const [clickBubble, setClickBubble] = useState<string | undefined>(undefined);
  const printsContainerRef = useRef<HTMLDivElement>(null);
  const printsPoolRef = useRef<(SVGSVGElement | null)[]>([]);
  const printIndexRef = useRef(0);
  const stepCountRef = useRef(0);
  const lastStepRef = useRef<{ x: number; y: number } | null>(null);

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

  const handlePupClick = () => {
    const quotes = ['woof! 🐾', 'coming? 🐾', 'I like you! ❤️', 'yip! ✨'];
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    setClickBubble(q);
    setTimeout(() => setClickBubble(undefined), 2200);
  };

  useEffect(() => {
    let animId = 0;

    const updatePupPosition = () => {
      const scrollY = window.scrollY;
      const isMobile = window.innerWidth < 768;

      // 1. Locate all available stop elements in the DOM
      const activeStops: {
        config: typeof STOP_CONFIGS[0];
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
          const scale = cfg.id === 'pup-stop-hero' ? 1.15 :
                        cfg.id === 'pup-stop-meet' ? 0.78 :
                        cfg.id === 'pup-stop-footer' ? 0.85 :
                        Math.min(1.05, Math.max(0.72, rect.width / 240));

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

      if (activeStops.length === 0) {
        setPupState(prev => ({ ...prev, visible: false }));
        return;
      }

      const heroStop = activeStops.find(s => s.config.id === 'pup-stop-hero');
      const meetStop = activeStops.find(s => s.config.id === 'pup-stop-meet');

      // 2. HERO STAGE (scrollY <= 80px)
      if (scrollY <= 80 && heroStop) {
        clearAllFootprints();
        const heroRect = heroStop.el.getBoundingClientRect();
        setPupState({
          visible: true,
          x: heroRect.left + heroRect.width / 2 - 150,
          y: heroRect.top + heroRect.height / 2 - 120,
          scale: 1.15,
          pose: 'peek',
          bubbleText: undefined
        });
        return;
      }

      // Calculate arrival scroll for Meet The Pups footpath
      let meetArrivalScroll = 620;
      if (meetStop) {
        const meetDocTop = meetStop.docY - meetStop.rect.height / 2;
        meetArrivalScroll = Math.max(480, Math.min(750, meetDocTop - window.innerHeight * 0.55));
      }

      // 3. TRANSITION FROM HERO TO MEET THE PUPS (80px < scrollY < meetArrivalScroll)
      if (scrollY < meetArrivalScroll && heroStop && meetStop) {
        if (printsContainerRef.current) {
          printsContainerRef.current.style.display = 'block';
        }

        const t = Math.min(Math.max((scrollY - 80) / (meetArrivalScroll - 80), 0), 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        // Curved arc from Quilt down to Footpath
        const pupDocX = heroStop.docX + (meetStop.docX - heroStop.docX) * ease;
        const pupDocY = heroStop.docY + (meetStop.docY - heroStop.docY) * ease;

        const currentX = pupDocX - 150;
        const currentY = pupDocY - scrollY - 120;
        const currentScale = 1.15 + (meetStop.scale - 1.15) * ease;
        const currentPose: PoodlePose = t > 0.12 ? 'side-walk' : 'peek';

        setPupState({
          visible: true,
          x: currentX,
          y: currentY,
          scale: currentScale,
          pose: currentPose,
          bubbleText: undefined
        });

        // Stamp footprints along walking path
        if (currentPose === 'side-walk') {
          const footXDoc = pupDocX;
          const footYDoc = pupDocY + 70 * currentScale;

          if (!lastStepRef.current) {
            lastStepRef.current = { x: footXDoc, y: footYDoc };
          } else {
            const dx = footXDoc - lastStepRef.current.x;
            const dy = footYDoc - lastStepRef.current.y;
            const dist = Math.hypot(dx, dy);

            // Stamp every ~28px of travel
            if (dist >= 28) {
              stepCountRef.current++;
              const n = stepCountRef.current % 2;
              const angle = Math.atan2(dy, dx) + Math.PI / 2;

              // Left/Right foot alternation
              const normX = -dy / dist;
              const normY = dx / dist;
              const sideOffset = (n === 0 ? 1 : -1) * 8 * currentScale;
              const pawX = footXDoc + normX * sideOffset;
              const pawY = footYDoc + normY * sideOffset;

              const pool = printsPoolRef.current;
              if (pool.length > 0) {
                const svg = pool[printIndexRef.current % pool.length];
                printIndexRef.current++;
                if (svg) {
                  const sz = 16 * Math.max(0.75, currentScale);
                  svg.style.transform = `translate3d(${(pawX - sz / 2).toFixed(1)}px, ${(pawY - sz / 2).toFixed(1)}px, 0px) rotate(${angle.toFixed(3)}rad)`;
                  svg.style.width = `${sz.toFixed(1)}px`;
                  svg.style.height = `${sz.toFixed(1)}px`;
                  svg.style.opacity = '0.65';
                  svg.animate([
                    { opacity: 0 },
                    { opacity: 0.65, offset: 0.1 },
                    { opacity: 0.65, offset: 0.75 },
                    { opacity: 0 }
                  ], {
                    duration: 2500,
                    easing: 'ease-out'
                  });
                }
              }

              lastStepRef.current = { x: footXDoc, y: footYDoc };
            }
          }
        }
        return;
      }

      // 4. ARRIVED AT / PAST FOOTPATH: CLEAR ALL FOOTPRINTS
      clearAllFootprints();

      // On mobile without desktop treadmill pinned track:
      if (isMobile) {
        // Dock to footer basket when near footer
        const footerStop = activeStops.find(s => s.config.id === 'pup-stop-footer');
        if (footerStop && footerStop.rect.top < window.innerHeight * 0.8) {
          const rect = footerStop.rect;
          setPupState({
            visible: true,
            x: rect.left + rect.width / 2 - 150,
            y: rect.top + rect.height / 2 - 120,
            scale: 0.85,
            pose: 'snug',
            bubbleText: undefined
          });
          return;
        }

        // Side lane edge peeking on mobile matching reference site:
        // Alternates left and right screen margin so cards and buttons remain unobstructed
        const sceneIndex = Math.floor(scrollY / (window.innerHeight * 0.75));
        const isLeft = sceneIndex % 2 === 0;
        const peekScale = 0.46;
        const peekX = isLeft ? -132 : (window.innerWidth - 42);
        const peekY = window.innerHeight * 0.45;

        setPupState({
          visible: true,
          x: peekX,
          y: peekY,
          scale: peekScale,
          pose: 'peek',
          bubbleText: undefined
        });
        return;
      }

      // 5. DESKTOP MULTI-STOP TRAVELER (Meet -> Paths -> Journey -> Trust -> Families -> Questions -> CTA -> Footer)
      // Find the pair of stops that bracket the current scrollY
      // A stop is "in focus" when its document top is roughly in the viewport center
      const viewportMidY = scrollY + window.innerHeight * 0.5;

      // Find closest stops
      let currStopIdx = 1; // Start at Meet The Pups
      for (let i = 1; i < activeStops.length; i++) {
        if (activeStops[i].docY <= viewportMidY) {
          currStopIdx = i;
        } else {
          break;
        }
      }

      const fromStop = activeStops[currStopIdx];
      const toStop = activeStops[currStopIdx + 1];

      if (!toStop) {
        // We are at the final stop (Starry Footer Woven Basket)
        const rect = fromStop.el.getBoundingClientRect();
        setPupState({
          visible: true,
          x: rect.left + rect.width / 2 - 150,
          y: rect.top + rect.height / 2 - 120,
          scale: fromStop.scale,
          pose: fromStop.config.defaultPose,
          bubbleText: undefined
        });
        return;
      }

      // Interpolate between fromStop and toStop
      const dist = Math.max(1, toStop.docY - fromStop.docY);
      const rawT = (viewportMidY - fromStop.docY) / dist;
      const t = Math.min(Math.max(rawT, 0), 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      // Check if holding stationary at a stop
      const isHoldingFrom = t < 0.15;
      const isHoldingTo = t > 0.85;

      const pupDocX = fromStop.docX + (toStop.docX - fromStop.docX) * ease;
      const pupDocY = fromStop.docY + (toStop.docY - fromStop.docY) * ease;

      const currentX = pupDocX - 150;
      const currentY = pupDocY - scrollY - 120;
      const currentScale = fromStop.scale + (toStop.scale - fromStop.scale) * ease;

      let currentPose: PoodlePose;
      if (isHoldingFrom) {
        currentPose = fromStop.config.defaultPose;
      } else if (isHoldingTo) {
        currentPose = toStop.config.defaultPose;
      } else {
        currentPose = 'side-walk';
      }

      setPupState({
        visible: true,
        x: currentX,
        y: currentY,
        scale: currentScale,
        pose: currentPose,
        bubbleText: undefined
      });
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
      {/* Absolute Document Footprints Layer (renders footprints along Hero -> Meet path) */}
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

      {/* Fixed Viewport Mascot Layer */}
      {pupState.visible && (
        <div
          className="pup-layer fixed inset-0 pointer-events-none z-30 overflow-clip"
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
                transform: `scale(${pupState.scale.toFixed(3)})`,
                transformOrigin: 'center center'
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
