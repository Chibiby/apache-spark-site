// path: src/app/contact/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { BRAND_COPY } from '@/lib/constants';
import { Check, Shield, Calendar, Clock, Lock, ArrowRight } from 'lucide-react';

const TIME_SLOTS = [
  'Today, 2:00 PM – 2:20 PM PST',
  'Tomorrow, 10:00 AM – 10:20 AM PST',
  'Tomorrow, 1:30 PM – 1:50 PM PST',
  'Thursday, 11:00 AM – 11:20 AM PST',
];

function ContactContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'rfq' | 'booking'>('rfq');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    organization: '',
    contactName: '',
    email: '',
    discipline: 'Full-Stack Software',
    description: '',
    slot: TIME_SLOTS[1],
  });

  // Pre-fill from Scope Estimator URL parameters
  useEffect(() => {
    const arch = searchParams.get('archetype');
    const stage = searchParams.get('stage');
    const timeline = searchParams.get('timeline');

    if (arch || stage || timeline) {
      const parts: string[] = [];
      if (arch) parts.push(`TARGET SYSTEM: ${arch}`);
      if (stage) parts.push(`DEVELOPMENT STAGE: ${stage.toUpperCase()}`);
      if (timeline) parts.push(`TARGET TIMELINE: ${timeline}`);

      setFormData((prev) => ({
        ...prev,
        description: `// GENERATED FROM ESTIMATOR:\n${parts.join('\n')}\n\n// ADDITIONAL SYSTEM SPECIFICATIONS:\n`,
      }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-16 select-none min-h-screen">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3">
        <MarginNote>CONTACT // COMMISSION SPECIFICATION</MarginNote>
        <MarginNote>DIRECT PRINCIPAL ENGINEERING DESK</MarginNote>
      </div>

      {/* Header */}
      <div className="max-w-3xl flex flex-col gap-4">
        <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase font-semibold">
          // INTAKE &amp; DISCOVERY DESK
        </span>
        <h1 className="font-sans text-[clamp(34px,6vw,72px)] font-bold text-[#14181C] tracking-[-0.02em] leading-[1.02]">
          Commission a Project Sprint
        </h1>
        <p className="font-mono text-[14px] md:text-[16px] text-[#7C7568] leading-[1.8] max-w-2xl">
          Zero account reps or sales intermediaries. Every submission is reviewed directly by our co-founders and principal systems architects. Expect an unvarnished technical response within 24 hours.
        </p>
      </div>

      {/* Intake Method Toggle Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-[rgba(20,24,28,0.16)] pb-4">
        <button
          type="button"
          onClick={() => {
            setActiveTab('rfq');
            setSubmitted(false);
          }}
          className={`px-4 py-2 font-mono text-[11px] font-bold tracking-wider transition-all ${
            activeTab === 'rfq'
              ? 'bg-[#14181C] text-[#F2EFE8]'
              : 'border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] text-[#7C7568] hover:text-[#14181C]'
          }`}
        >
          [01] TRANSMIT SYSTEM SPECIFICATION / RFQ
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('booking');
            setSubmitted(false);
          }}
          className={`px-4 py-2 font-mono text-[11px] font-bold tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'booking'
              ? 'bg-[#9E5430] text-[#F2EFE8]'
              : 'border border-[#9E5430] bg-[#F2EFE8] text-[#9E5430] hover:bg-[#9E5430] hover:text-[#F2EFE8]'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>[02] SCHEDULE 20-MIN ARCHITECTURAL DISCOVERY</span>
        </button>
      </div>

      {/* Main Grid: Form on Left, Trust & Lab Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form / Booking Area */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-10 border border-[#9E5430] bg-[#F2EFE8] flex flex-col gap-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-[#9E5430] text-[#F2EFE8]">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </span>
                <span className="font-mono text-[13px] font-bold text-[#14181C] tracking-[0.2em] uppercase">
                  {activeTab === 'booking' ? 'DISCOVERY CALL CONFIRMED' : 'SPECIFICATION INTAKE QUEUED'}
                </span>
              </div>
              <p className="font-mono text-[13px] text-[#14181C] leading-[1.8]">
                {activeTab === 'booking'
                  ? `Your 20-minute architectural consultation for ${formData.slot} is locked. A calendar invitation with Google Meet coordinates has been dispatched to ${formData.email}.`
                  : `Your system requirements have been routed directly to Brandanlee Hugos (Lead Systems Developer) and our principal architecture desk. Expect a comprehensive technical breakdown at ${formData.email}.`}
              </p>
              <div className="p-4 border border-[rgba(20,24,28,0.12)] bg-[rgba(20,24,28,0.03)] font-mono text-[10px] text-[#7C7568] flex flex-col gap-1">
                <span>INTAKE ID: SPARK-2026-ENG-8491</span>
                <span>STATUS: QUEUED FOR ARCHITECTURAL REVIEW</span>
                <span>SECURITY: EXECUTED UNDER MUTUAL NON-DISCLOSURE AGREEMENT</span>
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-spark py-2.5 text-[11px] self-start"
              >
                SUBMIT ANOTHER SPECIFICATION
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] p-8 md:p-10 flex flex-col gap-6 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-[rgba(20,24,28,0.1)] pb-3">
                <span className="font-mono text-[10px] text-[#9E5430] uppercase tracking-wider font-bold">
                  {activeTab === 'booking' ? '// 20-MIN DISCOVERY RESERVATION' : '// SYSTEM SPECIFICATION TRANSMISSION'}
                </span>
                <span className="font-mono text-[10px] text-[#7C7568] flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#9E5430]" />
                  <span>256-BIT ENCRYPTED</span>
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase">
                  ORGANIZATION / STARTUP / FACILITY NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="E.G. VANGUARD PRECISION OR ACME PLATFORM"
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
                    placeholder="MARCUS@COMPANY.COM"
                    className="bg-transparent border border-[rgba(20,24,28,0.20)] p-3 font-mono text-[12px] uppercase text-[#14181C] placeholder:text-[#7C7568] focus:border-[#14181C] focus:outline-none"
                  />
                </div>
              </div>

              {activeTab === 'booking' ? (
                /* Slot Selection for Discovery Call */
                <div className="flex flex-col gap-3">
                  <label className="font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#9E5430]" />
                    <span>SELECT DIRECT ARCHITECTURAL TIME WINDOW</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, slot })}
                        className={`p-3 text-left border font-mono text-[11px] transition-colors ${
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
              ) : (
                /* Discipline dropdown for RFQ */
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase">
                    PRIMARY DISCIPLINE NEEDED
                  </label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="bg-transparent border border-[rgba(20,24,28,0.20)] p-3 font-mono text-[12px] uppercase text-[#14181C] focus:border-[#14181C] focus:outline-none cursor-pointer"
                  >
                    <option value="Full-Stack Software">01 // FULL-STACK WEB, SAAS PLATFORMS &amp; NEXT.JS</option>
                    <option value="Distributed Backend">02 // DISTRIBUTED APIS, RUST/GO &amp; LOW-LATENCY</option>
                    <option value="Cloud Architecture">03 // CLOUD MESH, KUBERNETES &amp; TERRAFORM IAC</option>
                    <option value="Industrial Telemetry">04 // SYSTEMS, COMPUTE &amp; INDUSTRIAL SCADA</option>
                    <option value="Turnkey Delivery">05 // TURNKEY END-TO-END SPECIFICATION</option>
                  </select>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase">
                  {activeTab === 'booking' ? 'BRIEF AGENDA / BOTTLENECK YOU WANT TO DISCUSS' : 'SYSTEM SUMMARY &amp; SPECIFICATION *'}
                </label>
                <textarea
                  required
                  rows={activeTab === 'booking' ? 3 : 5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={
                    activeTab === 'booking'
                      ? 'E.G. PLANNING TO BUILD A HIGH-CONCURRENCY SAAS MVP IN NEXT.JS, NEED ARCHITECTURE REVIEW...'
                      : 'DESCRIBE TARGET ENVIRONMENT, OBSERVED BOTTLENECK, PROTOCOLS, OR HARDWARE TARGETS...'
                  }
                  className="bg-transparent border border-[rgba(20,24,28,0.20)] p-3 font-mono text-[12px] text-[#14181C] placeholder:text-[#7C7568] focus:border-[#14181C] focus:outline-none font-normal"
                />
              </div>

              <button type="submit" className="btn-spark solid py-4 w-full text-[12px] flex items-center justify-center gap-2 group">
                <span>{activeTab === 'booking' ? 'CONFIRM ARCHITECTURAL DISCOVERY CALL' : 'TRANSMIT SPECIFICATION TO PRINCIPALS'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Trust, NDA Guarantee & Regional Labs */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Mutual NDA Guarantee Card */}
          <div className="border border-[#9E5430] bg-[#14181C] text-[#F2EFE8] p-8 flex flex-col gap-4 shadow-md">
            <div className="flex items-center gap-2.5 text-[#C97A4A]">
              <Shield className="w-5 h-5 stroke-[2]" />
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
                MUTUAL NDA GUARANTEE
              </span>
            </div>
            <p className="font-mono text-[12px] text-[rgba(242,239,232,0.85)] leading-relaxed">
              We treat all client intellectual property with rigid confidentiality. All submitted system schematics, repositories, and architectural requirements are protected under mutual unilateral non-disclosure from the moment of intake.
            </p>
            <div className="pt-3 border-t border-[rgba(242,239,232,0.14)] font-mono text-[10px] text-[rgba(242,239,232,0.6)] flex flex-col gap-1">
              <span>• IP TRANSFER: 100% Client Ownership on Delivery</span>
              <span>• RESPONSE TIME: &lt; 24h Direct Architect SLA</span>
            </div>
          </div>

          {/* Coordinates Card */}
          <div className="border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] p-8 flex flex-col gap-6">
            <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.24em] uppercase font-semibold">
              // ENGINEERING DESK &amp; LABS
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
          <div className="border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] p-6 flex flex-col gap-3">
            <span className="font-mono text-[10px] text-[#7C7568] tracking-[0.2em] uppercase font-semibold">
              ENCRYPTED SPECIFICATION PGP KEY
            </span>
            <div className="p-3 bg-[rgba(20,24,28,0.04)] border border-[rgba(20,24,28,0.12)] font-mono text-[9px] text-[#14181C] tracking-[0.14em] break-all select-all">
              4A8F 9C21 B03E D517 78A9 0D4E 9E54 30C9 7A4A 1418
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <DimensionLine label="CONFIDENTIAL INTAKE // DIRECT PRINCIPAL ENG REVIEW // ZERO SALES REPS" />
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center font-mono text-[12px]">LOADING SPECIFICATION DESK...</div>}>
      <ContactContent />
    </Suspense>
  );
}
