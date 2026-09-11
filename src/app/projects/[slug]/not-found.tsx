// path: src/app/projects/[slug]/not-found.tsx
import React from 'react';
import Link from 'next/link';
import { Crosshair } from '@/components/brand/Crosshair';

export default function ProjectNotFound() {
  return (
    <div className="pt-36 pb-24 max-w-4xl mx-auto px-4 text-center flex flex-col items-center justify-center select-none">
      <div className="mb-6 opacity-60">
        <Crosshair size={36} />
      </div>
      <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase mb-2">
        // ERROR 404: SPECIFICATION UNRESOLVED
      </span>
      <h1 className="font-sans text-[clamp(32px,5vw,56px)] font-bold text-[#14181C] tracking-[-0.02em] mb-4">
        Sheet Not Found in Archive
      </h1>
      <p className="font-mono text-[13px] text-[#7C7568] max-w-md leading-relaxed mb-8">
        The requested drawing sheet does not exist or has been re-indexed. Please return to the master project archive.
      </p>
      <Link href="/projects" className="btn-spark solid text-[11px] py-3.5 px-6">
        RETURN TO MASTER ARCHIVE
      </Link>
    </div>
  );
}
