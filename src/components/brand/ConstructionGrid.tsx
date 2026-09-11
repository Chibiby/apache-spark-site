// path: src/components/brand/ConstructionGrid.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface ConstructionGridProps {
  className?: string;
  opacity?: number;
}

export const ConstructionGrid: React.FC<ConstructionGridProps> = ({
  className,
  opacity = 0.7,
}) => {
  return (
    <div
      className={cn(
        'absolute inset-0 bg-grid-draft pointer-events-none select-none z-0',
        className
      )}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
};
