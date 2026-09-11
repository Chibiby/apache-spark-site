// path: src/components/fx/MouseSpotlightBackground.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const MouseSpotlightBackground: React.FC = () => {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const bgRef = useRef<HTMLDivElement | null>(null);
  const crosshairHRef = useRef<HTMLDivElement | null>(null);
  const crosshairVRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const isEmbed =
    pathname?.startsWith('/embed') ||
    (typeof window !== 'undefined' && window.self !== window.top);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReduced || isEmbed) return;

    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    setMounted(true);

    let mouseX = -500;
    let mouseY = -500;
    let targetX = -500;
    let targetY = -500;
    let frameId: number;
    let isMoving = false;
    let moveTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isMoving = true;
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 1500);
    };

    const update = () => {
      // Smooth lerp interpolation for silky motion
      mouseX += (targetX - mouseX) * 0.12;
      mouseY += (targetY - mouseY) * 0.12;

      if (bgRef.current) {
        bgRef.current.style.background = `radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(158, 84, 48, 0.075) 0%, rgba(20, 24, 28, 0.025) 45%, transparent 75%)`;
      }

      if (crosshairHRef.current) {
        crosshairHRef.current.style.transform = `translate3d(0, ${mouseY}px, 0)`;
        crosshairHRef.current.style.opacity = isMoving ? '0.22' : '0.08';
      }

      if (crosshairVRef.current) {
        crosshairVRef.current.style.transform = `translate3d(${mouseX}px, 0, 0)`;
        crosshairVRef.current.style.opacity = isMoving ? '0.22' : '0.08';
      }

      frameId = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    frameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
      clearTimeout(moveTimeout);
    };
  }, [prefersReduced, isEmbed]);

  if (!mounted || prefersReduced || isEmbed) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Dynamic radial gradient illumination following cursor */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform transition-opacity duration-300" />

      {/* Subtle architectural axis guidelines intersecting at hover point */}
      <div
        ref={crosshairHRef}
        className="absolute left-0 right-0 top-0 h-[1px] bg-[#9E5430] pointer-events-none will-change-transform transition-opacity duration-500"
      />
      <div
        ref={crosshairVRef}
        className="absolute top-0 bottom-0 left-0 w-[1px] bg-[#9E5430] pointer-events-none will-change-transform transition-opacity duration-500"
      />
    </div>
  );
};
