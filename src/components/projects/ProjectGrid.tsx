// path: src/components/projects/ProjectGrid.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { CardSkeleton } from './CardSkeleton';
import { EmptyState } from './EmptyState';
import type { Project } from '@/types';

export interface ProjectGridProps {
  projects: Project[];
  totalCount: number;
  view: 'grid' | 'list';
  onResetFilters: () => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  totalCount,
  view,
  onResetFilters,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const countStr = projects.length < 10 ? `0${projects.length}` : `${projects.length}`;
  const totalStr = totalCount < 10 ? `0${totalCount}` : `${totalCount}`;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Result count status */}
      <div
        aria-live="polite"
        className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-[#7C7568] py-2 border-b border-[rgba(20,24,28,0.10)]"
      >
        <span>
          SHOWING: <strong className="text-[#14181C]">{countStr}</strong> / {totalStr} SHEETS
        </span>
        <span className="hidden sm:inline">ALL SPECIFICATIONS CLIENT-APPROVED</span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <EmptyState onReset={onResetFilters} />
      ) : (
        <motion.div
          layout
          className={
            view === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-3'
          }
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} view={view} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
