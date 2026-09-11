// path: src/app/about/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TEAM_MEMBERS } from '@/data/team';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { EnterpriseTrustBadges } from '@/components/sections';

export const metadata: Metadata = {
  title: 'About the Firm  Apache Spark',
  description:
    'The engineering ethos, physical standards, and technical leadership behind Apache Spark.',
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-16 select-none min-h-screen">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3">
        <MarginNote>ABOUT // ENGINEERING ETHOS</MarginNote>
        <MarginNote>SAN FRANCISCO &amp; CHICAGO LABS</MarginNote>
      </div>

      {/* Header */}
      <div className="max-w-3xl flex flex-col gap-4">
        <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase">
          // OUR DOCTRINE
        </span>
        <h1 className="font-sans text-[clamp(34px,6vw,72px)] font-bold text-[#14181C] tracking-[-0.02em] leading-[1.02]">
          One team from the wiring closet to the deployment pipeline.
        </h1>
        <p className="font-mono text-[14px] md:text-[16px] text-[#7C7568] leading-[1.8] max-w-2xl">
          Most modern system failures occur at the seam between contractors. The electrical contractor blames the structured cabling vendor, who blames the network team, who blames the software developers. We eliminated the seam.
        </p>
      </div>

      {/* Engineering Ethos Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[rgba(20,24,28,0.16)] border border-[rgba(20,24,28,0.16)]">
        <div className="bg-[#F2EFE8] p-8 flex flex-col justify-between min-h-[260px]">
          <div className="font-mono text-[11px] text-[#9E5430] tracking-[0.2em] font-semibold">
            01 // PHYSICAL DRAFTSMANSHIP
          </div>
          <p className="font-mono text-[12px] text-[#14181C] leading-[1.8] my-4">
            We terminate structured cabling and fusion-splice fiber with the same obsessive precision we apply to zero-allocation Rust code. Cables are comb-dressed, labelled with high-durability thermal wraps, and tested to Fluke DSX Level 2G accuracy.
          </p>
          <div className="font-mono text-[9px] text-[#7C7568] tracking-[0.16em]">
            STANDARD: ANSI/TIA-568.2-D
          </div>
        </div>

        <div className="bg-[#F2EFE8] p-8 flex flex-col justify-between min-h-[260px]">
          <div className="font-mono text-[11px] text-[#9E5430] tracking-[0.2em] font-semibold">
            02 // DETERMINISTIC ARCHITECTURE
          </div>
          <p className="font-mono text-[12px] text-[#14181C] leading-[1.8] my-4">
            We design for non-blocking predictability. Under peak traffic surges or physical fiber cuts, our systems fail over deterministically in millisecondswithout dropped packets, cascading memory leaks, or database lock locks.
          </p>
          <div className="font-mono text-[9px] text-[#7C7568] tracking-[0.16em]">
            STANDARD: IEEE 802.1Qbb / RFC 8365
          </div>
        </div>

        <div className="bg-[#F2EFE8] p-8 flex flex-col justify-between min-h-[260px]">
          <div className="font-mono text-[11px] text-[#9E5430] tracking-[0.2em] font-semibold">
            03 // ZERO VENDOR LOCK-IN
          </div>
          <p className="font-mono text-[12px] text-[#14181C] leading-[1.8] my-4">
            Every line of code, CAD schematic, switch configuration, and operating runbook is fully transferred to the client upon project completion. We build systems you can run autonomously for decades without ongoing consulting dependency.
          </p>
          <div className="font-mono text-[9px] text-[#7C7568] tracking-[0.16em]">
            POLICY: 100% CLIENT IP OWNERSHIP
          </div>
        </div>
      </div>

      {/* Leadership Team Section */}
      <section id="team" className="flex flex-col gap-8 pt-8">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.24em] uppercase">
            // PRINCIPALS
          </span>
          <h2 className="font-sans text-[28px] md:text-[36px] font-bold text-[#14181C]">
            Technical Leadership
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[rgba(20,24,28,0.16)] border border-[rgba(20,24,28,0.16)]">
          {TEAM_MEMBERS.map((m) => (
            <div
              key={m.index}
              className={`p-8 flex flex-col justify-between min-h-[240px] ${
                m.isHiring ? 'bg-[#EFECE5]' : 'bg-[#F2EFE8]'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(20,24,28,0.10)] font-mono text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="text-[#9E5430] font-semibold">{m.index}</span>
                  {m.devNumber && (
                    <span className="bg-[#14181C] text-[#F2EFE8] px-1.5 py-0.5 text-[9px] tracking-[0.14em] font-medium">
                      {m.devNumber}
                    </span>
                  )}
                </div>
                {m.isHiring ? (
                  <span className="text-[#9E5430] font-semibold tracking-[0.14em] bg-[#9E5430]/10 px-2 py-0.5 border border-[#9E5430]/30">
                    {m.hiringLabel || 'HIRING'}
                  </span>
                ) : (
                  <span className="text-[#7C7568]">STATION {m.index}</span>
                )}
              </div>
              <div className="py-4">
                <h3
                  className={`font-sans text-[20px] font-bold ${
                    m.isHiring ? 'text-[#7C7568]' : 'text-[#14181C]'
                  }`}
                >
                  {m.name}
                </h3>
                <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.14em] uppercase block mt-0.5">
                  {m.role}
                </span>
                <p className="font-mono text-[11px] text-[#7C7568] mt-1.5">
                  {m.specialization}
                </p>
              </div>
              <div className="pt-3 border-t border-[rgba(20,24,28,0.08)] font-mono text-[10px] flex items-center justify-between">
                <span className={m.isHiring ? 'text-[#9E5430]' : 'text-[#14181C]'}>
                  {m.credential}
                </span>
                {m.isHiring && (
                  <Link
                    href="/#team"
                    className="text-[#14181C] hover:text-[#9E5430] font-semibold underline underline-offset-2"
                  >
                    APPLY →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Security & Governance Badges */}
      <EnterpriseTrustBadges />

      {/* Bottom CTA */}
      <div className="p-8 md:p-12 border border-[rgba(20,24,28,0.16)] bg-[#14181C] text-[#F2EFE8] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] text-[#C97A4A] tracking-[0.24em] uppercase">
            // COMMISSION AN ARCHITECTURE SPRINT
          </span>
          <h3 className="font-sans text-[22px] md:text-[26px] font-bold text-[#F2EFE8]">
            Partner with our Senior Principal Engineers.
          </h3>
          <p className="font-mono text-[12px] text-[#C0B9AA]">
            Direct architect communication, zero junior delegation, 100% IP transfer upon completion.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/contact"
            className="btn-spark solid text-[11px] py-3 px-6 whitespace-nowrap"
          >
            START AN ENGAGEMENT →
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <DimensionLine label="APACHE SPARK // FOUNDED 2018 // SAN FRANCISCO &amp; CHICAGO" />
      </div>
    </div>
  );
}
