// path: src/app/not-found.tsx
import React from 'react';
import Link from 'next/link';
import { Crosshair } from '@/components/brand/Crosshair';
import { SheetLabel } from '@/components/brand/SheetLabel';
import { DimensionLine } from '@/components/brand/DimensionLine';

export const metadata = {
  title: '404 - Sheet Not Found | APACHE SPARK',
  description: 'The requested specification or sheet was not found in the Apache Spark registry.',
};

export default function GlobalNotFound() {
  return (
    <div className="min-h-[80vh] pt-32 pb-24 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col justify-center select-none">
      <div className="border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] relative p-8 sm:p-14">
        {/* Corner Crosshairs */}
        <div className="absolute top-2 left-2 text-[#7C7568] opacity-50">
          <Crosshair size={14} />
        </div>
        <div className="absolute top-2 right-2 text-[#7C7568] opacity-50">
          <Crosshair size={14} />
        </div>
        <div className="absolute bottom-2 left-2 text-[#7C7568] opacity-50">
          <Crosshair size={14} />
        </div>
        <div className="absolute bottom-2 right-2 text-[#7C7568] opacity-50">
          <Crosshair size={14} />
        </div>

        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[rgba(20,24,28,0.12)] pb-4 mb-8 gap-4">
          <SheetLabel
            sheetNo="ERR-404"
            title="ROUTING SPECIFICATION FAULT"
          />
          <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.2em] uppercase font-medium">
            STATUS: 404 UNRESOLVED
          </span>
        </div>

        {/* Dimension indicator */}
        <div className="mb-6 hidden sm:block">
          <DimensionLine label="OFFSET: NULL // PATH_UNRESOLVED" orientation="horizontal" />
        </div>

        {/* Content */}
        <div className="max-w-2xl">
          <span className="font-mono text-[12px] text-[#9E5430] tracking-[0.24em] uppercase block mb-3">
            // ERR_SPECIFICATION_NOT_FILED
          </span>
          <h1 className="font-sans text-[clamp(36px,5vw,64px)] font-bold text-[#14181C] tracking-[-0.02em] leading-[1.05] mb-5">
            Sheet Not Found in Registry.
          </h1>
          <p className="font-mono text-[13px] text-[#7C7568] leading-relaxed mb-10">
            The referenced coordinate or document path does not correspond to an active engineering sheet, project record, or service specification. Verify the URL or redirect to one of the verified system endpoints below.
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/" className="btn-spark solid text-[11px] py-3.5 px-6">
              RETURN TO INDEX
            </Link>
            <Link href="/projects" className="btn-spark line text-[11px] py-3.5 px-6">
              PROJECT ARCHIVE
            </Link>
            <Link href="/services" className="btn-spark line text-[11px] py-3.5 px-6">
              SERVICES
            </Link>
            <Link href="/contact" className="btn-spark line text-[11px] py-3.5 px-6">
              CONTACT
            </Link>
          </div>
        </div>

        {/* Bottom audit line */}
        <div className="mt-12 pt-4 border-t border-[rgba(20,24,28,0.12)] flex flex-wrap justify-between items-center text-[10px] font-mono text-[#7C7568] uppercase tracking-[0.18em]">
          <span>REF: APACHE SPARK ARCHIVAL INDEX</span>
          <span>LOCATION: ERR // 404</span>
        </div>
      </div>
    </div>
  );
}
