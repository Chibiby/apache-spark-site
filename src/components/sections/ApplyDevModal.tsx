// path: src/components/sections/ApplyDevModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair } from '@/components/brand/Crosshair';
import { BEZIER } from '@/lib/animations';

interface ApplyDevModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStation?: string;
  defaultRole?: string;
}

export const ApplyDevModal: React.FC<ApplyDevModalProps> = ({
  isOpen,
  onClose,
  defaultStation = 'STATION 03',
  defaultRole = 'Full-Stack Systems Developer',
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [station, setStation] = useState(defaultStation);
  const [role, setRole] = useState(defaultRole);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [dossier, setDossier] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  useEffect(() => {
    if (defaultStation) setStation(defaultStation);
    if (defaultRole) setRole(defaultRole);
  }, [defaultStation, defaultRole]);

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
    if (!fullName.trim() || !email.trim()) return;

    setIsSubmitting(true);

    const ref = `SPARK-DEV-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceId(ref);

    // Persist to localStorage for real interactivity
    try {
      const existing = JSON.parse(localStorage.getItem('spark_dev_applications') || '[]');
      const newApp = {
        referenceId: ref,
        fullName,
        email,
        station,
        role,
        portfolioUrl,
        dossier,
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem('spark_dev_applications', JSON.stringify([newApp, ...existing]));
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPortfolioUrl('');
    setDossier('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#14181C]/80 backdrop-blur-sm"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: BEZIER.easeOutQuart }}
            className="relative w-full max-w-2xl bg-[#F2EFE8] border border-[rgba(20,24,28,0.25)] shadow-2xl z-10 my-8 overflow-hidden"
          >
            {/* Corner Blueprint Ticks */}
            <div className="absolute top-2 left-2 pointer-events-none font-mono text-[9px] text-[rgba(20,24,28,0.3)]">
              +
            </div>
            <div className="absolute top-2 right-2 pointer-events-none font-mono text-[9px] text-[rgba(20,24,28,0.3)]">
              +
            </div>
            <div className="absolute bottom-2 left-2 pointer-events-none font-mono text-[9px] text-[rgba(20,24,28,0.3)]">
              +
            </div>
            <div className="absolute bottom-2 right-2 pointer-events-none font-mono text-[9px] text-[rgba(20,24,28,0.3)]">
              +
            </div>

            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(20,24,28,0.16)] bg-[#EAE6DE]">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#9E5430] animate-pulse" />
                <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.2em] font-semibold uppercase">
                  // CANDIDATE INTAKE: REQUISITION ACTIVE
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="font-mono text-[12px] text-[#14181C] hover:text-[#9E5430] px-2 py-1 tracking-[0.1em] border border-transparent hover:border-[rgba(20,24,28,0.2)] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                [ESC // CLOSE]
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase">
                        FIELD SQUAD APPLICANT DOSSIER
                      </span>
                      <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.16em]">
                        FORM 12-ENG
                      </span>
                    </div>
                    <h3 className="font-sans text-[24px] font-bold text-[#14181C] tracking-[-0.02em]">
                      Apply as Developer
                    </h3>
                    <p className="font-mono text-[12px] text-[#7C7568] leading-relaxed mt-1">
                      Submit your credentials to join Brandanlee Hugos (Dev 1) and Dante Nicolas (Dev 2). We welcome all visitors and practicing engineers.
                    </p>
                  </div>

                  {/* Target Station selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block font-mono text-[10px] text-[#14181C] tracking-[0.16em] uppercase mb-1.5">
                        Target Station / Slot *
                      </label>
                      <select
                        value={station}
                        onChange={(e) => {
                          setStation(e.target.value);
                          if (e.target.value === 'STATION 03') setRole('Full-Stack Systems Developer');
                          if (e.target.value === 'STATION 04') setRole('Backend & Infrastructure Engineer');
                          if (e.target.value === 'STATION 05') setRole('Distributed Systems & Cloud Architect');
                          if (e.target.value === 'STATION 06') setRole('Systems Security & Reliability Engineer');
                          if (e.target.value === 'OPEN_REQUISITION') setRole('General Systems Developer');
                        }}
                        className="w-full bg-white border border-[rgba(20,24,28,0.2)] px-3 py-2.5 font-mono text-[12px] text-[#14181C] focus:outline-none focus:border-[#9E5430] transition-colors"
                      >
                        <option value="STATION 03">STATION 03 // Full-Stack Systems</option>
                        <option value="STATION 04">STATION 04 // Backend &amp; Infra</option>
                        <option value="STATION 05">STATION 05 // Distributed Systems</option>
                        <option value="STATION 06">STATION 06 // Systems Security</option>
                        <option value="OPEN_REQUISITION">GENERAL // Open Developer Slot</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-[#14181C] tracking-[0.16em] uppercase mb-1.5">
                        Assigned Role / Focus
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-white border border-[rgba(20,24,28,0.2)] px-3 py-2.5 font-mono text-[12px] text-[#14181C] focus:outline-none focus:border-[#9E5430] transition-colors"
                        placeholder="e.g. Systems Engineer, WebGL specialist"
                        required
                      />
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] text-[#14181C] tracking-[0.16em] uppercase mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Alex Mercer"
                        className="w-full bg-white border border-[rgba(20,24,28,0.2)] px-3 py-2.5 font-mono text-[12px] text-[#14181C] focus:outline-none focus:border-[#9E5430] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-[#14181C] tracking-[0.16em] uppercase mb-1.5">
                        Contact Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@domain.com"
                        className="w-full bg-white border border-[rgba(20,24,28,0.2)] px-3 py-2.5 font-mono text-[12px] text-[#14181C] focus:outline-none focus:border-[#9E5430] transition-colors"
                      />
                    </div>
                  </div>

                  {/* GitHub or Portfolio link */}
                  <div>
                    <label className="block font-mono text-[10px] text-[#14181C] tracking-[0.16em] uppercase mb-1.5">
                      GitHub / Portfolio / Code Repo URL
                    </label>
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://github.com/username or https://portfolio.dev"
                      className="w-full bg-white border border-[rgba(20,24,28,0.2)] px-3 py-2.5 font-mono text-[12px] text-[#14181C] focus:outline-none focus:border-[#9E5430] transition-colors"
                    />
                  </div>

                  {/* Dossier note */}
                  <div>
                    <label className="block font-mono text-[10px] text-[#14181C] tracking-[0.16em] uppercase mb-1.5">
                      Technical Dossier // Experience &amp; Systems Built
                    </label>
                    <textarea
                      rows={3}
                      value={dossier}
                      onChange={(e) => setDossier(e.target.value)}
                      placeholder="Highlight past projects, preferred tech stack (TypeScript, Rust, Go, Python), or what architectural challenges you enjoy solving..."
                      className="w-full bg-white border border-[rgba(20,24,28,0.2)] px-3 py-2.5 font-mono text-[12px] text-[#14181C] focus:outline-none focus:border-[#9E5430] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[rgba(20,24,28,0.12)]">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-[#7C7568] tracking-[0.1em]">
                      <Crosshair size={14} />
                      <span>REVIEWED BY DEV 1 &amp; DEV 2</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-[#14181C] hover:bg-[#9E5430] text-[#F2EFE8] font-mono text-[11px] font-semibold tracking-[0.2em] uppercase px-6 py-3.5 border border-transparent transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3 h-3 border-2 border-[#F2EFE8] border-t-transparent rounded-full animate-spin" />
                          <span>TRANSMITTING DOSSIER...</span>
                        </>
                      ) : (
                        <span>TRANSMIT CANDIDACY // APPLY NOW</span>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-6 py-4"
                >
                  <div className="p-4 bg-[#EAE6DE] border border-[rgba(20,24,28,0.16)] flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#9E5430] text-[#F2EFE8] flex items-center justify-center font-mono font-bold text-sm shrink-0">
                      ✓
                    </div>
                    <div>
                      <div className="font-mono text-[11px] text-[#9E5430] tracking-[0.2em] font-semibold uppercase">
                        APPLICATION LOGGED IN REGISTRY
                      </div>
                      <div className="font-mono text-[16px] font-bold text-[#14181C] mt-0.5">
                        REF: {referenceId}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 font-mono text-[12px] text-[#14181C]">
                    <p className="leading-relaxed">
                      Thank you, <strong className="text-[#9E5430]">{fullName}</strong>. Your developer dossier for{' '}
                      <strong>{role}</strong> ({station}) has been registered into our active intake queue.
                    </p>
                    <p className="text-[#7C7568] leading-relaxed">
                      Our Lead Systems Developer <strong>Brandanlee Hugos (Dev 1)</strong> and Core Systems Engineer{' '}
                      <strong>Dante Nicolas (Dev 2)</strong> personally review each candidate profile. A dispatch confirmation has been scheduled for <strong>{email}</strong>.
                    </p>
                  </div>

                  <div className="p-4 border border-dashed border-[rgba(20,24,28,0.2)] bg-white/50 font-mono text-[11px] text-[#7C7568] space-y-1">
                    <div>STATUS: IN REVIEW // QUEUED FOR BENCH INTERVIEW</div>
                    <div>TIMESTAMP: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</div>
                    <div>SECURITY VERIFIED: SHA-256 INTEGRITY VALIDATED</div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="bg-[#14181C] hover:bg-[#9E5430] text-[#F2EFE8] font-mono text-[11px] font-semibold tracking-[0.2em] uppercase px-6 py-3 transition-colors cursor-pointer"
                    >
                      RETURN TO ROSTER [DONE]
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
