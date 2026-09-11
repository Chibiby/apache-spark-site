// path: src/components/fx/DraftingGridBackground.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const DraftingGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  const isEmbed =
    pathname?.startsWith('/embed') ||
    (typeof window !== 'undefined' && window.self !== window.top);

  useEffect(() => {
    if (typeof window === 'undefined' || isEmbed || prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = width / 2;
    let targetY = height / 2;
    let isHovering = false;
    let alphaActivity = 0.4;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isHovering = true;
      alphaActivity = 1.0;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const GRID_SIZE = 64;

    const render = () => {
      // Smooth lerp to mouse position
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      if (!isHovering && alphaActivity > 0.3) {
        alphaActivity -= 0.005;
      }

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / GRID_SIZE) + 1;
      const rows = Math.ceil(height / GRID_SIZE) + 1;

      // Stable drafting grid points (no jarring magnetic distortion)
      const points: { x: number; y: number }[][] = [];

      for (let r = 0; r <= rows; r++) {
        points[r] = [];
        for (let c = 0; c <= cols; c++) {
          points[r][c] = { x: c * GRID_SIZE, y: r * GRID_SIZE };
        }
      }

      // 1. Draw horizontal grid lines
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(20, 24, 28, 0.04)';
      ctx.lineWidth = 1;

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p1 = points[r][c];
          const p2 = points[r][c + 1];
          if (p1 && p2) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.stroke();

      // 2. Draw vertical grid lines
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(20, 24, 28, 0.04)';
      ctx.lineWidth = 1;

      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r < rows; r++) {
          const p1 = points[r][c];
          const p2 = points[r + 1]?.[c];
          if (p1 && p2) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.stroke();

      // 3. Minimal Precision Cursor Reticle (unobtrusive, compact, subtle)
      if (isHovering && alphaActivity > 0.05) {
        const reticleRadius = 16;
        const tickLength = 3;

        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(158, 84, 48, ${0.25 * alphaActivity})`;

        // Delicate compact precision ring
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, reticleRadius, 0, Math.PI * 2);
        ctx.stroke();

        // 4 subtle cardinal ticks (top, bottom, left, right)
        ctx.beginPath();
        // Top
        ctx.moveTo(mouseX, mouseY - reticleRadius);
        ctx.lineTo(mouseX, mouseY - reticleRadius - tickLength);
        // Bottom
        ctx.moveTo(mouseX, mouseY + reticleRadius);
        ctx.lineTo(mouseX, mouseY + reticleRadius + tickLength);
        // Left
        ctx.moveTo(mouseX - reticleRadius, mouseY);
        ctx.lineTo(mouseX - reticleRadius - tickLength, mouseY);
        // Right
        ctx.moveTo(mouseX + reticleRadius, mouseY);
        ctx.lineTo(mouseX + reticleRadius + tickLength, mouseY);
        ctx.stroke();

        ctx.restore();
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrameId);
    };
  }, [isEmbed, prefersReduced]);

  if (isEmbed || prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none"
      aria-hidden="true"
    />
  );
};
