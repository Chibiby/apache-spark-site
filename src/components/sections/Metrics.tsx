// path: src/components/sections/Metrics.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InvertedSheet } from '@/components/brand/InvertedSheet';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { Counter } from '@/components/fx/Counter';
import { METRIC_STATS } from '@/data/stats';
import { BEZIER } from '@/lib/animations';

export const Metrics: React.FC = () => {
  return (
    <InvertedSheet className="py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Margin annotations */}
        <div className="flex items-center justify-between w-full border-b border-[rgba(242,239,232,0.16)] pb-3 mb-16">
          <MarginNote className="text-[rgba(242,239,232,0.62)]">
            SHEET 07 — FIELD PERFORMANCE METRICS
          </MarginNote>
          <MarginNote className="text-[rgba(242,239,232,0.62)]">
            VERIFIED HISTORICAL DATA
          </MarginNote>
        </div>

        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="font-mono text-[11px] text-[#C97A4A] tracking-[0.24em] uppercase block mb-3">
            // TELEMETRY &amp; SLAs
          </span>
          <h2 className="font-sans text-[clamp(28px,4.5vw,52px)] font-bold tracking-[-0.02em] leading-tight text-[#F2EFE8]">
            Numbers that hold under real operational load.
          </h2>
        </div>

        {/* 4 Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {METRIC_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.46, delay: i * 0.08, ease: BEZIER.easeOutQuart }}
              className="flex flex-col justify-between"
            >
              {/* Top index and callout */}
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(242,239,232,0.16)] mb-6 font-mono text-[10px] tracking-[0.2em]">
                <span className="text-[#C97A4A]">0{i + 1}</span>
                <span className="text-[rgba(242,239,232,0.62)] uppercase">{stat.unitCallout}</span>
              </div>

              {/* Huge count-up number */}
              <div className="font-sans font-bold text-[clamp(44px,6vw,72px)] text-[#F2EFE8] leading-none tracking-[-0.03em] mb-4">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.value % 1 !== 0 ? stat.value.toString().split('.')[1].length : 0}
                />
              </div>

              {/* Metric Label */}
              <p className="font-mono text-[11px] md:text-[12px] tracking-[0.16em] uppercase text-[rgba(242,239,232,0.72)] leading-relaxed pt-3 border-t border-[rgba(242,239,232,0.10)]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom dimension callout */}
        <div className="mt-16">
          <DimensionLine
            inverted
            label="PRODUCTION AUDIT // ZERO LOSS TOLERANCE // 100% RETENTION"
          />
        </div>
      </div>
    </InvertedSheet>
  );
};
