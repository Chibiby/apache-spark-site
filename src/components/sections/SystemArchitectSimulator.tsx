// path: src/components/sections/SystemArchitectSimulator.tsx
'use client';

import React, { useState } from 'react';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { openScheduleModal } from '@/lib/events';
import {
  ArrowRight,
  Download,
  Check,
} from 'lucide-react';

interface ArchitecturePreset {
  id: string;
  code: string;
  name: string;
  category: string;
  summary: string;
  nodes: {
    name: string;
    tech: string;
    role: string;
    color: string;
  }[];
  metrics: {
    p99Latency: string;
    throughput: string;
    memoryPerPod: string;
    cloudSavings: string;
    recoveryTime: string;
  };
  highlights: string[];
}

const PRESETS: ArchitecturePreset[] = [
  {
    id: 'edge-cluster',
    code: 'ARCH-01',
    name: 'Edge-Native Anycast Distributed Cluster',
    category: 'LOW-LATENCY EDGE & WEBSOCKETS',
    summary:
      'Engineered for global real-time applications requiring sub-15ms worldwide response times. Replaces bulky multi-region Kubernetes clusters with lightweight Fly.io / Cloudflare Rust workers and distributed SQLite replicas.',
    nodes: [
      { name: 'Edge Anycast CDN', tech: 'Cloudflare Workers / Fastly', role: 'Global Ingress & DDoS Shield', color: '#9E5430' },
      { name: 'Application Micro-Runtimes', tech: 'Rust / Actix-Web / Fly.io', role: 'Zero-Allocation Core Logic', color: '#14181C' },
      { name: 'Real-Time Sync Engine', tech: 'WebSockets / Tokio async', role: 'Sub-millisecond State Mesh', color: '#9E5430' },
      { name: 'Replicated Persistence', tech: 'Turso / SQLite LibSQL', role: 'Read-at-the-Edge Storage', color: '#14181C' },
    ],
    metrics: {
      p99Latency: '< 14ms',
      throughput: '120,000 req/sec',
      memoryPerPod: '16 MB RAM',
      cloudSavings: '68% vs AWS Lambda',
      recoveryTime: '< 180ms failover',
    },
    highlights: [
      'Zero cold-start penalty on global anycast network',
      'Continuous distributed SQLite replication across 35 regions',
      'Autonomous automatic failover with zero packet drop',
    ],
  },
  {
    id: 'telemetry-engine',
    code: 'ARCH-02',
    name: 'Industrial SCADA & Telemetry Pipeline',
    category: 'HIGH-THROUGHPUT EVENT STREAMING',
    summary:
      'High-ingestion streaming engine built for hardware telemetry, logistics fleets, and industrial sensors. Guaranteed deterministic writes under multi-gigabit bursts with sub-second aggregate indexing.',
    nodes: [
      { name: 'Hardware / Sensor Ingress', tech: 'MQTT / gRPC Endpoints', role: 'Direct Socket Termination', color: '#14181C' },
      { name: 'Distributed Message Broker', tech: 'Apache Kafka / Redpanda', role: 'Zero-Loss Durable Log', color: '#9E5430' },
      { name: 'Stream Transformation Worker', tech: 'Go / Goroutine Fanout', role: 'In-Flight Anomaly Filter', color: '#14181C' },
      { name: 'Time-Series Lakehouse', tech: 'TimescaleDB / Postgres', role: 'High-Density Compression', color: '#9E5430' },
    ],
    metrics: {
      p99Latency: '< 22ms',
      throughput: '450,000 events/sec',
      memoryPerPod: '38 MB RAM',
      cloudSavings: '54% vs Datadog/Splunk',
      recoveryTime: '< 90ms buffer replay',
    },
    highlights: [
      '10:1 data compression ratio via columnar chunking',
      'Dual active-active failover across separate availability zones',
      'Custom Fluke-calibrated hardware ingestion adapters',
    ],
  },
  {
    id: 'enterprise-saas',
    code: 'ARCH-03',
    name: 'Mission-Critical SaaS Multi-Tenant Platform',
    category: 'FULL-STACK NEXT.JS 15 + SUPABASE',
    summary:
      'Turnkey enterprise application architecture. Leverages React 19 Server Components, zero-waterfall Server Actions, Row-Level Security (RLS), and isolated tenant workspaces for high-security commercial software.',
    nodes: [
      { name: 'Edge Presentation Layer', tech: 'Next.js 15 App Router', role: 'Static / ISR Streaming Shell', color: '#9E5430' },
      { name: 'Serverless Action Runtime', tech: 'TypeScript / Node 22', role: 'Zero-Client-Exposed APIs', color: '#14181C' },
      { name: 'Multi-Tenant Relational DB', tech: 'PostgreSQL 16 / Supabase', role: 'Strict RLS Tenant Isolation', color: '#9E5430' },
      { name: 'Asset & Search Index', tech: 'Cloudflare R2 + Redis', role: 'Instant Cached Retrieval', color: '#14181C' },
    ],
    metrics: {
      p99Latency: '< 18ms',
      throughput: '35,000 req/sec',
      memoryPerPod: '28 MB RAM',
      cloudSavings: '45% vs Monolith EC2',
      recoveryTime: '< 300ms edge reload',
    },
    highlights: [
      'Full TypeScript strict typing from DB schema to frontend props',
      'SOC 2 Type II audit trail integration with encrypted audit tables',
      'Sub-50ms global First Contentful Paint with edge streaming',
    ],
  },
  {
    id: 'ai-pipeline',
    code: 'ARCH-04',
    name: 'Autonomous Multi-Agent AI Orchestration',
    category: 'ENTERPRISE GENAI & VECTOR RETRIEVAL',
    summary:
      'High-security enterprise AI pipeline utilizing Google Gemini 3.8 Pro models, semantic vector search, strict JSON schema validation, and sandboxed background execution workers for autonomous workflows.',
    nodes: [
      { name: 'Client Ingress & Auth Gate', tech: 'Fastify / OAuth2 JWT', role: 'Token Rate-Limiting & Quota', color: '#14181C' },
      { name: 'LLM Orchestration Cluster', tech: 'Gemini 3.8 Pro / Python', role: 'Autonomous Multi-Agent Swarm', color: '#9E5430' },
      { name: 'Vector Knowledge Store', tech: 'pgvector / BigQuery', role: 'Hybrid Semantic Retrieval', color: '#14181C' },
      { name: 'Deterministic Execution Pod', tech: 'Sandboxed V8 / WASM', role: 'Isolated Code Execution', color: '#9E5430' },
    ],
    metrics: {
      p99Latency: '< 280ms (LLM)',
      throughput: '8,500 token streams/sec',
      memoryPerPod: '64 MB RAM',
      cloudSavings: '60% vs OpenAI API standard',
      recoveryTime: 'Instant graceful retry',
    },
    highlights: [
      'Strict PII masking and enterprise zero-data-retention compliance',
      'Dual-pass adversarial verification before committing AI outputs',
      'Semantic embeddings caching yielding 40% reduction in token burn',
    ],
  },
];

