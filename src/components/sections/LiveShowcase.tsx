// path: src/components/sections/LiveShowcase.tsx
'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { BEZIER } from '@/lib/animations';
import {
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  RotateCw,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';

type DeviceMode = 'desktop' | 'laptop' | 'tablet' | 'mobile';

interface ShowcaseProject {
  id: 'litrack' | 'journalism';
  title: string;
  client: string;
  subtitle: string;
  embedUrl: string;
  simulatedUrl: string;
  localDefaultPort: string;
  description: string;
  architecture: {
    stack: string[];
    role: string;
    throughput: string;
    latency: string;
  };
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'litrack',
    title: 'PROJECT LITRACK',
    client: 'DEPARTMENT OF EDUCATION (DEPED)',
    subtitle: 'ARAL Diagnostic Reading Telemetry & Multi-Tenant School Management',
    embedUrl: '/embed/litrack',
    simulatedUrl: 'https://litrack.deped.gov.ph/teacher/profiling',
    localDefaultPort: 'http://localhost:3002',
    description:
      'Engineered for the national ARAL reading recovery program. Provides real-time learner reading diagnostic profiling across phonemic, fluency, and comprehension foundations, automated level categorization, and division-wide compliance analytics.',
    architecture: {
      stack: ['Next.js App Router', 'TypeScript Strict', 'Supabase Postgres', 'Prisma 5', 'Tailwind CSS'],
      role: 'Enterprise Full-Stack Architecture & Telemetry Pipeline',
      throughput: '12,000+ Active Learner Records Tracked',
      latency: '< 18ms Real-Time Diagnostic Evaluation',
    },
  },
  {
    id: 'journalism',
    title: 'ASPAJCCJSI PRESS PORTAL',
    client: 'DEPED SARANGANI DIVISION',
    subtitle: 'Division Schools Press Conference (DSPC 2026) Competition & Tabulation Engine',
    embedUrl: '/embed/journalism',
    simulatedUrl: 'https://press-portal.deped.gov.ph/judge/scoring',
    localDefaultPort: 'http://localhost:3001',
    description:
      'High-throughput competition management portal handling 48 participating schools, 1,420 contestant submissions, sealed judge rubric evaluations, and real-time division medal tabulation under strict automated cutoff locks.',
    architecture: {
      stack: ['Next.js 15 App Router', 'React 19', 'PostgreSQL', 'Tailwind CSS', 'Sub-second Tally Algorithm'],
      role: 'Core Competition Infrastructure & Real-Time Tabulation Engine',
      throughput: '1,420+ Submissions Processed Simultaneously',
      latency: 'Sub-second Cumulative Points Recalculation',
    },
  },
];

