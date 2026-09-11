// path: src/components/fx/ScrollHUD.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SHEETS = [
  { id: 'hero', sheet: '01', title: 'HERO' },
  { id: 'descriptors', sheet: '02', title: 'PILLARS' },
  { id: 'services', sheet: '03', title: 'SERVICES' },
  { id: 'capabilities', sheet: '04', title: 'CAPABILITIES' },
  { id: 'networks', sheet: '05', title: 'TOPOLOGY' },
  { id: 'metrics', sheet: '06', title: 'METRICS' },
  { id: 'process', sheet: '07', title: 'PROCESS' },
  { id: 'projects', sheet: '08', title: 'PROJECTS' },
  { id: 'showcase', sheet: '09', title: 'LIVE SYSTEMS' },
  { id: 'testimonials', sheet: '10', title: 'TESTIMONIALS' },
  { id: 'engagements', sheet: '11', title: 'ENGAGEMENT' },
  { id: 'team', sheet: '12', title: 'LEADERSHIP' },
  { id: 'faq', sheet: '13', title: 'SPECS FAQ' },
  { id: 'contact', sheet: '14', title: 'CUTOVER CTA' },
];

export const ScrollHUD: React.FC = () => {
  const { direction } = useScrollDirection();
  const prefersReduced = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSheet, setActiveSheet] = useState(SHEETS[0]);
  const [elevation, setElevation] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const current = Math.max(0, window.scrollY);
          const p = docHeight > 0 ? current / docHeight : 0;
          setScrollProgress(p);
          setElevation(Math.round(current * 0.42)); // millimeter equivalent

          // Detect active section
          const scrollPos = current + window.innerHeight * 0.35;
          let currentFound = SHEETS[0];

          for (const s of SHEETS) {
            const el = document.getElementById(s.id);
            if (el) {
              const top = el.offsetTop;
              if (scrollPos >= top) {
                currentFound = s;
              }
            }
          }
          setActiveSheet(currentFound);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (prefersReduced) return null;

  const isReverse = direction === 'up';

  return (
    <aside
      aria-hidden="true"
      className="fixed right-3 bottom-6 z-40 hidden xl:flex flex-col items-end gap-1.5 pointer-events-none select-none"
    >
      {/* HUD Telemetry Plate */}
      <div className="bg-[#F2EFE8]/92 backdrop-blur-sm border border-[rgba(20,24,28,0.22)] p-2.5 font-mono text-[9px] tracking-[0.2em] shadow-sm flex flex-col gap-2 min-w-[175px]">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[rgba(20,24,28,0.12)] pb-1.5 text-[#7C7568]">
          <span className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isReverse ? 'bg-[#9E5430] animate-pulse' : 'bg-[#14181C]'}`} />
            DRAFT HUD
          </span>
          <span className="text-[#9E5430] font-bold">SH-{activeSheet.sheet}</span>
        </div>

        {/* Live Vector Indicator */}
        <div className="flex items-center justify-between">
          <span className="text-[#7C7568]">VECTOR:</span>
          <span
            className={`font-semibold tracking-[0.16em] px-1.5 py-0.5 border text-[8.5px] ${
              isReverse
                ? 'border-[#9E5430] text-[#9E5430] bg-[#9E5430]/10'
                : 'border-[rgba(20,24,28,0.3)] text-[#14181C] bg-[rgba(20,24,28,0.04)]'
            }`}
          >
            {isReverse ? '▲ REV // -Z' : '▼ FWD // +Z'}
          </span>
        </div>

        {/* Active Sheet name */}
        <div className="flex items-center justify-between text-[#14181C]">
          <span className="text-[#7C7568]">SHEET:</span>
          <span className="font-semibold truncate max-w-[100px]">{activeSheet.title}</span>
        </div>

        {/* Vernier scale metric */}
        <div className="flex items-center justify-between border-t border-[rgba(20,24,28,0.12)] pt-1 text-[#7C7568]">
          <span>CALIPER:</span>
          <span className="text-[#14181C] font-mono">{elevation}mm</span>
        </div>

        {/* Progress Bar & Vernier Ticks */}
        <div className="relative w-full h-2 bg-[rgba(20,24,28,0.08)] border border-[rgba(20,24,28,0.16)] overflow-hidden">
          <div
            className="absolute top-0 bottom-0 left-0 bg-[#9E5430] transition-all duration-75"
            style={{ width: `${scrollProgress * 100}%` }}
          />
          {/* Vernier divisions */}
          <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-40">
            <span className="w-[1px] h-full bg-[#14181C]" />
            <span className="w-[1px] h-full bg-[#14181C]" />
            <span className="w-[1px] h-full bg-[#14181C]" />
            <span className="w-[1px] h-full bg-[#14181C]" />
          </div>
        </div>
      </div>
    </aside>
  );
};
