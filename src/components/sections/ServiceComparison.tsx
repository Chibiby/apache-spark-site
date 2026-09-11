// path: src/components/sections/ServiceComparison.tsx
'use client';

import React from 'react';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { openScheduleModal } from '@/lib/events';
import { Check } from 'lucide-react';

interface ComparisonRow {
  dimension: string;
  subtext: string;
  freelance: string;
  traditionalAgency: string;
  bigConsulting: string;
  apacheSpark: string;
  isSparkAdvantage: boolean;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: 'Team Composition & Seniority',
    subtext: 'Who actually writes your code and designs your systems',
    freelance: 'Single dev; high bus-factor risk',
    traditionalAgency: 'Pitched by seniors, built by junior devs',
    bigConsulting: 'Billed by partners, built by offshore associates',
    apacheSpark: 'Dedicated Senior Principal Architect + Systems Pod',
    isSparkAdvantage: true,
  },
  {
    dimension: 'Physical Cabling to Modern Cloud',
    subtext: 'Breadth of stack and elimination of contractor seams',
    freelance: 'Frontend or backend only',
    traditionalAgency: 'Web application only (no infrastructure)',
    bigConsulting: 'Slide decks & vendor sub-contractors',
    apacheSpark: 'Complete vertical: Structured cabling to Rust/Next.js',
    isSparkAdvantage: true,
  },
  {
    dimension: 'P99 Latency & Performance SLA',
    subtext: 'Verifiable production speed commitments',
    freelance: 'No SLA / best effort',
    traditionalAgency: 'Generic Lighthouse 70-80 scores',
    bigConsulting: 'Not measured in contracts',
    apacheSpark: '< 20ms p99 SLA & 100/100 Lighthouse benchmarked',
    isSparkAdvantage: true,
  },
  {
    dimension: 'IP Ownership & Clean Escrow',
    subtext: 'Transfer of CAD drawings, source code, and runbooks',
    freelance: 'Disputed or inconsistent transfer',
    traditionalAgency: 'Proprietary CMS / vendor lock-in hooks',
    bigConsulting: 'Complex multi-tiered licensing fees',
    apacheSpark: '100% Day-1 Clean IP transfer with full runbooks',
    isSparkAdvantage: true,
  },
  {
    dimension: 'Pricing Model & Cost Predictability',
    subtext: 'How project budgets are structured and protected',
    freelance: 'Hourly drift with unpredictable scope',
    traditionalAgency: 'Opaque change orders & scope creep',
    bigConsulting: '$350-$650/hr uncapped time & materials',
    apacheSpark: 'Deterministic fixed-price sprints & explicit deliverables',
    isSparkAdvantage: true,
  },
  {
    dimension: 'Direct Engineer Access',
    subtext: 'How you communicate day-to-day during the sprint',
    freelance: 'Sporadic WhatsApp / email updates',
    traditionalAgency: 'Filtered through non-technical Account Managers',
    bigConsulting: 'Weekly PowerPoint status committee calls',
    apacheSpark: 'Direct shared Slack/Discord channel with the engineers',
    isSparkAdvantage: true,
  },
  {
    dimension: 'Enterprise Compliance & Security',
    subtext: 'SOC 2 Type II, HIPAA readiness, and Zero-Trust',
    freelance: 'Typically neglected',
    traditionalAgency: 'Surface-level SSL certificates only',
    bigConsulting: 'High-cost audit add-on packages',
    apacheSpark: 'Strict RLS, encrypted audit tables & Zero-Trust default',
    isSparkAdvantage: true,
  },
];

export const ServiceComparison: React.FC = () => {
  return (
    <section id="comparison-matrix" className="py-20 border-t border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] relative select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-12">
        {/* Margin Annotations */}
        <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3">
          <MarginNote>BENCHMARKING // SERVICE TOPOLOGY</MarginNote>
          <MarginNote>WHY HIGH-GROWTH FIRMS PARTNER WITH APACHE SPARK</MarginNote>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl flex flex-col gap-3">
            <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase font-semibold">
              // MARKET COMPARISON
            </span>
            <h2 className="font-sans text-[clamp(28px,5vw,52px)] font-bold text-[#14181C] tracking-[-0.02em] leading-[1.05]">
              Eliminate Contractor Fragmentation
            </h2>
            <p className="font-mono text-[13px] md:text-[15px] text-[#7C7568] leading-[1.8]">
              Most engineering projects bleed capital at the seams between disconnected vendors. Here is how our dedicated architecture pods compare to traditional alternatives.
            </p>
          </div>

          <button
            onClick={() => openScheduleModal()}
            className="btn-spark solid text-[11px] py-3 px-6 shrink-0"
          >
            RESERVE A SPRINT POD
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto border border-[rgba(20,24,28,0.20)] bg-[#EFECE5] shadow-sm">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-[rgba(20,24,28,0.16)] bg-[#E8E4DC] font-mono text-[11px] tracking-[0.16em] uppercase text-[#14181C]">
                <th className="py-4 px-5 font-semibold w-1/4">ENGINEERING CAPABILITY</th>
                <th className="py-4 px-4 text-[#7C7568] w-1/5 font-normal">AD-HOC FREELANCERS</th>
                <th className="py-4 px-4 text-[#7C7568] w-1/5 font-normal">DEV AGENCIES</th>
                <th className="py-4 px-4 text-[#7C7568] w-1/5 font-normal">BIG-4 CONSULTING</th>
                <th className="py-4 px-5 bg-[#14181C] text-[#F2EFE8] w-1/4 font-semibold">
                  <div className="flex items-center justify-between">
                    <span>APACHE SPARK</span>
                    <span className="text-[#9E5430] text-[9px]">// DEDICATED POD</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(20,24,28,0.10)] font-mono text-[12px]">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.dimension} className="hover:bg-[#FAF8F3] transition-colors">
                  <td className="py-4 px-5 align-top">
                    <div className="font-sans font-bold text-[#14181C] text-[14px]">
                      {row.dimension}
                    </div>
                    <div className="font-mono text-[10px] text-[#7C7568] mt-0.5">
                      {row.subtext}
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top text-[#7C7568] text-[11px] leading-relaxed">
                    {row.freelance}
                  </td>
                  <td className="py-4 px-4 align-top text-[#7C7568] text-[11px] leading-relaxed">
                    {row.traditionalAgency}
                  </td>
                  <td className="py-4 px-4 align-top text-[#7C7568] text-[11px] leading-relaxed">
                    {row.bigConsulting}
                  </td>
                  <td className="py-4 px-5 align-top bg-[rgba(158,84,48,0.06)] border-l border-r border-[#9E5430]/30 text-[#14181C] font-semibold text-[12px] leading-relaxed">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#9E5430] shrink-0 mt-0.5" />
                      <span>{row.apacheSpark}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <DimensionLine label="STANDARD COMPARISON // TRANSPARENT PRODUCTION COMMITMENTS" />
        </div>
      </div>
    </section>
  );
};
