import { useEffect } from 'react';
import type { RefObject } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMediaQuery } from './useMediaQuery';

/**
 * useEyeTracking Hook
 * 
 * Tracks the cursor position relative to the mascot's center on screen.
 * Outputs spring-smoothed { x, y } offsets for specular highlights (up to ±3.5px)
 * and pupil movement (0.4x multiplier) without causing React re-renders.
 */
export function useEyeTracking(containerRef: RefObject<HTMLElement | SVGSVGElement | null>) {
  const isFinePointer = useMediaQuery('(pointer: fine)');

  // Raw coordinate offsets from center
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  // Smooth spring physics for natural, lifelike eye darting
  const springConfig = { damping: 25, stiffness: 350, mass: 0.1 };
  const smoothX = useSpring(targetX, springConfig);
  const smoothY = useSpring(targetY, springConfig);

  // Subtle pupil motion (40% of specular highlight range)
  const pupilX = useTransform(smoothX, (v) => v * 0.45);
  const pupilY = useTransform(smoothY, (v) => v * 0.45);

  useEffect(() => {
    if (!isFinePointer || typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      // Approximate center of mascot face
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.42;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance === 0) {
        targetX.set(0);
        targetY.set(0);
        return;
      }

      // Maximum eye offset travel in pixels
      const maxOffset = 3.5;
      // Normalization scale factor
      const factor = Math.min(distance / 250, 1);
      const angle = Math.atan2(dy, dx);

      targetX.set(Math.cos(angle) * maxOffset * factor);
      targetY.set(Math.sin(angle) * maxOffset * factor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef, isFinePointer, targetX, targetY]);

  return {
    highlightX: smoothX,
    highlightY: smoothY,
    pupilX,
    pupilY,
    isTrackingActive: isFinePointer
  };
}

