// path: src/components/fx/DrawLine.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BEZIER } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface DrawLineProps {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  strokeWidth?: number;
  length?: string | number;
  className?: string;
  delay?: number;
}

export const DrawLine: React.FC<DrawLineProps> = ({
  orientation = 'horizontal',
  color = 'var(--rule)',
  strokeWidth = 1,
  length = '100%',
  className,
  delay = 0,
}) => {
  const prefersReduced = useReducedMotion();
  const isH = orientation === 'horizontal';

  if (prefersReduced) {
    return (
      <div
        className={cn('shrink-0', className)}
        style={{
          width: isH ? length : `${strokeWidth}px`,
          height: isH ? `${strokeWidth}px` : length,
          backgroundColor: color,
        }}
      />
    );
  }

  return (
    <svg
      className={cn('overflow-visible shrink-0', className)}
      style={{
        width: isH ? length : `${strokeWidth}px`,
        height: isH ? `${strokeWidth}px` : length,
      }}
      aria-hidden="true"
    >
      <motion.line
        x1={0}
        y1={0}
        x2={isH ? '100%' : 0}
        y2={isH ? 0 : '100%'}
        pathLength="1"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray="1 1"
        initial={{ strokeDashoffset: 1 }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={{ once: false, margin: '-30px' }}
        transition={{
          duration: 0.52,
          delay,
          ease: BEZIER.easeInOutQuart,
        }}
      />
    </svg>
  );
};
