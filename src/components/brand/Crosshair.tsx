// path: src/components/brand/Crosshair.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface CrosshairProps {
  size?: number;
  className?: string;
  inverted?: boolean;
}

export const Crosshair: React.FC<CrosshairProps> = ({
  size = 24,
  className,
  inverted = false,
}) => {
  const accentColor = inverted ? '#C97A4A' : '#9E5430';
  const half = size / 2;

  return (
    <div
      className={cn('relative pointer-events-none select-none shrink-0', className)}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
    >
      {/* Horizontal hairline */}
      <div
        className="absolute left-0 w-full h-[1px]"
        style={{
          top: `${half}px`,
          backgroundColor: accentColor,
        }}
      />
      {/* Vertical hairline */}
      <div
        className="absolute top-0 h-full w-[1px]"
        style={{
          left: `${half}px`,
          backgroundColor: accentColor,
        }}
      />
    </div>
  );
};
