// path: src/components/sections/CTASheet.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { InvertedSheet } from '@/components/brand/InvertedSheet';
import { MarginNote } from '@/components/brand/MarginNote';
import { PressBar } from '@/components/brand/PressBar';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { ParallaxLayer } from '@/components/fx/ParallaxLayer';
import { BEZIER } from '@/lib/animations';

export const CTASheet: React.FC = () => {
  return (
    <InvertedSheet className="py-28 overflow-hidden">
      {/* 3px accent press-sweep band across the top */}
      <div className="absolute top-0 left-0 right-0">
        <PressBar inverted orientation="horizontal" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col items-start gap-12">
        {/* Margin notes */}
        <div className="flex items-center justify-between w-full border-b border-[rgba(242,239,232,0.16)] pb-3">
          <MarginNote className="text-[rgba(242,239,232,0.62)]">
            SHEET 14  PROJECT COMMISSIONING
          </MarginNote>
          <MarginNote className="text-[#C97A4A]">
            STATUS: ACCEPTING SPRINT RESERVATIONS
          </MarginNote>
        </div>

        {/* Parallaxing giant wordmark in paper variant */}
        <div className="w-full select-none pointer-events-none opacity-20">
          <ParallaxLayer speed={24}>
            <div className="font-sans font-extrabold text-[clamp(48px,11vw,140px)] tracking-[-0.03em] leading-none text-[#F2EFE8] whitespace-nowrap">
              START A PROJECT
            </div>
          </ParallaxLayer>
        </div>

        {/* Central call to action statement */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.52, ease: BEZIER.easeOutQuart }}
          className="max-w-3xl flex flex-col gap-6 -mt-8"
        >
          <h2 className="font-sans text-[clamp(32px,5.5vw,68px)] font-bold text-[#F2EFE8] tracking-[-0.02em] leading-[1.05]">
            Ready to draft your systems to specification?
          </h2>
          <p className="font-mono text-[14px] md:text-[16px] text-[rgba(242,239,232,0.70)] leading-relaxed max-w-2xl">
            From industrial Ethernet and dark fiber rings to low-latency Rust runtimes and cryogenic edge clusters—we deploy the systems your business runs on.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/contact"
              className="btn-spark solid text-[12px] py-4 px-8"
            >
              COMMISSION AN ARCHITECTURE SPRINT
            </Link>
            <Link
              href="/projects"
              className="btn-spark text-[12px] py-4 px-8"
            >
              EXPLORE ALL 12 CASE STUDIES
            </Link>
          </div>
        </motion.div>

        <div className="w-full pt-8">
          <DimensionLine
            inverted
            label="SAN FRANCISCO // CHICAGO // FIELD LABS WORLDWIDE"
          />
        </div>
      </div>
    </InvertedSheet>
  );
};
