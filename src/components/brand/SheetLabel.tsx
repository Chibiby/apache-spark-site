// path: src/components/brand/SheetLabel.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface SheetLabelProps {
  sheetNo: string;
  title?: string;
  className?: string;
  inverted?: boolean;
}

export const SheetLabel: React.FC<SheetLabelProps> = ({
  sheetNo,
  title,
  className,
  inverted = false,
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase select-none px-2.5 py-1 border',
        inverted
          ? 'border-[rgba(242,239,232,0.16)] text-[#F2EFE8]'
          : 'border-[rgba(20,24,28,0.16)] text-[#14181C]',
        className
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 shrink-0',
          inverted ? 'bg-[#C97A4A]' : 'bg-[#9E5430]'
        )}
      />
      <span className="font-semibold">{sheetNo}</span>
      {title && (
        <>
          <span className="text-[#7C7568]">/</span>
          <span className="text-[#7C7568]">{title}</span>
        </>
      )}
    </div>
  );
};
