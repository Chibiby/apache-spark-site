// path: src/components/sections/NetworkDiagram.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { BEZIER } from '@/lib/animations';

interface DiagramNode {
  id: string;
  name: string;
  sub: string;
  x: number; // percentage
  y: number; // percentage
  throughput: string;
  protocol: string;
  details: string;
  standards: string[];
}

const NODES: DiagramNode[] = [
  {
    id: 'edge',
    name: 'EDGE INGRESS',
    sub: 'OPTICAL WAN / DIODE',
    x: 10,
    y: 50,
    throughput: '2x 100GbE DUAL-HOMED',
    protocol: 'BGP / DWDM / DIODE',
    details: 'Carrier-neutral optical ingress with hardware data diode isolation and stateful protocol translation.',
    standards: ['IEEE 802.3ba', 'RFC 4271', 'ISA/IEC 62443'],
  },
  {
    id: 'core',
    name: 'CORE BACKBONE',
    sub: 'EVPN / VXLAN SPINES',
    x: 30,
    y: 50,
    throughput: '3.2 TBPS BACKPLANE',
    protocol: 'BGP EVPN / VXLAN',
    details: 'Non-blocking spine-leaf fabric with multi-chassis link aggregation and automated Layer-3 microsegmentation.',
    standards: ['RFC 8365', 'RFC 7348', 'IEEE 802.1Q'],
  },
  {
    id: 'compute',
    name: 'COMPUTE PODS',
    sub: 'RT KERNELS / CLUSTER',
    x: 52,
    y: 30,
    throughput: '400G INTERCONNECT',
    protocol: 'RT-PREEMPT / K8S',
    details: 'Bare-metal compute nodes with CPU core pinning, NUMA optimization, and FPGA hardware offloads.',
    standards: ['POSIX.1b', 'PCIe Gen5', 'OpenShift'],
  },
  {
    id: 'storage',
    name: 'STORAGE FABRIC',
    sub: 'ROCEV2 / NVME-OF',
    x: 52,
    y: 70,
    throughput: '142 GB/S SUSTAINED',
    protocol: 'ROCEV2 / NVME-OF',
    details: 'Zero-copy direct memory access parallel storage cluster with hardware Priority Flow Control (PFC).',
    standards: ['IBTA RoCEv2', 'IEEE 802.1Qbb', 'NVMe-oF 1.1'],
  },
  {
    id: 'client',
    name: 'FIELD DISTRIBUTION',
    sub: 'WI-FI 6E / OT DROPS',
    x: 85,
    y: 50,
    throughput: 'MULTI-GIG POE++',
    protocol: '802.11AX / 802.1X',
    details: 'Clinical telemetry arrays, ruggedized DIN-rail switches, and fast BSS roaming access points.',
    standards: ['Wi-Fi 6E', 'IEEE 802.3bt', 'IEEE 802.11r/k/v'],
  },
];

