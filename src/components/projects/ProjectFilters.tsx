// path: src/components/projects/ProjectFilters.tsx
'use client';

import React from 'react';
import type { Discipline, Sector } from '@/types';
import { ProjectSearch } from './ProjectSearch';
import { ProjectSort } from './ProjectSort';
import { ViewToggle } from './ViewToggle';

const DISCIPLINES: (Discipline | 'ALL')[] = [
  'ALL',
  'Software',
  'Systems',
  'Networks',
  'Infrastructure',
];

const SECTORS: (Sector | 'ALL')[] = [
  'ALL',
  'Manufacturing',
  'Healthcare',
  'Education',
  'Logistics',
  'Retail',
  'Public',
];

const YEARS: (number | 'ALL')[] = ['ALL', 2024, 2023];

export interface ProjectFiltersProps {
  discipline: Discipline | 'ALL';
  sector: Sector | 'ALL';
  year: number | 'ALL';
  search: string;
  sort: 'newest' | 'oldest' | 'az';
  view: 'grid' | 'list';
  onDisciplineChange: (d: Discipline | 'ALL') => void;
  onSectorChange: (s: Sector | 'ALL') => void;
  onYearChange: (y: number | 'ALL') => void;
  onSearchChange: (q: string) => void;
  onSortChange: (sort: 'newest' | 'oldest' | 'az') => void;
  onViewChange: (view: 'grid' | 'list') => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  discipline,
  sector,
  year,
  search,
  sort,
  view,
  onDisciplineChange,
  onSectorChange,
  onYearChange,
  onSearchChange,
  onSortChange,
  onViewChange,
}) => {
  return (
    <div className="sticky top-16 z-40 w-full bg-[#F2EFE8]/95 backdrop-blur-sm border-t border-b border-[rgba(20,24,28,0.16)] py-4 flex flex-col gap-4">
      {/* Top Search & Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ProjectSearch value={search} onChange={onSearchChange} />
        <div className="flex items-center gap-3">
          <ProjectSort value={sort} onChange={onSortChange} />
          <ViewToggle view={view} onChange={onViewChange} />
        </div>
      </div>

      {/* Discipline chips row */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[rgba(20,24,28,0.08)]">
        <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase mr-2 shrink-0">
          DISCIPLINE:
        </span>
        {DISCIPLINES.map((d) => {
          const isSelected = discipline === d;
          return (
            <button
              key={d}
              onClick={() => onDisciplineChange(d)}
              aria-pressed={isSelected}
              className={`font-mono text-[10px] tracking-[0.16em] uppercase px-3 py-1 border transition-colors ${
                isSelected
                  ? 'bg-[#14181C] text-[#F2EFE8] border-[#14181C]'
                  : 'bg-[#F2EFE8] text-[#14181C] border-[rgba(20,24,28,0.16)] hover:border-[#14181C]'
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>

      {/* Sector chips row */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[rgba(20,24,28,0.08)]">
        <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase mr-2 shrink-0">
          SECTOR:
        </span>
        {SECTORS.map((s) => {
          const isSelected = sector === s;
          return (
            <button
              key={s}
              onClick={() => onSectorChange(s)}
              aria-pressed={isSelected}
              className={`font-mono text-[10px] tracking-[0.16em] uppercase px-3 py-1 border transition-colors ${
                isSelected
                  ? 'bg-[#14181C] text-[#F2EFE8] border-[#14181C]'
                  : 'bg-[#F2EFE8] text-[#14181C] border-[rgba(20,24,28,0.16)] hover:border-[#14181C]'
              }`}
            >
              {s}
            </button>
          );
        })}

        {/* Year filter chips */}
        <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase ml-auto mr-2 hidden md:inline shrink-0">
          YEAR:
        </span>
        <div className="hidden md:flex items-center gap-1.5">
          {YEARS.map((y) => {
            const isSelected = year === y;
            return (
              <button
                key={String(y)}
                onClick={() => onYearChange(y)}
                aria-pressed={isSelected}
                className={`font-mono text-[10px] tracking-[0.16em] uppercase px-2 py-0.5 border transition-colors ${
                  isSelected
                    ? 'bg-[#14181C] text-[#F2EFE8] border-[#14181C]'
                    : 'bg-[#F2EFE8] text-[#14181C] border-[rgba(20,24,28,0.16)] hover:border-[#14181C]'
                }`}
              >
                {y}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
