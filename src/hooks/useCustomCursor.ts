import { useState, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from './useMediaQuery';

/**
 * useCustomCursor Hook
 * 
 * Tracks the mouse pointer position smoothly using Framer Motion springs
 * and detects whether the cursor is currently hovering over an interactive element.
 * 
 * Performance design:
 * Uses MotionValues (pointerX, pointerY) so that high-frequency mousemove events
 * update the DOM transform directly via GPU without triggering React component re-renders.
 */
export function useCustomCursor() {
  const isFinePointer = useMediaQuery('(pointer: fine)');
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw cursor position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Snappy spring physics for smooth, responsive cursor follow
  const springConfig = { damping: 28, stiffness: 450, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!isFinePointer || typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsPressed(true);
    };

    const handleMouseUp = () => {
      setIsPressed(false);
    };

    // Detect if hovering over clickable / interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, select, textarea, .puppy-door, .pushpin-card, [data-cursor="paw"]'
      );

      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isFinePointer, isVisible, mouseX, mouseY]);

  return {
    isFinePointer,
    isVisible,
    isHovered,
    isPressed,
    x: smoothX,
    y: smoothY
  };
}

