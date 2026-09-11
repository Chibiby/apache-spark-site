// path: src/data/services.ts
import type { ServicePillar, CapabilityItem } from '@/types';

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    index: '01',
    title: 'Software',
    summary: 'Line-of-business applications, integrations and internal tooling.',
    description:
      'Engineered for operations where software failure carries physical or financial consequences. We draft deterministic backends, offline-first runtimes, and low-latency data pipelines in Rust, Go, and TypeScript.',
    capabilities: [
      'Event-driven distributed architectures & message fabrics',
      'Offline-first field operations & local CRDT state sync',
      'Hardware-in-the-loop simulation & FPGA driver integration',
      'Custom protocol parsers & industrial fieldbus decoders',
    ],
    deliverables: [
      'Deterministic compiled binary packages',
      'Automated chaos & property-based test suites',
      'Zero-downtime database migration playbooks',
      'Full source ownership & architectural blueprints',
    ],
  },
  {
    index: '02',
    title: 'Systems',
    summary: 'Server rooms, virtualisation, backup and disaster recovery.',
    description:
      'High-availability computing platforms deployed on bare metal and hyperconverged appliances. From multi-node storage clusters to real-time SCADA supervisory nodes, we engineer systems that survive component loss without degradation.',
    capabilities: [
      'Active-active distributed consensus (Raft/Paxos) clusters',
      'Sub-millisecond bare-metal Linux RT-Preempt configurations',
      'Air-gapped industrial SCADA & OT gateway deployments',
      'Immutable cryptographic ledger & transaction logging',
    ],
    deliverables: [
      'Hot-standby redundant host configurations',
      'Cold-start disaster recovery runbooks (RPO=0, RTO<60s)',
      'Automated hardware telemetry & out-of-band IPMI hooks',
      'Hardened OS images certified to CIS Level 2 benchmarks',
    ],
  },
  {
    index: '03',
    title: 'Networks',
    summary: 'Structured cabling, switching, wireless and segmentation.',
    description:
      'Physical and logical network fabrics engineered for high density, deterministic routing, and zero packet drop. We build the physical layer with Cat6A and dark fiber, and the control plane with BGP EVPN and 802.1X zero-trust boundaries.',
    capabilities: [
      'BGP EVPN / VXLAN data center spine-leaf fabrics',
      'High-density Wi-Fi 6E & fast-roaming life-safety wireless',
      'Long-range licensed microwave & millimeter-wave backhaul',
      'Single-mode optical fiber splicing & OTDR attenuation testing',
    ],
    deliverables: [
      'Certified Fluke DSX-8000 structured cable test reports',
      'Predictive & passive heatmaps with RF spectrum analysis',
      'Automated switch provisioning scripts (Ansible/GitOps)',
      'Physical rack elevation & port-level patch schedules',
    ],
  },
  {
    index: '04',
    title: 'Infrastructure',
    summary: 'Cloud, on-prem and the hybrid path between the two.',
    description:
      'The foundational physical and logical environment. We engineer hybrid compute fabrics, cryogenic edge enclosures, high-throughput 400GbE storage fabrics, and microgrid power continuity systems.',
    capabilities: [
      '400GbE RoCEv2 (RDMA over Converged Ethernet) fabrics',
      'Autonomous edge enclosures for harsh/extreme environments',
      'Parallel file systems (Lustre/Ceph) for HPC & imaging workloads',
      'Automatic transfer switch (ATS) & microgrid telemetry',
    ],
    deliverables: [
      'High-density NEMA 4X / IP66 conditioned enclosure pods',
      'Non-blocking NVMe-oF storage tiering configurations',
      'Power distribution unit (PDU) branch circuit schedules',
      'Environmental thermal modeling & airflow balance reports',
    ],
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    index: '01',
    name: 'DETERMINISTIC KERNELS',
    spec: 'Sub-10µs jitter with RT-Preempt, CPU core isolation, and zero-copy ring buffers.',
    code: 'CONFIG_PREEMPT_RT=y',
  },
  {
    index: '02',
    name: 'BGP EVPN / VXLAN',
    spec: 'Non-blocking spine-leaf fabrics supporting multi-tenant microsegmentation at 100G/400G.',
    code: 'RFC 8365 / BGP-4',
  },
  {
    index: '03',
    name: 'ROCEV2 STORAGE',
    spec: 'RDMA over Converged Ethernet with hardware PFC and ECN for line-rate NVMe-oF write streams.',
    code: 'IBV_TRANSPORT_IWARP',
  },
  {
    index: '04',
    name: 'AIR-GAPPED OT',
    spec: 'Physical galvanic isolation, hardware data diodes, and IEC 62443 Level 3 compliance.',
    code: 'ISA/IEC 62443-3-3',
  },
  {
    index: '05',
    name: 'TIME SYNCHRONIZATION',
    spec: 'Sub-200ns synchronized phase angle timestamping via IEEE 1588v2 Precision Time Protocol.',
    code: 'PTP / IEEE 1588-2019',
  },
  {
    index: '06',
    name: 'CRDT LOCAL STATE',
    spec: 'Conflict-free replicated data types enabling 100% offline terminal operations without data loss.',
    code: 'STATE_BASED_CvRDT',
  },
];
