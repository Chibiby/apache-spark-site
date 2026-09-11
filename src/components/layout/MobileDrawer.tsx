// path: src/components/layout/MobileDrawer.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Lockup } from '@/components/brand/Lockup';
import { NAV_LINKS } from '@/data/nav';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { BEZIER } from '@/lib/animations';
import { X } from 'lucide-react';

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  useLockBodyScroll(isOpen);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: BEZIER.easeOutQuart }}
          className="fixed inset-0 z-[150] bg-[#F2EFE8] flex flex-col justify-between p-6 md:hidden"
        >
          {/* Top header row */}
          <div className="flex items-center justify-between pb-6 border-b border-[rgba(20,24,28,0.16)]">
            <Lockup markSize={24} />
            <button
              onClick={onClose}
              className="p-2 text-[#14181C] hover:text-[#9E5430] transition-colors focus-visible:outline-2"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Staggered Navigation Links */}
          <nav className="flex flex-col gap-6 py-12">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ clipPath: 'inset(0 100% 0 0)', x: -20 }}
                animate={{ clipPath: 'inset(0 0% 0 0)', x: 0 }}
                transition={{
                  duration: 0.44,
                  delay: 0.08 + i * 0.08,
                  ease: BEZIER.easeInOutQuart,
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-baseline gap-4 py-2 border-b border-[rgba(20,24,28,0.10)]"
                >
                  <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.2em]">
                    {link.index}
                  </span>
                  <span className="font-sans text-[28px] font-semibold text-[#14181C] group-hover:text-[#9E5430] transition-colors">
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="pt-6 border-t border-[rgba(20,24,28,0.16)] flex flex-col gap-4">
            <Link
              href="/contact"
              onClick={onClose}
              className="btn-spark solid text-center py-4 w-full"
            >
              START A PROJECT
            </Link>
            <div className="flex justify-between items-center font-mono text-[10px] text-[#7C7568] tracking-[0.18em]">
              <span>APACHE SPARK  OPS DESK</span>
              <span>SCALE 1:1</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
