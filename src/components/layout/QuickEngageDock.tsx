// path: src/components/layout/QuickEngageDock.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Calculator, Mail, ChevronUp, ChevronDown } from 'lucide-react';
import { BEZIER } from '@/lib/animations';

interface QuickEngageDockProps {
  onOpenSchedule: () => void;
}

export const QuickEngageDock: React.FC<QuickEngageDockProps> = ({ onOpenSchedule }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const scrollToEstimator = () => {
    const el = document.getElementById('estimator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#estimator';
    }
  };

  return (
    <>
      {/* Desktop Floating Dock (Bottom Right) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2 select-none">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: BEZIER.easeOutQuart }}
              className="bg-[#14181C] text-[#F2EFE8] border border-[rgba(242,239,232,0.2)] p-3 shadow-2xl flex flex-col gap-2 min-w-[240px]"
            >
              <div className="flex items-center justify-between border-b border-[rgba(242,239,232,0.12)] pb-2 px-1">
                <span className="font-mono text-[9px] text-[#C97A4A] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] animate-pulse" />
                  DIRECT ENG DESK
                </span>
                <span className="font-mono text-[9px] text-[rgba(242,239,232,0.5)]">
                  &lt; 24H SLA
                </span>
              </div>

              {/* Action 1: Book Call */}
              <button
                type="button"
                onClick={onOpenSchedule}
                className="flex items-center gap-2.5 p-2 bg-[#9E5430] hover:bg-[#C97A4A] text-[#F2EFE8] font-mono text-[11px] font-bold tracking-wider transition-colors text-left"
              >
                <Calendar className="w-4 h-4 text-[#F2EFE8] shrink-0" />
                <span>BOOK 20-MIN DISCOVERY</span>
              </button>

              {/* Action 2: Scope Estimator */}
              <button
                type="button"
                onClick={scrollToEstimator}
                className="flex items-center gap-2.5 p-2 bg-[rgba(242,239,232,0.06)] hover:bg-[rgba(242,239,232,0.12)] text-[#F2EFE8] font-mono text-[11px] tracking-wider transition-colors text-left border border-[rgba(242,239,232,0.1)]"
              >
                <Calculator className="w-4 h-4 text-[#C97A4A] shrink-0" />
                <span>ESTIMATE SPRINT SCOPE</span>
              </button>

              {/* Action 3: Contact Page */}
              <Link
                href="/contact"
                className="flex items-center gap-2.5 p-2 hover:bg-[rgba(242,239,232,0.06)] text-[rgba(242,239,232,0.8)] font-mono text-[10px] tracking-wider transition-colors text-left"
              >
                <Mail className="w-3.5 h-3.5 text-[#7C7568] shrink-0" />
                <span>DIRECT INTAKE FORM →</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle / Minimize Button */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#14181C] text-[#F2EFE8] border border-[rgba(242,239,232,0.24)] shadow-md hover:border-[#9E5430] transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase font-bold text-[#F2EFE8]">
            {collapsed ? 'ENGAGE DESK' : 'MINIMIZE'}
          </span>
          {collapsed ? <ChevronUp className="w-3 h-3 text-[#C97A4A]" /> : <ChevronDown className="w-3 h-3 text-[rgba(242,239,232,0.6)]" />}
        </button>
      </div>

      {/* Mobile Sticky Quick-Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#14181C] border-t border-[rgba(242,239,232,0.2)] p-2.5 flex items-center justify-between gap-2 shadow-2xl backdrop-blur-md">
        <button
          type="button"
          onClick={onOpenSchedule}
          className="flex-1 py-2.5 px-2 bg-[#9E5430] text-[#F2EFE8] font-mono text-[11px] font-bold tracking-wider text-center flex items-center justify-center gap-1.5"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>BOOK DISCOVERY</span>
        </button>
        <Link
          href="/contact"
          className="flex-1 py-2.5 px-2 bg-[rgba(242,239,232,0.1)] text-[#F2EFE8] font-mono text-[11px] font-bold tracking-wider text-center border border-[rgba(242,239,232,0.16)]"
        >
          START PROJECT
        </Link>
      </div>
    </>
  );
};
