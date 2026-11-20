import React, { useEffect, useState, useRef } from 'react';
import { PoodleMascot, type PoodlePose } from './PoodleMascot';

/**
 * GlobalPuppyActor Component
 * 
 * Unifies the puppy mascot between Hero Stage and Meet The Pups:
 * - At scroll 0 (Hero Stage), Teddy sits/peeks over the scalloped quilt fence at Stop 1.
 * - As the user scrolls down towards Meet The Pups, Teddy steps off the quilt, transforms
 *   into a walking pose, and smoothly walks down to Stop 2 on the wooden footpath.
 * - On the Meet The Pups footpath, Teddy walks along the wooden floor in front of the doors.
 * - While walking, stamps authentic puppy paw footprints ("foots") along the path!
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
  const printsPoolRef = useRef<(SVGSVGElement | null)[]>([]);
  const printIndexRef = useRef(0);
  const stepCountRef = useRef(0);
  const lastStepRef = useRef<{ x: number; y: number } | null>(null);

  const handlePupClick = () => {
    const quotes = ["woof! 🐾", "coming? 🐾", "I like you! ❤️", "yip! ✨"];
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

      // Hero stage: scrollY <= 80px -> Peeking on the quilt
      if (scrollY <= 80 || !meetStop) {
        lastStepRef.current = null;
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

      let currentX: number;
      let currentY: number;
      let currentScale: number;
      let currentPose: PoodlePose;

      // Transition phase between Hero and Meet The Pups (scrollY: 80px to 650px)
      if (scrollY < 650) {
        const t = Math.min(Math.max((scrollY - 80) / 520, 0), 1);
        // Smooth easeInOut curve
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const xHero = heroRect.left + heroRect.width / 2 - 150;
        const yHero = heroRect.top + heroRect.height / 2 - 120;
        const xMeet = meetRect.left + meetRect.width / 2 - 150;
        // Keep Teddy visible on screen as the wooden floor rises to meet him
        const yMeet = Math.min(meetRect.top + meetRect.height / 2 - 120, window.innerHeight - 130);

        currentX = xHero + (xMeet - xHero) * ease;
        currentY = yHero + (yMeet - yHero) * ease;
        currentScale = 1.15 + (0.78 - 1.15) * ease;
        currentPose = t > 0.12 ? 'side-walk' : 'peek';
      } else {
        // Arrived at Meet The Pups footpath (scrollY >= 650px)
        currentX = meetRect.left + meetRect.width / 2 - 150;
        currentY = meetRect.top + meetRect.height / 2 - 120;
        currentScale = 0.78;
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

      // Drop paw prints along the puppy's walking path
      if (currentPose === 'side-walk') {
        const footXDoc = currentX + 150 * currentScale;
        const footYDoc = currentY + scrollY + 215 * currentScale;

        if (!lastStepRef.current) {
          lastStepRef.current = { x: footXDoc, y: footYDoc };
        } else {
          const dx = footXDoc - lastStepRef.current.x;
          const dy = footYDoc - lastStepRef.current.y;
          const dist = Math.hypot(dx, dy);

          // Every ~32px of travel, stamp a paw print
          if (dist >= 30) {
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
                svg.animate([
                  { opacity: 0 },
                  { opacity: 0.65, offset: 0.08 },
                  { opacity: 0.65, offset: 0.7 },
                  { opacity: 0 }
                ], {
                  duration: 3400,
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
      {/* Absolute Document-Level Footprints Container */}
      <div
        aria-hidden="true"
        className="pup-prints absolute inset-0 pointer-events-none z-25 overflow-clip"
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
              willChange: 'transform',
              transition: 'transform 0.05s linear'
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

