// path: src/components/projects/Lightbox.tsx
'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProjectGalleryItem } from '@/types';

export interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  items: ProjectGalleryItem[];
  sheetNo: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  currentIndex,
  items,
  sheetNo,
  onClose,
  onPrev,
  onNext,
}) => {
  useLockBodyScroll(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  const current = items[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && current && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#14181C]/85 backdrop-blur-sm"
          />

          {/* Lightbox Stage */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Schematic Inspector"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="relative w-full max-w-5xl bg-[#F2EFE8] border border-[rgba(20,24,28,0.22)] z-10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(20,24,28,0.16)] font-mono text-[11px] tracking-[0.2em]">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#9E5430]" />
                <span className="font-bold text-[#14181C]">{sheetNo}</span>
                <span className="text-[#7C7568]">
                  PLATE 0{currentIndex + 1} / 0{items.length}
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-1 text-[#14181C] hover:text-[#9E5430] transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Drawing Preview Area */}
            <div className="relative aspect-[16/9] w-full bg-[#F2EFE8] flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 bg-grid-draft opacity-50 pointer-events-none" />

              {/* Technical drawing mockup vector */}
              <svg viewBox="0 0 600 300" className="w-full h-full">
                <rect x="20" y="20" width="560" height="260" fill="none" stroke="#14181C" strokeWidth="1.5" />
                <line x1="20" y1="150" x2="580" y2="150" stroke="#9E5430" strokeWidth="1.5" strokeDasharray="6 3" />
                <circle cx="150" cy="150" r="16" fill="#F2EFE8" stroke="#14181C" strokeWidth="2" />
                <circle cx="300" cy="150" r="24" fill="#9E5430" />
                <circle cx="450" cy="150" r="16" fill="#F2EFE8" stroke="#14181C" strokeWidth="2" />
                <rect x="260" y="50" width="80" height="40" fill="none" stroke="#14181C" strokeWidth="1" />
                <line x1="300" y1="90" x2="300" y2="126" stroke="#14181C" strokeWidth="1" />
                <text x="40" y="260" fill="#7C7568" fontSize="11" fontFamily="IBM Plex Mono" letterSpacing="0.18em">
                  SPEC: {current.caption}
                </text>
              </svg>

              {/* Prev / Next navigation buttons */}
              <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-[#F2EFE8] border border-[rgba(20,24,28,0.20)] hover:border-[#14181C] text-[#14181C] transition-colors"
                aria-label="Previous plate"
              >
                <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
              </button>
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-[#F2EFE8] border border-[rgba(20,24,28,0.20)] hover:border-[#14181C] text-[#14181C] transition-colors"
                aria-label="Next plate"
              >
                <ChevronRight className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Caption Footer */}
            <div className="px-6 py-4 border-t border-[rgba(20,24,28,0.16)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] text-[#7C7568]">
              <p className="tracking-[0.1em] text-[#14181C]">{current.caption}</p>
              <span className="shrink-0 tracking-[0.2em] text-[#9E5430]">
                RATIO: {current.ratio} // CERTIFIED DRAWING
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
