// path: src/components/sections/Services.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SERVICE_PILLARS } from '@/data/services';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { BEZIER } from '@/lib/animations';
import { ArrowUpRight } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3 mb-12">
        <MarginNote>SHEET 04  CORE DISCIPLINES</MarginNote>
        <MarginNote>4 PILLARS // 1PX SEAMS</MarginNote>
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase block mb-3">
            // ENGINEERING SERVICES
          </span>
          <h2 className="font-sans text-[clamp(28px,5vw,52px)] font-bold tracking-[-0.02em] leading-tight text-[#14181C]">
            Drafted to specification. Built for critical duty.
          </h2>
        </div>
        <p className="font-mono text-[12px] text-[#7C7568] max-w-sm tracking-[0.08em] leading-relaxed">
          We bridge the chasm between software architecture and physical cable plant engineering. No handoffs.
        </p>
      </div>

      {/* 1px-seam card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[rgba(20,24,28,0.16)] border border-[rgba(20,24,28,0.16)]">
        {SERVICE_PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.48,
              delay: i * 0.08,
              ease: BEZIER.easeOutQuart,
            }}
            className="bg-[#F2EFE8] p-6 md:p-8 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top Index */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-[13px] text-[#9E5430] tracking-[0.24em] font-medium">
                {pillar.index}
              </span>
              <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase border border-[rgba(20,24,28,0.16)] px-2 py-0.5">
                DISCIPLINE
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3">
              <h3 className="font-sans text-[22px] md:text-[24px] font-semibold text-[#14181C] tracking-[-0.01em] group-hover:text-[#9E5430] transition-colors flex items-center justify-between">
                <span>{pillar.title}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[1.5] text-[#7C7568] group-hover:text-[#9E5430] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="font-mono text-[12px] leading-[1.7] text-[#7C7568]">
                {pillar.summary}
              </p>
            </div>

            {/* Deliverables snippet */}
            <div className="pt-8 mt-8 border-t border-[rgba(20,24,28,0.08)]">
              <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase block mb-2">
                DELIVERABLES
              </span>
              <ul className="flex flex-col gap-1.5 font-mono text-[10px] text-[#14181C] tracking-[0.05em]">
                {pillar.deliverables.slice(0, 2).map((d) => (
                  <li key={d} className="truncate">
                    + {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Link overlay */}
            <Link
              href={`/services#${pillar.title.toLowerCase()}`}
              className="absolute inset-0 z-10"
              aria-label={`View ${pillar.title} services`}
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <DimensionLine label="4 DIVISIONS // 100% SPECIFICATION COVERAGE" />
      </div>
    </section>
  );
};
