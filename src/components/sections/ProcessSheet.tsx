// path: src/components/sections/ProcessSheet.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    phase: '01',
    title: 'LOCATE',
    subtitle: 'PHYSICAL & RF DISCOVERY',
    description:
      'We inspect existing conduit pathways, analyze ambient RF interference across Wi-Fi and private cellular bands, measure fiber attenuation with OTDR, and identify single points of failure across utility power and cooling.',
    deliverable: 'Physical Plant Survey & Risk Register',
  },
  {
    phase: '02',
    title: 'DRAFT',
    subtitle: 'ENGINEERING SPECIFICATION',
    description:
      'Every rack unit, optical patch, VLAN tag, and kernel parameter is formally documented in single-line schematics before hardware procurement begins. We commit complete architectural blueprints with zero ambiguity.',
    deliverable: 'Complete Single-Line & Logic Blueprints',
  },
  {
    phase: '03',
    title: 'SET',
    subtitle: 'OFF-SITE STAGING & ASSEMBLY',
    description:
      'All servers, switches, and industrial enclosures are pre-racked, pre-cabled with velcro dressing, burned in under full thermal load, and flashed with deterministic RT kernels in our regional labs prior to field deployment.',
    deliverable: 'Pre-Burned Staging & Fluke Certifications',
  },
  {
    phase: '04',
    title: 'PRINT',
    subtitle: 'CUTOVER & RUNBOOK HANDOFF',
    description:
      'We execute cutover during scheduled maintenance windows with pre-validated fallback triggers. Post-cutover, we run automated chaos tests, transfer all source repositories and CAD drawings, and train internal staff.',
    deliverable: 'Full IP & Source Transfer + Operational Runbooks',
  },
];

export const ProcessSheet: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const drawingRef = useRef<SVGSVGElement | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Setup pin for desktop screens (> 1024px)
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top+=100',
          end: 'bottom bottom',
          pin: '#process-drawing-col',
          pinSpacing: false,
          onUpdate: (self) => {
            const index = Math.min(
              STEPS.length - 1,
              Math.floor(self.progress * STEPS.length)
            );
            setActiveStep(index);
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} className="py-24 max-w-7xl mx-auto px-4 md:px-8">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3 mb-16">
        <MarginNote>SHEET 08  GSAP PINNED PROCESS SHEET</MarginNote>
        <MarginNote>PINNED SCROLLYTELLING // 4 PHASES</MarginNote>
      </div>

      <div className="max-w-2xl mb-16">
        <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase block mb-3">
          // DEPLOYMENT METHODOLOGY
        </span>
        <h2 className="font-sans text-[clamp(28px,4.5vw,52px)] font-bold tracking-[-0.02em] leading-tight text-[#14181C]">
          The Five-Scene Engineering Draft
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        {/* Left column: Sticky technical drawing */}
        <div
          id="process-drawing-col"
          className="lg:col-span-5 h-auto lg:h-[500px] flex flex-col justify-between"
        >
          <div className="relative w-full aspect-square bg-[#F2EFE8] border border-[rgba(20,24,28,0.16)] p-6 overflow-hidden select-none">
            {/* 72px grid */}
            <div className="absolute inset-0 bg-grid-draft opacity-60 pointer-events-none" />

            <svg
              ref={drawingRef}
              viewBox="0 0 200 200"
              className="w-full h-full overflow-visible"
              aria-hidden="true"
            >
              {/* Outer frame */}
              <rect
                x="15"
                y="15"
                width="170"
                height="170"
                fill="none"
                stroke="var(--rule)"
                strokeWidth="1"
              />

              {/* Progressively drafted lines based on activeStep */}
              {/* Step 0: Crosshair & origin */}
              <g className={`transition-opacity duration-300 ${activeStep >= 0 ? 'opacity-100' : 'opacity-20'}`}>
                <line x1="15" y1="100" x2="185" y2="100" stroke="var(--guide)" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="100" y1="15" x2="100" y2="185" stroke="var(--guide)" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="100" cy="100" r="3" fill="#9E5430" />
              </g>

              {/* Step 1: Drafted outer diamond */}
              <g className={`transition-opacity duration-300 ${activeStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                <polygon points="100,30 170,100 100,170 30,100" fill="none" stroke="#14181C" strokeWidth="3" />
              </g>

              {/* Step 2: Inner accent diamond + vertices */}
              <g className={`transition-opacity duration-300 ${activeStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                <polygon points="100,68 132,100 100,132 68,100" fill="#9E5430" />
                <rect x="96" y="26" width="8" height="8" fill="#14181C" />
                <rect x="166" y="96" width="8" height="8" fill="#14181C" />
                <rect x="96" y="166" width="8" height="8" fill="#14181C" />
                <rect x="26" y="96" width="8" height="8" fill="#14181C" />
              </g>

              {/* Step 3: Finished lockup & press bar */}
              <g className={`transition-opacity duration-300 ${activeStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                <line x1="30" y1="185" x2="170" y2="185" stroke="#9E5430" strokeWidth="2" />
              </g>
            </svg>

            {/* Stage callout */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-[#7C7568] tracking-[0.2em]">
              <span>ACTIVE PHASE: 0{activeStep + 1}</span>
              <span>{STEPS[activeStep].title}</span>
            </div>
          </div>
        </div>

        {/* Right column: 4 scrolling step cards */}
        <div className="lg:col-span-7 flex flex-col gap-16 lg:gap-32">
          {STEPS.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <div
                key={step.phase}
                className={`flex flex-col gap-4 p-8 border transition-all ${
                  isCurrent
                    ? 'border-[#14181C] bg-[#F2EFE8]'
                    : 'border-[rgba(20,24,28,0.12)] bg-[#F2EFE8]/40'
                }`}
              >
                <div className="flex items-center justify-between pb-4 border-b border-[rgba(20,24,28,0.10)] font-mono text-[11px]">
                  <span className="text-[#9E5430] font-semibold tracking-[0.2em]">
                    PHASE {step.phase} // 04
                  </span>
                  <span className="text-[#7C7568] tracking-[0.16em]">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="font-sans text-[26px] md:text-[30px] font-bold text-[#14181C] tracking-[-0.01em]">
                  {step.title}
                </h3>

                <p className="font-mono text-[13px] text-[#7C7568] leading-[1.8]">
                  {step.description}
                </p>

                <div className="pt-4 mt-4 border-t border-[rgba(20,24,28,0.10)] flex items-center justify-between font-mono text-[10px] tracking-[0.16em]">
                  <span className="text-[#7C7568] uppercase">DELIVERABLE:</span>
                  <span className="text-[#14181C] font-medium">{step.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-16">
        <DimensionLine label="4-PHASE EXECUTION MODEL // ZERO DOWNTIME HANDOVER" />
      </div>
    </section>
  );
};
