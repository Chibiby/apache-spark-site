// path: src/app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { BRAND_COPY } from '@/lib/constants';
import { Check } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    organization: '',
    contactName: '',
    email: '',
    discipline: 'Systems',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-16 select-none min-h-screen">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3">
        <MarginNote>CONTACT // COMMISSION SPECIFICATION</MarginNote>
        <MarginNote>DIRECT ENGINEERING DESK</MarginNote>
      </div>

      {/* Header */}
      <div className="max-w-3xl flex flex-col gap-4">
        <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase">
          // INTAKE &amp; DISCOVERY
        </span>
        <h1 className="font-sans text-[clamp(34px,6vw,72px)] font-bold text-[#14181C] tracking-[-0.02em] leading-[1.02]">
          Commission a Project Sprint
        </h1>
        <p className="font-mono text-[14px] md:text-[16px] text-[#7C7568] leading-[1.8] max-w-2xl">
          We do not employ account managers. Every submission is reviewed directly by our principal systems and network architects. Expect an initial technical response within 24 hours.
        </p>
      </div>

      {/* Main Grid: Form on Left, Lab Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-10 border border-[#9E5430] bg-[#F2EFE8] flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="p-1.5 bg-[#9E5430] text-[#F2EFE8]">
                  <Check className="w-4 h-4 stroke-[2]" />
                </span>
                <span className="font-mono text-[12px] font-bold text-[#14181C] tracking-[0.2em] uppercase">
                  SPECIFICATION INTAKE CONFIRMED
                </span>
              </div>
              <p className="font-mono text-[13px] text-[#14181C] leading-[1.8]">
                Your draft has been routed directly to the principal architectural desk. A senior engineer will review your system specifications and follow up at <strong>{formData.email}</strong>.
              </p>
              <div className="p-4 border border-[rgba(20,24,28,0.12)] bg-[rgba(20,24,28,0.03)] font-mono text-[10px] text-[#7C7568] flex flex-col gap-1">
                <span>INTAKE ID: SPARK-2026-ENG-8491</span>
                <span>STATUS: QUEUED FOR ARCHITECTURAL REVIEW</span>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] p-8 md:p-10 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase">
                  ORGANIZATION / FACILITY NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="E.G. VANGUARD PRECISION FOUNDRY"
                  className="bg-transparent border border-[rgba(20,24,28,0.20)] p-3 font-mono text-[12px] uppercase text-[#14181C] placeholder:text-[#7C7568] focus:border-[#14181C] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase">
                    TECHNICAL CONTACT NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="E.G. MARCUS VANCE"
                    className="bg-transparent border border-[rgba(20,24,28,0.20)] p-3 font-mono text-[12px] uppercase text-[#14181C] placeholder:text-[#7C7568] focus:border-[#14181C] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase">
                    DIRECT WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="MARCUS@VANGUARD.COM"
                    className="bg-transparent border border-[rgba(20,24,28,0.20)] p-3 font-mono text-[12px] uppercase text-[#14181C] placeholder:text-[#7C7568] focus:border-[#14181C] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase">
                  PRIMARY DISCIPLINE NEEDED
                </label>
                <select
                  value={formData.discipline}
                  onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                  className="bg-transparent border border-[rgba(20,24,28,0.20)] p-3 font-mono text-[12px] uppercase text-[#14181C] focus:border-[#14181C] focus:outline-none cursor-pointer"
                >
                  <option value="Software">01 // SOFTWARE ARCHITECTURE &amp; RUNTIMES</option>
                  <option value="Systems">02 // SYSTEMS, COMPUTE &amp; INDUSTRIAL SCADA</option>
                  <option value="Networks">03 // NETWORKS, DARK FIBER &amp; WI-FI 6E</option>
                  <option value="Infrastructure">04 // INFRASTRUCTURE &amp; CRYOGENIC PODS</option>
                  <option value="Turnkey">05 // TURNKEY END-TO-END SPECIFICATION</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase">
                  SYSTEM SUMMARY &amp; PROBLEM STATEMENT *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="DESCRIBE FACILITY ENVIRONMENT, OBSERVED BOTTLENECK, PROTOCOLS, OR HARDWARE TARGETS..."
                  className="bg-transparent border border-[rgba(20,24,28,0.20)] p-3 font-mono text-[12px] uppercase text-[#14181C] placeholder:text-[#7C7568] focus:border-[#14181C] focus:outline-none"
                />
              </div>

              <button type="submit" className="btn-spark solid py-4 w-full text-[12px]">
                TRANSMIT SPECIFICATION TO PRINCIPALS
              </button>
            </form>
          )}
        </div>

        {/* Right Info Details */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Coordinates Card */}
          <div className="border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] p-8 flex flex-col gap-6">
            <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.24em] uppercase font-semibold">
              // REGIONAL LABS
            </span>

            <div className="flex flex-col gap-4 font-mono text-[12px]">
              <div>
                <strong className="text-[#14181C] block text-[13px]">SAN FRANCISCO LAB</strong>
                <span className="text-[#7C7568]">450 Mission Bay Blvd S, Ste 210</span>
                <span className="text-[#7C7568] block">San Francisco, CA 94158</span>
              </div>
              <div className="pt-3 border-t border-[rgba(20,24,28,0.08)]">
                <strong className="text-[#14181C] block text-[13px]">CHICAGO LAB</strong>
                <span className="text-[#7C7568]">1040 W Fulton Market, Fl 4</span>
                <span className="text-[#7C7568] block">Chicago, IL 60607</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(20,24,28,0.10)] font-mono text-[12px] text-[#14181C] flex flex-col gap-2">
              <div>EMAIL: {BRAND_COPY.contactEmail}</div>
              <div>DIRECT: {BRAND_COPY.phone}</div>
            </div>
          </div>

          {/* Cryptographic PGP Security */}
          <div className="border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] p-8 flex flex-col gap-4">
            <span className="font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase font-semibold">
              ENCRYPTED SPECIFICATION PGP KEY
            </span>
            <p className="font-mono text-[11px] text-[#7C7568] leading-relaxed">
              For air-gapped or proprietary system schematics, encrypt your payload using our architectural master key:
            </p>
            <div className="p-3 bg-[rgba(20,24,28,0.04)] border border-[rgba(20,24,28,0.12)] font-mono text-[9px] text-[#14181C] tracking-[0.14em] break-all select-all">
              4A8F 9C21 B03E D517 78A9 0D4E 9E54 30C9 7A4A 1418
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <DimensionLine label="CONFIDENTIAL INTAKE // EXECUTED UNDER MUTUAL NDA" />
      </div>
    </div>
  );
}
