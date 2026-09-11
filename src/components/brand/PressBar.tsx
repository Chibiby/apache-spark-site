// path: src/components/brand/PressBar.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface PressBarProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  inverted?: boolean;
}

export const PressBar: React.FC<PressBarProps> = ({
  className,
  orientation = 'horizontal',
  inverted = false,
}) => {
  const accentColor = inverted ? 'var(--accent-lt, #C97A4A)' : 'var(--accent, #9E5430)';

  return (
    <div
      className={cn(
        'shrink-0 pointer-events-none select-none',
        orientation === 'horizontal' ? 'w-full h-[3px]' : 'h-full w-[3px]',
        className
      )}
      style={{ backgroundColor: accentColor }}
      aria-hidden="true"
    />
  );
};
