// path: src/components/layout/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lockup } from '@/components/brand/Lockup';
import { NAV_LINKS } from '@/data/nav';
import { MobileDrawer } from './MobileDrawer';
import { CommandPalette } from './CommandPalette';
import { cn } from '@/lib/utils';
import { Search, Menu } from 'lucide-react';
import { openScheduleModal } from '@/lib/events';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [paletteOpen, setPaletteOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcut for ?K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isEmbed =
    pathname?.startsWith('/embed') ||
    (typeof window !== 'undefined' && window.self !== window.top);

  if (isEmbed) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-200',
          scrolled
            ? 'bg-[#F2EFE8]/95 backdrop-blur-sm border-b border-[rgba(20,24,28,0.16)]'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-6">
          {/* Brand Lockup */}
          <Lockup markSize={26} href="/" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative py-1 font-mono text-[11px] tracking-[0.2em] uppercase text-[#7C7568] hover:text-[#14181C] transition-colors group"
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9E5430]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Suite */}
          <div className="flex items-center gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1.5 border border-[rgba(20,24,28,0.16)] hover:border-[#14181C] font-mono text-[10px] tracking-[0.18em] text-[#7C7568] transition-colors"
              aria-label="Open Command Palette"
            >
              <Search className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>?K</span>
            </button>

            {/* Book Discovery Call */}
            <button
              onClick={openScheduleModal}
              className="btn-spark hidden xl:inline-flex text-[11px] py-2.5 px-3.5"
            >
              BOOK DISCOVERY
            </button>

            {/* Solid CTA */}
            <Link
              href="/contact"
              className="btn-spark solid hidden md:inline-flex text-[11px] py-2.5 px-4"
            >
              START A PROJECT
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 text-[#14181C] hover:text-[#9E5430] transition-colors focus-visible:outline-2"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
};
