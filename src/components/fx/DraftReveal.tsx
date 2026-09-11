// path: src/components/fx/DraftReveal.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BEZIER } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface DraftRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  showGuides?: boolean;
}

export const DraftReveal: React.FC<DraftRevealProps> = ({
  children,
  className,
  delay = 0,
  showGuides = true,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn('relative', className)}>
      {showGuides && (
        <>
          {/* Top hairline guide: draws, then clears */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1px] bg-[#9E5430] origin-left pointer-events-none z-10"
            initial={{ scaleX: 0, opacity: 0.8 }}
            whileInView={{ scaleX: 1, opacity: [0.8, 0.8, 0] }}
            viewport={{ once: false }}
            transition={{
              scaleX: { duration: 0.46, delay, ease: BEZIER.easeInOutQuart },
              opacity: { duration: 0.7, delay, times: [0, 0.6, 1] },
            }}
          />
        </>
      )}

      {/* Main content entrance */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-40px' }}
        transition={{
          duration: 0.54,
          delay: delay + 0.12,
          ease: BEZIER.easeOutQuart,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
