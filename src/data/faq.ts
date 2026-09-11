// path: src/data/faq.ts
import type { FAQItem } from '@/types';

export const FAQS: FAQItem[] = [
  {
    index: '01',
    question: 'How does Apache Spark structure client engagements?',
    answer:
      'We engage exclusively through dedicated engineering sprints with fixed deliverables, clear acceptance criteria, and full source code and design document transfer. We do not operate as a staff augmentation shop; we deploy unified cross-functional pods that manage the entire stack from physical fiber and conduit runs to application runtime deployments.',
  },
  {
    index: '02',
    question: 'Do you work in active production environments?',
    answer:
      'Yes. Over 80% of our portfolio projects involve live retrofitsoperating hospital campuses, 24/7 automated distribution hubs, active electric-arc foundries, and high-frequency clearing engines. We engineer deterministic parallel fabrics and execute non-disruptive cutovers during scheduled maintenance windows with pre-validated rollback procedures.',
  },
  {
    index: '03',
    question: 'Who owns the intellectual property and technical documentation?',
    answer:
      'The client owns 100% of all code, CAD schematics, wiring diagrams, configuration playbooks, and architectural documentation produced during the engagement. We provide exhaustive runbooks, Fluke cable certification test records, and comprehensive training to ensure your internal engineering staff can operate and maintain the deployed systems autonomously.',
  },
  {
    index: '04',
    question: 'What are your hardware and vendor policies?',
    answer:
      'We are vendor-agnostic and select hardware strictly based on mechanical, environmental, and throughput specifications. Whether deploying Arista spine switches, Cisco industrial gateways, custom Xilinx FPGA accelerators, or bespoke NEMA 4X cryogenic server pods, we purchase through certified distribution channels with verifiable chain-of-custody compliance.',
  },
  {
    index: '05',
    question: 'How do you handle air-gapped or classified environments?',
    answer:
      'Our team is accustomed to working within strict air-gapped facilities adhering to ISA/IEC 62443, HIPAA, and CJIS requirements. We utilize secure offline workstations, hardware-enforced unidirectional data diodes, cryptographic checksum verification for all binaries, and zero reliance on external cloud repositories or package registries.',
  },
  {
    index: '06',
    question: 'What is your physical service range and geographic deployment capability?',
    answer:
      'While headquartered with regional engineering labs in San Francisco and Chicago, our field deployment engineers travel globally. We have drafted and built infrastructure projects across North America, the Arctic Circle, maritime offshore installations, and remote utility rights-of-way.',
  },
  {
    index: '07',
    question: 'Do you provide ongoing post-deployment operational support?',
    answer:
      'We offer Tier-4 escalation support retainers and quarterly physical/logical health audits for mission-critical client infrastructure. Our primary objective, however, is building systems so robust, observable, and thoroughly documented that client internal teams rarely require external intervention.',
  },
  {
    index: '08',
    question: 'How do we initiate a project specification or engineering review?',
    answer:
      'Contact our architectural desk directly. We begin every engagement with an exhaustive technical discovery: reviewing existing single-line drawings, network topologies, telemetry traces, and operational bottlenecks before delivering a formal engineering draft and fixed-fee proposal.',
  },
];
