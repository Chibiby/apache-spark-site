// path: src/components/sections/TrustBar.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BEZIER } from '@/lib/animations';
import { ShieldCheck, Zap, Activity, Award } from 'lucide-react';

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    label: 'PROVEN IN PRODUCTION',
    value: 'DepEd • Vanguard • Metro Health',
    detail: 'Mission-critical telemetry & systems',
  },
  {
    icon: Zap,
    label: 'REAL-TIME LATENCY',
    value: '< 18ms p99',
    detail: 'Rust, WebGL & edge distributed execution',
  },
  {
    icon: Activity,
    label: 'DELIVERY RECORD',
    value: '100% On-Spec',
    detail: 'Fixed-deliverable scope with full IP transfer',
  },
  {
    icon: Award,
    label: 'DIRECT ENG DESK',
    value: '0 Account Reps',
    detail: 'Co-founders & lead architects on every call',
  },
];

const CLIENT_BADGES = [
  { name: 'DEPARTMENT OF EDUCATION', system: 'ARAL Reading Telemetry', metric: '12K+ Records' },
  { name: 'VANGUARD PRECISION FOUNDRY', system: 'SCADA Ethernet Mesh', metric: '99.999% Uptime' },
  { name: 'METRO HEALTH TELEMETRY', system: 'Clinical Optical Ring', metric: 'Zero-Failover' },
  { name: 'APEX FREIGHT DISPATCH', system: 'Real-Time Routing Engine', metric: '< 20ms Dispatch' },
  { name: 'ASPA PRESS PORTAL', system: 'High-Velocity Newsroom CMS', metric: 'Instant Publish' },
];

export const TrustBar: React.FC = () => {
  return (
    <section className="w-full border-y border-[rgba(20,24,28,0.14)] bg-[#F2EFE8]/70 backdrop-blur-sm select-none py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-6">
        {/* Top Metric Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-[rgba(20,24,28,0.12)]">
          {TRUST_POINTS.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <motion.div
                key={pt.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: BEZIER.easeOutQuart }}
                className="flex items-start gap-3 pt-3 lg:pt-0 lg:px-4 first:pl-0"
              >
                <span className="p-2 border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] text-[#9E5430] shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 stroke-[2]" />
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-[#7C7568] uppercase">
                    {pt.label}
                  </span>
                  <span className="font-sans text-[13px] md:text-[15px] font-bold text-[#14181C]">
                    {pt.value}
                  </span>
                  <span className="font-mono text-[10px] md:text-[11px] text-[#7C7568]/90">
                    {pt.detail}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Client Badges Ticker / Grid */}
        <div className="pt-2 border-t border-[rgba(20,24,28,0.08)] flex flex-wrap items-center justify-between gap-y-3 gap-x-6">
          <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.2em] uppercase shrink-0">
            // VERIFIED PRODUCTION DEPLOYMENTS:
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {CLIENT_BADGES.map((b) => (
              <div key={b.name} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#9E5430] rounded-none" />
                <span className="font-mono text-[11px] font-semibold text-[#14181C] tracking-[0.08em]">
                  {b.name}
                </span>
                <span className="font-mono text-[10px] text-[#7C7568] hidden sm:inline">
                  ({b.metric})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
