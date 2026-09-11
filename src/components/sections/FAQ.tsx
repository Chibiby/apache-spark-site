// path: src/components/sections/FAQ.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '@/data/faq';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { BEZIER } from '@/lib/animations';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3 mb-12">
        <MarginNote>SHEET 13  TECHNICAL SPECIFICATIONS FAQ</MarginNote>
        <MarginNote>ACCORDION // DRAFTED GLYPHS</MarginNote>
      </div>

      <div className="max-w-2xl mb-12">
        <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase block mb-3">
          // FREQUENTLY ASKED
        </span>
        <h2 className="font-sans text-[clamp(28px,4.5vw,52px)] font-bold tracking-[-0.02em] leading-tight text-[#14181C]">
          Answers on scope, standards, and operations.
        </h2>
      </div>

      {/* Accordion list */}
      <div className="flex flex-col divide-y divide-[rgba(20,24,28,0.16)] border-t border-b border-[rgba(20,24,28,0.16)]">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.36, delay: i * 0.04, ease: BEZIER.easeOutQuart }}
              className="py-2"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group focus-visible:outline-2"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-4 md:gap-6 min-w-0 pr-4">
                  <span className="font-mono text-[12px] text-[#9E5430] tracking-[0.2em] shrink-0 pt-0.5">
                    {faq.index}
                  </span>
                  <span className="font-sans text-[18px] md:text-[21px] font-semibold text-[#14181C] group-hover:text-[#9E5430] transition-colors tracking-[-0.01em]">
                    {faq.question}
                  </span>
                </div>

                {/* Drafted + / - glyph */}
                <div className="relative w-5 h-5 shrink-0 mt-1 select-none pointer-events-none">
                  {/* Horizontal stroke (always visible) */}
                  <div className="absolute top-[9.5px] left-0 w-5 h-[1px] bg-[#14181C] group-hover:bg-[#9E5430] transition-colors" />
                  {/* Vertical stroke (draws out when open, creating minus) */}
                  <motion.div
                    className="absolute top-0 left-[9.5px] h-5 w-[1px] bg-[#14181C] group-hover:bg-[#9E5430] transition-colors"
                    animate={{ scaleY: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.24, ease: BEZIER.easeInOutQuart }}
                  />
                </div>
              </button>

              {/* Animated Height Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.34, ease: BEZIER.easeInOutQuart }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-8 md:pl-12 pr-4 md:pr-16">
                      <p className="font-mono text-[13px] text-[#7C7568] leading-[1.8]">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8">
        <DimensionLine label="FAQ ACCORDION // 8 REGISTERED SPECIFICATIONS" />
      </div>
    </section>
  );
};
