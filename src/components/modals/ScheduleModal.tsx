// path: src/components/modals/ScheduleModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Check, Shield, ArrowRight } from 'lucide-react';
import { BEZIER } from '@/lib/animations';

import { ScheduleModalDetail } from '@/lib/events';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDetail?: ScheduleModalDetail;
}

const TIME_SLOTS = [
  'Today, 2:00 PM – 2:20 PM PST',
  'Tomorrow, 10:00 AM – 10:20 AM PST',
  'Tomorrow, 1:30 PM – 1:50 PM PST',
  'Thursday, 11:00 AM – 11:20 AM PST',
];

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, initialDetail }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: 'Full-Stack Web & SaaS Platform',
    slot: TIME_SLOTS[1],
    notes: '',
  });

  useEffect(() => {
    if (isOpen && initialDetail) {
      setFormData((prev) => ({
        ...prev,
        interest: initialDetail.interest || prev.interest,
        notes: initialDetail.notes || prev.notes,
      }));
    }
  }, [isOpen, initialDetail]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-[#14181C]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: BEZIER.easeOutQuart }}
            className="relative w-full max-w-2xl bg-[#F2EFE8] border border-[#14181C] shadow-2xl z-10 overflow-hidden"
          >
            {/* Top Blueprint Band */}
            <div className="bg-[#14181C] text-[#F2EFE8] px-6 py-4 flex items-center justify-between border-b border-[#14181C]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C97A4A]" />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold text-[#F2EFE8]">
                  ARCHITECTURAL DISCOVERY // 20-MIN SESSION
                </span>
              </div>
              <button
                onClick={resetAndClose}
                aria-label="Close modal"
                className="p-1 text-[rgba(242,239,232,0.6)] hover:text-[#F2EFE8] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              {submitted ? (
                <div className="flex flex-col gap-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-[#9E5430] text-[#F2EFE8]">
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </span>
                    <div>
                      <h3 className="font-sans font-bold text-[20px] text-[#14181C]">
                        Discovery Session Scheduled
                      </h3>
                      <span className="font-mono text-[11px] text-[#7C7568]">
                        Direct Engineering Invite Dispatched
                      </span>
                    </div>
                  </div>

                  <p className="font-mono text-[13px] text-[#14181C] leading-relaxed">
                    Your 20-minute architectural consultation has been confirmed for{' '}
                    <strong>{formData.slot}</strong>. A calendar invitation with direct Google Meet coordinates has been dispatched to <strong>{formData.email}</strong>.
                  </p>

                  <div className="p-4 bg-[rgba(20,24,28,0.04)] border border-[rgba(20,24,28,0.12)] font-mono text-[11px] flex flex-col gap-1.5">
                    <div><strong className="text-[#14181C]">ATTENDING LEAD:</strong> Brandanlee Hugos (Lead Systems Developer)</div>
                    <div><strong className="text-[#14181C]">FOCUS AREA:</strong> {formData.interest}</div>
                    <div><strong className="text-[#14181C]">INTAKE ID:</strong> SPARK-DISCOVERY-2026-8891</div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#7C7568]">
                    <Shield className="w-4 h-4 text-[#9E5430]" />
                    <span>Protected under strict Mutual Non-Disclosure Agreement.</span>
                  </div>

                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="btn-spark solid text-center py-3 text-[12px] mt-2"
                  >
                    RETURN TO SITE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-sans text-[22px] font-bold text-[#14181C]">
                      Book a 20-Minute Technical Discovery Call
                    </h3>
                    <p className="font-mono text-[12px] text-[#7C7568] leading-relaxed">
                      Zero salespeople. You will speak directly with our co-founders and principal architects to explore your system bottlenecks, tech stack decisions, or sprint roadmaps.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-[#7C7568] uppercase tracking-wider">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="E.G. ALEX MERCER"
                        className="p-2.5 bg-transparent border border-[rgba(20,24,28,0.2)] font-mono text-[12px] text-[#14181C] placeholder:text-[#7C7568] focus:border-[#14181C] focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-[#7C7568] uppercase tracking-wider">
                        WORK EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ALEX@COMPANY.COM"
                        className="p-2.5 bg-transparent border border-[rgba(20,24,28,0.2)] font-mono text-[12px] text-[#14181C] placeholder:text-[#7C7568] focus:border-[#14181C] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-[#7C7568] uppercase tracking-wider">
                        COMPANY / STARTUP NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="E.G. NEXUS PLATFORM"
                        className="p-2.5 bg-transparent border border-[rgba(20,24,28,0.2)] font-mono text-[12px] text-[#14181C] placeholder:text-[#7C7568] focus:border-[#14181C] focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-[#7C7568] uppercase tracking-wider">
                        SYSTEM FOCUS
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="p-2.5 bg-transparent border border-[rgba(20,24,28,0.2)] font-mono text-[12px] text-[#14181C] focus:border-[#14181C] focus:outline-none"
                      >
                        <option>Full-Stack Web &amp; SaaS Platform</option>
                        <option>High-Concurrency Backend &amp; APIs</option>
                        <option>Performance &amp; Latency Overhaul</option>
                        <option>Cloud Infrastructure &amp; Kubernetes</option>
                        <option>Industrial SCADA &amp; Hardware Telemetry</option>
                      </select>
                    </div>
                  </div>

                  {/* Slot selector */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-[#7C7568] uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#9E5430]" />
                      <span>SELECT AVAILABLE TECHNICAL WINDOW</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({ ...formData, slot })}
                          className={`p-2.5 text-left border font-mono text-[11px] transition-colors ${
                            formData.slot === slot
                              ? 'border-[#9E5430] bg-[#14181C] text-[#F2EFE8]'
                              : 'border-[rgba(20,24,28,0.16)] bg-[rgba(20,24,28,0.02)] text-[#14181C] hover:border-[#14181C]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[rgba(20,24,28,0.12)]">
                    <span className="font-mono text-[10px] text-[#7C7568] flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-[#9E5430]" />
                      <span>MUTUAL NDA FIRST PROTOCOL</span>
                    </span>
                    <button
                      type="submit"
                      className="btn-spark solid text-[12px] py-3 px-6 flex items-center gap-2 group"
                    >
                      <span>CONFIRM RESERVATION</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
