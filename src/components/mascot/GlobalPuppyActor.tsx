import React, { useEffect, useState, useRef } from 'react';
import { PoodleMascot, type PoodlePose } from './PoodleMascot';

/**
 * GlobalPuppyActor Component
 * 
 * 1. Hero Stage (scrollY <= 80px):
 *    - Teddy peeks over the quilt in Hero.
 *    - No footprints; footprints container hidden.
 * 2. Moving to Next Section (80px < scrollY < 650px):
 *    - Teddy steps down and walks smoothly toward Meet The Pups.
 *    - Stamps authentic puppy footprints along its exact walking trajectory!
 * 3. Arrived at Footpath (scrollY >= 650px):
 *    - Once Teddy arrives on the footpath of the next section, ALL footprints are immediately removed.
 *    - Footprints container hidden so sky in Meet The Pups stays completely clean.
 * 4. Fast scroll protection:
 *    - Immediate container hide (display: 'none') + clear ensures zero ghost footprints.
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
      const heroStop = document.getElementById('pup-stop-hero');
      const meetStop = document.getElementById('pup-stop-meet');

      if (!heroStop) {
        setPupState(prev => ({ ...prev, visible: false }));
        return;
      }

      const heroRect = heroStop.getBoundingClientRect();
      const scrollY = window.scrollY;

      // 1. Hero Stage: scrollY <= 80px (Peeking on quilt, no footprints)
      if (scrollY <= 80 || !meetStop) {
        clearAllFootprints();

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

      const meetRect = meetStop.getBoundingClientRect();

      // 2. Arrived at next section (Meet The Pups footpath: scrollY >= 650px)
      // When puppy arrives on footpath, remove all footprints and hide layer!
      if (scrollY >= 650) {
        clearAllFootprints();

        setPupState({
          visible: true,
          x: meetRect.left + meetRect.width / 2 - 150,
          y: meetRect.top + meetRect.height / 2 - 120,
          scale: 0.78,
          pose: 'side-walk',
          bubbleText: undefined
        });
        return;
      }

      // 3. Going to next section: 80px < scrollY < 650px
      // Show prints container and stamp footprints along the trail
      if (printsContainerRef.current) {
        printsContainerRef.current.style.display = 'block';
      }

      const t = Math.min(Math.max((scrollY - 80) / 520, 0), 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      // Document positions for stable, non-jumping coordinates
      const heroDocX = heroRect.left + heroRect.width / 2;
      const heroDocY = heroRect.top + scrollY + heroRect.height / 2;
      const meetDocX = meetRect.left + meetRect.width / 2;
      const meetDocY = meetRect.top + scrollY + meetRect.height / 2;

      const pupDocX = heroDocX + (meetDocX - heroDocX) * ease;
      const pupDocY = heroDocY + (meetDocY - heroDocY) * ease;

      const currentX = pupDocX - 150;
      const currentY = pupDocY - scrollY - 120;
      const currentScale = 1.15 + (0.78 - 1.15) * ease;
      const currentPose: PoodlePose = t > 0.12 ? 'side-walk' : 'peek';

      setPupState({
        visible: true,
        x: currentX,
        y: currentY,
        scale: currentScale,
        pose: currentPose,
        bubbleText: undefined
      });

      // Stamp footprints while walking between sections
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

            // Lateral offset for left vs right foot alternation
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
      {/* Absolute Document Footprints Layer (renders footprints along transition path) */}
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
