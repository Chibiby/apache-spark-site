// path: src/data/projects-part3.ts
import type { Project } from '@/types';

export const PROJECTS_PART3: Project[] = [
  {
    slug: 'summit-banking-core',
    title: 'Ultra-Low-Latency Core Clearing Settlement Backbone',
    client: 'Summit Financial Institution',
    sector: 'Retail',
    discipline: 'Systems',
    year: 2024,
    duration: '10 Months',
    featured: false,
    sheetNo: 'SHEET 09',
    summary:
      'Active-active distributed ledger engine processing 35,000 TPS across twin metro data centers with zero data loss guarantees.',
    brief:
      'Summit Financial operates a multi-state retail banking franchise processing credit settlements, real-time merchant payments, and interbank wire transfers. Their legacy mainframe clearing system required nightly 3-hour batch processing windows, during which mobile banking features were locked and card transactions ran in degraded offline authorization modes.\n\nWith new regulatory mandates requiring immediate 24/7/365 payment finality, the mainframe architecture was unsustainable. Scaling transaction volume was causing database lock contention, occasionally delaying high-value commercial payroll disbursements.\n\nApache Spark was selected to engineer an active-active core clearing platform spanning twin Tier IV data centers, guaranteeing strict ACID compliance, zero-data-loss failover, and continuous sub-10ms transaction settlement.',
    approach:
      'We designed a distributed consensus ledger core utilizing Raft consensus optimized for synchronous NVMe-oF cross-datacenter replication over private dark fiber. The transactional engine was developed in Go and C++, leveraging eBPF hooks for kernel-level network tracing and latency telemetry. We established an automated split-brain prevention arbiter and zero-downtime rolling schema migration protocols, verified through continuous automated chaos engineering injection.',
    outcome:
      'Average settlement latency plunged from 84 milliseconds to 4.2 milliseconds while processing peak bursts of 38,500 transactions per second. Nightly batch windows were completely eliminated, delivering 100% continuous payment availability.',
    stack: ['Go', 'C++', 'Raft Consensus', 'eBPF', 'Dark Fiber DWDM', 'Prometheus'],
    services: ['Distributed Consensus Systems', 'Financial Core Architecture', 'Low-Latency Engineering', 'Chaos Testing & Resilience'],
    metrics: [
      { label: 'SETTLEMENT LATENCY', value: '4.2', unit: 'MS' },
      { label: 'PEAK BURST', value: '38,500', unit: 'TPS' },
      { label: 'DATA LOSS (RPO)', value: '0.000', unit: 'SEC' },
      { label: 'BATCH DOWNTIME', value: '0', unit: 'MIN' },
    ],
    schematic: [
      { step: '01 GATEWAY INTAKE', detail: 'ISO 20022 payment requests terminate at hardware security modules across both sites.' },
      { step: '02 RAFT CONSENSUS', detail: 'Synchronous Raft commit round travels over dedicated 100G DWDM dark fiber span.' },
      { step: '03 LEDGER COMMIT', detail: 'Twin NVMe storage engines commit transaction to immutable double-entry journal.' },
      { step: '04 EBPF VERIFICATION', detail: 'Kernel probes track packet latency and verify zero-loss consensus acknowledgments.' },
    ],
    gallery: [
      { caption: 'Twin data center DWDM optical transceivers and dedicated fiber cross-connect patch.', ratio: '16/9' },
      { caption: 'Chaos test injection graph showing seamless node death and zero transaction drop.', ratio: '4/3' },
      { caption: 'Real-time clearing transaction throughput monitor showing 38k TPS burst.', ratio: '16/9' },
    ],
    testimonial: {
      quote:
        'Migrating core banking clearing is like swapping jet engines mid-flight. Apache Spark pulled it off with zero downtime and absolute mathematical precision. Our transaction speed is now best in class.',
      author: 'Michael Vance',
      role: 'Chief Technology Officer, Summit Financial',
    },
  },
  {
    slug: 'veritas-district-sdwan',
    title: 'Unified SD-WAN & 10Gbps Dark Fiber Ring',
    client: 'Veritas Unified School District',
    sector: 'Education',
    discipline: 'Networks',
    year: 2023,
    duration: '8 Months',
    featured: false,
    sheetNo: 'SHEET 10',
    summary:
      'Dark fiber ring connecting 38 school campuses with centralized traffic prioritization and automated digital curriculum QoS.',
    brief:
      'Veritas Unified School District serves 32,000 K-12 students across 38 elementary, middle, and high school campuses. Each campus was tied to slow, expensive carrier T1 and commercial broadband connections that choked whenever standardized testing commenced or multimedia digital curriculum programs were launched.\n\nDuring state assessment weeks, schools had to stagger test schedules, and network dropouts frequently invalidated student test submissions. Recurring carrier bills were consuming a disproportionate share of the districts instructional technology budget.\n\nApache Spark was engaged to design and execute a comprehensive telecommunications overhaul, replacing obsolete carrier lines with a district-owned 10Gbps dark fiber ring and enterprise SD-WAN architecture.',
    approach:
      'We surveyed and negotiated access to a regional municipal dark fiber loop, establishing a self-healing 10Gbps DWDM ring topology with dual central data center ingress points. At each of the 38 schools, we installed standardized enterprise gateway stacks featuring automated Layer 7 application shaping that prioritizes assessment platforms and video classroom tools over general web traffic. We integrated 802.1X student device authentication with centralized content safety filtering adhering strictly to CIPA compliance.',
    outcome:
      'Every school campus received an immediate 100x increase in usable bandwidth. District-wide state standardized testing completed without a single network-related test cancellation, and recurring annual telecommunications expenses dropped by $420,000.',
    stack: ['Dark Fiber DWDM', 'Fortinet SD-WAN', 'BGP', '802.1X', 'Ansible', 'LibreNMS'],
    services: ['Municipal Fiber Engineering', 'SD-WAN Deployment', 'CIPA Compliance Filtering', 'Campus Backbone Architecture'],
    metrics: [
      { label: 'BANDWIDTH GAIN', value: '100', unit: 'X' },
      { label: 'ANNUAL SAVINGS', value: '$420K', unit: '/YR' },
      { label: 'STUDENTS SERVED', value: '32,000', unit: '+' },
      { label: 'CAMPUS SITES', value: '38', unit: 'LOC' },
    ],
    schematic: [
      { step: '01 MUNICIPAL RING', detail: 'Self-healing 10G optical fiber ring circles the perimeter of the metropolitan area.' },
      { step: '02 CAMPUS LATERAL', detail: 'Dedicated lateral fiber cables terminate at school MDF rooms in secure wall racks.' },
      { step: '03 SD-WAN SHAPING', detail: 'Edge gateways inspect application layers and dynamically prioritize testing packets.' },
      { step: '04 ZERO-TRUST DROPS', detail: 'Classroom access switches segment student Chromebooks from administrative records.' },
    ],
    gallery: [
      { caption: 'High School central MDF rack modernization with 10GbE fiber patch terminations.', ratio: '16/9' },
      { caption: 'Traffic shaping graph showing clean bandwidth allocation during state testing.', ratio: '4/3' },
      { caption: 'Outdoor aerial fiber splice case inspection and OTDR attenuation test.', ratio: '16/9' },
    ],
    testimonial: {
      quote:
        'Standardized testing used to be our most stressful week of the year due to network failures. With Apache Sparks fiber ring, thirty-two thousand students tested simultaneously without a blip.',
      author: 'Patricia Morales',
      role: 'Superintendent of Schools, Veritas Unified',
    },
  },
  {
    slug: 'meridian-omnichannel-pos',
    title: 'Offline-First Distributed Store Operations Platform',
    client: 'Meridian Department Stores',
    sector: 'Retail',
    discipline: 'Software',
    year: 2024,
    duration: '9 Months',
    featured: false,
    sheetNo: 'SHEET 11',
    summary:
      'Conflict-free replicated data types (CRDTs), peer-to-peer local cash register sync, and sub-50ms barcode transaction checkout.',
    brief:
      'Meridian operates 140 luxury department stores with over 1,800 point-of-sale checkout terminals. During high-volume holiday events such as Black Friday, regional ISP slowdowns and cloud API rate limits routinely caused register screens to freeze during credit authorization and inventory lookups.\n\nShoppers experienced checkout lines snaking through department aisles, leading to abandoned shopping carts and an estimated $2.8 million in lost sales across two holiday seasons. Cashiers had no way to process sales or issue returns when store internet connectivity faltered.\n\nApache Spark was commissioned to re-architect Meridians point-of-sale software from the ground up, engineering an offline-first distributed architecture that allows all cash registers in a store to transact smoothly regardless of WAN connectivity.',
    approach:
      'We designed an offline-first register runtime utilizing Conflict-Free Replicated Data Types (CRDTs) embedded in a lightweight local database on every terminal. Registers discover each other across the local in-store LAN via mDNS and synchronize pricing, gift card balances, and inventory reservations in real time without calling out to the cloud. Credit transactions are securely tokenized in local encrypted TPM chips and queued for asynchronous clearing upon WAN restoration. A modern TypeScript and Rust engine powers sub-50ms UI response times on touchscreen terminals.',
    outcome:
      'Zero register lockups or transaction stalls across the entire peak holiday season. Checkout speed improved by 3.2x, saving an average of 42 seconds per customer transaction, with 100% store uptime during two major regional cloud outages.',
    stack: ['TypeScript', 'Rust', 'CRDTs', 'SQLite', 'mDNS', 'Electron'],
    services: ['Offline-First Architecture', 'Distributed Database Design', 'Retail Systems Engineering', 'Secure Enclave Tokenization'],
    metrics: [
      { label: 'CHECKOUT TIME', value: '-42', unit: 'SEC' },
      { label: 'HOLIDAY UPTIME', value: '100.0', unit: '%' },
      { label: 'REGISTER RESPONSE', value: '38', unit: 'MS' },
      { label: 'STORES DEPLOYED', value: '140', unit: 'LOC' },
    ],
    schematic: [
      { step: '01 LOCAL SCANNER', detail: 'Barcode scanner triggers local in-memory product index lookup in sub-10ms.' },
      { step: '02 CRDT SYNC', detail: 'Local registers exchange state vectors over encrypted multicast LAN without cloud dependencies.' },
      { step: '03 ENCLAVE TOKEN', detail: 'Payment card data is encrypted within hardware TPM chip and stored in append-only journal.' },
      { step: '04 BACKGROUND MERGE', detail: 'Store gateway reconciles local CRDT state with central inventory cloud once WAN is active.' },
    ],
    gallery: [
      { caption: 'Store checkout counter terminal running offline-first touch interface.', ratio: '16/9' },
      { caption: 'CRDT state vector synchronization benchmark showing instantaneous resolution.', ratio: '4/3' },
      { caption: 'In-store edge gateway and local mDNS mesh diagnostic monitor.', ratio: '16/9' },
    ],
    testimonial: {
      quote:
        'Black Friday was always terrifying for our IT staff. This year, thanks to Apache Spark, our registers did not miss a single beat. Our store managers actually enjoyed the holiday rush.',
      author: 'Sarah Jenkins',
      role: 'Senior Vice President of Retail Systems, Meridian Stores',
    },
  },
  {
    slug: 'keystone-hydroelectric-iot',
    title: 'Dam Turbine Vibration & Acoustic Monitoring Grid',
    client: 'Keystone River Power Authority',
    sector: 'Public',
    discipline: 'Infrastructure',
    year: 2023,
    duration: '12 Months',
    featured: false,
    sheetNo: 'SHEET 12',
    summary:
      'High-frequency piezoelectric telemetry and localized Fourier FFT inferencing across twelve 37.5MW Kaplan water turbines.',
    brief:
      'Keystone River Power Authority operates a 450-megawatt hydroelectric dam facility containing twelve vertical-shaft Kaplan turbines commissioned between 1954 and 1978. Unscheduled turbine shutdowns caused by cavitation erosion, bearing misalignment, and shaft wobbling cost up to $180,000 per day in replacement power purchases on regional wholesale energy markets.\n\nInspections required draining turbine draft tubes and sending technicians into confined water passages with ultrasonic thickness gaugesa hazardous procedure that could only take place twice per year during low river discharge seasons.\n\nApache Spark was selected to design, wire, and deploy a continuous acoustic and vibration diagnostic monitoring grid capable of detecting microscopic mechanical fatigue months before operational failure occurred.',
    approach:
      'We engineered and installed an array of hermetically-sealed triaxial piezoelectric accelerometers and acoustic emission sensors directly onto turbine guide bearings, shaft seals, and generator stator frames. Sensor signals are carried through shielded mineral-insulated cable to ruggedized data acquisition (DAQ) units deployed inside turbine gallery galleries. Edge compute nodes continuously compute Fast Fourier Transform (FFT) harmonic spectra, comparing live harmonics against baseline baseline mechanical signatures to identify sub-millimeter cavitation pitting and bearing race spalling.',
    outcome:
      'The monitoring system detected micro-fracture propagation in Turbine 7s lower guide bearing 11 weeks before catastrophic mechanical failure, enabling scheduled repair during a planned diversion window and saving an estimated $14M in lost generation and equipment damage.',
    stack: ['Piezoelectric Sensors', 'Fast Fourier Transform', 'Modbus TCP', 'Python', 'InfluxDB', 'Grafana'],
    services: ['Industrial IoT Engineering', 'Acoustic & Vibration Telemetry', 'Hydroelectric Infrastructure', 'Predictive Edge Diagnostics'],
    metrics: [
      { label: 'ADVANCE WARNING', value: '11', unit: 'WEEKS' },
      { label: 'AVOIDED LOSS', value: '$14', unit: 'M' },
      { label: 'SAMPLING RATE', value: '25.6', unit: 'KS/S' },
      { label: 'TURBINES MONITORED', value: '12', unit: 'UNITS' },
    ],
    schematic: [
      { step: '01 PIEZO TRANSDUCER', detail: 'Submersible triaxial accelerometers capture high-frequency bearing vibrations at 25.6 kHz.' },
      { step: '02 GALLERY DAQ', detail: 'Low-noise pre-amplifiers digitize micro-volt sensor signals inside concrete dam galleries.' },
      { step: '03 FFT SPECTRUM', detail: 'Edge compute algorithms decompose raw waveforms into harmonic frequency spectra.' },
      { step: '04 CONTROL ALARM', detail: 'Automated deviation alarms alert plant operations engineers to anomalous harmonic spikes.' },
    ],
    gallery: [
      { caption: 'Kaplan Turbine 07 lower guide bearing accelerometer mount and conduit routing.', ratio: '16/9' },
      { caption: 'Harmonic vibration waterfall chart showing early micro-fracture frequency spike.', ratio: '4/3' },
      { caption: 'Turbine inspection gallery DAQ panel and optical ring backbone termination.', ratio: '16/9' },
    ],
    testimonial: {
      quote:
        'Apache Spark saved this utility fourteen million dollars on Turbine 7 alone. Their diagnostic system detected bearing fatigue that would have gone unnoticed until the turbine tore itself apart.',
      author: 'Leonard Vance, P.E.',
      role: 'Chief Engineer, Keystone River Power Authority',
    },
  },
];
