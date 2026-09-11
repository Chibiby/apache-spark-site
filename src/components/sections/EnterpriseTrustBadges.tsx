// path: src/components/sections/EnterpriseTrustBadges.tsx
'use client';

import React from 'react';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { openScheduleModal } from '@/lib/events';
import {
  ShieldCheck,
  Lock,
  FileCode2,
  FileCheck2,
  Clock,
  KeyRound,
} from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: 'SOC 2 Type II Preparedness',
    code: 'SEC-01',
    description:
      'All architectures implement encrypted audit trails, automated RBAC, least-privilege IAM policies, and continuous vulnerability scanning to ensure frictionless third-party SOC 2 Type II certification.',
    standard: 'AICPA TRUST SERVICES CRITERIA',
  },
  {
    icon: Lock,
    title: 'Zero-Trust Data Mesh & HIPAA Readiness',
    code: 'SEC-02',
    description:
      'Strict tenant isolation via PostgreSQL Row-Level Security (RLS), end-to-end AES-256 encryption at rest, TLS 1.3 in transit, and sealed audit logs suitable for healthcare and government telemetry.',
    standard: 'NIST SP 800-207 / HIPAA §164.312',
  },
  {
    icon: FileCode2,
    title: '100% Client IP Ownership & Clean Escrow',
    code: 'LEG-01',
    description:
      'Zero proprietary vendor lock-in hooks. All software source code, CAD schematics, infrastructure-as-code scripts, and operational runbooks are transferred to your repository upon milestone acceptance.',
    standard: 'EXCLUSIVE PERPETUAL ASSIGNMENT',
  },
  {
    icon: FileCheck2,
    title: 'Bilateral Mutual NDA Guarantee',
    code: 'LEG-02',
    description:
      'We execute a comprehensive mutual non-disclosure agreement prior to reviewing any proprietary codebase, CAD drawing, or confidential product roadmap. Your trade secrets remain strictly protected.',
    standard: 'MUTUAL NON-DISCLOSURE WARRANTY',
  },
  {
    icon: Clock,
    title: '99.99% Production Uptime SLA',
    code: 'OPS-01',
    description:
      'High-availability distributed deployments engineered with active-active regional failover, automated health probes, and sub-200ms recovery to maintain continuous operations during cloud incidents.',
    standard: 'FOUR NINES PRODUCTION COMMITMENT',
  },
  {
    icon: KeyRound,
    title: 'Clean Handover & Operational Runbooks',
    code: 'OPS-02',
    description:
      'Every project includes exhaustive developer documentation, reproducible Docker / Nix build environments, and comprehensive architectural handover workshops so your internal team can operate autonomously.',
    standard: 'AUTONOMOUS CLIENT OPERATION',
  },
];

export const EnterpriseTrustBadges: React.FC = () => {
  return (
    <section id="enterprise-trust" className="py-20 border-t border-[rgba(20,24,28,0.16)] bg-[#EAE7DF] relative select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-12">
        {/* Margin Annotations */}
        <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3">
          <MarginNote>SECURITY // GOVERNANCE STANDARDS</MarginNote>
          <MarginNote>ENTERPRISE COMPLIANCE &amp; IP PROTECTION</MarginNote>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl flex flex-col gap-3">
            <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase font-semibold">
              // ENTERPRISE ASSURANCE
            </span>
            <h2 className="font-sans text-[clamp(28px,5vw,50px)] font-bold text-[#14181C] tracking-[-0.02em] leading-[1.05]">
              Built for High-Stakes Compliance &amp; Absolute IP Security
            </h2>
            <p className="font-mono text-[13px] md:text-[15px] text-[#7C7568] leading-[1.8]">
              We partner with regulated institutions, government agencies, and venture-backed tech startups where system failure or data compromise is not an option.
            </p>
          </div>

          <button
            onClick={() => openScheduleModal({ interest: 'Enterprise Security & Compliance Review' })}
            className="btn-spark solid text-[11px] py-3 px-6 shrink-0"
          >
            REQUEST SECURITY WHITE PAPER
          </button>
        </div>

        {/* Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.code}
                className="p-8 bg-[#F2EFE8] border border-[rgba(20,24,28,0.16)] flex flex-col justify-between min-h-[260px] shadow-sm hover:border-[#9E5430] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[rgba(20,24,28,0.10)] font-mono text-[10px]">
                    <span className="text-[#9E5430] font-semibold tracking-[0.2em]">{pillar.code}</span>
                    <span className="text-[#7C7568] tracking-[0.16em]">CERTIFIED</span>
                  </div>

                  <div className="flex items-center gap-3 my-4">
                    <div className="w-9 h-9 rounded-none bg-[rgba(158,84,48,0.10)] border border-[rgba(158,84,48,0.30)] flex items-center justify-center text-[#9E5430]">
                      <Icon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <h3 className="font-sans text-[18px] font-bold text-[#14181C] leading-snug">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="font-mono text-[12px] text-[#7C7568] leading-[1.8]">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(20,24,28,0.08)] font-mono text-[9.5px] text-[#14181C] flex items-center justify-between uppercase tracking-[0.16em]">
                  <span className="text-[#7C7568]">PROTOCOL:</span>
                  <span className="font-semibold text-[#9E5430]">{pillar.standard}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          <DimensionLine label="TRUST &amp; COMPLIANCE FRAMEWORK // STRICT AUDIT TRAILS MAINTAINED" />
        </div>
      </div>
    </section>
  );
};
