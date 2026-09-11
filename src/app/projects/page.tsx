// path: src/app/projects/page.tsx
import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProjectsArchiveClient } from './ProjectsArchiveClient';
import { CardSkeleton } from '@/components/projects/CardSkeleton';

export const metadata: Metadata = {
  title: 'Project Sheets Archive  Apache Spark',
  description:
    'Complete technical drawings, performance audits, and engineering case studies across industrial SCADA, clinical telemetry, multimodal logistics, and cryogenic infrastructure.',
};

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <ProjectsArchiveClient />
    </Suspense>
  );
}
