// path: src/components/projects/ProjectSearch.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export interface ProjectSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export const ProjectSearch: React.FC<ProjectSearchProps> = ({ value, onChange }) => {
  const [localVal, setLocalVal] = useState<string>(value);

  useEffect(() => {
    setLocalVal(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localVal !== value) {
        onChange(localVal);
      }
    }, 280);

    return () => clearTimeout(handler);
  }, [localVal, onChange, value]);

  return (
    <div className="relative flex-1 min-w-[200px] border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] flex items-center px-3 py-1.5 focus-within:border-[#14181C]">
      <Search className="w-3.5 h-3.5 text-[#7C7568] stroke-[1.5] mr-2.5 shrink-0" />
      <input
        type="text"
        value={localVal}
        onChange={(e) => setLocalVal(e.target.value)}
        placeholder="SEARCH TITLE, CLIENT, STACK..."
        className="w-full bg-transparent font-mono text-[11px] tracking-[0.14em] uppercase text-[#14181C] placeholder:text-[#7C7568] focus:outline-none"
      />
      {localVal && (
        <button
          onClick={() => {
            setLocalVal('');
            onChange('');
          }}
          className="p-0.5 text-[#7C7568] hover:text-[#14181C]"
          aria-label="Clear search"
        >
          <X className="w-3 h-3 stroke-[1.5]" />
        </button>
      )}
    </div>
  );
};
