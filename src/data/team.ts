// path: src/data/team.ts
import type { TeamMember } from '@/types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    index: '01',
    name: 'Julian Hayes',
    role: 'Principal Systems Architect',
    specialization: 'Distributed Consensus & Real-Time Kernels',
    credential: 'M.S. Computer Engineering, IEEE Senior Member',
  },
  {
    index: '02',
    name: 'Sarah Chen, P.E.',
    role: 'Lead Network Engineer',
    specialization: 'BGP EVPN Fabrics, Microwave & Dark Fiber',
    credential: 'CCIE #48291, Professional Engineer (CA, IL)',
  },
  {
    index: '03',
    name: 'Dominic Sterling',
    role: 'Principal Infrastructure Engineer',
    specialization: 'High-Density Storage Fabrics & Cryogenic Pods',
    credential: 'B.S. Electrical Engineering, BICSI RCDD',
  },
  {
    index: '04',
    name: 'Elena Rostova',
    role: 'Lead Software Architect',
    specialization: 'Rust Event Fabrics & CRDT Local State Engines',
    credential: 'Former Staff Systems Engineer, Bell Labs Fellow',
  },
  {
    index: '05',
    name: 'Marcus Vance',
    role: 'Industrial OT & SCADA Specialist',
    specialization: 'ISA/IEC 62443 Security & OPC UA Fieldbus',
    credential: 'GICSP (Global Industrial Cyber Security Professional)',
  },
  {
    index: '06',
    name: 'Dr. Arthur Thorne',
    role: 'Physical Layer & RF Director',
    specialization: 'Millimeter Wave Propagation & High-Altitude Backhaul',
    credential: 'Ph.D. Applied Physics, MIT Lincoln Lab Alum',
  },
];
