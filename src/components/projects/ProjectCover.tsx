// path: src/components/projects/ProjectCover.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export interface ProjectCoverProps {
  slug: string;
  sheetNo: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
  layoutId?: string;
}

// Deterministic PRNG seeded by slug
function hashSlug(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

function createPRNG(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export const ProjectCover: React.FC<ProjectCoverProps> = ({
  slug,
  sheetNo,
  className,
  aspectRatio = '16/9',
}) => {
  const seed = hashSlug(slug);
  const _rand = createPRNG(seed);
  const plateType = seed % 4; // 0: Rack, 1: Topology, 2: Floorplan, 3: Cable Schedule

  const aspectClass = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
  }[aspectRatio];

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-[#F2EFE8] border border-[rgba(20,24,28,0.16)] select-none',
        aspectClass,
        className
      )}
    >
      {/* 72px background drafting grid */}
      <div className="absolute inset-0 bg-grid-draft opacity-50 pointer-events-none" />

      {/* SVG Technical Drawing Plate */}
      <svg
        viewBox="0 0 480 270"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer drafting border & crosshairs */}
        <rect
          x="12"
          y="12"
          width="456"
          height="246"
          fill="none"
          stroke="rgba(20,24,28,0.20)"
          strokeWidth="1"
        />
        <line x1="240" y1="6" x2="240" y2="18" stroke="#9E5430" strokeWidth="1" />
        <line x1="234" y1="12" x2="246" y2="12" stroke="#9E5430" strokeWidth="1" />

        {/* PLATE TYPE 0: 42U Rack Elevation */}
        {plateType === 0 && (
          <g>
            {/* Rack Cabinet Outer Frame */}
            <rect x="150" y="24" width="180" height="222" fill="none" stroke="#14181C" strokeWidth="1.5" />
            <rect x="156" y="28" width="168" height="214" fill="none" stroke="rgba(20,24,28,0.30)" strokeWidth="0.8" strokeDasharray="2 2" />
            
            {/* Rack U Slots */}
            {Array.from({ length: 14 }).map((_, i) => {
              const y = 34 + i * 14;
              const isAccent = i === 4;
              const isServer = i % 3 === 0;
              return (
                <g key={i}>
                  <line x1="156" y1={y} x2="324" y2={y} stroke="rgba(20,24,28,0.22)" strokeWidth="0.8" />
                  {isAccent ? (
                    <rect x="162" y={y - 10} width="156" height="9" fill="#9E5430" />
                  ) : isServer ? (
                    <g>
                      <rect x="162" y={y - 10} width="156" height="9" fill="none" stroke="#14181C" strokeWidth="0.8" />
                      <circle cx="170" cy={y - 5.5} r="1.5" fill="#14181C" />
                      <circle cx="176" cy={y - 5.5} r="1.5" fill="#14181C" />
                    </g>
                  ) : null}
                  {/* U Tick mark */}
                  <line x1="144" y1={y} x2="150" y2={y} stroke="rgba(20,24,28,0.40)" strokeWidth="0.8" />
                </g>
              );
            })}

            {/* Dimension Callout Line */}
            <line x1="344" y1="24" x2="344" y2="246" stroke="rgba(20,24,28,0.24)" strokeWidth="1" />
            <line x1="340" y1="24" x2="348" y2="24" stroke="rgba(20,24,28,0.40)" strokeWidth="1" />
            <line x1="340" y1="246" x2="348" y2="246" stroke="rgba(20,24,28,0.40)" strokeWidth="1" />
            <text x="352" y="140" fill="#7C7568" fontSize="8" fontFamily="IBM Plex Mono" letterSpacing="0.18em">
              42U / 19&quot; EIA
            </text>
          </g>
        )}

        {/* PLATE TYPE 1: Network Topology Mesh */}
        {plateType === 1 && (
          <g>
            {/* Redundant Optical Trunks */}
            <line x1="90" y1="70" x2="240" y2="135" stroke="#14181C" strokeWidth="1.2" />
            <line x1="390" y1="70" x2="240" y2="135" stroke="#14181C" strokeWidth="1.2" />
            <line x1="90" y1="200" x2="240" y2="135" stroke="#14181C" strokeWidth="1.2" />
            <line x1="390" y1="200" x2="240" y2="135" stroke="#9E5430" strokeWidth="1.5" />
            <line x1="90" y1="70" x2="90" y2="200" stroke="rgba(20,24,28,0.24)" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="390" y1="70" x2="390" y2="200" stroke="rgba(20,24,28,0.24)" strokeWidth="0.8" strokeDasharray="3 3" />

            {/* Core Spine & Leaf Nodes */}
            <rect x="228" y="123" width="24" height="24" fill="#F2EFE8" stroke="#14181C" strokeWidth="1.5" />
            <rect x="236" y="131" width="8" height="8" fill="#9E5430" />
            <rect x="78" y="58" width="24" height="24" fill="#F2EFE8" stroke="#14181C" strokeWidth="1.2" />
            <rect x="378" y="58" width="24" height="24" fill="#F2EFE8" stroke="#14181C" strokeWidth="1.2" />
            <rect x="78" y="188" width="24" height="24" fill="#F2EFE8" stroke="#14181C" strokeWidth="1.2" />
            <rect x="378" y="188" width="24" height="24" fill="#F2EFE8" stroke="#14181C" strokeWidth="1.2" />

            {/* Dimension Callout */}
            <text x="200" y="174" fill="#7C7568" fontSize="8" fontFamily="IBM Plex Mono" letterSpacing="0.18em">
              100GbE DWDM RING
            </text>
          </g>
        )}

        {/* PLATE TYPE 2: Floor Plan MDF/IDF Cable Pathway */}
        {plateType === 2 && (
          <g>
            {/* Facility Architectural Enclosure */}
            <polygon points="60,40 420,40 420,220 280,220 280,170 60,170" fill="none" stroke="#14181C" strokeWidth="1.5" />
            
            {/* Conduit Cable Tray Run */}
            <path d="M90,70 L390,70 L390,190 L300,190" fill="none" stroke="rgba(20,24,28,0.30)" strokeWidth="1" strokeDasharray="4 2" />
            
            {/* MDF Room Footprint */}
            <rect x="80" y="60" width="60" height="50" fill="none" stroke="#14181C" strokeWidth="1" />
            <rect x="94" y="74" width="32" height="22" fill="#9E5430" />
            
            {/* IDF Room Footprint */}
            <rect x="330" y="140" width="50" height="40" fill="none" stroke="#14181C" strokeWidth="1" />
            <circle cx="355" cy="160" r="4" fill="#14181C" />

            <text x="80" y="130" fill="#7C7568" fontSize="8" fontFamily="IBM Plex Mono" letterSpacing="0.18em">
              MDF ROOM 01 / CABLE TRAY
            </text>
          </g>
        )}

        {/* PLATE TYPE 3: Cable Termination Schedule Matrix */}
        {plateType === 3 && (
          <g>
            {/* Patch Panel Enclosure */}
            <rect x="50" y="50" width="380" height="150" fill="none" stroke="#14181C" strokeWidth="1.5" />
            
            {/* Port Matrix 24 Ports x 2 Rows */}
            {Array.from({ length: 16 }).map((_, i) => {
              const x = 70 + i * 22;
              const isAccent = i === 7;
              return (
                <g key={i}>
                  {/* Top row */}
                  <rect x={x} y="74" width="16" height="16" fill={isAccent ? '#9E5430' : '#F2EFE8'} stroke="#14181C" strokeWidth="0.8" />
                  {/* Bottom row */}
                  <rect x={x} y="110" width="16" height="16" fill="#F2EFE8" stroke="#14181C" strokeWidth="0.8" />
                  {/* Port number */}
                  <text x={x + 3} y="70" fill="#7C7568" fontSize="6" fontFamily="IBM Plex Mono">
                    {i + 1}
                  </text>
                </g>
              );
            })}

            <text x="70" y="160" fill="#7C7568" fontSize="8" fontFamily="IBM Plex Mono" letterSpacing="0.18em">
              48-PORT CAT6A 110-TYPE PUNCH SCHEDULE
            </text>
          </g>
        )}

        {/* Universal Plate Annotations */}
        {/* Bottom Left: Sheet Number */}
        <text
          x="24"
          y="244"
          fill="#14181C"
          fontSize="11"
          fontWeight="bold"
          fontFamily="IBM Plex Mono"
          letterSpacing="0.22em"
        >
          {sheetNo}
        </text>

        {/* Bottom Right: Scale Stamp */}
        <text
          x="410"
          y="244"
          fill="#7C7568"
          fontSize="9"
          fontFamily="IBM Plex Mono"
          letterSpacing="0.2em"
        >
          1:1 DRAFT
        </text>
      </svg>
    </div>
  );
};
