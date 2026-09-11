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

      // Calculate grid points with magnetic pull distortion around cursor
      const points: { x: number; y: number }[][] = [];
      const INFLUENCE_RADIUS = 280;

      for (let r = 0; r <= rows; r++) {
        points[r] = [];
        for (let c = 0; c <= cols; c++) {
          const originalX = c * GRID_SIZE;
          const originalY = r * GRID_SIZE;

          const dx = originalX - mouseX;
          const dy = originalY - mouseY;
          const dist = Math.hypot(dx, dy);

          let displacedX = originalX;
          let displacedY = originalY;

          if (dist < INFLUENCE_RADIUS && dist > 0) {
            // Subtle elastic magnetic pull toward mouse
            const force = Math.pow(1 - dist / INFLUENCE_RADIUS, 2) * 12;
            displacedX -= (dx / dist) * force;
            displacedY -= (dy / dist) * force;
          }

          points[r][c] = { x: displacedX, y: displacedY };
        }
      }

      // 1. Draw horizontal grid lines
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(20, 24, 28, 0.06)';
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
      ctx.strokeStyle = 'rgba(20, 24, 28, 0.06)';
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

      // 3. Technical Grid Crosshairs (+) at points near cursor
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const p = points[r][c];
          if (!p) continue;
          const dist = Math.hypot(p.x - mouseX, p.y - mouseY);

          if (dist < 220) {
            const intensity = (1 - dist / 220) * alphaActivity;
            ctx.strokeStyle = `rgba(158, 84, 48, ${0.4 * intensity})`;
            ctx.lineWidth = 1;

            const arm = 4;
            ctx.beginPath();
            ctx.moveTo(p.x - arm, p.y);
            ctx.lineTo(p.x + arm, p.y);
            ctx.moveTo(p.x, p.y - arm);
            ctx.lineTo(p.x, p.y + arm);
            ctx.stroke();

            // Connect nearby nodes to mouse with whisper line
            if (dist < 140) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(158, 84, 48, ${0.12 * (1 - dist / 140) * alphaActivity})`;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouseX, mouseY);
              ctx.stroke();
            }
          }
        }
      }

      // 4. Architectural Caliper Guides passing through cursor
      ctx.lineWidth = 1;

      // Horizontal guide line
      ctx.beginPath();
      ctx.strokeStyle = `rgba(158, 84, 48, ${0.18 * alphaActivity})`;
      ctx.moveTo(0, mouseY);
      ctx.lineTo(width, mouseY);
      ctx.stroke();

      // Vertical guide line
      ctx.beginPath();
      ctx.strokeStyle = `rgba(158, 84, 48, ${0.18 * alphaActivity})`;
      ctx.moveTo(mouseX, 0);
      ctx.lineTo(mouseX, height);
      ctx.stroke();

      // Millimeter ruler graduation ticks along axis within 240px of cursor
      ctx.strokeStyle = `rgba(20, 24, 28, ${0.25 * alphaActivity})`;
      ctx.fillStyle = `rgba(124, 117, 104, ${0.7 * alphaActivity})`;
      ctx.font = '8px ui-monospace, SFMono-Regular, Menlo, monospace';

      for (let offset = -240; offset <= 240; offset += 16) {
        if (offset === 0) continue;

        const isMajor = offset % 64 === 0;
        const tickLength = isMajor ? 6 : 3;

        // Ticks on horizontal axis
        const tickX = mouseX + offset;
        if (tickX > 0 && tickX < width) {
          ctx.beginPath();
          ctx.moveTo(tickX, mouseY - tickLength);
          ctx.lineTo(tickX, mouseY + tickLength);
          ctx.stroke();

          if (isMajor) {
            ctx.fillText(`${offset > 0 ? '+' : ''}${offset}`, tickX - 10, mouseY - 9);
          }
        }

        // Ticks on vertical axis
        const tickY = mouseY + offset;
        if (tickY > 0 && tickY < height) {
          ctx.beginPath();
          ctx.moveTo(mouseX - tickLength, tickY);
          ctx.lineTo(mouseX + tickLength, tickY);
          ctx.stroke();

          if (isMajor) {
            ctx.fillText(`${offset > 0 ? '+' : ''}${offset}`, mouseX + 9, tickY + 3);
          }
        }
      }

      // 5. Compass Drafting Arcs & Dimension Circles
      ctx.save();
      ctx.setLineDash([4, 6]);

      // Inner compass circle
      ctx.beginPath();
      ctx.strokeStyle = `rgba(158, 84, 48, ${0.22 * alphaActivity})`;
      ctx.arc(mouseX, mouseY, 96, 0, Math.PI * 2);
      ctx.stroke();

      // Outer compass circle
      ctx.beginPath();
      ctx.strokeStyle = `rgba(20, 24, 28, ${0.12 * alphaActivity})`;
      ctx.arc(mouseX, mouseY, 192, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // Drafting angle rays (45° and 135°)
      const rayLen = 70;
      const rad45 = Math.PI / 4;
      const rad135 = (3 * Math.PI) / 4;

      ctx.save();
      ctx.setLineDash([2, 4]);
      ctx.strokeStyle = `rgba(158, 84, 48, ${0.16 * alphaActivity})`;

      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(mouseX + Math.cos(rad45) * rayLen, mouseY + Math.sin(rad45) * rayLen);
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(mouseX + Math.cos(rad135) * rayLen, mouseY + Math.sin(rad135) * rayLen);
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(mouseX + Math.cos(-rad45) * rayLen, mouseY + Math.sin(-rad45) * rayLen);
      ctx.moveTo(mouseX, mouseY);
      ctx.lineTo(mouseX + Math.cos(-rad135) * rayLen, mouseY + Math.sin(-rad135) * rayLen);
      ctx.stroke();
      ctx.restore();

      // Dimension labels
      ctx.fillStyle = `rgba(158, 84, 48, ${0.65 * alphaActivity})`;
      ctx.fillText('R:96MM', mouseX + 70, mouseY - 70);
      ctx.fillStyle = `rgba(124, 117, 104, ${0.5 * alphaActivity})`;
      ctx.fillText('R:192MM', mouseX + 138, mouseY - 138);

      // 6. Real-time Coordinate Telemetry Block
      const telemX = mouseX + 18;
      const telemY = mouseY + 24;

      ctx.fillStyle = `rgba(20, 24, 28, ${0.7 * alphaActivity})`;
      ctx.fillText(`X:${Math.round(mouseX)} Y:${Math.round(mouseY)}`, telemX, telemY);

      ctx.fillStyle = `rgba(158, 84, 48, ${0.75 * alphaActivity})`;
      ctx.fillText(`DRAFT // 64MM`, telemX, telemY + 11);

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
