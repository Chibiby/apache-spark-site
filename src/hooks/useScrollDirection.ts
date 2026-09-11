// path: src/hooks/useScrollDirection.ts
'use client';

import { useState, useEffect, useRef } from 'react';

export type ScrollDirection = 'up' | 'down' | 'none';

export function useScrollDirection(): { direction: ScrollDirection; scrollY: number } {
  const [direction, setDirection] = useState<ScrollDirection>('none');
  const [scrollY, setScrollY] = useState<number>(0);
  const prevScrollY = useRef<number>(0);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (frameId.current !== null) return;

      frameId.current = window.requestAnimationFrame(() => {
        const currentY = window.scrollY || window.pageYOffset;
        const diff = currentY - prevScrollY.current;

        if (Math.abs(diff) > 4) {
          setDirection(diff > 0 ? 'down' : 'up');
        }
        setScrollY(currentY);
        prevScrollY.current = currentY;
        frameId.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId.current !== null) {
        window.cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return { direction, scrollY };
}