export const LiveShowcase: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<'litrack' | 'journalism'>('litrack');
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [copied, setCopied] = useState(false);
  const [useLocalBridge, setUseLocalBridge] = useState(false);
  const [customPortUrl, setCustomPortUrl] = useState('');
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const activeProject =
    SHOWCASE_PROJECTS.find((p) => p.id === selectedProjectId) || SHOWCASE_PROJECTS[0];

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(activeProject.simulatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  const currentFrameSrc = useLocalBridge
    ? customPortUrl || activeProject.localDefaultPort
    : activeProject.embedUrl;

  const deviceWidthClass = {
    desktop: 'w-full max-w-full',
    laptop: 'w-[1240px] max-w-full',
    tablet: 'w-[768px] max-w-full',
    mobile: 'w-[375px] max-w-full',
  }[device];

  return (
    <section
      id="showcase"
      className="py-24 max-w-7xl mx-auto px-4 md:px-8 relative select-none"
    >
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3 mb-12">
        <MarginNote>SHEET 09B — INTERACTIVE SYSTEMS SHOWCASE</MarginNote>
        <MarginNote>LIVE EMBED HARNESS // 2 PRODUCTION APPS</MarginNote>
      </div>

      {/* Header Statement */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.48, ease: BEZIER.easeOutQuart }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase block mb-3">
            // INTERACTIVE ENGINEERING SHOWCASE
          </span>
          <h2 className="font-sans text-[clamp(28px,4.5vw,52px)] font-bold tracking-[-0.02em] leading-tight text-[#14181C]">
            Directly test our engineered systems.
          </h2>
        </div>
        <p className="font-mono text-[12px] text-[#7C7568] max-w-md tracking-[0.06em] leading-relaxed">
          Navigate, score, and inspect two production platforms developed for enterprise and public-sector operations. Fully interactive and offline-ready.
        </p>
      </motion.div>

      {/* Project Switcher Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[rgba(20,24,28,0.16)] border border-[rgba(20,24,28,0.16)] mb-8">
        {SHOWCASE_PROJECTS.map((proj, idx) => {
          const isSelected = proj.id === selectedProjectId;
          return (
            <button
              key={proj.id}
              onClick={() => {
                setSelectedProjectId(proj.id);
                setUseLocalBridge(false);
              }}
              className={`p-5 text-left transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#F2EFE8] text-[#14181C] border-b-2 md:border-b-0 md:border-t-2 border-[#9E5430]'
                  : 'bg-[#F2EFE8]/50 text-[#7C7568] hover:bg-[#F2EFE8]'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[11px] mb-2">
                <span className="text-[#9E5430] font-bold tracking-[0.2em]">
                  [0{idx + 1}] {proj.id.toUpperCase()}
                </span>
                <span className="text-[10px] tracking-[0.16em] uppercase px-2 py-0.5 border border-[rgba(20,24,28,0.12)]">
                  {proj.client}
                </span>
              </div>
              <h3 className="font-sans text-[18px] md:text-[20px] font-bold tracking-tight text-[#14181C]">
                {proj.title}
              </h3>
              <p className="font-mono text-[11px] text-[#7C7568] mt-1 line-clamp-1">
                {proj.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Interactive Workstation Frame */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.52, ease: BEZIER.easeOutQuart }}
        className="bg-[#F2EFE8] border border-[rgba(20,24,28,0.22)] shadow-sm flex flex-col overflow-hidden relative"
      >
        {/* Top Workstation Chrome Bar */}
        <div className="bg-[#E8E4DB] border-b border-[rgba(20,24,28,0.16)] px-4 py-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          {/* Left: Window Dots & Active Sheet */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full border border-[rgba(20,24,28,0.3)] bg-transparent" />
              <span className="w-2.5 h-2.5 rounded-full border border-[rgba(20,24,28,0.3)] bg-transparent" />
              <span className="w-2.5 h-2.5 rounded-full border border-[rgba(20,24,28,0.3)] bg-transparent" />
            </div>
            <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.2em] font-semibold border-l border-[rgba(20,24,28,0.16)] pl-3">
              SIMULATOR // {activeProject.id.toUpperCase()}
            </span>
          </div>

          {/* Center: Address Bar */}
          <div className="flex-1 max-w-xl mx-auto flex items-center bg-[#F2EFE8] border border-[rgba(20,24,28,0.2)] rounded px-3 py-1 text-[11px] font-mono text-[#14181C]">
            <span className="text-[#7C7568] mr-2">🔒</span>
            <span className="truncate flex-1">
              {useLocalBridge
                ? (customPortUrl || activeProject.localDefaultPort)
                : activeProject.simulatedUrl}
            </span>
            <button
              onClick={handleCopyUrl}
              className="ml-2 text-[#7C7568] hover:text-[#14181C] transition-colors"
              title="Copy URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Right: Device Toggles & External Popout */}
          <div className="flex items-center gap-2">
            {/* Device Switcher */}
            <div className="flex items-center bg-[#F2EFE8] border border-[rgba(20,24,28,0.16)] rounded p-0.5">
              <button
                onClick={() => setDevice('desktop')}
                className={`p-1 rounded transition-all ${
                  device === 'desktop' ? 'bg-[#14181C] text-[#F2EFE8]' : 'text-[#7C7568] hover:text-[#14181C]'
                }`}
                title="Desktop View (100%)"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDevice('laptop')}
                className={`p-1 rounded transition-all ${
                  device === 'laptop' ? 'bg-[#14181C] text-[#F2EFE8]' : 'text-[#7C7568] hover:text-[#14181C]'
                }`}
                title="Laptop View (1240px)"
              >
                <Laptop className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={`p-1 rounded transition-all ${
                  device === 'tablet' ? 'bg-[#14181C] text-[#F2EFE8]' : 'text-[#7C7568] hover:text-[#14181C]'
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`p-1 rounded transition-all ${
                  device === 'mobile' ? 'bg-[#14181C] text-[#F2EFE8]' : 'text-[#7C7568] hover:text-[#14181C]'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Reload Frame */}
            <button
              onClick={handleRefresh}
              className="p-1.5 bg-[#F2EFE8] border border-[rgba(20,24,28,0.16)] rounded text-[#7C7568] hover:text-[#14181C]"
              title="Reload Frame"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            {/* Launch Standalone Fullscreen */}
            <Link
              href={activeProject.embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-[#14181C] text-[#F2EFE8] rounded text-[11px] font-mono flex items-center gap-1 hover:bg-[#9E5430] transition-colors"
              title="Launch in Full Standalone Tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">STANDALONE</span>
            </Link>
          </div>
        </div>

        {/* Optional Local Dev Bridge Toggle Strip */}
        <div className="bg-[#FAF8F5] border-b border-[rgba(20,24,28,0.10)] px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-[#7C7568]">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useLocalBridge}
                onChange={(e) => setUseLocalBridge(e.target.checked)}
                className="rounded accent-[#9E5430]"
              />
              <span className="font-semibold text-[#14181C]">BRIDGE TO RUNNING LOCAL SERVER</span>
            </label>
            {useLocalBridge && (
              <input
                type="text"
                placeholder={activeProject.localDefaultPort}
                value={customPortUrl}
                onChange={(e) => setCustomPortUrl(e.target.value)}
                className="bg-white border border-[rgba(20,24,28,0.2)] px-2 py-0.5 rounded text-[10px] font-mono w-44 text-[#14181C]"
              />
            )}
          </div>
          <span className="text-[#9E5430] uppercase">
            {useLocalBridge ? 'BRIDGE ACTIVE // LOCAL DEV' : 'OFFLINE ENGINE ACTIVE // ZERO DEPENDENCIES'}
          </span>
        </div>

        {/* Viewport Frame Container */}
        <div className="bg-[#DED9CE] p-2 sm:p-4 flex justify-center items-center overflow-x-auto min-h-[640px] md:min-h-[740px]">
          <div
            className={`transition-all duration-300 bg-white border border-[rgba(20,24,28,0.25)] shadow-md overflow-hidden flex flex-col h-[640px] md:h-[720px] ${deviceWidthClass}`}
          >
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={currentFrameSrc}
              title={activeProject.title}
              className="w-full h-full border-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>

        {/* Architectural Specifications Side-Rail / Bottom Bar */}
        <div className="bg-[#F2EFE8] border-t border-[rgba(20,24,28,0.16)] p-6 grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
          <div>
            <span className="text-[10px] text-[#7C7568] tracking-[0.2em] uppercase block mb-1">
              ENGINEERING ROLE
            </span>
            <div className="font-bold text-[#14181C] text-sm font-sans">
              {activeProject.architecture.role}
            </div>
          </div>

          <div>
            <span className="text-[10px] text-[#7C7568] tracking-[0.2em] uppercase block mb-1">
              PRODUCTION THROUGHPUT
            </span>
            <div className="font-bold text-[#9E5430] text-sm">
              {activeProject.architecture.throughput}
            </div>
          </div>

          <div>
            <span className="text-[10px] text-[#7C7568] tracking-[0.2em] uppercase block mb-1">
              MEASURED LATENCY
            </span>
            <div className="font-bold text-[#14181C] text-sm">
              {activeProject.architecture.latency}
            </div>
          </div>

          <div>
            <span className="text-[10px] text-[#7C7568] tracking-[0.2em] uppercase block mb-1">
              COMMITTED STACK
            </span>
            <div className="flex flex-wrap gap-1">
              {activeProject.architecture.stack.map((st) => (
                <span
                  key={st}
                  className="bg-[#E8E4DB] border border-[rgba(20,24,28,0.12)] text-[#14181C] px-1.5 py-0.5 rounded text-[9.5px]"
                >
                  {st}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Dimension Line */}
      <div className="mt-12">
        <DimensionLine label="SUB-SECOND RESILIENCE // OFFLINE ZERO-LOSS EMBED SYSTEM" />
      </div>
    </section>
  );
};
