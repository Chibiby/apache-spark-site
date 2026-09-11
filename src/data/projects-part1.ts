// path: src/data/projects-part1.ts
import type { Project } from '@/types';

export const PROJECTS_PART1: Project[] = [
  {
    slug: 'vanguard-foundry-scada',
    title: 'Industrial SCADA & OT Network Modernization',
    client: 'Vanguard Precision Foundry',
    sector: 'Manufacturing',
    discipline: 'Systems',
    year: 2024,
    duration: '9 Months',
    featured: true,
    sheetNo: 'SHEET 01',
    summary:
      'Air-gapped telemetry integration, deterministic fieldbus routing, and hardened edge compute for high-temperature alloy casting lines.',
    brief:
      'Vanguard Precision Foundry operates five electric-arc casting lines producing nickel-chromium superalloys for aerospace turbine components. The facility relied on legacy Modbus serial loops over unshielded twisted pair, routed alongside high-amperage induction furnaces where severe electromagnetic interference frequently corrupted sensor packets. Control engineers suffered intermittent blind spots lasting up to 14 seconds during continuous melt pours, creating unacceptable metallurgical batch variability.\n\nThe mandate required a complete overhaul of the operational technology (OT) network without halting active casting operations. Safety protocols demanded strict compliance with ISA/IEC 62443 standards, requiring physical and logical separation between plant-floor programmable logic controllers (PLCs) and enterprise resource planning systems.\n\nApache Spark was retained as the sole engineering partner to draft the physical architecture, select and deploy ruggedized edge compute infrastructure, and replace the legacy fieldbus with a deterministic optical network engineered to withstand ambient foundry temperatures exceeding 65°C.',
    approach:
      'We designed an air-gapped industrial Ethernet backbone utilizing armored single-mode fiber in a redundant ring topology (MRP). At each furnace cell, we deployed fanless DIN-rail compute nodes housed in sealed NEMA 4X enclosures with active Peltier cooling. We implemented a unified OPC UA pub/sub telemetry layer that encapsulates raw PLC registers into structured time-series frames with microsecond hardware timestamps. Network boundary controls were enforced through unidirectional data diodes for historical logging and hardware firewall pairs with deep packet inspection for SCADA supervisory commands.',
    outcome:
      'Zero packet loss across induction cycles, telemetry polling latency reduced from 14,000ms to 4.2ms, and 100% metallurgical consistency across 420 consecutive alloy melts. The client achieved full IEC 62443 Level 3 certification.',
    stack: ['OPC UA', 'EtherNet/IP', 'Linux RT-Preempt', 'Rust', 'Moxa EDS', 'TimescaleDB'],
    services: ['OT Network Design', 'Edge Compute Engineering', 'SCADA Modernization', 'ISA/IEC 62443 Hardening'],
    metrics: [
      { label: 'POLL LATENCY', value: '4.2', unit: 'MS' },
      { label: 'PACKET LOSS', value: '0.000', unit: '%' },
      { label: 'UPTIME ACROSS MELTS', value: '99.999', unit: '%' },
      { label: 'CYCLE RECOVERY', value: '18', unit: 'MS' },
    ],
    schematic: [
      { step: '01 SENSOR INGESTION', detail: 'High-temperature thermocouple and pressure transducers tap into isolated galvanic barriers.' },
      { step: '02 DETERMINISTIC TRUNK', detail: 'Redundant fiber ring routes optical Ethernet through armored conduit outside furnace EMF zones.' },
      { step: '03 EDGE ISOLATION', detail: 'DIN-rail compute nodes ingest OPC UA streams, perform CRC verification, and enforce diode boundaries.' },
      { step: '04 SUPERVISORY BUS', detail: 'Dual SCADA supervisory servers process live telemetry and commit to immutable time-series storage.' },
    ],
    gallery: [
      { caption: 'Furnace cell 03 optical transceiver drop and NEMA 4X enclosure termination.', ratio: '16/9' },
      { caption: 'Real-time telemetry trace showing zero jitter during 22,000A induction surge.', ratio: '4/3' },
      { caption: 'Main control room SCADA console layout and dual-feed power distribution.', ratio: '16/9' },
    ],
    testimonial: {
      quote:
        'Apache Spark eliminated the blind spots that plagued our casting bay for fifteen years. They understood the physical realities of hot metal and industrial noise better than any pure software consultancy we evaluated.',
      author: 'Marcus Vance',
      role: 'VP of Manufacturing Engineering, Vanguard Precision',
    },
  },
  {
    slug: 'metro-health-telemetry',
    title: 'Clinical Campus Wi-Fi 6E & Zero-Trust Core',
    client: 'Metropolitan Academic Medical Center',
    sector: 'Healthcare',
    discipline: 'Networks',
    year: 2024,
    duration: '11 Months',
    featured: true,
    sheetNo: 'SHEET 02',
    summary:
      'High-density wireless fabric and EVPN/VXLAN core across 14 surgical floors, guaranteeing sub-second handoffs for continuous cardiac telemetry.',
    brief:
      'Metropolitan Academic Medical Center spans 2.4 million square feet across three interconnected towers housing 850 inpatient beds, 32 operating suites, and a Level 1 trauma center. Mobile telemetry monitors worn by cardiac patients were suffering connection drops during elevator transfers and wing transitions, resulting in false disconnect alarms that saturated nursing station consoles and exhausted clinical response staff.\n\nThe existing network infrastructure was a patchwork of three generations of switches and uncoordinated access points. Biomedical infusion pumps, patient monitoring pucks, guest devices, and diagnostic imaging workstations shared flat VLANs, creating serious security vulnerabilities and unpredictable multicast traffic spikes during peak clinic hours.\n\nApache Spark was commissioned to engineer an enterprise-grade campus network from the physical structured cabling to the logical micro-segmentation layer, guaranteeing uninterrupted continuous telemetry while strictly enforcing HIPAA and medical device isolation.',
    approach:
      'We engineered a multi-chassis BGP EVPN/VXLAN fabric over redundant 100GbE fiber home-runs terminating at spine-leaf pairs in each tower. Over 1,800 Wi-Fi 6E access points were surveyed, calibrated, and deployed using custom ceiling brackets that optimize vertical signal penetration while attenuating bleed into elevator shafts. We implemented 802.1X device profiling with continuous cryptographic validation, isolating clinical telemetry onto a dedicated low-latency micro-segment with strict 802.11r/k/v fast BSS transition tuning.',
    outcome:
      'Wireless roaming drops dropped to zero across 14 floors and elevator banks. Mean handoff latency decreased from 1,420ms to 28ms, well within cardiac telemetry buffer limits. False alert fatigue dropped by 94% across nursing stations.',
    stack: ['Arista EOS', 'BGP EVPN', 'VXLAN', 'Wi-Fi 6E', 'FreeRADIUS', 'Prometheus'],
    services: ['Campus Network Architecture', 'RF Site Survey & Tuning', 'Zero-Trust Segmentation', 'Mission-Critical Wi-Fi'],
    metrics: [
      { label: 'ROAMING HANDOFF', value: '28', unit: 'MS' },
      { label: 'ALARM REDUCTION', value: '94', unit: '%' },
      { label: 'FABRIC CAPACITY', value: '100', unit: 'GBPS' },
      { label: 'CONNECTED MONITORS', value: '8,500', unit: '+' },
    ],
    schematic: [
      { step: '01 FIBER SPINE', detail: 'Dual 100G optical links connect East and West hospital towers to redundant data center spines.' },
      { step: '02 FLOOR LEAVES', detail: 'Top-of-rack leaf switches on each floor provide 25G uplinks and multi-gigabit PoE++ access drops.' },
      { step: '03 RF MICRO-CELLS', detail: 'Wi-Fi 6E arrays deployed at 12m intervals maintain -62 dBm signal coverage with zero co-channel contention.' },
      { step: '04 TRUST POLICY', detail: 'Dynamic VXLAN tagging enforces automated hardware isolation between life-safety and guest packets.' },
    ],
    gallery: [
      { caption: 'East Tower MDF clean cable dressing and 100GbE spine switch termination.', ratio: '16/9' },
      { caption: 'Predictive RF attenuation map showing elevator lobby transition tuning.', ratio: '4/3' },
      { caption: 'Clinical telemetry spectrum analyzer verification during peak clinical shift.', ratio: '16/9' },
    ],
    testimonial: {
      quote:
        'For the first time in ten years, patient telemetry pucks do not drop when rolling into the cath lab elevator. Apache Spark delivered a network that doctors and nurses can trust with human lives.',
      author: 'Dr. Evelyn Chen',
      role: 'Chief Medical Information Officer, Metropolitan Health',
    },
  },
  {
    slug: 'apex-freight-dispatch',
    title: 'Event-Driven Multimodal Dispatch Engine',
    client: 'Apex Intermodal Logistics',
    sector: 'Logistics',
    discipline: 'Software',
    year: 2024,
    duration: '8 Months',
    featured: true,
    sheetNo: 'SHEET 03',
    summary:
      'Sub-millisecond route optimization, live train-consist geofencing, and automated intermodal manifest reconciliation.',
    brief:
      'Apex Intermodal Logistics coordinates over 12,000 daily container shipments spanning Class I rail lines, deep-water port terminals, and regional drayage fleets. Their legacy batch dispatching engine ran on a 30-minute processing cycle, which meant that rail arrival delays, customs inspections, and port gate congestion triggered cascading truck idling fees and missed rail windows across North America.\n\nThe business faced mounting demurrage penalties exceeding $420,000 per month due to information lag between port drayage dispatchers and long-haul rail schedulers. A dispatch error on a single train consist could ripple into hundreds of delayed refrigerated container pickups.\n\nApache Spark was brought in to architect and build a real-time, event-driven multimodal dispatch platform capable of recalculating optimal routes, yard assignments, and driver dispatches within milliseconds of any physical disruption.',
    approach:
      'We engineered an event-driven dispatch core written in Rust, leveraging Apache Kafka for high-throughput manifest ingestion and NATS for low-latency operational event distribution. We built a custom constraint solver utilizing spatial indexing in memory that continuously evaluates tractor GPS coordinates, chassis availability, driver hours-of-service, and terminal queue depth. Real-time updates are pushed to regional dispatchers and driver mobile terminals via persistent WebSocket connections with offline-first synchronization.',
    outcome:
      'Route recalculation latency dropped from 28 minutes to 48 milliseconds. Empty trailer repositioning miles dropped by 18.4%, and month-over-month demurrage penalties were cut by $380,000 within ninety days of cutover.',
    stack: ['Rust', 'Apache Kafka', 'NATS', 'PostgreSQL', 'WebSockets', 'Docker'],
    services: ['Distributed Systems Design', 'High-Throughput Streaming', 'Custom Optimization Algorithms', 'Real-Time Telemetry'],
    metrics: [
      { label: 'ROUTE SOLVE', value: '48', unit: 'MS' },
      { label: 'DEMURRAGE CUT', value: '91', unit: '%' },
      { label: 'DAILY MANIFESTS', value: '12,000', unit: '+' },
      { label: 'DEADHEAD MILES', value: '-18.4', unit: '%' },
    ],
    schematic: [
      { step: '01 MANIFEST INGESTION', detail: 'EDI 214 and 410 feeds stream from rail carriers into partitioned Kafka ingestion queues.' },
      { step: '02 SPATIAL INDEXING', detail: 'In-memory R-tree indexes evaluate GPS coordinates against geofenced terminal boundaries.' },
      { step: '03 CONSTRAINT SOLVER', detail: 'Rust scheduling engine calculates optimal driver-chassis assignments in sub-50ms cycles.' },
      { step: '04 SECURE DISPATCH', detail: 'Encrypted WebSocket pipelines deliver step-by-step turn manifests to driver in-cab terminals.' },
    ],
    gallery: [
      { caption: 'Terminal dispatch interface displaying live yard slot allocations and drayage queues.', ratio: '16/9' },
      { caption: 'Geofence transition telemetry showing microsecond event correlation.', ratio: '4/3' },
      { caption: 'System latency histogram comparing legacy batch vs event-driven execution.', ratio: '16/9' },
    ],
    testimonial: {
      quote:
        'The speed of the new dispatch engine gave our operations team a competitive weapon. We went from reacting to rail delays an hour late to adjusting routes before the train has even pulled into the switchyard.',
      author: 'David Thorne',
      role: 'Chief Operating Officer, Apex Intermodal',
    },
  },
  {
    slug: 'nordic-cold-storage',
    title: 'Cryogenic Facility Hybrid Compute & Power Resiliency',
    client: 'Nordic Perishables Distribution',
    sector: 'Logistics',
    discipline: 'Infrastructure',
    year: 2023,
    duration: '10 Months',
    featured: true,
    sheetNo: 'SHEET 04',
    summary:
      'Autonomous edge clusters in heated sealed enclosures operating automated sorters at -30°C with microgrid generator failover.',
    brief:
      'Nordic Perishables operates a state-of-the-art 450,000-square-foot automated cold chain warehouse situated inside the Arctic Circle. The facility houses robotic automated storage and retrieval systems (ASRS) operating continuously in dark, sub-zero chambers kept at -30°C. Heavy winter storms frequently sever terrestrial microwave and fiber links to regional internet service providers.\n\nUnder the previous cloud-dependent architecture, any WAN disconnect paused warehouse crane sorting lines, risking millions of dollars in pharmaceutical cold-chain inventory and seafood exports. Standard server hardware suffered immediate condensation and capacitor failure when placed inside the refrigerated envelope.\n\nApache Spark was contracted to design an autonomous edge computing architecture, engineer custom environmentally-conditioned server pods, and implement local power grid orchestration capable of maintaining 100% facility throughput during complete external utility and network severance.',
    approach:
      'We designed and deployed twin three-node hybrid edge clusters encased in heated, nitrogen-purged IP66 enclosures situated on the facility catwalks. Each enclosure features redundant thermal management coils, vibration dampers, and dual fiber uplinks. The compute nodes run a localized Kubernetes distribution with distributed Ceph block storage, syncing state back to the cloud when WAN links are healthy and seamlessly transitioning to autonomous local state machines when disconnected. We also integrated automatic transfer switch (ATS) telemetry into the edge control plane to coordinate smooth transitions to dual biodiesel backup generators without dropping a single packet.',
    outcome:
      'The facility operated without interruption through an 18-day midwinter fiber outage caused by an ice storm. Local sorting operations ran at 100% rated speed with zero lost transactions, automatically syncing 4.8 TB of queued logistics data upon network restoration.',
    stack: ['Kubernetes', 'Ceph', 'Linux KVM', 'Modbus TCP', 'Python', 'WireGuard'],
    services: ['Extreme Environment Engineering', 'Autonomous Edge Infrastructure', 'Microgrid Telemetry', 'Disaster Recovery'],
    metrics: [
      { label: 'CHAMBER TEMP', value: '-30', unit: '°C' },
      { label: 'DISCONNECTED RUN', value: '18', unit: 'DAYS' },
      { label: 'SORTING LOSS', value: '0.00', unit: '%' },
      { label: 'FAILOVER TRANSITION', value: '<8', unit: 'MS' },
    ],
    schematic: [
      { step: '01 CONDITIONED POD', detail: 'Nitrogen-purged IP66 server chassis maintains internal 21°C core temp at -30°C ambient.' },
      { step: '02 CEPH REPLICATION', detail: 'Local NVMe flash drives replicate pallet tracking state across three physical nodes.' },
      { step: '03 ASRS BUS', detail: 'Isolated Modbus and PROFINET channels communicate directly with robotic stacker cranes.' },
      { step: '04 CLUSTER SYNC', detail: 'Bi-directional transaction reconciler merges local mutations with cloud ERP on link recovery.' },
    ],
    gallery: [
      { caption: 'Catwalk installation of nitrogen-pressurized cryogenic compute enclosure.', ratio: '16/9' },
      { caption: 'Thermal imaging validation showing stable internal operating envelope.', ratio: '4/3' },
      { caption: 'Automatic transfer switch integration test showing 6ms power bridge.', ratio: '16/9' },
    ],
    testimonial: {
      quote:
        'When an ice storm cut our high-speed connection for over two weeks, our automated cranes never stopped moving. Apache Spark engineered an edge system that laughs at Arctic conditions.',
      author: 'Astrid Lindholm',
      role: 'Director of Facility Technology, Nordic Perishables',
    },
  },
];
