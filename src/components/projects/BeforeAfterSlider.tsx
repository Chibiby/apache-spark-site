// path: src/components/projects/BeforeAfterSlider.tsx
'use client';

import React, { useState, useRef } from 'react';

export interface BeforeAfterSliderProps {
  legacyTitle?: string;
  deliveredTitle?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  legacyTitle = 'LEGACY INFRASTRUCTURE (ASYNC SERIAL / BOTTLENECKED)',
  deliveredTitle = 'DEPLOYED APACHE SPARK ARCHITECTURE (OPTICAL RING / DETERMINISTIC)',
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef<boolean>(false);

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  return (
    <div className="flex flex-col gap-3 w-full select-none">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[#7C7568]">
        <span>? {legacyTitle}</span>
        <span>{deliveredTitle} ?</span>
      </div>

      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#F2EFE8] border border-[rgba(20,24,28,0.16)] overflow-hidden cursor-ew-resize"
      >
        {/* Underlay Grid */}
        <div className="absolute inset-0 bg-grid-draft opacity-40 pointer-events-none" />

        {/* Before: Legacy Schematic (Bottom layer) */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <div className="font-mono text-[11px] text-[#7C7568] tracking-[0.16em] uppercase">
            [LEGACY] UNMANAGED SERIAL BUS // 14,000MS LATENCY
          </div>
          <svg viewBox="0 0 400 150" className="w-full h-32 opacity-40">
            <path d="M20,75 L80,75 L120,40 L160,110 L220,75 L380,75" fill="none" stroke="#14181C" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="80" cy="75" r="5" fill="#14181C" />
            <circle cx="160" cy="110" r="5" fill="#7C7568" />
            <circle cx="220" cy="75" r="5" fill="#14181C" />
          </svg>
          <div className="font-mono text-[9px] text-[#7C7568] tracking-[0.14em]">
            STATUS: PACKET COLLISION DETECTED
          </div>
        </div>

        {/* After: Modernized Architecture (Clipped top layer) */}
        <div
          className="absolute inset-0 p-8 flex flex-col justify-between bg-[#F2EFE8] border-r border-[#9E5430]"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="font-mono text-[11px] text-[#9E5430] tracking-[0.16em] uppercase font-semibold">
            [DELIVERED] DETERMINISTIC OPTICAL RING // 4.2MS LATENCY
          </div>
          <svg viewBox="0 0 400 150" className="w-full h-32">
            <rect x="50" y="30" width="300" height="90" fill="none" stroke="#14181C" strokeWidth="2" />
            <line x1="50" y1="75" x2="350" y2="75" stroke="#9E5430" strokeWidth="2" />
            <circle cx="50" cy="75" r="6" fill="#9E5430" />
            <circle cx="200" cy="30" r="6" fill="#14181C" />
            <circle cx="350" cy="75" r="6" fill="#9E5430" />
            <circle cx="200" cy="120" r="6" fill="#14181C" />
          </svg>
          <div className="font-mono text-[9px] text-[#14181C] tracking-[0.14em]">
            STATUS: 100% ROUTE DETERMINISM
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#9E5430] pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#F2EFE8] border-2 border-[#9E5430] flex items-center justify-center font-mono text-[8px] text-[#9E5430] font-bold">
            ?
          </div>
        </div>
      </div>
    </div>
  );
};
