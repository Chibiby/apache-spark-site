// path: src/components/projects/EmptyState.tsx
'use client';

import React from 'react';
import { Crosshair } from '@/components/brand/Crosshair';

export interface EmptyStateProps {
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className="relative w-full py-24 px-8 border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] flex flex-col items-center justify-center text-center select-none overflow-hidden">
      {/* 72px grid */}
      <div className="absolute inset-0 bg-grid-draft opacity-40 pointer-events-none" />

      <div className="mb-6 opacity-60">
        <Crosshair size={36} />
      </div>

      <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.24em] uppercase mb-2">
        // SEARCH FILTER RESIDUAL: 0
      </span>

      <h3 className="font-sans text-[26px] md:text-[32px] font-bold text-[#14181C] tracking-[-0.01em] mb-4">
        NO SHEETS MATCH SPECIFICATION
      </h3>

      <p className="font-mono text-[12px] text-[#7C7568] max-w-md leading-relaxed mb-8">
        No project sheets match your combined discipline, sector, and keyword query parameters.
      </p>

      <button onClick={onReset} className="btn-spark solid text-[11px] py-3 px-6">
        CLEAR ALL FILTERS
      </button>
    </div>
  );
};
