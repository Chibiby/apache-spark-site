'use client';
// path: src/app/error.tsx
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Crosshair } from '@/components/brand/Crosshair';
import { SheetLabel } from '@/components/brand/SheetLabel';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log exception to local diagnostic console
    console.error('Unhandled Apache Spark runtime exception:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] pt-32 pb-24 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col justify-center select-none">
      <div className="border border-[#9E5430] bg-[#F2EFE8] relative p-8 sm:p-14">
        {/* Corner Crosshairs in accent */}
        <div className="absolute top-2 left-2 text-[#9E5430]">
          <Crosshair size={14} />
        </div>
        <div className="absolute top-2 right-2 text-[#9E5430]">
          <Crosshair size={14} />
        </div>
        <div className="absolute bottom-2 left-2 text-[#9E5430]">
          <Crosshair size={14} />
        </div>
        <div className="absolute bottom-2 right-2 text-[#9E5430]">
          <Crosshair size={14} />
        </div>

        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[rgba(20,24,28,0.12)] pb-4 mb-8 gap-4">
          <SheetLabel
            sheetNo="ERR-500"
            title="RUNTIME COMPILATION FAULT"
          />
          <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.2em] uppercase font-bold">
            STATUS: 500 EXCEPTION CAPTURED
          </span>
        </div>

        {/* Content */}
        <div className="max-w-2xl">
          <span className="font-mono text-[12px] text-[#9E5430] tracking-[0.24em] uppercase block mb-3">
            // ERR_ENGINEERING_SUBSYSTEM_INTERRUPT
          </span>
          <h1 className="font-sans text-[clamp(32px,5vw,56px)] font-bold text-[#14181C] tracking-[-0.02em] leading-[1.05] mb-5">
            System Execution Interrupted.
          </h1>
          <p className="font-mono text-[13px] text-[#7C7568] leading-relaxed mb-6">
            An unhandled runtime condition caused the rendering pipeline to halt. The fault has been captured in local diagnostics.
          </p>

          {/* Diagnostic Trace Box */}
          <div className="p-4 bg-[rgba(20,24,28,0.04)] border border-[rgba(20,24,28,0.12)] mb-8 font-mono text-[11px] text-[#14181C] overflow-x-auto">
            <div className="text-[#9E5430] mb-1 font-semibold">
              DIAGNOSTIC_TRACE: {error.name || 'Error'}
            </div>
            <div className="text-[#7C7568] break-words">
              {error.message || 'No explicit error description provided.'}
            </div>
            {error.digest && (
              <div className="mt-2 pt-2 border-t border-[rgba(20,24,28,0.08)] text-[10px] text-[#7C7568]">
                DIGEST HASH: {error.digest}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => reset()}
              className="btn-spark solid text-[11px] py-3.5 px-6 cursor-pointer"
            >
              RE-ATTEMPT EXECUTION (RESET)
            </button>
            <Link href="/" className="btn-spark line text-[11px] py-3.5 px-6">
              RETURN TO INDEX
            </Link>
            <Link href="/contact" className="btn-spark line text-[11px] py-3.5 px-6">
              REPORT FAULT TO TEAM
            </Link>
          </div>
        </div>

        {/* Bottom audit line */}
        <div className="mt-12 pt-4 border-t border-[rgba(20,24,28,0.12)] flex flex-wrap justify-between items-center text-[10px] font-mono text-[#7C7568] uppercase tracking-[0.18em]">
          <span>FAILSAFE: AUTOMATIC RECOVERY AVAILABLE</span>
          <span>SYSTEM: APACHE SPARK CORE RUNTIME</span>
        </div>
      </div>
    </div>
  );
}
