// path: src/components/projects/ProjectCard.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProjectCover } from './ProjectCover';
import type { Project } from '@/types';
import { BEZIER } from '@/lib/animations';
import { ArrowUpRight } from 'lucide-react';

export interface ProjectCardProps {
  project: Project;
  view?: 'grid' | 'list';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, view = 'grid' }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  if (view === 'list') {
    return (
      <Link
        href={`/projects/${project.slug}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="group relative flex flex-col md:flex-row md:items-center justify-between p-6 bg-[#F2EFE8] border border-[rgba(20,24,28,0.16)] gap-6 transition-colors hover:border-[#14181C]"
      >
        <div className="flex items-center gap-6 min-w-0">
          <span className="font-mono text-[12px] font-semibold text-[#9E5430] tracking-[0.2em] shrink-0">
            {project.sheetNo}
          </span>
          <div className="flex flex-col min-w-0">
            <h3 className="font-sans text-[18px] md:text-[20px] font-bold text-[#14181C] group-hover:text-[#9E5430] transition-colors truncate">
              {project.title}
            </h3>
            <span className="font-mono text-[11px] text-[#7C7568] tracking-[0.1em]">
              {project.client} // {project.sector}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-8 shrink-0 font-mono text-[11px]">
          <span className="hidden sm:inline text-[#7C7568] tracking-[0.12em]">
            {project.discipline}
          </span>
          <span className="text-[#14181C] font-semibold tracking-[0.12em]">
            {project.metrics[0]?.value} {project.metrics[0]?.unit}
          </span>
          <ArrowUpRight className="w-4 h-4 text-[#7C7568] group-hover:text-[#9E5430] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="group relative flex flex-col bg-[#F2EFE8] border border-[rgba(20,24,28,0.16)] overflow-hidden transition-colors hover:border-[#14181C] focus-visible:outline-2"
    >
      {/* Deterministic SVG Technical Drawing Plate */}
      <div className="relative overflow-hidden">
        <ProjectCover
          slug={project.slug}
          sheetNo={project.sheetNo}
          aspectRatio="16/9"
        />
      </div>

      {/* Card Body */}
      <div className="p-6 md:p-8 flex flex-col justify-between flex-1 gap-6">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(20,24,28,0.10)] font-mono text-[10px] tracking-[0.2em] mb-4">
            <span className="text-[#7C7568]">{project.client}</span>
            <span className="text-[#9E5430]">{project.discipline}</span>
          </div>

          {/* Title with DRAWing accent underline on hover */}
          <div className="relative inline-block mb-3">
            <h3 className="font-sans text-[20px] md:text-[22px] font-bold text-[#14181C] tracking-[-0.01em] group-hover:text-[#9E5430] transition-colors leading-tight">
              {project.title}
            </h3>
            {/* Draw underline */}
            <motion.div
              className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-[#9E5430] origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.32, ease: BEZIER.easeInOutQuart }}
            />
          </div>

          <p className="font-mono text-[12px] text-[#7C7568] leading-relaxed line-clamp-2 mt-2">
            {project.summary}
          </p>
        </div>

        {/* Stack chips that POP in on hover */}
        <div className="pt-4 border-t border-[rgba(20,24,28,0.08)] flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
            {project.stack.slice(0, 3).map((item, idx) => (
              <motion.span
                key={item}
                initial={{ opacity: 0.7, scale: 0.95 }}
                animate={{
                  opacity: isHovered ? 1 : 0.8,
                  scale: isHovered ? 1 : 0.95,
                }}
                transition={{ duration: 0.22, delay: idx * 0.04, ease: BEZIER.easeOutCubic }}
                className="font-mono text-[9px] tracking-[0.14em] text-[#14181C] border border-[rgba(20,24,28,0.16)] px-2 py-0.5 uppercase"
              >
                {item}
              </motion.span>
            ))}
          </div>

          <div className="flex items-center gap-1 font-mono text-[11px] text-[#14181C] group-hover:text-[#9E5430] shrink-0 pl-2">
            <ArrowUpRight className="w-4 h-4 stroke-[1.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};
