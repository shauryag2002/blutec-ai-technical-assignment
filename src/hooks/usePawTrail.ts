import { useState, useEffect, useRef, useCallback } from 'react';
import { useMediaQuery } from './useMediaQuery';

export interface PawStep {
  id: number;
  x: number;
  y: number;
  rotation: number;
  side: 'left' | 'right';
}

/**
 * usePawTrail Hook
 * 
 * Spawns subtle, flat, semi-transparent paw-step silhouettes along the cursor travel path.
 * - Only active on desktop fine-pointer devices
 * - Requires at least ~40px of cursor travel before spawning next paw
 * - Alternates left/right foot offset (±6px perpendicular)
 * - Auto-fades over 700ms and caps max active paws to 18 for peak 60fps performance
 */
export function usePawTrail() {
  const isFinePointer = useMediaQuery('(pointer: fine)');
  const [paws, setPaws] = useState<PawStep[]>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const nextSide = useRef<'left' | 'right'>('left');
  const idCounter = useRef(0);

  const removePaw = useCallback((id: number) => {
    setPaws((prev) => prev.filter((p) => p.id !== id));
  }, []);

  useEffect(() => {
    if (!isFinePointer || typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      if (!lastPos.current) {
        lastPos.current = { x: currentX, y: currentY };
        return;
      }

      const dx = currentX - lastPos.current.x;
      const dy = currentY - lastPos.current.y;
      const dist = Math.hypot(dx, dy);

      // Only spawn after ~40px of cursor travel
      if (dist >= 40) {
        const angleRad = Math.atan2(dy, dx);
        const angleDeg = (angleRad * 180) / Math.PI + 90; // Face forward along travel direction

        // Perpendicular offset (±6px) for alternating left/right paw prints
        const side = nextSide.current;
        const perpAngle = angleRad + (side === 'left' ? -Math.PI / 2 : Math.PI / 2);
        const offsetX = Math.cos(perpAngle) * 6;
        const offsetY = Math.sin(perpAngle) * 6;

        const newPaw: PawStep = {
          id: ++idCounter.current,
          x: currentX + offsetX,
          y: currentY + offsetY,
          rotation: angleDeg,
          side
        };

        // Alternate side for next step
        nextSide.current = side === 'left' ? 'right' : 'left';
        lastPos.current = { x: currentX, y: currentY };

        setPaws((prev) => [...prev.slice(-17), newPaw]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFinePointer]);

  return { paws, removePaw, isFinePointer };
}

