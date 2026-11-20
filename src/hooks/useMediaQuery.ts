import { useSyncExternalStore } from 'react';

/**
 * useMediaQuery Hook
 * 
 * Subscribes to window.matchMedia using React's useSyncExternalStore.
 * Avoids cascading renders and adheres to React 18+ external store conventions.
 * 
 * Breakpoints align with standard Tailwind rules:
 * - isMobile: < 768px (sm / md boundary)
 * - isTablet: 768px - 1023px
 * - isDesktop: >= 1024px (lg / xl)
 * - isFinePointer: '@media (pointer: fine)' -> mouse/trackpad desktop
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      const mediaQueryList = window.matchMedia(query);
      
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener('change', callback);
        return () => mediaQueryList.removeEventListener('change', callback);
      } else {
        mediaQueryList.addListener(callback);
        return () => mediaQueryList.removeListener(callback);
      }
    },
    () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false),
    () => false
  );
}

export function useResponsive() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isFinePointer = useMediaQuery('(pointer: fine)');

  return { isMobile, isTablet, isDesktop, isFinePointer };
}
