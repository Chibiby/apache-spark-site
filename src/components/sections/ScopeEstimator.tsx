// path: src/components/sections/ScopeEstimator.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { Check, ArrowRight, Server, Layout, Cpu, ShieldCheck } from 'lucide-react';

interface Archetype {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  primaryStack: string[];
}

const ARCHETYPES: Archetype[] = [
  {
    id: 'saas',
    name: 'Full-Stack SaaS & Web Platform',
    icon: Layout,
    description: 'High-conversion Next.js 15, React 19, Supabase Postgres, and responsive UI with sub-second page loads.',
    primaryStack: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'Tailwind'],
  },
  {
    id: 'backend',
    name: 'Distributed APIs & Low-Latency Engines',
    icon: Server,
    description: 'High-throughput Rust/Go services, Kafka/event streaming, Redis cache layers, and strict data consistency.',
    primaryStack: ['Rust / Go', 'Postgres RLS', 'gRPC / GraphQL', 'Redis', 'Kafka'],
  },
  {
    id: 'infra',
    name: 'Cloud Mesh & Kubernetes Architecture',
    icon: Cpu,
    description: 'Zero-trust infrastructure, Terraform IaC, multi-region failover, Docker, and edge caching topologies.',
    primaryStack: ['Kubernetes', 'Terraform', 'Docker', 'ZTNA', 'Vercel Edge'],
  },
  {
    id: 'telemetry',
    name: 'Industrial SCADA & Hardware Telemetry',
    icon: ShieldCheck,
    description: 'Real-time telemetry rings, optical fiber links, Modbus/OPC-UA data acquisition, and ruggedized edge nodes.',
    primaryStack: ['Modbus/OPC-UA', 'SCADA', 'Industrial Ethernet', 'Bare-Metal Edge'],
  },
];

const STAGES = [
  { id: 'mvp', label: 'Zero-to-One MVP Sprint', detail: 'Rapid 3–5 week launch from wireframe to production' },
  { id: 'scale', label: 'Scale & Latency Overhaul', detail: 'Optimize bottlenecks, refactor architecture, eliminate tech debt' },
  { id: 'enterprise', label: 'Enterprise Mission-Critical', detail: 'Turnkey overhaul with rigorous uptime SLAs and compliance' },
];

const TIMELINES = [
  { id: '4wk', label: '3–5 WEEKS', name: 'Rapid Architecture Sprint' },
  { id: '8wk', label: '8–12 WEEKS', name: 'Turnkey Production MVP' },
  { id: 'pod', label: 'DEDICATED POD', name: 'Quarterly Retained Sprint Pod' },
];

