import React, { useRef, useEffect } from 'react';

// Exact SVG Path2D string from reference site
const PAW_PATH = "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

interface PawStep {
  x: number;
  y: number;
  angle: number;
  born: number;
}

/**
 * PawTrailCanvas Component
 * 
 * High-performance 60fps canvas paw trail matching https://puppy.instabizweb.com/.
 * - Renders to an overlay <canvas>
 * - Rotates each paw print dynamically to face the direction of cursor travel
 * - Alternates left/right paw step offsets
 * - Fades smoothly over 1000ms
 * - Disabled on coarse touch pointers
 */
export const PawTrailCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Skip only on pure touch devices
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pawPath = new Path2D(PAW_PATH);
    const steps: PawStep[] = [];
    let dpr = 1;
    let animId = 0;
    let isRunning = false;
    let lastX = NaN;
    let lastY = NaN;
    let accumulatedDist = 0;
    let stepSide = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();

    const render = (now: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = steps.length - 1; i >= 0; i--) {
        const step = steps[i];
        const age = now - step.born;
        if (age > 1000) {
          steps.splice(i, 1);
          continue;
        }

        const fade = age < 600 ? 1 : 1 - (age - 600) / 400;
        ctx.globalAlpha = 0.45 * fade * fade;
        ctx.setTransform(0.27 * dpr, 0, 0, 0.27 * dpr, step.x * dpr, step.y * dpr);
        ctx.rotate(step.angle);
        ctx.translate(-32, -34);
        ctx.fillStyle = '#a24a1a';
        ctx.fill(pawPath);
      }

      if (steps.length > 0) {
        animId = requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      // Don't track touch pointers
      if ('pointerType' in e && e.pointerType === 'touch') return;

      if (Number.isNaN(lastX)) {
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);
      accumulatedDist += dist;

      if (accumulatedDist >= 44) {
        accumulatedDist = 0;
        // Direction angle: +90deg (PI/2) rotates the SVG paw (which faces up) to point along travel vector
        const angle = Math.atan2(dy, dx) + Math.PI / 2;
        stepSide = -stepSide;
        // Perpendicular offset for alternating left/right paw prints
        const perpAngle = angle + Math.PI / 2;
        const offsetDist = 9 * stepSide;

        steps.push({
          x: e.clientX + Math.cos(perpAngle) * offsetDist,
          y: e.clientY + Math.sin(perpAngle) * offsetDist,
          angle,
          born: performance.now(),
        });

        if (steps.length > 16) {
          steps.shift();
        }

        if (!isRunning) {
          isRunning = true;
          animId = requestAnimationFrame(render);
        }
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="paw-trail-canvas pointer-events-none fixed inset-0 z-[70] size-full"
    />
  );
};
