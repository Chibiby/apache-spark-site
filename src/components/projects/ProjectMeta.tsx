// path: src/components/projects/ProjectMeta.tsx
import React from 'react';
import type { Project } from '@/types';

export interface ProjectMetaProps {
  project: Project;
}

export const ProjectMeta: React.FC<ProjectMetaProps> = ({ project }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[1px] bg-[rgba(20,24,28,0.16)] border border-[rgba(20,24,28,0.16)] w-full">
      <div className="bg-[#F2EFE8] p-4 flex flex-col gap-1">
        <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase">
          SHEET NUMBER
        </span>
        <span className="font-mono text-[13px] font-bold text-[#9E5430]">
          {project.sheetNo}
        </span>
      </div>

      <div className="bg-[#F2EFE8] p-4 flex flex-col gap-1">
        <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase">
          CLIENT
        </span>
        <span className="font-mono text-[13px] font-semibold text-[#14181C] truncate">
          {project.client}
        </span>
      </div>

      <div className="bg-[#F2EFE8] p-4 flex flex-col gap-1">
        <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase">
          SECTOR
        </span>
        <span className="font-mono text-[13px] text-[#14181C]">
          {project.sector}
        </span>
      </div>

      <div className="bg-[#F2EFE8] p-4 flex flex-col gap-1">
        <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase">
          DISCIPLINE
        </span>
        <span className="font-mono text-[13px] font-semibold text-[#14181C]">
          {project.discipline}
        </span>
      </div>

      <div className="bg-[#F2EFE8] p-4 flex flex-col gap-1">
        <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase">
          YEAR COMPLETED
        </span>
        <span className="font-mono text-[13px] text-[#14181C]">
          {project.year}
        </span>
      </div>

      <div className="bg-[#F2EFE8] p-4 flex flex-col gap-1">
        <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase">
          ENGAGEMENT DURATION
        </span>
        <span className="font-mono text-[13px] text-[#14181C]">
          {project.duration}
        </span>
      </div>
    </div>
  );
};
