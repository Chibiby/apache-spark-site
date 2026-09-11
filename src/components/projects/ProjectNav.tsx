// path: src/components/projects/ProjectNav.tsx
import React from 'react';
import Link from 'next/link';
import type { Project } from '@/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface ProjectNavProps {
  prev: Project;
  next: Project;
}

export const ProjectNav: React.FC<ProjectNavProps> = ({ prev, next }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[rgba(20,24,28,0.16)] border border-[rgba(20,24,28,0.16)] w-full select-none">
      {/* Previous Sheet Link */}
      <Link
        href={`/projects/${prev.slug}`}
        className="bg-[#F2EFE8] p-8 flex flex-col justify-between group hover:bg-[rgba(20,24,28,0.03)] transition-colors"
      >
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase mb-4">
          <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5] group-hover:-translate-x-1 transition-transform" />
          <span>PREVIOUS SPECIFICATION</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.2em]">
            {prev.sheetNo}
          </span>
          <h4 className="font-sans text-[20px] font-bold text-[#14181C] group-hover:text-[#9E5430] transition-colors">
            {prev.title}
          </h4>
          <span className="font-mono text-[11px] text-[#7C7568]">
            {prev.client}
          </span>
        </div>
      </Link>

      {/* Next Sheet Link */}
      <Link
        href={`/projects/${next.slug}`}
        className="bg-[#F2EFE8] p-8 flex flex-col justify-between group hover:bg-[rgba(20,24,28,0.03)] transition-colors text-left md:text-right"
      >
        <div className="flex items-center md:justify-end gap-2 font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase mb-4">
          <span>NEXT SPECIFICATION</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
        </div>

        <div className="flex flex-col gap-1 md:items-end">
          <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.2em]">
            {next.sheetNo}
          </span>
          <h4 className="font-sans text-[20px] font-bold text-[#14181C] group-hover:text-[#9E5430] transition-colors">
            {next.title}
          </h4>
          <span className="font-mono text-[11px] text-[#7C7568]">
            {next.client}
          </span>
        </div>
      </Link>
    </div>
  );
};
