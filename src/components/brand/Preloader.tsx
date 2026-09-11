// path: src/components/brand/Preloader.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  CUE_SHEET,
  easeOutCubic,
  easeInOutQuart,
  easeOutBack,
  seg,
} from '@/lib/animations';
import { BRAND_COLORS, BRAND_GEOMETRY } from '@/lib/constants';

const TAGS = ['SOFTWARE', 'SYSTEMS', 'NETWORKS', 'INFRASTRUCTURE'];

export const Preloader: React.FC = () => {
  const pathname = usePathname();
  const [active, setActive] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Disable in embeds or iframes
    if (pathname?.startsWith('/embed')) {
      setActive(false);
      return;
    }
    if (typeof window !== 'undefined' && window.self !== window.top) {
      setActive(false);
      return;
    }

    // SessionStorage single-play check
    try {
      if (sessionStorage.getItem('spark-preloader-seen') === '1') {
        setActive(false);
        return;
      }
      sessionStorage.setItem('spark-preloader-seen', '1');
    } catch {
      // Ignore in restricted environments
    }

    const root = containerRef.current;
    if (!root) return;

    // Lock scrolling while preloader runs
    const originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    // Reduced motion check
    const reduce =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // DOM references
    const gh = root.querySelector<HTMLDivElement>('[data-guide-h]');
    const gv = root.querySelector<HTMLDivElement>('[data-guide-v]');
    const grid = root.querySelector<HTMLDivElement>('[data-grid]');
    const cross = root.querySelector<HTMLDivElement>('[data-cross]');
    const markWrap = root.querySelector<HTMLDivElement>('[data-mark-wrap]');
    const edgeLines = root.querySelectorAll<SVGLineElement>('[data-edge-line]');
    const innerLines = root.querySelectorAll<SVGLineElement>('[data-inner-line]');
    const vertRects = root.querySelectorAll<SVGRectElement>('[data-vert-rect]');
    const slot = root.querySelector<HTMLDivElement>('[data-slot]');
    const w1 = root.querySelector<HTMLSpanElement>('[data-w1]');
    const w2 = root.querySelector<HTMLSpanElement>('[data-w2]');
    const rule = root.querySelector<HTMLDivElement>('[data-rule]');
    const tagEls = root.querySelectorAll<HTMLElement>('[data-tag-item]');
    const sheetNote = root.querySelector<HTMLDivElement>('[data-sheet-note]');
    const scaleNote = root.querySelector<HTMLDivElement>('[data-scale-note]');
    const draft = root.querySelector<HTMLDivElement>('[data-draft]');
    const sweep = root.querySelector<HTMLDivElement>('[data-sweep]');
    const tickEls = root.querySelectorAll<HTMLDivElement>('[data-tick-item]');

    let markTarget = 0;
    let vw = window.innerWidth;
    let vh = window.innerHeight;

    function measure() {
      vw = window.innerWidth;
      vh = window.innerHeight;
      if (slot) {
        const s = slot.getBoundingClientRect();
        markTarget = s.top + s.height / 2 - vh / 2;
      }
      tickEls.forEach((t) => {
        const frac = Number(t.dataset.frac || 0);
        t.style.left = `${Math.round(frac * vw)}px`;
      });
    }

    measure();
    window.addEventListener('resize', measure);

    function frame(t: number) {
      const { LOCATE, DRAFT, SET, PRINT } = CUE_SHEET;

      const guideH = seg(t, LOCATE, 0.46, easeInOutQuart);
      const guideV = seg(t, LOCATE + 0.1, 0.46, easeInOutQuart);
      const travel = seg(t, SET - 0.1, 0.5, easeInOutQuart);
      const lift = seg(t, PRINT + 0.02, 0.32, easeInOutQuart);
      const scaffold = 1 - seg(t, SET + 0.12, 0.44, easeInOutQuart);
      const sweepP = seg(t, PRINT, 0.34, easeInOutQuart);

      if (gh) {
        gh.style.transform = `scaleX(${guideH})`;
        gh.style.opacity = String(scaffold);
      }
      if (gv) {
        gv.style.transform = `scaleY(${guideV})`;
        gv.style.opacity = String(scaffold);
      }
      if (grid) {
        grid.style.opacity = String(guideH * 0.7 * scaffold);
      }

      tickEls.forEach((n) => {
        const x = Number(n.dataset.frac || 0) * vw;
        const p = (guideH * vw - x) / 70;
        n.style.opacity = String(Math.max(0, Math.min(1, p)) * scaffold);
      });

      if (cross) {
        cross.style.opacity = String(seg(t, LOCATE + 0.32, 0.26, easeOutBack) * scaffold);
      }

      edgeLines.forEach((n, i) => {
        n.setAttribute(
          'stroke-dashoffset',
          String(1 - seg(t, DRAFT + i * 0.11, 0.3, easeInOutQuart))
        );
      });

      innerLines.forEach((n, i) => {
        n.setAttribute(
          'stroke-dashoffset',
          String(1 - seg(t, DRAFT + 0.38 + i * 0.075, 0.26, easeInOutQuart))
        );
      });

      vertRects.forEach((n, i) => {
        n.setAttribute(
          'opacity',
          String(seg(t, DRAFT + 0.48 + i * 0.055, 0.22, easeOutCubic))
        );
      });

      if (markWrap) {
        markWrap.style.transform = `translate(0, ${travel * markTarget}px) scale(${
          1 - travel * 0.12
        })`;
      }

      if (w1) {
        w1.style.clipPath = `inset(0 ${
          (1 - seg(t, SET + 0.1, 0.34, easeInOutQuart)) * 100
        }% 0 0)`;
      }

      if (w2) {
        w2.style.clipPath = `inset(0 ${
          (1 - seg(t, SET + 0.26, 0.32, easeInOutQuart)) * 100
        }% 0 0)`;
      }

      if (rule) {
        rule.style.transform = `scaleX(${seg(t, SET + 0.46, 0.3, easeInOutQuart)})`;
      }

      tagEls.forEach((n, i) => {
        n.style.opacity = String(seg(t, SET + 0.52 + i * 0.032, 0.26, easeOutBack));
      });

      if (sheetNote) {
        sheetNote.style.opacity = String(seg(t, 0.04, 0.3, easeOutBack) * 0.8 * scaffold);
      }

      if (scaleNote) {
        scaleNote.style.opacity = String(seg(t, 0.16, 0.3, easeOutBack) * 0.8 * scaffold);
      }

      if (draft) {
        draft.style.opacity = String(1 - lift);
        draft.style.transform = `translateY(${lift * -34}px)`;
      }

      if (sweep) {
        sweep.style.opacity = sweepP > 0 && sweepP < 1 ? '1' : '0';
        sweep.style.transform = `translateX(${sweepP * vw}px)`;
      }

      if (root) {
        root.style.opacity = String(1 - seg(t, PRINT + 0.16, 0.34, easeInOutQuart));
      }
    }

    let isDone = false;
    function finish() {
      if (isDone) return;
      isDone = true;
      window.removeEventListener('resize', measure);
      window.removeEventListener('keydown', skip);
      document.documentElement.style.overflow = originalOverflow;
      setActive(false);
    }

    if (reduce) {
      frame(CUE_SHEET.PRINT);
      const timer = setTimeout(finish, 900);
      return () => {
        clearTimeout(timer);
        document.documentElement.style.overflow = originalOverflow;
      };
    }

    const t0 = performance.now ? performance.now() : Date.now();
    let pageReady = document.readyState === 'complete';
    if (!pageReady) {
      window.addEventListener('load', () => {
        pageReady = true;
      });
    }

    let holdMs = 0;
    let heldBefore = 0;
    let holdStart: number | null = null;

    function skip() {
      if (holdStart !== null) {
        pageReady = true;
        heldBefore = CUE_SHEET.MIN_HOLD * 1000;
      }
    }

    root.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);

    let animationId: number;

    function tick() {
      const now = performance.now ? performance.now() : Date.now();
      const t = (now - t0 - holdMs) / 1000;

      if (
        t >= CUE_SHEET.PRINT &&
        (!pageReady ||
          heldBefore + (holdStart === null ? 0 : now - holdStart) <
            CUE_SHEET.MIN_HOLD * 1000)
      ) {
        if (holdStart === null) holdStart = now;
        if (now - holdStart >= CUE_SHEET.HOLD_CAP * 1000) {
          pageReady = true;
        } else {
          holdMs = heldBefore + (now - holdStart);
          frame(CUE_SHEET.PRINT);
          animationId = requestAnimationFrame(tick);
          return;
        }
      }

      if (holdStart !== null) {
        holdMs = heldBefore + (now - holdStart);
        heldBefore = holdMs;
        holdStart = null;
      }

      frame(Math.min(t, CUE_SHEET.TOTAL));

      if (t < CUE_SHEET.TOTAL) {
        animationId = requestAnimationFrame(tick);
      } else {
        finish();
      }
    }

    frame(0);
    animationId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', measure);
      window.removeEventListener('keydown', skip);
      document.documentElement.style.overflow = originalOverflow;
    };
  }, [pathname]);

  if (!active || pathname?.startsWith('/embed')) return null;

  return (
    <div
      ref={containerRef}
      data-spark-preloader
      className="fixed inset-0 z-[2147483000] overflow-hidden bg-[#F2EFE8] cursor-pointer select-none"
      style={{ pointerEvents: 'auto' }}
      aria-hidden="true"
    >
      <div data-draft className="absolute inset-0">
        {/* 72px repeating grid */}
        <div
          data-grid
          className="absolute inset-0 opacity-0 bg-grid-draft pointer-events-none"
        />

        {/* Viewport-wide construction guides */}
        <div
          data-guide-h
          className="absolute left-0 top-1/2 w-full h-[1px] bg-[rgba(20,24,28,0.30)] origin-[0_50%]"
        />
        <div
          data-guide-v
          className="absolute left-1/2 top-0 w-[1px] h-full bg-[rgba(20,24,28,0.30)] origin-[50%_0]"
        />

        {/* 15 measurement ticks */}
        <div className="absolute left-0 top-1/2 w-full h-0">
          {Array.from({ length: 15 }).map((_, i) => {
            const major = i % 2 === 0;
            return (
              <div
                key={i}
                data-tick-item
                data-frac={String(i / 14)}
                className="absolute w-[1px] bg-[rgba(20,24,28,0.34)] opacity-0"
                style={{
                  top: major ? '-16px' : '-9px',
                  height: major ? '16px' : '9px',
                }}
              />
            );
          })}
        </div>

        {/* Origin crosshair */}
        <div data-cross className="absolute left-1/2 top-1/2 w-0 h-0 opacity-0">
          <div className="absolute left-[-14px] top-0 w-[28px] h-[1px] bg-[#9E5430]" />
          <div className="absolute left-0 top-[-14px] w-[1px] h-[28px] bg-[#9E5430]" />
        </div>

        {/* Drafted mark container */}
        <div
          data-mark-wrap
          className="absolute left-1/2 top-1/2 w-0 h-0 origin-center"
        >
          <svg
            viewBox="-120 -120 240 240"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible w-[clamp(110px,22vmin,264px)] h-[clamp(110px,22vmin,264px)]"
          >
            {BRAND_GEOMETRY.edges.map((e, i) => (
              <line
                key={`edge-${i}`}
                data-edge-line
                x1={e[0]}
                y1={e[1]}
                x2={e[2]}
                y2={e[3]}
                pathLength="1"
                stroke={BRAND_COLORS.ink}
                strokeWidth="7"
                strokeLinecap="square"
                strokeDasharray="1 1"
                strokeDashoffset="1"
              />
            ))}
            {BRAND_GEOMETRY.edges.map((e, i) => (
              <line
                key={`inner-${i}`}
                data-inner-line
                x1={e[0] * BRAND_GEOMETRY.innerScale}
                y1={e[1] * BRAND_GEOMETRY.innerScale}
                x2={e[2] * BRAND_GEOMETRY.innerScale}
                y2={e[3] * BRAND_GEOMETRY.innerScale}
                pathLength="1"
                stroke={BRAND_COLORS.accent}
                strokeWidth="7"
                strokeLinecap="square"
                strokeDasharray="1 1"
                strokeDashoffset="1"
              />
            ))}
            {BRAND_GEOMETRY.vertices.map((v, i) => (
              <rect
                key={`vert-${i}`}
                data-vert-rect
                x={v[0] - 5}
                y={v[1] - 5}
                width={10}
                height={10}
                fill={BRAND_COLORS.ink}
                opacity="0"
              />
            ))}
          </svg>
        </div>

        {/* Lockup target column */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-[clamp(14px,3vmin,30px)] w-[min(92vw,1100px)] pointer-events-none">
          <div
            data-slot
            className="shrink-0 w-[clamp(110px,22vmin,264px)] h-[clamp(110px,22vmin,264px)]"
          />
          <div className="flex justify-center whitespace-nowrap leading-[1.02] font-sans text-[clamp(30px,8.4vmin,92px)] tracking-[-0.01em]">
            <span
              data-w1
              className="inline-block font-normal text-[#7C7568]"
              style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
              APACHE&nbsp;
            </span>
            <span
              data-w2
              className="inline-block font-bold text-[#14181C]"
              style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
              SPARK
            </span>
          </div>

          <div
            data-rule
            className="w-[min(78vw,560px)] h-[2px] bg-[#9E5430] origin-[0_50%]"
            style={{ transform: 'scaleX(0)' }}
          />

          <div className="flex flex-wrap justify-center items-center gap-[clamp(7px,1.6vmin,16px)] font-mono text-[clamp(9px,1.55vmin,15px)] tracking-[0.2em] text-[#7C7568]">
            {TAGS.map((tag, i) => (
              <React.Fragment key={tag}>
                {i > 0 && (
                  <div
                    data-tag-item
                    className="w-[5px] h-[1px] bg-[#9E5430] opacity-0"
                  />
                )}
                <span data-tag-item className="opacity-0">
                  {tag}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Margin notes */}
        <div
          data-sheet-note
          className="absolute left-[clamp(18px,4vw,76px)] top-[clamp(18px,4vh,74px)] font-mono text-[clamp(9px,1.3vmin,14px)] tracking-[0.14em] text-[#7C7568] opacity-0"
        >
          SHEET 01  IDENTITY
        </div>
        <div
          data-scale-note
          className="absolute right-[clamp(18px,4vw,76px)] top-[clamp(18px,4vh,74px)] font-mono text-[clamp(9px,1.3vmin,14px)] tracking-[0.14em] text-[#7C7568] opacity-0"
        >
          SCALE 1:1
        </div>
      </div>

      {/* 3px Accent press bar */}
      <div
        data-sweep
        className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#9E5430] opacity-0 pointer-events-none"
      />
    </div>
  );
};
