// path: src/components/sections/Team.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TEAM_MEMBERS } from '@/data/team';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { Crosshair } from '@/components/brand/Crosshair';
import { BEZIER } from '@/lib/animations';
import { ApplyDevModal } from './ApplyDevModal';

export const Team: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState('STATION 03');
  const [selectedRole, setSelectedRole] = useState('Full-Stack Systems Developer');

  const handleOpenApply = (stationName: string, roleName: string) => {
    setSelectedStation(stationName);
    setSelectedRole(roleName);
    setIsModalOpen(true);
  };

  return (
    <section id="team" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3 mb-12">
        <MarginNote>SHEET 12 — FIELD DEVELOPERS &amp; ARCHITECTS</MarginNote>
        <MarginNote>CORE SQUAD &amp; OPEN REQUISITIONS</MarginNote>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase block mb-3">
            // FIELD LEADERSHIP &amp; ENGINEERING SQUAD
          </span>
          <h2 className="font-sans text-[clamp(28px,4.5vw,52px)] font-bold tracking-[-0.02em] leading-tight text-[#14181C]">
            Practicing engineers, not account executives.
          </h2>
        </div>

        {/* Global apply CTA button */}
        <button
          type="button"
          onClick={() => handleOpenApply('OPEN_REQUISITION', 'General Systems Developer')}
          className="self-start md:self-auto bg-[#14181C] hover:bg-[#9E5430] text-[#F2EFE8] font-mono text-[11px] font-semibold tracking-[0.18em] uppercase px-5 py-3 border border-transparent transition-colors flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span className="w-2 h-2 rounded-full bg-[#9E5430] animate-pulse" />
          <span>APPLY AS DEVELOPER // OPEN INTAKE</span>
        </button>
      </div>

      {/* 1px seam team grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[rgba(20,24,28,0.16)] border border-[rgba(20,24,28,0.16)]">
        {TEAM_MEMBERS.map((member, i) => {
          const isHiring = member.isHiring;
          const stationLabel = `STATION 0${i + 1}`;

          return (
            <motion.div
              key={member.index}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => {
                if (isHiring) {
                  handleOpenApply(stationLabel, member.role);
                }
              }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.44, delay: i * 0.07, ease: BEZIER.easeOutQuart }}
              className={`relative p-8 flex flex-col justify-between min-h-[280px] group select-none overflow-hidden transition-all duration-300 ${
                isHiring
                  ? 'bg-[#EFECE5] hover:bg-[#EAE6DE] cursor-pointer border-dashed'
                  : 'bg-[#F2EFE8]'
              }`}
            >
              {/* Top row */}
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(20,24,28,0.10)] font-mono text-[10px] tracking-[0.2em]">
                <div className="flex items-center gap-2">
                  <span className="text-[#9E5430] font-semibold">{member.index}</span>
                  {member.devNumber && (
                    <span className="bg-[#14181C] text-[#F2EFE8] px-1.5 py-0.5 text-[9px] tracking-[0.14em] font-medium">
                      {member.devNumber}
                    </span>
                  )}
                </div>

                {isHiring ? (
                  <span className="inline-flex items-center gap-1.5 text-[#9E5430] font-semibold tracking-[0.18em] bg-[#9E5430]/10 px-2 py-0.5 border border-[#9E5430]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9E5430] animate-ping" />
                    {member.hiringLabel || 'HIRING'}
                  </span>
                ) : (
                  <span className="text-[#7C7568] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    {stationLabel}
                  </span>
                )}
              </div>

              {/* Main content */}
              <div className="relative z-10 py-5 flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <h3
                    className={`font-sans text-[20px] font-bold tracking-[-0.01em] transition-colors ${
                      isHiring
                        ? 'text-[#7C7568] group-hover:text-[#9E5430]'
                        : 'text-[#14181C] group-hover:text-[#9E5430]'
                    }`}
                  >
                    {member.name}
                  </h3>
                </div>

                <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.16em] uppercase">
                  {member.role}
                </span>

                <p className="font-mono text-[12px] text-[#7C7568] leading-relaxed mt-1">
                  {member.specialization}
                </p>
              </div>

              {/* Footer row */}
              <div className="relative z-10 pt-4 border-t border-[rgba(20,24,28,0.10)] font-mono text-[10px] tracking-[0.08em] flex items-center justify-between">
                <span className={isHiring ? 'text-[#9E5430] font-semibold' : 'text-[#7C7568]'}>
                  {member.credential}
                </span>

                {isHiring && (
                  <span className="text-[#14181C] group-hover:text-[#9E5430] font-semibold flex items-center gap-1 underline underline-offset-4 decoration-dotted">
                    APPLY →
                  </span>
                )}
              </div>

              {/* Accent Crosshair on hover */}
              {hoveredIdx === i && (
                <div className="absolute top-4 right-4 pointer-events-none z-20">
                  <Crosshair size={20} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Recruiter / Visitor Application Callout Strip */}
      <div className="mt-8 p-6 md:p-8 bg-[#EAE6DE] border border-[rgba(20,24,28,0.16)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9E5430] animate-pulse" />
            <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.2em] font-semibold uppercase">
              // OPEN ENGINEERING REQUISITIONS // ALL DISCIPLINES
            </span>
          </div>
          <p className="font-sans text-[16px] md:text-[18px] font-bold text-[#14181C]">
            Building with Brandanlee Hugos &amp; Dante Nicolas.
          </p>
          <p className="font-mono text-[12px] text-[#7C7568] max-w-2xl">
            Stations 03–06 are vacant. Any visitor, freelancer, or engineer can apply directly to our core engineering bench.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleOpenApply('OPEN_REQUISITION', 'Full-Stack Systems Developer')}
          className="bg-[#14181C] hover:bg-[#9E5430] text-[#F2EFE8] font-mono text-[11px] font-semibold tracking-[0.2em] uppercase px-6 py-3 border border-transparent transition-colors whitespace-nowrap cursor-pointer"
        >
          SUBMIT DEVELOPER DOSSIER
        </button>
      </div>

      <div className="mt-8">
        <DimensionLine label="CORE PRINCIPALS // SAN FRANCISCO &amp; CHICAGO LABS" />
      </div>

      {/* Developer Application Modal */}
      <ApplyDevModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultStation={selectedStation}
        defaultRole={selectedRole}
      />
    </section>
  );
};

