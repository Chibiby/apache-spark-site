// path: src/components/projects/ProjectSort.tsx
'use client';

import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export interface ProjectSortProps {
  value: 'newest' | 'oldest' | 'az';
  onChange: (sort: 'newest' | 'oldest' | 'az') => void;
}

export const ProjectSort: React.FC<ProjectSortProps> = ({ value, onChange }) => {
  return (
    <div className="relative inline-flex items-center border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] px-3 py-1.5 shrink-0">
      <ArrowUpDown className="w-3.5 h-3.5 text-[#7C7568] stroke-[1.5] mr-2 shrink-0 pointer-events-none" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as 'newest' | 'oldest' | 'az')}
        className="bg-transparent font-mono text-[11px] tracking-[0.14em] uppercase text-[#14181C] cursor-pointer focus:outline-none appearance-none pr-4"
      >
        <option value="newest">SORT: NEWEST</option>
        <option value="oldest">SORT: OLDEST</option>
        <option value="az">SORT: A  Z</option>
      </select>
    </div>
  );
};
