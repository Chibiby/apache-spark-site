// path: src/app/projects/ProjectsArchiveClient.tsx
'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { openScheduleModal } from '@/lib/events';
import { PROJECTS } from '@/data/projects';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { useProjectFilters } from '@/hooks/useProjectFilters';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';

export const ProjectsArchiveClient: React.FC = () => {
  const {
    state,
    setDiscipline,
    setSector,
    setYear,
    setSearch,
    setSort,
    setView,
    resetFilters,
  } = useProjectFilters();

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      if (state.discipline !== 'ALL' && p.discipline !== state.discipline) {
        return false;
      }
      if (state.sector !== 'ALL' && p.sector !== state.sector) {
        return false;
      }
      if (state.year !== 'ALL' && p.year !== state.year) {
        return false;
      }
      if (state.search.trim() !== '') {
        const q = state.search.toLowerCase();
        const inTitle = p.title.toLowerCase().includes(q);
        const inClient = p.client.toLowerCase().includes(q);
        const inSummary = p.summary.toLowerCase().includes(q);
        const inStack = p.stack.some((s) => s.toLowerCase().includes(q));
        if (!inTitle && !inClient && !inSummary && !inStack) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (state.sort === 'newest') return b.year - a.year;
      if (state.sort === 'oldest') return a.year - b.year;
      if (state.sort === 'az') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [state]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-12 select-none min-h-screen">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3">
        <MarginNote>ARCHIVE // PROJECT SHEETS</MarginNote>
        <MarginNote>12 REGISTERED SPECIFICATIONS</MarginNote>
      </div>

      {/* Header */}
      <div className="max-w-3xl flex flex-col gap-4">
        <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase">
          // MASTER DRAWING ARCHIVE
        </span>
        <h1 className="font-sans text-[clamp(34px,6vw,68px)] font-bold text-[#14181C] tracking-[-0.02em] leading-[1.02]">
          Delivered Project Sheets
        </h1>
        <p className="font-mono text-[13px] md:text-[14px] text-[#7C7568] leading-[1.8] max-w-2xl">
          Complete technical drawings, performance audits, and engineering case studies across industrial SCADA, clinical telemetry, multimodal logistics, and cryogenic hybrid infrastructure.
        </p>
      </div>

      {/* Sticky Filter Bar */}
      <ProjectFilters
        discipline={state.discipline}
        sector={state.sector}
        year={state.year}
        search={state.search}
        sort={state.sort}
        view={state.view}
        onDisciplineChange={setDiscipline}
        onSectorChange={setSector}
        onYearChange={setYear}
        onSearchChange={setSearch}
        onSortChange={setSort}
        onViewChange={setView}
      />

      {/* Project Grid */}
      <ProjectGrid
        projects={filteredProjects}
        totalCount={PROJECTS.length}
        view={state.view}
        onResetFilters={resetFilters}
      />

      {/* Commission & Lead Generation Card */}
      <div className="p-8 md:p-12 border border-[rgba(20,24,28,0.16)] bg-[#14181C] text-[#F2EFE8] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mt-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="font-mono text-[10px] text-[#C97A4A] tracking-[0.24em] uppercase font-semibold">
            // COMMISSION AN ARCHITECTURAL SPRINT
          </span>
          <h3 className="font-sans text-[24px] md:text-[30px] font-bold text-[#F2EFE8] leading-tight">
            Need an equivalent high-throughput system engineered?
          </h3>
          <p className="font-mono text-[12px] text-[#C0B9AA] leading-relaxed">
            Every specification in our archive was delivered on a deterministic fixed-price sprint with 100% clean IP transfer. Schedule an architectural intake call with our Principal Engineers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={() => openScheduleModal({ interest: 'Project Archive Inquiry / System Replication' })}
            className="btn-spark solid text-[11px] py-3.5 px-6 w-full sm:w-auto text-center"
          >
            BOOK 20-MIN DISCOVERY
          </button>
          <Link
            href="/#scope-calculator"
            className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.16em] uppercase px-5 py-3.5 border border-[#F2EFE8]/20 text-[#F2EFE8] hover:bg-[#F2EFE8] hover:text-[#14181C] transition-colors w-full sm:w-auto text-center"
          >
            CALCULATE SCOPE →
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <DimensionLine label="DRAWING ARCHIVE // ALL SPECIFICATIONS FULLY TRANSFERABLE" />
      </div>
    </div>
  );
};
