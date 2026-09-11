// path: src/components/sections/Testimonials.tsx
'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '@/data/testimonials';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';

export const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section id="testimonials" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3 mb-12">
        <MarginNote>SHEET 10  CLIENT VERIFICATIONS</MarginNote>
        <MarginNote>FIELD ATTESTATIONS // DRAGGABLE</MarginNote>
      </div>

      <div className="max-w-2xl mb-12">
        <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase block mb-3">
          // CLIENT REVIEWS
        </span>
        <h2 className="font-sans text-[clamp(28px,4.5vw,52px)] font-bold tracking-[-0.02em] leading-tight text-[#14181C]">
          Direct from the engineers and operators running our systems.
        </h2>
      </div>

      {/* Draggable snap reel */}
      <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing pb-6">
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          className="flex gap-6 w-max"
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="w-[320px] sm:w-[480px] bg-[#F2EFE8] border border-[rgba(20,24,28,0.16)] p-8 flex flex-col justify-between shrink-0 select-none"
            >
              {/* Top reference sheet */}
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(20,24,28,0.10)] font-mono text-[10px] tracking-[0.2em] text-[#7C7568]">
                <span className="text-[#9E5430] font-semibold">{t.sheetNo}</span>
                <span>VERIFIED ENGAGEMENT</span>
              </div>

              {/* Archivo quote */}
              <div className="py-8">
                <p className="font-sans text-[17px] sm:text-[19px] leading-relaxed text-[#14181C] font-normal tracking-[-0.01em]">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Attribution in mono */}
              <div className="pt-6 border-t border-[rgba(20,24,28,0.10)] flex flex-col gap-1 font-mono">
                <span className="text-[12px] font-semibold text-[#14181C] tracking-[0.1em]">
                  {t.author}
                </span>
                <span className="text-[10px] text-[#7C7568] tracking-[0.08em]">
                  {t.role} // {t.company}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-8">
        <DimensionLine label="6 FORMAL ATTESTATIONS // VERIFIED FIELD CONTACTS" />
      </div>
    </section>
  );
};
