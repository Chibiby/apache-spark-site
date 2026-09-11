// path: src/app/projects/loading.tsx
import React from 'react';
import { CardSkeleton } from '@/components/projects/CardSkeleton';

export default function Loading() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
