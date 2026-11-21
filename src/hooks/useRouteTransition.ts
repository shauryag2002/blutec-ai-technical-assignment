import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export type CurtainState = 'intro' | 'covering' | 'covered' | 'lifting' | 'idle';

/**
 * useRouteTransition Hook
 * 
 * Manages the authentic curtain states:
 * - 'intro': Initial full-page load blanket cover with running puppy, lifting after 0.56s (total 1.04s)
 * - 'covering': Subsequent route navigation blanket rising from bottom (320ms)
 * - 'lifting': Blanket lifting up to reveal new page (460ms)
 * - 'idle': Hidden, allowing full user interaction
 */
export function useRouteTransition() {
  const location = useLocation();
  const [curtainState, setCurtainState] = useState<CurtainState>('intro');
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Initial site boot: 'intro' state runs authentic CSS animation (1.04s)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const initialTimer = setTimeout(() => {
        setCurtainState('idle');
      }, 1040);
      return () => clearTimeout(initialTimer);
    }

    // Subsequent route transitions
    setCurtainState('covering');
    const coverTimer = setTimeout(() => {
      setCurtainState('lifting');
    }, 320);

    const idleTimer = setTimeout(() => {
      setCurtainState('idle');
    }, 780);

    return () => {
      clearTimeout(coverTimer);
      clearTimeout(idleTimer);
    };
  }, [location.pathname]);

  return { curtainState };
}
