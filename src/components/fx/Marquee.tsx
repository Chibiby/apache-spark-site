// path: src/components/fx/Marquee.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for complete cycle
  separator?: string;
  className?: string;
  inverted?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  speed = 28,
  separator = '',
  className,
  inverted = false,
}) => {
  const prefersReduced = useReducedMotion();

  const repeated = [...items, ...items, ...items, ...items];

  if (prefersReduced) {
    return (
      <div className={cn('overflow-x-auto whitespace-nowrap py-3 font-mono text-[11px] tracking-[0.2em]', className)}>
        {items.join(`  ${separator}  `)}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden w-full whitespace-nowrap py-3.5 select-none',
        inverted ? 'border-[rgba(242,239,232,0.16)]' : 'border-[rgba(20,24,28,0.16)]',
        className
      )}
      aria-hidden="true"
    >
      <motion.div
        className="inline-flex items-center gap-6 font-mono text-[11px] md:text-[12px] tracking-[0.2em] uppercase"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {repeated.map((item, idx) => (
          <React.Fragment key={`${item}-${idx}`}>
            <span className={inverted ? 'text-[rgba(242,239,232,0.7)]' : 'text-[#7C7568]'}>
              {item}
            </span>
            <span
              className={cn(
                'inline-block w-1.5 h-1.5 shrink-0',
                inverted ? 'bg-[#C97A4A]' : 'bg-[#9E5430]'
              )}
            />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
