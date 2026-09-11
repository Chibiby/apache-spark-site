// path: src/components/fx/CustomCursor.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState<boolean>(false);

  const isEmbed =
    pathname?.startsWith('/embed') ||
    (typeof window !== 'undefined' && window.self !== window.top);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReduced || isEmbed) return;

    // Only enable on pointer-capable non-touch desktop screens
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    setEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let targetX = -100;
    let targetY = -100;
    let frameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updatePosition = () => {
      mouseX += (targetX - mouseX) * 0.45;
      mouseY += (targetY - mouseY) * 0.45;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      frameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    frameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [prefersReduced, isEmbed]);

  if (!enabled || prefersReduced || isEmbed) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999] select-none -translate-x-1/2 -translate-y-1/2 will-change-transform"
      aria-hidden="true"
    >
      {/* 20x20 precision drafting crosshair */}
      <div className="relative w-5 h-5">
        <div className="absolute left-0 top-[9.5px] w-5 h-[1px] bg-[#9E5430] opacity-80" />
        <div className="absolute top-0 left-[9.5px] h-5 w-[1px] bg-[#9E5430] opacity-80" />
      </div>
    </div>
  );
};
