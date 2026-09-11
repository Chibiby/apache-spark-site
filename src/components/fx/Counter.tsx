// path: src/components/fx/Counter.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { easeOutQuart } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface CounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  duration = 1.8,
  decimals,
  prefix = '',
  suffix = '',
  className,
}) => {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState<number>(prefersReduced ? value : 0);

  // Auto-detect decimals if not provided
  const numDecimals =
    decimals !== undefined
      ? decimals
      : value.toString().split('.')[1]?.length || 0;

  useEffect(() => {
    if (prefersReduced) {
      setDisplayValue(value);
      return;
    }

    if (!isInView) {
      setDisplayValue(0);
      return;
    }

    let start: number | null = null;
    let frameId: number;

    const animate = (time: number) => {
      if (start === null) start = time;
      const elapsed = (time - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = eased * value;

      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, duration, prefersReduced]);

  const formatted =
    numDecimals > 0
      ? displayValue.toFixed(numDecimals)
      : Math.round(displayValue).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
