import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * useScrollStep Hook
 * 
 * Tracks the active step (1, 2, or 3) as the user scrolls through the
 * "Your Puppy Journey" section, updating the interactive phone mockup.
 */
export function useScrollStep(containerRef: RefObject<HTMLElement | null>, stepCount: number = 3) {
  const [activeStep, setActiveStep] = useState<number>(1);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far into the container we have scrolled (0 to 1)
      const totalDist = rect.height - windowHeight;
      if (totalDist <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalDist));

      // Map progress to step index
      const stepIndex = Math.min(stepCount, Math.floor(progress * stepCount) + 1);
      setActiveStep(stepIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerRef, stepCount]);

  return { activeStep, setActiveStep };
}
