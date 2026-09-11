// path: src/components/brand/DimensionLine.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface DimensionLineProps {
  label: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  inverted?: boolean;
}

export const DimensionLine: React.FC<DimensionLineProps> = ({
  label,
  orientation = 'horizontal',
  className,
  inverted = false,
}) => {
  const ruleColor = inverted ? 'rgba(242,239,232,0.22)' : 'rgba(20,24,28,0.22)';
  const tickColor = inverted ? 'rgba(242,239,232,0.40)' : 'rgba(20,24,28,0.40)';
  const textColor = inverted ? 'rgba(242,239,232,0.70)' : '#7C7568';

  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'relative flex flex-col items-center justify-between h-full select-none pointer-events-none py-1',
          className
        )}
      >
        {/* Top tick */}
        <div
          className="w-[9px] h-[1px] shrink-0"
          style={{ backgroundColor: tickColor }}
        />
        {/* Top line */}
        <div
          className="w-[1px] flex-1"
          style={{ backgroundColor: ruleColor }}
        />
        {/* Label */}
        <span
          className="font-mono text-[9px] tracking-[0.2em] uppercase whitespace-nowrap py-2 rotate-90"
          style={{ color: textColor }}
        >
          {label}
        </span>
        {/* Bottom line */}
        <div
          className="w-[1px] flex-1"
          style={{ backgroundColor: ruleColor }}
        />
        {/* Bottom tick */}
        <div
          className="w-[9px] h-[1px] shrink-0"
          style={{ backgroundColor: tickColor }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative flex items-center justify-between w-full select-none pointer-events-none px-1',
        className
      )}
    >
      {/* Left tick */}
      <div
        className="w-[1px] h-[9px] shrink-0"
        style={{ backgroundColor: tickColor }}
      />
      {/* Left line */}
      <div
        className="h-[1px] flex-1"
        style={{ backgroundColor: ruleColor }}
      />
      {/* Centered label */}
      <span
        className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase whitespace-nowrap px-3"
        style={{ color: textColor }}
      >
        {label}
      </span>
      {/* Right line */}
      <div
        className="h-[1px] flex-1"
        style={{ backgroundColor: ruleColor }}
      />
      {/* Right tick */}
      <div
        className="w-[1px] h-[9px] shrink-0"
        style={{ backgroundColor: tickColor }}
      />
    </div>
  );
};
