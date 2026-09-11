// path: src/components/projects/ProjectGallery.tsx
'use client';

import React, { useState } from 'react';
import type { ProjectGalleryItem } from '@/types';
import { Lightbox } from './Lightbox';
import { Maximize2 } from 'lucide-react';

export interface ProjectGalleryProps {
  items: ProjectGalleryItem[];
  sheetNo: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ items, sheetNo }) => {
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const openLightbox = (idx: number) => {
    setSelectedIndex(idx);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {items.map((item, idx) => (
          <div
            key={item.caption}
            onClick={() => openLightbox(idx)}
            className="group relative flex flex-col bg-[#F2EFE8] border border-[rgba(20,24,28,0.16)] p-6 cursor-pointer hover:border-[#14181C] transition-colors select-none"
          >
            {/* Aspect container */}
            <div className="relative aspect-[16/9] bg-[#F2EFE8] border border-[rgba(20,24,28,0.10)] mb-4 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-grid-draft opacity-40 pointer-events-none" />
              
              {/* Technical illustration representation */}
              <svg viewBox="0 0 200 120" className="w-full h-full opacity-60">
                <line x1="20" y1="60" x2="180" y2="60" stroke="#14181C" strokeWidth="1" strokeDasharray="3 2" />
                <circle cx="60" cy="60" r="8" fill="#F2EFE8" stroke="#14181C" strokeWidth="1.2" />
                <circle cx="140" cy="60" r="8" fill="#9E5430" />
                <rect x="90" y="35" width="20" height="50" fill="none" stroke="#14181C" strokeWidth="0.8" />
              </svg>

              <div className="absolute top-2 right-2 p-1.5 bg-[#F2EFE8] border border-[rgba(20,24,28,0.16)] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 stroke-[1.5] text-[#14181C]" />
              </div>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-[rgba(20,24,28,0.08)] font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase">
              <span>PLATE 0{idx + 1}</span>
              <span>RATIO {item.ratio}</span>
            </div>

            <p className="font-mono text-[11px] text-[#14181C] leading-relaxed mt-2 line-clamp-2">
              {item.caption}
            </p>
          </div>
        ))}
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={selectedIndex}
        items={items}
        sheetNo={sheetNo}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
};
