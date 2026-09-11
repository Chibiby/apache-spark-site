// path: src/components/sections/Team.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TEAM_MEMBERS } from '@/data/team';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { Crosshair } from '@/components/brand/Crosshair';
import { BEZIER } from '@/lib/animations';

export const Team: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="team" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3 mb-12">
        <MarginNote>SHEET 12  FIELD ARCHITECTS &amp; DIRECTORS</MarginNote>
        <MarginNote>SYSTEMS &amp; PHYSICAL DISCIPLINES</MarginNote>
      </div>

      <div className="max-w-2xl mb-12">
        <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase block mb-3">
          // FIELD LEADERSHIP
        </span>
        <h2 className="font-sans text-[clamp(28px,4.5vw,52px)] font-bold tracking-[-0.02em] leading-tight text-[#14181C]">
          Practicing engineers, not account executives.
        </h2>
      </div>

      {/* 1px seam team grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[rgba(20,24,28,0.16)] border border-[rgba(20,24,28,0.16)]">
        {TEAM_MEMBERS.map((member, i) => (
          <motion.div
            key={member.name}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.44, delay: i * 0.07, ease: BEZIER.easeOutQuart }}
            className="relative bg-[#F2EFE8] p-8 flex flex-col justify-between min-h-[260px] group select-none"
          >
            {/* Top row */}
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(20,24,28,0.10)] font-mono text-[10px] tracking-[0.2em]">
              <span className="text-[#9E5430] font-semibold">{member.index}</span>
              <span className="text-[#7C7568]">STATION 0{i + 1}</span>
            </div>

            {/* Main content */}
            <div className="py-6 flex flex-col gap-2">
              <h3 className="font-sans text-[20px] font-bold text-[#14181C] tracking-[-0.01em] group-hover:text-[#9E5430] transition-colors">
                {member.name}
              </h3>
              <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.16em] uppercase">
                {member.role}
              </span>
              <p className="font-mono text-[12px] text-[#7C7568] leading-relaxed mt-1">
                {member.specialization}
              </p>
            </div>

            {/* Credential footer */}
            <div className="pt-4 border-t border-[rgba(20,24,28,0.10)] font-mono text-[10px] text-[#7C7568] tracking-[0.08em]">
              {member.credential}
            </div>

            {/* Accent Crosshair on hover */}
            {hoveredIdx === i && (
              <div className="absolute top-4 right-4 pointer-events-none">
                <Crosshair size={20} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <DimensionLine label="CORE PRINCIPALS // SAN FRANCISCO &amp; CHICAGO LABS" />
      </div>
    </section>
  );
};
