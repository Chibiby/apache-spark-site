// path: src/components/sections/Hero.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { WipeText } from '@/components/fx/WipeText';
import { MarginNote } from '@/components/brand/MarginNote';
import { Crosshair } from '@/components/brand/Crosshair';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { BRAND_COPY } from '@/lib/constants';
import { BEZIER } from '@/lib/animations';
import { openScheduleModal } from '@/lib/events';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto select-none"
    >
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3">
        <MarginNote>SHEET 02  ARCHITECTURE &amp; DEPLOYMENT</MarginNote>
        <MarginNote>SCALE 1:1</MarginNote>
      </div>

      {/* Optical center crosshair */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        <Crosshair size={32} />
      </div>

      {/* Central hero statement */}
      <div className="flex flex-col gap-8 my-auto py-12 max-w-4xl">
        <h1 className="font-sans text-[clamp(38px,7.5vw,94px)] font-bold tracking-[-0.02em] leading-[1.02] text-[#14181C]">
          <span className="font-normal text-[#7C7568] block sm:inline mr-3">
            <WipeText text={BRAND_COPY.h1Soft} as="span" delay={0.1} />
          </span>
          <WipeText text={BRAND_COPY.h1Ink} as="span" delay={0.25} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, delay: 0.5, ease: BEZIER.easeOutQuart }}
          className="font-mono text-[clamp(13px,1.6vw,17px)] leading-[1.8] text-[#7C7568] max-w-2xl"
        >
          {BRAND_COPY.lede}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.44, delay: 0.65, ease: BEZIER.easeOutQuart }}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <Link href="/contact" className="btn-spark solid">
            START A PROJECT
          </Link>
          <button
            type="button"
            onClick={openScheduleModal}
            className="btn-spark border-[#9E5430] text-[#14181C] hover:bg-[#9E5430] hover:text-[#F2EFE8]"
          >
            BOOK 20-MIN DISCOVERY
          </button>
          <Link href="/projects" className="btn-spark">
            OUR WORK
          </Link>
        </motion.div>
      </div>

      {/* Bottom dimension callout line */}
      <div className="w-full pt-8">
        <DimensionLine label="CORE ARCHITECTURE // RUNTIME TO HARDWARE // 192 UNITS" />
      </div>
    </section>
  );
};
