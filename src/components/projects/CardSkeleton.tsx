// path: src/components/projects/CardSkeleton.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="relative flex flex-col bg-[#F2EFE8] border border-[rgba(20,24,28,0.16)] overflow-hidden min-h-[380px] select-none">
      {/* 72px background grid */}
      <div className="absolute inset-0 bg-grid-draft opacity-40 pointer-events-none" />

      {/* Drafting shimmer: a 1px guide line sweeping across the frame, not a grey pulse */}
      <motion.div
        className="absolute top-0 bottom-0 w-[1px] bg-[#9E5430] z-10 pointer-events-none"
        animate={{ left: ['0%', '100%'] }}
        transition={{
          repeat: Infinity,
          duration: 1.4,
          ease: 'easeInOut',
        }}
      />

      {/* Plate area skeleton */}
      <div className="relative aspect-[16/9] border-b border-[rgba(20,24,28,0.12)] p-6 flex flex-col justify-between">
        <div className="w-16 h-3 border border-[rgba(20,24,28,0.20)]" />
        <div className="w-24 h-3 border border-[rgba(20,24,28,0.20)] self-end" />
      </div>

      {/* Body area skeleton */}
      <div className="p-6 md:p-8 flex flex-col justify-between flex-1 gap-6">
        <div className="flex flex-col gap-3">
          <div className="w-32 h-2.5 border border-[rgba(20,24,28,0.16)]" />
          <div className="w-48 h-5 border border-[rgba(20,24,28,0.24)]" />
          <div className="w-full h-3 border border-[rgba(20,24,28,0.14)]" />
        </div>

        <div className="pt-4 border-t border-[rgba(20,24,28,0.10)] flex gap-2">
          <div className="w-12 h-4 border border-[rgba(20,24,28,0.16)]" />
          <div className="w-16 h-4 border border-[rgba(20,24,28,0.16)]" />
          <div className="w-14 h-4 border border-[rgba(20,24,28,0.16)]" />
        </div>
      </div>
    </div>
  );
};
