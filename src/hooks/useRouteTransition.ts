import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useRouteTransition Hook
 * 
 * Controls the full-screen scalloped diamond-grid curtain transition
 * during initial app boot (900ms preloader) and subsequent route changes.
 */
export function useRouteTransition() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Initial site load preloader (900ms)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const initialTimer = setTimeout(() => {
        setIsTransitioning(false);
      }, 900);
      return () => clearTimeout(initialTimer);
    }

    // Subsequent route transitions (600ms)
    const showTimer = setTimeout(() => {
      setIsTransitioning(true);
    }, 0);

    const hideTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  return { isTransitioning };
}
