// path: src/components/layout/SiteShell.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { CustomCursor } from '@/components/fx/CustomCursor';
import { SmoothScroll } from '@/components/fx/SmoothScroll';
import { Preloader } from '@/components/brand/Preloader';

interface SiteShellProps {
  children: React.ReactNode;
  modal?: React.ReactNode;
}

export const SiteShell: React.FC<SiteShellProps> = ({ children, modal }) => {
  const pathname = usePathname();
  const [isIframe, setIsIframe] = useState<boolean>(false);

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
  // ZERO Apache Spark headers, footers, crosshair cursors, preloader curtains, or smooth scroll hijacking
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

      {/* Lenis on GSAP Ticker */}
      <SmoothScroll>
        {/* Global Header / Navbar */}
        <Navbar />

        {/* Main Route Content */}
        <div className="flex-1 flex flex-col">{children}</div>

        {/* Global Inverted Footer */}
        <Footer />

        {/* Intercepting Route Modal Slot */}
        {modal}
      </SmoothScroll>
    </>
  );
};