export const ScopeEstimator: React.FC = () => {
  const [selectedArchetype, setSelectedArchetype] = useState<string>('saas');
  const [selectedStage, setSelectedStage] = useState<string>('mvp');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('4wk');

  const currentArchetype = ARCHETYPES.find((a) => a.id === selectedArchetype) || ARCHETYPES[0];
  const currentTimeline = TIMELINES.find((t) => t.id === selectedTimeline) || TIMELINES[0];

  // Derived pod recommendations
  const getPodTopology = () => {
    if (selectedStage === 'enterprise') {
      return '1 Principal Systems Architect + 3 Senior Full-Stack Engineers + 1 QA Verifier + 1 DevOps Lead';
    }
    if (selectedStage === 'scale') {
      return '1 Lead Systems Architect + 2 Core Developers + 1 QA Verifier';
    }
    return '1 Lead Systems Architect + 2 Core Developers';
  };

  const getDeliverables = () => {
    if (selectedArchetype === 'saas') {
      return [
        'Production Next.js 15 App Router codebase with 100% strict TypeScript',
        'Supabase Postgres schema with Row-Level Security (RLS) policies',
        'Mobile-first responsive design with bespoke drafting UI tokens',
        'Automated Vercel/Edge CI/CD pipelines & full IP ownership transfer',
      ];
    }
    if (selectedArchetype === 'backend') {
      return [
        'High-concurrency Rust/Go service architecture drafted to spec',
        'Postgres database schema, migration files, and indexed queries',
        'Sub-20ms p99 response time benchmarks & automated load testing',
        'End-to-end integration test suite and OpenAPI/gRPC specs',
      ];
    }
    if (selectedArchetype === 'infra') {
      return [
        'Declarative Terraform IaC scripts for reproducible cloud environments',
        'Kubernetes manifest configs with autoscaling and health probes',
        'Zero-trust network access (ZTNA) and secret management vault',
        'Disaster recovery chaos runbooks & zero-downtime cutover plan',
      ];
    }
    return [
      'Single-line electrical and optical CAD schematics',
      'Industrial Ethernet topology map & Fluke DSX-8000 test certification',
      'Bare-metal edge node configuration with real-time kernel build',
      'SCADA / telemetry driver integration and failover matrix',
    ];
  };

  return (
    <section id="estimator" className="py-24 max-w-7xl mx-auto px-4 md:px-8 select-none">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3 mb-10">
        <MarginNote>SHEET 05B — ARCHITECTURE SCOPE &amp; SPRINT ESTIMATOR</MarginNote>
        <MarginNote>INTERACTIVE SPECIFICATION TOOL</MarginNote>
      </div>

      {/* Header */}
      <div className="max-w-3xl flex flex-col gap-4 mb-12">
        <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase">
          // INSTANT SCOPE &amp; POD ESTIMATOR
        </span>
        <h2 className="font-sans text-[clamp(30px,5vw,56px)] font-bold text-[#14181C] tracking-[-0.02em] leading-[1.05]">
          Draft Your System Scope in Real Time
        </h2>
        <p className="font-mono text-[14px] md:text-[16px] text-[#7C7568] leading-[1.8] max-w-2xl">
          Select your technical archetype, stage, and delivery velocity to immediately calculate your recommended engineering pod, deliverable checklist, and sprint cadence.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Toggles & Selections (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* 1. Archetype Selection */}
          <div className="flex flex-col gap-3">
            <label className="font-mono text-[11px] text-[#14181C] font-semibold tracking-[0.2em] uppercase">
              1. SELECT SYSTEM ARCHETYPE
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ARCHETYPES.map((arch) => {
                const Icon = arch.icon;
                const isSelected = selectedArchetype === arch.id;
                return (
                  <button
                    key={arch.id}
                    type="button"
                    onClick={() => setSelectedArchetype(arch.id)}
                    className={`p-4 text-left border transition-all duration-200 flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'border-[#9E5430] bg-[#14181C] text-[#F2EFE8] shadow-sm'
                        : 'border-[rgba(20,24,28,0.16)] bg-[#F2EFE8]/80 text-[#14181C] hover:border-[#14181C]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-[#C97A4A]' : 'text-[#9E5430]'}`} />
                      {isSelected && <span className="font-mono text-[9px] text-[#C97A4A] uppercase tracking-wider">// SELECTED</span>}
                    </div>
                    <div>
                      <div className="font-sans font-bold text-[14px] leading-snug mb-1">{arch.name}</div>
                      <p className={`font-mono text-[11px] leading-relaxed line-clamp-2 ${isSelected ? 'text-[#F2EFE8]/70' : 'text-[#7C7568]'}`}>
                        {arch.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Stage Selection */}
          <div className="flex flex-col gap-3">
            <label className="font-mono text-[11px] text-[#14181C] font-semibold tracking-[0.2em] uppercase">
              2. DEVELOPMENT STAGE &amp; GOAL
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {STAGES.map((st) => {
                const isSelected = selectedStage === st.id;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStage(st.id)}
                    className={`p-3 text-left border transition-all duration-200 flex flex-col gap-1 ${
                      isSelected
                        ? 'border-[#9E5430] bg-[#14181C] text-[#F2EFE8]'
                        : 'border-[rgba(20,24,28,0.16)] bg-[#F2EFE8]/80 text-[#14181C] hover:border-[#14181C]'
                    }`}
                  >
                    <span className="font-sans font-bold text-[12px]">{st.label}</span>
                    <span className={`font-mono text-[10px] ${isSelected ? 'text-[#F2EFE8]/70' : 'text-[#7C7568]'}`}>
                      {st.detail}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Timeline Selection */}
          <div className="flex flex-col gap-3">
            <label className="font-mono text-[11px] text-[#14181C] font-semibold tracking-[0.2em] uppercase">
              3. TARGET DELIVERY VELOCITY
            </label>
            <div className="grid grid-cols-3 gap-3">
              {TIMELINES.map((tm) => {
                const isSelected = selectedTimeline === tm.id;
                return (
                  <button
                    key={tm.id}
                    type="button"
                    onClick={() => setSelectedTimeline(tm.id)}
                    className={`p-3 text-center border transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'border-[#9E5430] bg-[#9E5430] text-[#F2EFE8]'
                        : 'border-[rgba(20,24,28,0.16)] bg-[#F2EFE8]/80 text-[#14181C] hover:border-[#14181C]'
                    }`}
                  >
                    <span className="font-mono font-bold text-[12px] tracking-wider">{tm.label}</span>
                    <span className={`font-mono text-[9px] uppercase ${isSelected ? 'text-[#F2EFE8]/80' : 'text-[#7C7568]'}`}>
                      {tm.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Specification Sheet (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="border border-[#14181C] bg-[#14181C] text-[#F2EFE8] p-6 md:p-8 flex flex-col gap-6 shadow-lg relative overflow-hidden">
            {/* Corner Blueprint Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20">
              <svg viewBox="0 0 64 64" className="w-full h-full stroke-current text-[#F2EFE8] fill-none">
                <line x1="0" y1="0" x2="64" y2="64" strokeWidth="1" />
                <line x1="0" y1="64" x2="64" y2="0" strokeWidth="1" />
              </svg>
            </div>

            {/* Spec Sheet Header */}
            <div className="border-b border-[rgba(242,239,232,0.16)] pb-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#C97A4A] tracking-[0.2em] uppercase">
                  CALCULATED SPECIFICATION
                </span>
                <span className="font-sans font-bold text-[18px] text-[#F2EFE8]">
                  {currentArchetype.name}
                </span>
              </div>
              <span className="px-2 py-1 bg-[#9E5430] text-[#F2EFE8] font-mono text-[10px] tracking-widest font-bold">
                ESTIMATE
              </span>
            </div>

            {/* Pod Topology */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] text-[rgba(242,239,232,0.6)] uppercase tracking-wider">
                // RECOMMENDED POD TOPOLOGY:
              </span>
              <div className="font-mono text-[12px] md:text-[13px] text-[#F2EFE8] p-3 bg-[rgba(242,239,232,0.06)] border border-[rgba(242,239,232,0.12)]">
                {getPodTopology()}
              </div>
            </div>

            {/* Cadence & Technology Stack */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-[rgba(242,239,232,0.6)] uppercase tracking-wider">
                  TIMELINE CADENCE
                </span>
                <span className="font-mono text-[13px] font-bold text-[#C97A4A]">
                  {currentTimeline.label}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-[rgba(242,239,232,0.6)] uppercase tracking-wider">
                  CORE TECH STACK
                </span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {currentArchetype.primaryStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 bg-[rgba(242,239,232,0.1)] font-mono text-[9px] text-[#F2EFE8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverable Manifest Checklist */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[rgba(242,239,232,0.12)]">
              <span className="font-mono text-[10px] text-[rgba(242,239,232,0.6)] uppercase tracking-wider">
                DELIVERABLES INCLUDED:
              </span>
              <ul className="flex flex-col gap-2">
                {getDeliverables().map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-mono text-[11px] text-[rgba(242,239,232,0.85)] leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-[#C97A4A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conversion CTA Trigger */}
            <div className="pt-4 flex flex-col gap-3 border-t border-[rgba(242,239,232,0.16)]">
              <Link
                href={`/contact?archetype=${encodeURIComponent(currentArchetype.name)}&stage=${encodeURIComponent(
                  selectedStage
                )}&timeline=${encodeURIComponent(currentTimeline.label)}`}
                className="w-full btn-spark solid text-center py-4 text-[12px] flex items-center justify-center gap-2 group"
              >
                <span>COMMISSION THIS SPECIFICATION</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="flex items-center justify-between text-[10px] font-mono text-[rgba(242,239,232,0.6)]">
                <span>🔒 MUTUAL NDA FIRST GUARANTEE</span>
                <span>DIRECT ENG REVIEW &lt; 24H</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pt-12">
        <DimensionLine label="INTERACTIVE ARCHITECTURE CALCULATION // SPECIFIED FOR TURNKEY PRODUCTION" />
      </div>
    </section>
  );
};
