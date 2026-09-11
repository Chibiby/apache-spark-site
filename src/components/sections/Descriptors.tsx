// path: src/components/sections/Descriptors.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_COPY } from '@/lib/constants';
import { BEZIER } from '@/lib/animations';

export const Descriptors: React.FC = () => {
  return (
    <section className="w-full border-t border-b border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] py-8 select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6">
          {BRAND_COPY.descriptors.map((desc, i) => (
            <React.Fragment key={desc}>
              {i > 0 && (
                <div
                  className="hidden md:block w-[5px] h-[1px] bg-[#9E5430] shrink-0"
                  aria-hidden="true"
                />
              )}
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.36,
                  delay: i * 0.1,
                  ease: BEZIER.easeOutCubic,
                }}
                className="flex items-center gap-3"
              >
                <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.2em]">
                  0{i + 1}
                </span>
                <span className="font-mono text-[12px] md:text-[14px] font-medium tracking-[0.24em] text-[#14181C] uppercase">
                  {desc}
                </span>
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
