// path: src/components/brand/Mark.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { BRAND_GEOMETRY } from '@/lib/constants';

export interface MarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  inverted?: boolean;
}

export const Mark: React.FC<MarkProps> = ({
  size = 32,
  className,
  inverted = false,
  ...props
}) => {
  return (
    <svg
      viewBox={BRAND_GEOMETRY.viewBox}
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={cn('shrink-0 select-none overflow-visible', className)}
      {...props}
    >
      <path
        d={BRAND_GEOMETRY.outer}
        stroke={inverted ? 'var(--paper, #F2EFE8)' : 'var(--ink, #14181C)'}
        strokeWidth="14"
        strokeLinejoin="miter"
      />
      <path
        d={BRAND_GEOMETRY.inner}
        fill={inverted ? 'var(--accent-lt, #C97A4A)' : 'var(--accent, #9E5430)'}
      />
    </svg>
  );
};
