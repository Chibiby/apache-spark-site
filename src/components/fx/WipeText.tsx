// path: src/components/fx/WipeText.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BEZIER } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface WipeTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}

export const WipeText: React.FC<WipeTextProps> = ({
  text,
  as: Component = 'div',
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
}) => {
  const prefersReduced = useReducedMotion();
  const words = text.split(' ');

  if (prefersReduced) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component className={cn('inline-block', className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block whitespace-nowrap mr-[0.26em]">
          <motion.span
            className={cn('inline-block', wordClassName)}
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{
              duration: 0.44,
              delay: delay + i * stagger,
              ease: BEZIER.easeInOutQuart,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};
