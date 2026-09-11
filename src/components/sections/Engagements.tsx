// path: src/components/sections/Engagements.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { BEZIER } from '@/lib/animations';

const TIERS = [
  {
    index: '01',
    name: 'ARCHITECTURAL DRAFT',
    tagline: 'Discovery, risk register & complete engineering schematics.',
    duration: '35 WEEKS',
    scope: 'Ideal for organizations planning major facility retrofits or mission-critical system overhauls requiring pre-procurement certainty.',
    features: [
      'Physical plant & RF spectrum site survey',
      'Single-line electrical & optical CAD schematics',
      'Hardware BOM selection & vendor RFQ pack',
      'Zero-downtime cutover risk matrix',
    ],
    recommended: false,
  },
  {
    index: '02',
    name: 'FULL IMPLEMENTATION',
    tagline: 'End-to-end turnkey delivery from physical closet to deployment pipeline.',
    duration: '49 MONTHS',
    scope: 'Our primary delivery engagement. A single cross-functional engineering pod handles physical cabling, bare-metal compute, and software runtime deployment.',
    features: [
      'Everything in Architectural Draft',
      'Complete physical Cat6A & optical fiber installation',
      'Off-site hardware staging, burn-in & RT kernel build',
      'Non-disruptive production cutover execution',
      'Fluke DSX-8000 test reports & full IP transfer',
    ],
    recommended: true,
  },
  {
    index: '03',
    name: 'RETAINED ESCALATION',
    tagline: 'Ongoing architectural advisory & Tier-4 operational backing.',
    duration: 'ANNUAL AGREEMENT',
    scope: 'Direct line to our principal systems architects for enterprise clients operating systems where unexpected downtime is unacceptable.',
    features: [
      'Quarterly physical & logical resilience audits',
      '15-minute emergency architecture response SLA',
      'Root-cause forensic analysis on hardware/network anomalies',
      'Continuous disaster recovery chaos simulations',
    ],
    recommended: false,
  },
];

export const Engagements: React.FC = () => {
  return (
    <section id="engagements" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3 mb-12">
        <MarginNote>SHEET 11  ENGAGEMENT STRUCTURES</MarginNote>
        <MarginNote>FIXED DELIVERABLES // NO TIME &amp; MATERIALS</MarginNote>
      </div>

      <div className="max-w-2xl mb-12">
        <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase block mb-3">
          // COMMERCIAL STRUCTURE
        </span>
        <h2 className="font-sans text-[clamp(28px,4.5vw,52px)] font-bold tracking-[-0.02em] leading-tight text-[#14181C]">
          Fixed scope. Absolute accountability.
        </h2>
      </div>

      {/* 1px-seam tier grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[1px] bg-[rgba(20,24,28,0.16)] border border-[rgba(20,24,28,0.16)]">
        {TIERS.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.48, delay: i * 0.1, ease: BEZIER.easeOutQuart }}
            className={`relative bg-[#F2EFE8] p-8 flex flex-col justify-between ${
              tier.recommended ? 'border-t-2 border-t-[#9E5430]' : ''
            }`}
          >
            {/* Recommended tab: 2px accent rule + mono tab, NO glow */}
            {tier.recommended && (
              <div className="absolute top-0 right-8 -translate-y-full bg-[#9E5430] text-[#F2EFE8] font-mono text-[9px] tracking-[0.2em] font-medium uppercase px-3 py-1">
                RECOMMENDED
              </div>
            )}

            <div>
              {/* Top Index & Duration */}
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(20,24,28,0.10)] font-mono text-[10px] tracking-[0.2em]">
                <span className="text-[#9E5430] font-semibold">{tier.index}</span>
                <span className="text-[#7C7568]">{tier.duration}</span>
              </div>

              {/* Title & Tagline */}
              <div className="py-6 flex flex-col gap-2">
                <h3 className="font-sans text-[22px] font-bold text-[#14181C] tracking-[-0.01em]">
                  {tier.name}
                </h3>
                <p className="font-mono text-[12px] text-[#7C7568] leading-relaxed">
                  {tier.tagline}
                </p>
              </div>

              {/* Scope */}
              <p className="font-mono text-[11px] text-[#14181C] leading-[1.7] pb-6 border-b border-[rgba(20,24,28,0.10)]">
                {tier.scope}
              </p>

              {/* Features list */}
              <div className="py-6 flex flex-col gap-2.5">
                <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase block mb-1">
                  DELIVERABLES INCLUDED
                </span>
                {tier.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 font-mono text-[11px] text-[#14181C]">
                    <span className="text-[#9E5430] shrink-0">+</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA action */}
            <div className="pt-6 border-t border-[rgba(20,24,28,0.10)]">
              <Link
                href="/contact"
                className={`btn-spark w-full text-center ${
                  tier.recommended ? 'solid' : ''
                }`}
              >
                REQUEST SCOPE
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <DimensionLine label="ALL ENGAGEMENTS BACKED BY 100% IP &amp; REPOSITORY TRANSFER" />
      </div>
    </section>
  );
};
