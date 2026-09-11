// path: src/components/sections/ProjectsPreview.tsx
'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FEATURED_PROJECTS } from '@/data/projects';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export const ProjectsPreview: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  return (
    <section id="work" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3 mb-12">
        <MarginNote>SHEET 09  FEATURED CASE STUDIES</MarginNote>
        <MarginNote>DRAGGABLE HORIZONTAL REEL</MarginNote>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase block mb-3">
            // DELIVERED WORK
          </span>
          <h2 className="font-sans text-[clamp(28px,4.5vw,52px)] font-bold tracking-[-0.02em] leading-tight text-[#14181C]">
            Mission-Critical Case Studies
          </h2>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.2em] text-[#14181C] hover:text-[#9E5430] transition-colors group"
        >
          <span>VIEW ALL 12 SHEETS</span>
          <ArrowRight className="w-4 h-4 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Draggable horizontal reel */}
      <div ref={carouselRef} className="overflow-hidden cursor-grab active:cursor-grabbing pb-6">
        <motion.div
          drag="x"
          dragConstraints={carouselRef}
          className="flex gap-6 w-max"
        >
          {FEATURED_PROJECTS.map((project) => (
            <div
              key={project.slug}
              className="w-[320px] sm:w-[420px] bg-[#F2EFE8] border border-[rgba(20,24,28,0.16)] p-6 md:p-8 flex flex-col justify-between shrink-0 group select-none relative"
            >
              {/* Top row */}
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(20,24,28,0.12)] font-mono text-[10px] tracking-[0.2em]">
                <span className="text-[#9E5430] font-semibold">{project.sheetNo}</span>
                <span className="text-[#7C7568]">{project.sector}</span>
              </div>

              {/* Middle content */}
              <div className="py-8 flex flex-col gap-3">
                <span className="font-mono text-[11px] text-[#7C7568] tracking-[0.14em]">
                  {project.client}
                </span>
                <h3 className="font-sans text-[20px] md:text-[22px] font-bold text-[#14181C] tracking-[-0.01em] group-hover:text-[#9E5430] transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="font-mono text-[12px] text-[#7C7568] leading-relaxed line-clamp-3">
                  {project.summary}
                </p>
              </div>

              {/* Metrics strip */}
              <div className="grid grid-cols-2 gap-4 py-4 my-2 border-t border-b border-[rgba(20,24,28,0.08)]">
                {project.metrics.slice(0, 2).map((m) => (
                  <div key={m.label}>
                    <span className="font-mono text-[8px] text-[#7C7568] tracking-[0.2em] uppercase block">
                      {m.label}
                    </span>
                    <span className="font-mono text-[15px] font-bold text-[#14181C]">
                      {m.value} {m.unit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom action link */}
              <div className="pt-4 flex items-center justify-between font-mono text-[11px] tracking-[0.16em] text-[#14181C] group-hover:text-[#9E5430]">
                <span>VIEW SPECIFICATION</span>
                <ArrowUpRight className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="absolute inset-0 z-10"
                aria-label={`View ${project.title}`}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-8">
        <DimensionLine label="FEATURED SHEETS // 4 OF 12 // DRAG TO REVEAL" />
      </div>
    </section>
  );
};
