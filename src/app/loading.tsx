// path: src/app/loading.tsx
import React from 'react';
import { Crosshair } from '@/components/brand/Crosshair';
import { SheetLabel } from '@/components/brand/SheetLabel';
import { DimensionLine } from '@/components/brand/DimensionLine';

export default function RootLoading() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center animate-pulse select-none">
      <div className="border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] relative p-8 sm:p-14">
        {/* Corner Crosshairs */}
        <div className="absolute top-2 left-2 text-[#7C7568] opacity-40">
          <Crosshair size={14} />
        </div>
        <div className="absolute top-2 right-2 text-[#7C7568] opacity-40">
          <Crosshair size={14} />
        </div>
        <div className="absolute bottom-2 left-2 text-[#7C7568] opacity-40">
          <Crosshair size={14} />
        </div>
        <div className="absolute bottom-2 right-2 text-[#7C7568] opacity-40">
          <Crosshair size={14} />
        </div>

        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[rgba(20,24,28,0.12)] pb-4 mb-8 gap-4">
          <SheetLabel
            sheetNo="SYS-INIT"
            title="DRAFTING VIEWPORT SPECIFICATION"
          />
          <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.2em] uppercase">
            CALIBRATING RENDER PIPELINE...
          </span>
        </div>

        <div className="mb-6">
          <DimensionLine label="CALIBRATION_GRID // VIEWPORT: 100vw" orientation="horizontal" />
        </div>

        {/* Wireframe skeleton blocks */}
        <div className="space-y-6 max-w-3xl">
          <div className="h-4 w-32 bg-[rgba(20,24,28,0.08)]" />
          <div className="h-12 w-3/4 bg-[rgba(20,24,28,0.12)]" />
          <div className="h-6 w-full max-w-lg bg-[rgba(20,24,28,0.06)]" />
          <div className="h-6 w-2/3 bg-[rgba(20,24,28,0.06)]" />

          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="h-28 border border-[rgba(20,24,28,0.12)] p-4 bg-[rgba(20,24,28,0.02)]" />
            <div className="h-28 border border-[rgba(20,24,28,0.12)] p-4 bg-[rgba(20,24,28,0.02)]" />
            <div className="h-28 border border-[rgba(20,24,28,0.12)] p-4 bg-[rgba(20,24,28,0.02)]" />
          </div>
        </div>

        {/* Footer trace */}
        <div className="mt-12 pt-4 border-t border-[rgba(20,24,28,0.12)] flex justify-between text-[10px] font-mono text-[#7C7568] uppercase tracking-[0.18em]">
          <span>RENDER PHASE: SUSPENSE_STREAM</span>
          <span>APACHE SPARK SYSTEM CORE</span>
        </div>
      </div>
    </div>
  );
}
