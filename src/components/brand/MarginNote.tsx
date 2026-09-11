// path: src/components/brand/MarginNote.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface MarginNoteProps {
  children: React.ReactNode;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'inline';
  className?: string;
}

export const MarginNote: React.FC<MarginNoteProps> = ({
  children,
  position = 'inline',
  className,
}) => {
  const positionClasses = {
    'top-left': 'absolute left-4 md:left-8 top-4 md:top-6',
    'top-right': 'absolute right-4 md:right-8 top-4 md:top-6',
    'bottom-left': 'absolute left-4 md:left-8 bottom-4 md:bottom-6',
    'bottom-right': 'absolute right-4 md:right-8 bottom-4 md:bottom-6',
    inline: 'relative inline-block',
  };

  return (
    <div
      className={cn(
        'font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-[#7C7568] select-none pointer-events-none',
        positionClasses[position],
        className
      )}
    >
      {children}
    </div>
  );
};
