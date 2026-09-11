// path: src/components/layout/CommandPalette.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/data/projects';
import { BRAND_COPY } from '@/lib/constants';
import { openScheduleModal } from '@/lib/events';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { Search, CornerDownLeft, Copy, Check } from 'lucide-react';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  useLockBodyScroll(isOpen);
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Section jump targets
  const sections = [
    { label: 'HOME / HERO', href: '/#hero', type: 'SECTION' },
    { label: 'CALCULATE SPRINT SCOPE & COST', href: '/#scope-calculator', type: 'ACTION' },
    { label: 'LAUNCH SPARK TERMINAL (ASCII BENCHMARK)', href: '/#terminal', type: 'ACTION' },
    { label: 'SERVICES / PILLARS', href: '/services', type: 'SECTION' },
    { label: 'SYSTEM ARCHITECTURE SIMULATOR', href: '/services#simulator', type: 'SECTION' },
    { label: '60-SECOND ARCHITECTURAL READINESS AUDIT', href: '/services#audit', type: 'SECTION' },
    { label: 'SERVICE COMPARISON MATRIX (VS AGENCIES)', href: '/services#comparison-matrix', type: 'SECTION' },
    { label: 'CAPABILITIES BENTO', href: '/#capabilities', type: 'SECTION' },
    { label: 'NETWORK TOPOLOGY DIAGRAM', href: '/#network-diagram', type: 'SECTION' },
    { label: 'PERFORMANCE METRICS', href: '/#metrics', type: 'SECTION' },
    { label: 'PROCESS DRAFTING SHEET', href: '/#process', type: 'SECTION' },
    { label: 'PAST PROJECTS ARCHIVE', href: '/projects', type: 'SECTION' },
    { label: 'LIVE SYSTEM SHOWCASE (WORKSTATION SIMULATOR)', href: '/#showcase', type: 'SECTION' },
    { label: 'EMBED: PROJECT LITRACK (DEPED ARAL TELEMETRY)', href: '/embed/litrack', type: 'EMBED' },
    { label: 'EMBED: ASPAJCCJSI PRESS PORTAL (DSPC 2026)', href: '/embed/journalism', type: 'EMBED' },
    { label: 'CLIENT TESTIMONIALS', href: '/#testimonials', type: 'SECTION' },
    { label: 'ENGAGEMENT TIERS', href: '/#engagements', type: 'SECTION' },
    { label: 'ENGINEERING TEAM', href: '/about#team', type: 'SECTION' },
    { label: 'TECHNICAL FAQ', href: '/#faq', type: 'SECTION' },
    { label: 'CONTACT & SPECIFICATIONS', href: '/contact', type: 'SECTION' },
    { label: 'READ LLMS.TXT (AI ARCHITECT SUMMARY)', href: '/llms.txt', type: 'EXTERNAL' },
  ];

  // Project sheets
  const projectItems = PROJECTS.map((p) => ({
    label: `${p.sheetNo} — ${p.title} (${p.client})`,
    href: `/projects/${p.slug}`,
    type: 'SHEET',
  }));

  const allItems = [
    { label: '⚡ BOOK 20-MIN ARCHITECTURAL DISCOVERY CALL', href: 'book-discovery', type: 'ACTION' },
    { label: `COPY CONTACT EMAIL (${BRAND_COPY.contactEmail})`, href: 'copy-email', type: 'ACTION' },
    ...sections,
    ...projectItems,
  ];

  const filtered = allItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setCopied(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation within the palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filtered[selectedIndex];
      if (current) executeItem(current);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const executeItem = (item: (typeof allItems)[0]) => {
    if (item.href === 'copy-email') {
      navigator.clipboard.writeText(BRAND_COPY.contactEmail);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 900);
      return;
    }

    if (item.href === 'book-discovery') {
      onClose();
      openScheduleModal({ interest: 'Command Palette Quick Action' });
      return;
    }

    onClose();
    router.push(item.href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4">
          {/* Dimmed backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#14181C]/60 backdrop-blur-[2px]"
          />

          {/* Palette Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-[620px] bg-[#F2EFE8] border border-[rgba(20,24,28,0.22)] z-10 flex flex-col overflow-hidden max-h-[70vh]"
            onKeyDown={handleKeyDown}
          >
            {/* Top Search Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[rgba(20,24,28,0.16)] bg-[#F2EFE8]">
              <Search className="w-4 h-4 text-[#7C7568] stroke-[1.5] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="TYPE A COMMAND OR SEARCH SHEETS..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent font-mono text-[12px] tracking-[0.16em] uppercase text-[#14181C] placeholder:text-[#7C7568] focus:outline-none"
              />
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#7C7568] border border-[rgba(20,24,28,0.20)] px-1.5 py-0.5 select-none">
                ESC
              </span>
            </div>

            {/* Results list */}
            <div className="overflow-y-auto py-2 divide-y divide-[rgba(20,24,28,0.06)]">
              {filtered.length === 0 ? (
                <div className="p-8 text-center font-mono text-[11px] tracking-[0.2em] text-[#7C7568]">
                  NO COMMANDS MATCH SPECIFICATION
                </div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={`${item.href}-${index}`}
                      onClick={() => executeItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors font-mono ${
                        isSelected
                          ? 'bg-[#14181C] text-[#F2EFE8]'
                          : 'bg-[#F2EFE8] text-[#14181C] hover:bg-[rgba(20,24,28,0.04)]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-4">
                        <span
                          className={`text-[9px] tracking-[0.2em] px-1.5 py-0.5 border shrink-0 ${
                            isSelected
                              ? 'border-[#C97A4A] text-[#C97A4A]'
                              : 'border-[rgba(20,24,28,0.16)] text-[#7C7568]'
                          }`}
                        >
                          {item.type}
                        </span>
                        <span className="text-[12px] tracking-[0.1em] truncate">
                          {item.label}
                        </span>
                      </div>

                      {item.href === 'copy-email' ? (
                        copied ? (
                          <Check className="w-3.5 h-3.5 text-[#9E5430] stroke-[1.5] shrink-0" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-[#7C7568] stroke-[1.5] shrink-0" />
                        )
                      ) : (
                        <CornerDownLeft
                          className={`w-3.5 h-3.5 stroke-[1.5] shrink-0 ${
                            isSelected ? 'text-[#C97A4A]' : 'opacity-0'
                          }`}
                        />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer instruction bar */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] font-mono text-[9px] tracking-[0.2em] text-[#7C7568]">
              <span>NAVIGATE: ? ?</span>
              <span>SELECT: ENTER</span>
              <span>CLOSE: ESC</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
