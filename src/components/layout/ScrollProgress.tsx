// path: src/components/layout/ScrollProgress.tsx
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const isEmbed =
    pathname?.startsWith('/embed') ||
    (typeof window !== 'undefined' && window.self !== window.top);

  if (isEmbed) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#9E5430] origin-left z-[100] pointer-events-none select-none"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};
