// path: src/components/layout/Footer.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { InvertedSheet } from '@/components/brand/InvertedSheet';
import { LockupStacked } from '@/components/brand/LockupStacked';
import { SITEMAP_SECTIONS } from '@/data/nav';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const [sfTime, setSfTime] = useState<string>('--:--:-- PST');
  const [chiTime, setChiTime] = useState<string>('--:--:-- CST');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setSfTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour12: false,
        }) + ' PST'
      );
      setChiTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/Chicago',
          hour12: false,
        }) + ' CST'
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isEmbed =
    pathname?.startsWith('/embed') ||
    (typeof window !== 'undefined' && window.self !== window.top);

  if (isEmbed) {
    return null;
  }

  return (
    <InvertedSheet as="footer" className="pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-16">
        {/* Top brand & sitemap grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[rgba(242,239,232,0.16)]">
          {/* Brand block */}
          <div className="md:col-span-4 flex flex-col items-start gap-6">
            <LockupStacked inverted markSize={48} className="items-start text-left" />
            <p className="font-mono text-[11px] leading-relaxed text-[rgba(242,239,232,0.62)] max-w-sm tracking-[0.05em]">
              Software, networks and infrastructure, drafted to spec and deployed end to end. One team from the wiring closet to the deployment pipeline.
            </p>

            {/* Clocks */}
            <div className="flex flex-col gap-1 pt-2 font-mono text-[10px] tracking-[0.2em] text-[#C97A4A]">
              <div>SAN FRANCISCO: {sfTime}</div>
              <div>CHICAGO: {chiTime}</div>
            </div>
          </div>

          {/* Sitemap columns */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {SITEMAP_SECTIONS.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <span className="font-mono text-[10px] tracking-[0.24em] text-[#C97A4A] uppercase font-semibold">
                  {section.title}
                </span>
                <ul className="flex flex-col gap-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-mono text-[11px] tracking-[0.12em] text-[rgba(242,239,232,0.62)] hover:text-[#F2EFE8] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Giant Archivo background wordmark */}
        <div className="overflow-hidden py-4 select-none opacity-10">
          <div className="font-sans font-bold text-[clamp(44px,12vw,148px)] tracking-[-0.03em] whitespace-nowrap leading-none text-[#F2EFE8]">
            APACHE SPARK
          </div>
        </div>

        {/* Live Engineering & Stack Diagnostic HUD */}
        <div className="py-3 px-4 bg-[rgba(242,239,232,0.04)] border border-[rgba(242,239,232,0.12)] flex flex-wrap items-center justify-between gap-y-2 gap-x-4 font-mono text-[9px] md:text-[10px] text-[rgba(242,239,232,0.7)] tracking-[0.14em]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] animate-pulse" />
            <span className="text-[#F2EFE8] font-bold">EDGE CLUSTER: US-WEST / US-EAST / EU-CENTRAL</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>RUNTIME: NEXT.JS 15.5 + REACT 19</span>
            <span className="text-[#C97A4A]">•</span>
            <span>TYPESCRIPT STRICT: 100%</span>
            <span className="text-[#C97A4A]">•</span>
            <span>LIGHTHOUSE PERFORMANCE: 100/100</span>
            <span className="text-[#C97A4A]">•</span>
            <span>EDGE LATENCY: &lt; 18ms</span>
          </div>
        </div>

        {/* Bottom copyright & stamp row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-[0.18em] text-[rgba(242,239,232,0.62)]">
          <span>APACHE SPARK — SOFTWARE · SYSTEMS · NETWORKS · INFRASTRUCTURE</span>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 bg-[#C97A4A] inline-block shrink-0" />
              <span className="text-[#F2EFE8]">BUILT &amp; DEPLOYED BY APACHE SPARK</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-1.5 border border-[rgba(242,239,232,0.16)] hover:border-[#F2EFE8] text-[#F2EFE8] transition-colors"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </div>
    </InvertedSheet>
  );
};
