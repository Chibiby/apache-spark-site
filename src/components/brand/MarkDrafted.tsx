// path: src/components/brand/MarkDrafted.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BRAND_GEOMETRY } from '@/lib/constants';
import { BEZIER } from '@/lib/animations';

export interface MarkDraftedProps {
  size?: number | string;
  className?: string;
  inverted?: boolean;
  animate?: boolean;
}

export const MarkDrafted: React.FC<MarkDraftedProps> = ({
  size = 120,
  className,
  inverted = false,
  animate = true,
}) => {
  const inkColor = inverted ? 'var(--paper, #F2EFE8)' : 'var(--ink, #14181C)';
  const accentColor = inverted ? 'var(--accent-lt, #C97A4A)' : 'var(--accent, #9E5430)';

  return (
    <svg
      viewBox="-120 -120 240 240"
      width={size}
      height={size}
      aria-hidden="true"
      className={cn('shrink-0 select-none overflow-visible', className)}
    >
      {/* Outer 4 edges drawn in sequential order */}
      {BRAND_GEOMETRY.edges.map((edge, i) => (
        <motion.line
          key={`outer-${i}`}
          x1={edge[0]}
          y1={edge[1]}
          x2={edge[2]}
          y2={edge[3]}
          pathLength="1"
          stroke={inkColor}
          strokeWidth="7"
          strokeLinecap="square"
          strokeDasharray="1 1"
          initial={animate ? { strokeDashoffset: 1 } : { strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            duration: 0.32,
            delay: animate ? 0.1 + i * 0.1 : 0,
            ease: BEZIER.easeInOutQuart,
          }}
        />
      ))}

      {/* Inner figure drawn at 0.46 scale in accent */}
      {BRAND_GEOMETRY.edges.map((edge, i) => (
        <motion.line
          key={`inner-${i}`}
          x1={edge[0] * BRAND_GEOMETRY.innerScale}
          y1={edge[1] * BRAND_GEOMETRY.innerScale}
          x2={edge[2] * BRAND_GEOMETRY.innerScale}
          y2={edge[3] * BRAND_GEOMETRY.innerScale}
          pathLength="1"
          stroke={accentColor}
          strokeWidth="7"
          strokeLinecap="square"
          strokeDasharray="1 1"
          initial={animate ? { strokeDashoffset: 1 } : { strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            duration: 0.28,
            delay: animate ? 0.45 + i * 0.08 : 0,
            ease: BEZIER.easeInOutQuart,
          }}
        />
      ))}

      {/* 4 Vertices as 8x8 squares at each point */}
      {BRAND_GEOMETRY.vertices.map((vert, i) => (
        <motion.rect
          key={`vert-${i}`}
          x={vert[0] - 4}
          y={vert[1] - 4}
          width={8}
          height={8}
          fill={inkColor}
          initial={animate ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.22,
            delay: animate ? 0.55 + i * 0.06 : 0,
            ease: BEZIER.easeOutBack,
          }}
        />
      ))}
    </svg>
  );
};
