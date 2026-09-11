// path: src/components/layout/SiteShell.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { CustomCursor } from '@/components/fx/CustomCursor';
import { DraftingGridBackground } from '@/components/fx/DraftingGridBackground';
import { SmoothScroll } from '@/components/fx/SmoothScroll';
import { Preloader } from '@/components/brand/Preloader';

import { ScheduleModal } from '@/components/modals/ScheduleModal';
import { QuickEngageDock } from '@/components/layout/QuickEngageDock';

interface SiteShellProps {
  children: React.ReactNode;
  modal?: React.ReactNode;
}

export const SiteShell: React.FC<SiteShellProps> = ({ children, modal }) => {
  const pathname = usePathname();
  const [isIframe, setIsIframe] = useState<boolean>(false);
  const [scheduleOpen, setScheduleOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleOpen = () => setScheduleOpen(true);
    window.addEventListener('spark:open-schedule', handleOpen);
    return () => window.removeEventListener('spark:open-schedule', handleOpen);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        if (window.self !== window.top) {
          setIsIframe(true);
        }
      } catch {
        setIsIframe(true);
      }
    }
  }, []);

  const isEmbedRoute = pathname?.startsWith('/embed') || isIframe;

  // Complete isolation for embed routes and iframes
  if (isEmbedRoute) {
    return (
      <main className="w-full min-h-screen bg-white font-sans antialiased text-slate-900">
        {children}
      </main>
    );
  }

  return (
    <>
      {/* Preloader with exact cue sheet & session storage once-guard */}
      <Preloader />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Drafting crosshair cursor */}
      <CustomCursor />

      {/* Interactive blueprint drafting grid & caliper guides behind everything */}
      <DraftingGridBackground />

      {/* Lenis on GSAP Ticker */}
      <SmoothScroll>
        {/* Global Header / Navbar */}
        <Navbar />

        {/* Main Route Content */}
        <div className="flex-1 flex flex-col relative z-10">{children}</div>

        {/* Global Inverted Footer */}
        <Footer />

        {/* Intercepting Route Modal Slot */}
        {modal}
      </SmoothScroll>

      {/* Persistent Quick Engage Floating Dock & Mobile Bar */}
      <QuickEngageDock onOpenSchedule={() => setScheduleOpen(true)} />

      {/* Global Architectural Discovery Call Modal */}
      <ScheduleModal isOpen={scheduleOpen} onClose={() => setScheduleOpen(false)} />
    </>
  );
};

