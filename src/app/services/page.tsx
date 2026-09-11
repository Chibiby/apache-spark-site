// path: src/app/services/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICE_PILLARS, CAPABILITIES } from '@/data/services';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';

export const metadata: Metadata = {
  title: 'Engineering Services  Apache Spark',
  description:
    'Software, systems, networks, and infrastructure drafted to spec and deployed end to end. One engineering team from the wiring closet to the deployment pipeline.',
};

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-16 select-none min-h-screen">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3">
        <MarginNote>DISCIPLINES // 04 PILLARS</MarginNote>
        <MarginNote>SPECIFICATION &amp; FIELD DEPLOYMENT</MarginNote>
      </div>

      {/* Header */}
      <div className="max-w-3xl flex flex-col gap-4">
        <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase">
          // CAPABILITY PORTFOLIO
        </span>
        <h1 className="font-sans text-[clamp(34px,6vw,72px)] font-bold text-[#14181C] tracking-[-0.02em] leading-[1.02]">
          Engineering Services
        </h1>
        <p className="font-mono text-[14px] md:text-[16px] text-[#7C7568] leading-[1.8] max-w-2xl">
          We eliminate the contractor fragmentation that causes mission-critical failures. Our engineers draft the physical cabling, configure the high-speed optical transceivers, build the bare-metal OS, and write the distributed application runtimes.
        </p>
      </div>

      {/* 4 Deep-Dive Service Pillars */}
      <div className="flex flex-col gap-16">
        {SERVICE_PILLARS.map((pillar) => (
          <div
            key={pillar.title}
            id={pillar.title.toLowerCase()}
            className="border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] p-8 md:p-12 flex flex-col gap-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-[rgba(20,24,28,0.12)]">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[16px] font-bold text-[#9E5430] tracking-[0.2em]">
                  {pillar.index}
                </span>
                <h2 className="font-sans text-[28px] md:text-[36px] font-bold text-[#14181C] tracking-[-0.01em]">
                  {pillar.title}
                </h2>
              </div>
              <span className="font-mono text-[11px] text-[#7C7568] tracking-[0.16em] uppercase">
                {pillar.summary}
              </span>
            </div>

            <p className="font-mono text-[13px] md:text-[14px] text-[#14181C] leading-[1.9] max-w-4xl">
              {pillar.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.2em] uppercase font-semibold">
                  CORE TECHNICAL CAPABILITIES
                </span>
                <ul className="flex flex-col gap-2 font-mono text-[12px] text-[#14181C]">
                  {pillar.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2.5">
                      <span className="text-[#9E5430] shrink-0">+</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.2em] uppercase font-semibold">
                  DELIVERABLES &amp; ARTIFACTS
                </span>
                <ul className="flex flex-col gap-2 font-mono text-[12px] text-[#14181C]">
                  {pillar.deliverables.map((del) => (
                    <li key={del} className="flex items-start gap-2.5">
                      <span className="text-[#9E5430] shrink-0">+</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[rgba(20,24,28,0.10)] flex items-center justify-between">
              <Link
                href="/contact"
                className="btn-spark solid text-[11px] py-2.5 px-6"
              >
                DISCUSS A {pillar.title.toUpperCase()} SPRINT
              </Link>
              <span className="font-mono text-[10px] text-[#7C7568] tracking-[0.18em]">
                CERTIFIED STANDARDS COMPLIANT
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Capabilities Matrix */}
      <div className="flex flex-col gap-6 pt-8">
        <h3 className="font-sans text-[24px] md:text-[30px] font-bold text-[#14181C]">
          Certified Technical Standards
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[rgba(20,24,28,0.16)] border border-[rgba(20,24,28,0.16)]">
          {CAPABILITIES.map((c) => (
            <div key={c.name} className="bg-[#F2EFE8] p-6 flex flex-col justify-between min-h-[160px]">
              <div className="flex items-center justify-between font-mono text-[9px] text-[#7C7568] tracking-[0.2em]">
                <span>{c.code}</span>
                <span className="text-[#9E5430]">{c.index}</span>
              </div>
              <div className="font-mono text-[12px] font-semibold text-[#14181C] uppercase tracking-[0.1em] my-2">
                {c.name}
              </div>
              <p className="font-mono text-[10px] text-[#7C7568] leading-relaxed">
                {c.spec}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <DimensionLine label="4 DIVISIONS // 100% SPECIFICATION RESPONSIBILITY" />
      </div>
    </div>
  );
}
