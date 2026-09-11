// path: src/components/sections/Capability.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CAPABILITIES } from '@/data/services';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { BEZIER } from '@/lib/animations';

export const Capability: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredIndex(i);
  };

  return (
    <section id="capabilities" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3 mb-12">
        <MarginNote>SHEET 05  TECHNICAL CAPABILITIES BENTO</MarginNote>
        <MarginNote>PRECISION CROSSHAIR TRACKING</MarginNote>
      </div>

      <div className="max-w-2xl mb-12">
        <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase block mb-3">
          // SPECIALIZED RIGOR
        </span>
        <h2 className="font-sans text-[clamp(26px,4vw,46px)] font-bold tracking-[-0.02em] leading-tight text-[#14181C]">
          Engineered for conditions where tolerance is zero.
        </h2>
      </div>

      {/* Bento grid with 1px drafting seams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[rgba(20,24,28,0.16)] border border-[rgba(20,24,28,0.16)]">
        {CAPABILITIES.map((cap, i) => (
          <motion.div
            key={cap.name}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.44, delay: i * 0.06, ease: BEZIER.easeOutQuart }}
            className="relative bg-[#F2EFE8] p-8 min-h-[220px] flex flex-col justify-between overflow-hidden cursor-crosshair group select-none"
          >
            {/* Cell-bounded cursor crosshair tracking: 1px crosshair, strictly NO spotlight glow */}
            {hoveredIndex === i && (
              <div
                className="absolute pointer-events-none z-20"
                style={{
                  left: `${coords.x}px`,
                  top: `${coords.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="relative w-8 h-8">
                  <div className="absolute left-0 top-[15.5px] w-8 h-[1px] bg-[#9E5430]" />
                  <div className="absolute top-0 left-[15.5px] h-8 w-[1px] bg-[#9E5430]" />
                </div>
              </div>
            )}

            {/* Top header row */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em]">
                {cap.index}
              </span>
              <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase border border-[rgba(20,24,28,0.16)] px-2 py-0.5">
                {cap.code}
              </span>
            </div>

            {/* Title and Spec */}
            <div className="flex flex-col gap-3 my-4">
              <h3 className="font-mono text-[14px] md:text-[15px] font-semibold text-[#14181C] tracking-[0.16em] uppercase group-hover:text-[#9E5430] transition-colors">
                {cap.name}
              </h3>
              <p className="font-mono text-[11px] md:text-[12px] text-[#7C7568] leading-relaxed tracking-[0.06em]">
                {cap.spec}
              </p>
            </div>

            {/* Bottom status indicator */}
            <div className="flex items-center justify-between pt-4 border-t border-[rgba(20,24,28,0.08)] font-mono text-[9px] tracking-[0.2em] text-[#7C7568]">
              <span>STATUS: PRODUCTION</span>
              <span className="w-1.5 h-1.5 bg-[#9E5430] inline-block" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <DimensionLine label="TOLERANCE SPECIFICATION: SUB-MICROSECOND / NEMA 4X" />
      </div>
    </section>
  );
};