export const SystemArchitectSimulator: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('edge-cluster');
  const [trafficVolume, setTrafficVolume] = useState<number>(50); // 1 to 100 scale
  const [copiedSpec, setCopiedSpec] = useState<boolean>(false);

  const activePreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  // Dynamic calculated estimates based on traffic volume
  const estimatedRPS = Math.round(1000 + (trafficVolume / 100) * 99000);
  const estimatedMonthlyCost = Math.round(45 + (trafficVolume / 100) * 380);
  const estimatedLegacyAwsCost = Math.round(estimatedMonthlyCost * 3.2);

  const handleCopySpec = () => {
    const spec = {
      specNo: activePreset.code,
      name: activePreset.name,
      category: activePreset.category,
      trafficCapacity: `${estimatedRPS.toLocaleString()} req/sec`,
      estimatedCostMonthly: `$${estimatedMonthlyCost} / mo (vs $${estimatedLegacyAwsCost} AWS standard)`,
      nodes: activePreset.nodes,
      metrics: activePreset.metrics,
      engineer: 'Apache Spark Systems Laboratory',
      contact: 'contact@apachespark.tech',
    };

    navigator.clipboard.writeText(JSON.stringify(spec, null, 2));
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2000);
  };

  const handleBookWithPreset = () => {
    openScheduleModal({
      interest: `Architecture: ${activePreset.name} (${activePreset.code}) at ${estimatedRPS.toLocaleString()} req/s`,
    });
  };

  return (
    <section id="simulator" className="py-20 border-t border-[rgba(20,24,28,0.16)] bg-[#EFECE5] relative select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-12">
        {/* Margin Annotations */}
        <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3">
          <MarginNote>SYSTEMS LAB // TOPOLOGY SIMULATOR</MarginNote>
          <MarginNote>INTERACTIVE ARCHITECTURE WORKBENCH</MarginNote>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl flex flex-col gap-3">
            <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase font-semibold">
              // INTERACTIVE ARCHITECTURAL SANDBOX
            </span>
            <h2 className="font-sans text-[clamp(28px,5vw,52px)] font-bold text-[#14181C] tracking-[-0.02em] leading-[1.05]">
              Explore Production System Topologies
            </h2>
            <p className="font-mono text-[13px] md:text-[15px] text-[#7C7568] leading-[1.8]">
              Select an architecture engineered by our lab. Test simulated traffic loads, inspect node telemetry, and evaluate projected infrastructure savings before writing a single line of code.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopySpec}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase px-4 py-2.5 border border-[rgba(20,24,28,0.20)] bg-[#F2EFE8] text-[#14181C] hover:bg-[#14181C] hover:text-[#F2EFE8] transition-colors"
            >
              {copiedSpec ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>SPEC COPIED</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#9E5430]" />
                  <span>EXPORT SPEC (JSON)</span>
                </>
              )}
            </button>
            <button
              onClick={handleBookWithPreset}
              className="btn-spark solid text-[11px] py-2.5 px-5"
            >
              DRAFT THIS SPEC
            </button>
          </div>
        </div>

        {/* Preset Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`p-4 text-left border transition-all flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? 'border-[#9E5430] bg-[#F2EFE8] shadow-sm'
                    : 'border-[rgba(20,24,28,0.14)] bg-[#EAE7DF] hover:bg-[#F2EFE8]'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em]">
                  <span className={isSelected ? 'text-[#9E5430] font-bold' : 'text-[#7C7568]'}>
                    {preset.code}
                  </span>
                  <span className="text-[9px] uppercase text-[#7C7568]">
                    {preset.category.split(' ')[0]}
                  </span>
                </div>
                <div className="font-sans text-[14px] font-bold text-[#14181C] mt-2 leading-tight">
                  {preset.name}
                </div>
                <div className="font-mono text-[10px] text-[#9E5430] tracking-[0.14em] uppercase mt-2">
                  {preset.metrics.p99Latency} p99
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Architecture Canvas */}
        <div className="border border-[rgba(20,24,28,0.20)] bg-[#F2EFE8] p-6 md:p-10 flex flex-col gap-8 shadow-sm">
          {/* Active Preset Title & Summary */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[rgba(20,24,28,0.14)]">
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-[#9E5430] tracking-[0.2em] uppercase font-semibold">
                <span>{activePreset.code}</span>
                <span>//</span>
                <span>{activePreset.category}</span>
              </div>
              <h3 className="font-sans text-[24px] md:text-[30px] font-bold text-[#14181C] tracking-[-0.01em] mt-1">
                {activePreset.name}
              </h3>
            </div>
            <div className="font-mono text-[11px] text-right text-[#7C7568]">
              STATUS: <span className="text-emerald-700 font-semibold">PRODUCTION VERIFIED</span>
            </div>
          </div>

          <p className="font-mono text-[13px] text-[#14181C] leading-[1.8] max-w-4xl">
            {activePreset.summary}
          </p>

          {/* Node Topology Visualizer */}
          <div className="py-6">
            <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.22em] uppercase font-semibold block mb-4">
              // PIPELINE DATAFLOW NODES
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activePreset.nodes.map((node, idx) => (
                <div
                  key={node.name}
                  className="relative p-5 bg-[#EAE7DF] border border-[rgba(20,24,28,0.16)] flex flex-col justify-between min-h-[160px] group hover:border-[#9E5430] transition-colors"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#7C7568]">
                    <span>NODE 0{idx + 1}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  </div>

                  <div className="my-2">
                    <div className="font-sans text-[15px] font-bold text-[#14181C] leading-snug">
                      {node.name}
                    </div>
                    <div className="font-mono text-[11px] text-[#9E5430] font-medium mt-1">
                      {node.tech}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[rgba(20,24,28,0.08)] font-mono text-[10px] text-[#7C7568]">
                    {node.role}
                  </div>

                  {/* Flow arrow on desktop */}
                  {idx < 3 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#F2EFE8] border border-[rgba(20,24,28,0.20)] items-center justify-center text-[#9E5430]">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Volume Interactive Slider & Live Cost Telemetry */}
          <div className="p-6 bg-[#E8E4DC] border border-[rgba(20,24,28,0.16)] flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.2em] uppercase font-semibold">
                  SIMULATED PRODUCTION CONCURRENCY
                </span>
                <div className="font-sans text-[20px] font-bold text-[#14181C] mt-0.5">
                  {estimatedRPS.toLocaleString()} Requests / Second
                </div>
              </div>
              <div className="font-mono text-[11px] text-[#7C7568] tracking-[0.14em]">
                DRAG TO STRESS-TEST INFRASTRUCTURE
              </div>
            </div>

            <input
              type="range"
              min="1"
              max="100"
              value={trafficVolume}
              onChange={(e) => setTrafficVolume(Number(e.target.value))}
              className="w-full h-2 bg-[rgba(20,24,28,0.16)] rounded-lg appearance-none cursor-pointer accent-[#9E5430]"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-[rgba(20,24,28,0.10)]">
              <div>
                <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase block">
                  P99 LATENCY
                </span>
                <div className="font-sans text-[20px] font-bold text-[#14181C] mt-0.5">
                  {activePreset.metrics.p99Latency}
                </div>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase block">
                  ESTIMATED CLOUD BILL
                </span>
                <div className="font-sans text-[20px] font-bold text-[#9E5430] mt-0.5">
                  ${estimatedMonthlyCost} <span className="text-[12px] font-normal text-[#7C7568]">/mo</span>
                </div>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase block">
                  LEGACY CLOUD BILL
                </span>
                <div className="font-sans text-[20px] font-bold text-[#7C7568] line-through mt-0.5">
                  ${estimatedLegacyAwsCost} <span className="text-[12px] font-normal">/mo</span>
                </div>
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase block">
                  ESTIMATED SAVINGS
                </span>
                <div className="font-sans text-[20px] font-bold text-emerald-700 mt-0.5">
                  {activePreset.metrics.cloudSavings}
                </div>
              </div>
            </div>
          </div>

          {/* Highlights & Booking Action */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4 border-t border-[rgba(20,24,28,0.12)]">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.2em] uppercase font-semibold">
                ARCHITECTURAL GUARANTEES
              </span>
              <ul className="flex flex-col gap-1.5 font-mono text-[12px] text-[#14181C]">
                {activePreset.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#9E5430] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleBookWithPreset}
              className="btn-spark solid text-[12px] py-3.5 px-8 whitespace-nowrap self-start md:self-auto"
            >
              COMMISSION ARCHITECTURE SPRINT →
            </button>
          </div>
        </div>

        <div className="mt-4">
          <DimensionLine label="BENCHMARK LAB // TESTED WITH 1M+ SYNTHETIC CYCLES" />
        </div>
      </div>
    </section>
  );
};
