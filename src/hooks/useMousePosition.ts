// path: src/hooks/useMousePosition.ts
'use client';

import { useState, useEffect, useRef } from 'react';

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
  isInside: boolean;
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    isInside: false,
  });

  const frameId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      if (frameId.current !== null) return;

      frameId.current = window.requestAnimationFrame(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        setPosition({
          x: e.clientX,
          y: e.clientY,
          normalizedX: w > 0 ? (e.clientX / w) * 2 - 1 : 0,
          normalizedY: h > 0 ? (e.clientY / h) * 2 - 1 : 0,
          isInside: true,
        });
        frameId.current = null;
      });
    };

    const handleMouseLeave = () => {
      setPosition((prev) => ({ ...prev, isInside: false }));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (frameId.current !== null) {
        window.cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return position;
}
