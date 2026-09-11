// path: src/components/projects/QuickPreviewModal.tsx
'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProjectCover } from './ProjectCover';
import type { Project } from '@/types';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { X, ArrowRight } from 'lucide-react';
import { BEZIER } from '@/lib/animations';

export interface QuickPreviewModalProps {
  project: Project;
}

export const QuickPreviewModal: React.FC<QuickPreviewModalProps> = ({ project }) => {
  const router = useRouter();
  useLockBodyScroll(true);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 bg-[#14181C]/70 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.sheetNo} ${project.title} Preview`}
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.32, ease: BEZIER.easeOutQuart }}
        className="relative w-full max-w-4xl bg-[#F2EFE8] border border-[rgba(20,24,28,0.24)] z-10 flex flex-col overflow-hidden max-h-[90vh]"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(20,24,28,0.16)] bg-[#F2EFE8]">
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em]">
            <span className="w-2 h-2 bg-[#9E5430]" />
            <span className="font-bold text-[#14181C]">{project.sheetNo}</span>
            <span className="text-[#7C7568]">QUICK SPECIFICATION PREVIEW</span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-[#14181C] hover:text-[#9E5430] transition-colors focus-visible:outline-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 md:p-10 flex flex-col gap-8">
          {/* Technical Drawing Cover */}
          <div className="relative border border-[rgba(20,24,28,0.16)]">
            <ProjectCover
              slug={project.slug}
              sheetNo={project.sheetNo}
              aspectRatio="16/9"
            />
          </div>

          {/* Meta & Title */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] tracking-[0.16em] text-[#7C7568]">
              <span>CLIENT: <strong className="text-[#14181C]">{project.client}</strong></span>
              <span>//</span>
              <span>SECTOR: <strong className="text-[#14181C]">{project.sector}</strong></span>
              <span>//</span>
              <span>YEAR: <strong className="text-[#14181C]">{project.year}</strong></span>
              <span>//</span>
              <span>DISCIPLINE: <strong className="text-[#9E5430]">{project.discipline}</strong></span>
            </div>

            <h2 className="font-sans text-[clamp(24px,3.5vw,36px)] font-bold text-[#14181C] tracking-[-0.015em] leading-tight">
              {project.title}
            </h2>

            <p className="font-mono text-[13px] text-[#14181C] leading-[1.8]">
              {project.summary}
            </p>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border border-[rgba(20,24,28,0.12)] bg-[rgba(20,24,28,0.03)]">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col gap-1">
                <span className="font-mono text-[8px] text-[#7C7568] tracking-[0.2em] uppercase">
                  {m.label}
                </span>
                <span className="font-mono text-[16px] font-bold text-[#14181C]">
                  {m.value} {m.unit}
                </span>
              </div>
            ))}
          </div>

          {/* Technology Stack Badges */}
          <div>
            <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase block mb-3">
              DEPLOYED ARCHITECTURE &amp; STACK
            </span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="font-mono text-[10px] tracking-[0.16em] uppercase px-3 py-1 bg-[#F2EFE8] border border-[rgba(20,24,28,0.18)] text-[#14181C]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[rgba(20,24,28,0.16)] bg-[#F2EFE8]">
          <button
            onClick={handleClose}
            className="btn-spark text-[11px] py-2.5 px-4"
          >
            DISMISS
          </button>

          <Link
            href={`/projects/${project.slug}`}
            className="btn-spark solid text-[11px] py-2.5 px-6 flex items-center gap-2"
          >
            <span>VIEW FULL SHEET</span>
            <ArrowRight className="w-4 h-4 stroke-[1.5]" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