export const NetworkDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<DiagramNode>(NODES[1]);

  return (
    <section id="network-diagram" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
      {/* Margin annotations */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-3 mb-12">
        <MarginNote>SHEET 06  TOPOLOGY SCHEMATIC</MarginNote>
        <MarginNote>INTERACTIVE NODES // 1:1 SCALE</MarginNote>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] text-[#9E5430] tracking-[0.24em] uppercase block mb-3">
            // PHYSICAL &amp; LOGICAL ROUTING
          </span>
          <h2 className="font-sans text-[clamp(26px,4.5vw,48px)] font-bold tracking-[-0.02em] leading-tight text-[#14181C]">
            Interactive Topology Schematic
          </h2>
        </div>
        <p className="font-mono text-[11px] text-[#7C7568] tracking-[0.16em] uppercase">
          CLICK ANY NODE TO INSPECT SUBSYSTEM
        </p>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#F2EFE8] border border-[rgba(20,24,28,0.16)] overflow-hidden select-none p-4">
        {/* Background 72px grid */}
        <div className="absolute inset-0 bg-grid-draft opacity-50 pointer-events-none" />

        {/* SVG Wiring Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Edge -> Core */}
          <motion.line
            x1="10%" y1="50%" x2="30%" y2="50%"
            stroke="var(--ink)" strokeWidth="2"
            strokeDasharray="1 1" pathLength="1"
            initial={{ strokeDashoffset: 1 }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: BEZIER.easeInOutQuart }}
          />
          {/* Core -> Compute */}
          <motion.line
            x1="30%" y1="50%" x2="52%" y2="30%"
            stroke="var(--ink)" strokeWidth="2"
            strokeDasharray="1 1" pathLength="1"
            initial={{ strokeDashoffset: 1 }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2, ease: BEZIER.easeInOutQuart }}
          />
          {/* Core -> Storage */}
          <motion.line
            x1="30%" y1="50%" x2="52%" y2="70%"
            stroke="var(--accent)" strokeWidth="2"
            strokeDasharray="1 1" pathLength="1"
            initial={{ strokeDashoffset: 1 }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3, ease: BEZIER.easeInOutQuart }}
          />
          {/* Compute -> Client */}
          <motion.line
            x1="52%" y1="30%" x2="85%" y2="50%"
            stroke="var(--ink)" strokeWidth="2"
            strokeDasharray="1 1" pathLength="1"
            initial={{ strokeDashoffset: 1 }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4, ease: BEZIER.easeInOutQuart }}
          />
          {/* Storage -> Client */}
          <motion.line
            x1="52%" y1="70%" x2="85%" y2="50%"
            stroke="var(--rule)" strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Nodes positioned absolutely */}
        {NODES.map((node) => {
          const isSelected = activeNode.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              aria-label={`Inspect ${node.name}`}
            >
              <div
                className={`relative flex flex-col items-center p-3 border transition-all ${
                  isSelected
                    ? 'bg-[#14181C] text-[#F2EFE8] border-[#14181C]'
                    : 'bg-[#F2EFE8] text-[#14181C] border-[rgba(20,24,28,0.22)] hover:border-[#9E5430]'
                }`}
              >
                {/* Node Mark / Diamond */}
                <div
                  className={`w-3 h-3 rotate-45 border mb-2 transition-colors ${
                    isSelected
                      ? 'bg-[#C97A4A] border-[#C97A4A]'
                      : 'bg-transparent border-[#9E5430] group-hover:bg-[#9E5430]'
                  }`}
                />
                <span className="font-mono text-[10px] md:text-[11px] font-semibold tracking-[0.16em] uppercase whitespace-nowrap">
                  {node.name}
                </span>
                <span
                  className={`font-mono text-[8px] md:text-[9px] tracking-[0.18em] uppercase ${
                    isSelected ? 'text-[rgba(242,239,232,0.62)]' : 'text-[#7C7568]'
                  }`}
                >
                  {node.sub}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Node Specification Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: BEZIER.easeOutQuart }}
          className="mt-6 border border-[rgba(20,24,28,0.16)] bg-[#F2EFE8] p-6 md:p-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[rgba(20,24,28,0.12)]">
            <div className="flex items-center gap-4">
              <span className="w-2.5 h-2.5 bg-[#9E5430] shrink-0" />
              <div>
                <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.24em] uppercase block">
                  ACTIVE SCHEMATIC NODE
                </span>
                <h3 className="font-sans text-[20px] md:text-[24px] font-bold text-[#14181C]">
                  {activeNode.name}  {activeNode.sub}
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] tracking-[0.18em]">
              <div>
                <span className="text-[#7C7568] block text-[9px]">BANDWIDTH</span>
                <span className="text-[#14181C] font-semibold">{activeNode.throughput}</span>
              </div>
              <div>
                <span className="text-[#7C7568] block text-[9px]">CONTROL PLANE</span>
                <span className="text-[#9E5430] font-semibold">{activeNode.protocol}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase block mb-2">
                SUBSYSTEM DESCRIPTION
              </span>
              <p className="font-mono text-[12px] md:text-[13px] leading-relaxed text-[#14181C]">
                {activeNode.details}
              </p>
            </div>

            <div>
              <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase block mb-2">
                STANDARDS COMPLIANCE
              </span>
              <div className="flex flex-wrap gap-2">
                {activeNode.standards.map((std) => (
                  <span
                    key={std}
                    className="font-mono text-[10px] tracking-[0.14em] text-[#7C7568] border border-[rgba(20,24,28,0.16)] px-2.5 py-1"
                  >
                    {std}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8">
        <DimensionLine label="TOPOLOGY VERIFIED // 100% ROUTE DETERMINISM" />
      </div>
    </section>
  );
};
