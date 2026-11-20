import React, { useEffect, useState } from 'react';
import { PoodleMascot, type PoodlePose } from './PoodleMascot';

/**
 * GlobalPuppyActor Component
 * 
 * Unifies the puppy mascot between Hero Stage and Meet The Pups:
 * - At scroll 0 (Hero Stage), Teddy sits/peeks over the scalloped quilt fence at Stop 1.
 * - As the user scrolls down towards Meet The Pups, Teddy steps off the quilt, transforms
 *   into a walking pose, and smoothly walks down to Stop 2 on the wooden footpath.
 * - On the Meet The Pups footpath, Teddy walks along the wooden floor in front of the doors.
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

      // Hero stage: scrollY between 0 and 120px -> Peeking on the quilt
      if (scrollY <= 80 || !meetStop) {
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

      // Transition phase between Hero and Meet The Pups (scrollY: 80px to 650px)
      if (scrollY < 650) {
        const t = Math.min(Math.max((scrollY - 80) / 520, 0), 1);
        // Smooth easeInOut curve
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const xHero = heroRect.left + heroRect.width / 2 - 150;
        const yHero = heroRect.top + heroRect.height / 2 - 120;
        const xMeet = meetRect.left + meetRect.width / 2 - 150;
        const yMeet = meetRect.top + meetRect.height / 2 - 120;

        const currentX = xHero + (xMeet - xHero) * ease;
        const currentY = yHero + (yMeet - yHero) * ease;
        const currentScale = 1.15 + (0.78 - 1.15) * ease;

        setPupState({
          visible: true,
          x: currentX,
          y: currentY,
          scale: currentScale,
          pose: t > 0.12 ? 'side-walk' : 'peek',
          bubbleText: t > 0.4 ? 'coming? 🐾' : undefined
        });
        return;
      }

      // Arrived at Meet The Pups footpath (scrollY >= 650px)
      setPupState({
        visible: true,
        x: meetRect.left + meetRect.width / 2 - 150,
        y: meetRect.top + meetRect.height / 2 - 120,
        scale: 0.78,
        pose: 'side-walk',
        bubbleText: 'coming? 🐾'
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

  if (!pupState.visible) return null;

  return (
    <div
      className="pup-layer fixed inset-0 pointer-events-none z-30 overflow-clip"
      aria-hidden="true"
    >
      <div
        className="pup-actor absolute top-0 left-0 pointer-events-auto cursor-pointer"
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
            bubbleText={pupState.bubbleText}
            className="w-[300px] h-[240px]"
          />
        </div>
      </div>
    </div>
  );
};

