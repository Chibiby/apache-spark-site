// path: src/app/page.tsx
import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { Descriptors } from '@/components/sections/Descriptors';
import { Services } from '@/components/sections/Services';
import { Capability } from '@/components/sections/Capability';
import { ScopeEstimator } from '@/components/sections/ScopeEstimator';
import { NetworkDiagram } from '@/components/sections/NetworkDiagram';
import { Metrics } from '@/components/sections/Metrics';
import { ProcessSheet } from '@/components/sections/ProcessSheet';
import { ProjectsPreview } from '@/components/sections/ProjectsPreview';
import { LiveShowcase } from '@/components/sections/LiveShowcase';
import { SparkTerminal } from '@/components/sections/SparkTerminal';
import { Testimonials } from '@/components/sections/Testimonials';
import { Engagements } from '@/components/sections/Engagements';
import { Team } from '@/components/sections/Team';
import { FAQ } from '@/components/sections/FAQ';
import { CTASheet } from '@/components/sections/CTASheet';
import { ConstructionGrid } from '@/components/brand/ConstructionGrid';
import { SceneCanvasWrapper } from '@/components/webgl/SceneCanvasWrapper';
import { ScrollHUD } from '@/components/fx/ScrollHUD';

export default function HomePage() {
  return (
    <main className="relative w-full flex flex-col">
      {/* Fixed WebGL Plotter & Grain Canvas */}
      <SceneCanvasWrapper />

      {/* Subtle 72px drafting background grid */}
      <ConstructionGrid opacity={0.18} />

      {/* Vernier Caliper & Scroll Vector HUD */}
      <ScrollHUD />

      {/* 02 Hero */}
      <Hero />

      {/* 02B Verified Client & System Deployments Trust Bar */}
      <TrustBar />

      {/* 03 Descriptors */}
      <Descriptors />

      {/* 04 Services */}
      <Services />

      {/* 05 Capability Bento */}
      <Capability />

      {/* 05B Interactive Scope & Sprint Pod Estimator */}
      <ScopeEstimator />

      {/* 06 Interactive Network Topology Diagram */}
      <NetworkDiagram />

      {/* 07 Metrics (Inverted Sheet) */}
      <Metrics />

      {/* 08 GSAP Scrollytelling Process Sheet */}
      <ProcessSheet />

      {/* 09 Featured Projects Carousel */}
      <ProjectsPreview />

      {/* 09B Live Systems Interactive Showcase */}
      <LiveShowcase />

      {/* 09C Live Diagnostic Terminal & Developer Sandbox */}
      <SparkTerminal />

      {/* 10 Testimonials */}
      <Testimonials />

      {/* 11 Engagements Tiers */}
      <Engagements />

      {/* 12 Engineering Team */}
      <Team />

      {/* 13 FAQ Accordion */}
      <FAQ />

      {/* 14 CTASheet (Inverted Sheet) */}
      <CTASheet />
    </main>
  );
}
