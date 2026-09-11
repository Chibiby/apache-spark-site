// path: src/components/projects/ViewToggle.tsx
'use client';

import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

export interface ViewToggleProps {
  view: 'grid' | 'list';
  onChange: (view: 'grid' | 'list') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onChange }) => {
  return (
    <div className="inline-flex border border-[rgba(20,24,28,0.16)] shrink-0">
      <button
        onClick={() => onChange('grid')}
        className={`p-2 transition-colors ${
          view === 'grid'
            ? 'bg-[#14181C] text-[#F2EFE8]'
            : 'bg-transparent text-[#7C7568] hover:text-[#14181C]'
        }`}
        aria-label="Grid view"
        aria-pressed={view === 'grid'}
      >
        <LayoutGrid className="w-4 h-4 stroke-[1.5]" />
      </button>
      <button
        onClick={() => onChange('list')}
        className={`p-2 transition-colors border-l border-[rgba(20,24,28,0.16)] ${
          view === 'list'
            ? 'bg-[#14181C] text-[#F2EFE8]'
            : 'bg-transparent text-[#7C7568] hover:text-[#14181C]'
        }`}
        aria-label="List view"
        aria-pressed={view === 'list'}
      >
        <List className="w-4 h-4 stroke-[1.5]" />
      </button>
    </div>
  );
};
