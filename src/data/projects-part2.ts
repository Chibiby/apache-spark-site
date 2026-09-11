// path: src/data/projects-part2.ts
import type { Project } from '@/types';

export const PROJECTS_PART2: Project[] = [
  {
    slug: 'solis-energy-telemetry',
    title: 'Substation Microgrid Telemetry & RTU Consolidation',
    client: 'Tri-County Electric Utility District',
    sector: 'Public',
    discipline: 'Systems',
    year: 2023,
    duration: '12 Months',
    featured: false,
    sheetNo: 'SHEET 05',
    summary:
      'IEC 61850 substation automation, DNP3 protocol consolidation, and synchronized phasor data collection for regional grid stability.',
    brief:
      'Tri-County Electric District manages electrical distribution across 1,800 square miles of rural and suburban terrain, serving 140,000 residential and light-industrial meters. The utility was integrating 85 megawatts of distributed solar and battery storage into an aging transmission grid built around electro-mechanical relays and disconnected Remote Terminal Units (RTUs) dating back to the late 1980s.\n\nRapid solar ramp-down during cloud cover was inducing sudden reverse-power surges and voltage fluctuations that tripped feeder breakers, causing localized blackouts. Grid operators in the central energy management system lacked sub-second visibility into feeder phase angles and transformer winding temperatures.\n\nApache Spark was retained to engineer a modern, hardened substation automation platform that unifies legacy serial RTUs, introduces synchronized phasor measurement units (PMUs), and establishes secure communication over optical utility ground wire (OPGW).',
    approach:
      'We deployed substation gateway nodes running ruggedized Linux kernels hardened to IEEE 1613 and IEC 61850-3 environmental standards. We drafted a deterministic protocol normalization pipeline that converts asynchronous DNP3 and Modbus RTU telemetry into synchronized IEC 61850 sample values. Precision Time Protocol (IEEE 1588v2 PTP) was configured across substation GPS clocks to timestamp voltage and current phase angles to within 200 nanoseconds, providing operators with actionable wide-area situational awareness.',
    outcome:
      'Phase angle discrepancies and feeder back-feeds are now identified and automatically curtailed in under 65 milliseconds. Feeder trip events dropped by 78%, and the utility successfully onboarded all 85MW of renewable generation without grid instability.',
    stack: ['IEC 61850', 'DNP3', 'IEEE 1588v2 PTP', 'Rust', 'Cisco Industrial', 'Grafana'],
    services: ['Substation Engineering', 'Protocol Translation', 'Time Synchronization (PTP)', 'SCADA Grid Telemetry'],
    metrics: [
      { label: 'PTP ACCURACY', value: '180', unit: 'NS' },
      { label: 'TRIP REDUCTION', value: '78', unit: '%' },
      { label: 'INTEGRATED SOLAR', value: '85', unit: 'MW' },
      { label: 'FAULT DETECTION', value: '65', unit: 'MS' },
    ],
    schematic: [
      { step: '01 CT/VT SAMPLING', detail: 'Current and potential transformers sample substation bus waveforms at 4,800 Hz.' },
      { step: '02 PTP TIMESTAMPING', detail: 'GPS receiver injects IEEE 1588v2 hardware timestamps with sub-200ns precision.' },
      { step: '03 RTU CONSOLIDATION', detail: 'Ruggedized gateways translate legacy DNP3 registers into standardized IEC 61850 streams.' },
      { step: '04 EMS DISPATCH', detail: 'Encrypted OPGW fiber routes synchrotron data directly to central utility dispatch.' },
    ],
    gallery: [
      { caption: 'Substation relay rack with redundant IEEE 1613 compute gateways installed.', ratio: '16/9' },
      { caption: 'Phasor measurement alignment showing synchronized 60Hz grid waveforms.', ratio: '4/3' },
      { caption: 'OPGW fiber splice box and lightning isolation conduit run.', ratio: '16/9' },
    ],
    testimonial: {
      quote:
        'Apache Spark brought our 1980s substations straight into the modern smart grid era. Their team worked alongside our high-voltage linemen and delivered flawless execution.',
      author: 'Robert Sterling',
      role: 'Chief Grid Operations Officer, Tri-County Electric',
    },
  },
  {
    slug: 'st-jude-oncology-storage',
    title: 'Multi-Petabyte Whole Genome Imaging Fabric',
    client: 'St. Jude Genomic Research Pavilion',
    sector: 'Healthcare',
    discipline: 'Infrastructure',
    year: 2024,
    duration: '7 Months',
    featured: false,
    sheetNo: 'SHEET 06',
    summary:
      '400GbE RoCEv2 storage cluster and parallel file system delivering 120 GB/s sustained throughput for high-throughput gene sequencers.',
    brief:
      'The St. Jude Genomic Research Pavilion runs sixteen high-throughput Illumina NovaSeq sequencers and four cryogenic electron microscopy (cryo-EM) suites dedicated to pediatric cancer biology. Each sequencing run outputs terabytes of raw fluorescence imagery that must be written directly to high-speed scratch storage without frame buffering, or the entire flow cell run is invalidated.\n\nThe existing storage area network (SAN) suffered severe bottlenecking whenever more than six sequencers were running simultaneously. Buffer overrun errors caused three ruined sequencing runs in a single quarter, wasting hundreds of thousands of dollars in chemical reagents and delaying critical patient tumor profiling.\n\nApache Spark was brought in to architect, cable, and benchmark a non-blocking 400GbE storage fabric and parallel file system capable of sustaining 120 gigabytes per second of raw sequential ingestion.',
    approach:
      'We engineered an end-to-end NVMe over Fabrics (NVMe-oF) storage architecture utilizing RoCEv2 (RDMA over Converged Ethernet) with Priority Flow Control (PFC) and Explicit Congestion Notification (ECN). The physical plant features MPO-16 fiber trunk cabling connecting high-density flash storage nodes to dual 400GbE spine switches. We deployed Lustre parallel file systems tuned for large sequential writes alongside an automated S3-compatible cold tiering daemon that migrates verified datasets to tape and object stores upon pipeline completion.',
    outcome:
      'Achieved 142 GB/s verified sustained write throughput, eliminating sequencer buffer overflow errors entirely. All 16 sequencers and cryo-EM rigs now operate concurrently at 100% capacity with zero dropped capture frames.',
    stack: ['NVMe-oF', 'RoCEv2', '400GbE', 'Lustre', 'Ceph S3', 'Arista EOS'],
    services: ['High-Performance Computing (HPC)', 'Storage Fabric Architecture', 'RDMA Network Optimization', 'Research Infrastructure'],
    metrics: [
      { label: 'WRITE THROUGHPUT', value: '142', unit: 'GB/S' },
      { label: 'STORAGE CAPACITY', value: '14.2', unit: 'PB' },
      { label: 'FRAME OVERRUNS', value: '0', unit: 'ERR' },
      { label: 'PIPELINE SPEEDUP', value: '4.8', unit: 'X' },
    ],
    schematic: [
      { step: '01 INSTRUMENT INGEST', detail: 'Sequencer optical outputs connect via 100G links directly to leaf switches.' },
      { step: '02 ROCEV2 FABRIC', detail: 'Zero-loss 400G spine fabric routes RDMA packets with zero CPU copy overhead.' },
      { step: '03 FLASH TIER', detail: 'All-NVMe storage arrays ingest parallel write stripes across 24 high-density storage nodes.' },
      { step: '04 ARCHIVAL DELETER', detail: 'Automated policy engine migrates completed alignment outputs to high-density cold tiers.' },
    ],
    gallery: [
      { caption: 'High-density 400GbE MPO-16 fiber optic trunk routing in clean room data suite.', ratio: '16/9' },
      { caption: 'RDMA throughput benchmark graph showing 142 GB/s saturation plateau.', ratio: '4/3' },
      { caption: 'Instrument interface cable dressing for Illumina NovaSeq integration racks.', ratio: '16/9' },
    ],
    testimonial: {
      quote:
        'Our sequencers generate an ocean of data every day. Apache Spark built the plumbing that handles it effortlessly. We have not lost a single sequencing run since day one of cutover.',
      author: 'Dr. Katherine Meyer',
      role: 'Director of Bioinformatics, St. Jude Genomics',
    },
  },
  {
    slug: 'aurora-aerospace-avionics',
    title: 'Precision Hardware-in-the-Loop Test Bench',
    client: 'Aurora Defense & Aerospace',
    sector: 'Manufacturing',
    discipline: 'Software',
    year: 2024,
    duration: '6 Months',
    featured: false,
    sheetNo: 'SHEET 07',
    summary:
      'Deterministic sub-10µs flight actuator simulation, FPGA DMA integration, and live telemetry capture for aerospace qualification.',
    brief:
      'Aurora Defense manufactures electromechanical actuators and flight control computers for autonomous aerial vehicles. Flight certification requires Hardware-in-the-Loop (HIL) simulation test runs where simulated aerodynamic wind shear, hydraulic pressure drops, and electrical faults are injected into physical avionics hardware running at 10,000 Hz loop rates.\n\nThe clients existing software test harness suffered from non-deterministic operating system interrupts, introducing up to 250 microseconds of timing jitter. This jitter corrupted simulated control-surface feedback loops, leading to spurious false-positive actuator flutter flags and weeks of delayed aerospace certification audits.\n\nApache Spark was hired to engineer a microsecond-deterministic software harness and FPGA interface that captures, computes, and responds to avionics feedback without missing a single simulation cycle.',
    approach:
      'We developed a bare-metal execution harness running atop custom Linux kernels with RT-Preempt and isolated CPU core pinning. We engineered high-performance PCIe DMA drivers interfacing directly with custom Xilinx UltraScale+ FPGAs, enabling zero-copy circular memory ring buffers between hardware ADC/DAC channels and simulation models. A companion telemetry web application streams real-time Bode plots and Fourier phase analysis to test engineers via binary WebSockets with zero host performance impact.',
    outcome:
      'Timing jitter reduced from 250µs to 4.1 microseconds across 1,200 continuous test hours. Aurora achieved FAA and defense hardware-in-the-loop qualification ahead of schedule, cutting physical wind-tunnel requirements by 64%.',
    stack: ['Rust', 'C++', 'Linux RT-Preempt', 'PCIe DMA', 'WebAssembly', 'Xilinx FPGA'],
    services: ['Real-Time Systems Development', 'Kernel & Driver Engineering', 'FPGA Interfacing', 'Aerospace HIL Testing'],
    metrics: [
      { label: 'TIMING JITTER', value: '4.1', unit: '?S' },
      { label: 'LOOP FREQUENCY', value: '10', unit: 'KHZ' },
      { label: 'CONTINUOUS TEST', value: '1,200', unit: 'HRS' },
      { label: 'TUNNEL RUNS CUT', value: '64', unit: '%' },
    ],
    schematic: [
      { step: '01 FPGA RECEPTION', detail: 'Aerospace bus transceivers decode ARINC 429 and MIL-STD-1553 signals at physical layer.' },
      { step: '02 ZERO-COPY DMA', detail: 'PCIe bus transfers raw sensor packets directly into pinned host CPU cache lines.' },
      { step: '03 RT FLIGHT MODEL', detail: 'Real-time Rust kernel executes aerodynamic physics matrix equations in sub-8µs.' },
      { step: '04 ANALYTIC STREAM', detail: 'Binary WebSocket telemetry feeds diagnostic dashboard for live waveform inspection.' },
    ],
    gallery: [
      { caption: 'Hardware-in-the-loop avionics test rack with flight computer under test.', ratio: '16/9' },
      { caption: 'Oscilloscope trace showing deterministic 10kHz loop timing and sub-5µs response.', ratio: '4/3' },
      { caption: 'Telemetry web console displaying real-time Fourier transform phase margin.', ratio: '16/9' },
    ],
    testimonial: {
      quote:
        'Microsecond determinism is rare in modern software engineering. Apache Spark delivered code that operates with the mechanical precision of a Swiss watch. Our flight control systems are safer because of them.',
      author: 'Colonel Jason Bradley (Ret.)',
      role: 'VP of Avionics Programs, Aurora Defense',
    },
  },
  {
    slug: 'pacific-maritime-vts',
    title: 'Harbor Vessel Traffic Surveillance Radar Network',
    client: 'Pacific Port Authority',
    sector: 'Public',
    discipline: 'Networks',
    year: 2023,
    duration: '11 Months',
    featured: false,
    sheetNo: 'SHEET 08',
    summary:
      'Long-range millimeter wave microwave backbone connecting coastal radar heads, AIS receivers, and harbor control centers.',
    brief:
      'The Pacific Port Authority oversees navigation in a deep-water commercial inlet handling over 3,400 container ships, oil tankers, and bulk freighters annually. Dense coastal fog, heavy rainstorms, and tidal currents make the channel one of the most hazardous navigation routes in the Pacific Northwest.\n\nThree remote radar surveillance towers positioned on offshore rock bluffs were connected via outdated wireless links that degraded during heavy rain fade, blinding vessel traffic service (VTS) operators to small fishing craft and rogue tugs operating in shipping lanes.\n\nApache Spark was commissioned to engineer an ultra-resilient communications network connecting all coastal radar stations, AIS receivers, and CCTV towers across 45 miles of coastal waterways to the central harbor watch station.',
    approach:
      'We designed and deployed an 11GHz and 18GHz licensed microwave backhaul network configured in self-healing rings with adaptive coding and modulation (ACM) to survive severe marine rain fade. Remote tower installations were equipped with marine-grade stainless steel enclosures, redundant solar-diesel microgrids, and fiber optic isolation drops to withstand lightning strikes. Network switching at each tower features ruggedized IP67 switches with synchronous Ethernet (SyncE) for radar pulse alignment.',
    outcome:
      'Surveillance data availability climbed to 99.999% through two severe atmospheric river winter storms. Vessel tracking telemetry remains clear across all 45 nautical miles, with radar image refresh latency under 120 milliseconds.',
    stack: ['Licensed Microwave', 'SyncE', 'Cisco Industrial', 'SNMPv3', 'Solar Microgrid', 'Python'],
    services: ['Long-Distance Wireless Engineering', 'Harsh Maritime Design', 'Critical Infrastructure Network', 'Surveillance Integration'],
    metrics: [
      { label: 'AVAILABILITY', value: '99.999', unit: '%' },
      { label: 'RADAR LATENCY', value: '118', unit: 'MS' },
      { label: 'COVERAGE RANGE', value: '45', unit: 'NM' },
      { label: 'RAIN FADE MARGIN', value: '42', unit: 'DB' },
    ],
    schematic: [
      { step: '01 RADAR DIGITIZATION', detail: 'Solid-state X-band radar transceiver outputs raw digitized target video frames.' },
      { step: '02 OPTICAL DROP', detail: 'Ruggedized fiber runs down concrete bluff tower to marine-grade enclosure base.' },
      { step: '03 MICROWAVE RING', detail: '11GHz licensed link transmits encrypted payload across 18 miles of open ocean water.' },
      { step: '04 VTS SYNTHESIS', detail: 'Central harbor command correlates radar blips with AIS broadcasts on navigational charts.' },
    ],
    gallery: [
      { caption: 'Point Defiance radar tower microwave dish alignment overlooking navigation channel.', ratio: '16/9' },
      { caption: 'Marine-grade stainless cabinet showing battery bank and fiber splice tray.', ratio: '4/3' },
      { caption: 'Harbor radar composite screen displaying target track resolution in dense fog.', ratio: '16/9' },
    ],
    testimonial: {
      quote:
        'When 60-knot gale winds and freezing rain hit the inlet, Apache Sparks microwave backbone held rock solid. Our harbor pilots had uninterrupted radar eyes through the worst storm of the decade.',
      author: 'Captain Elena Rostova',
      role: 'Harbor Master, Pacific Port Authority',
    },
  },
];
