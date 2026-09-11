// path: src/data/stats.ts
import type { StatItem } from '@/types';

export const METRIC_STATS: StatItem[] = [
  {
    index: '01',
    value: 99.999,
    suffix: '%',
    label: 'VERIFIED PRODUCTION AVAILABILITY',
    unitCallout: 'UPTIME SLA / 5-NINES CERTIFIED',
  },
  {
    index: '02',
    value: 4.2,
    suffix: 'MS',
    label: 'MEDIAN TELEMETRY LATENCY',
    unitCallout: 'KERNEL TO SCADA POLLING CYCLE',
  },
  {
    index: '03',
    value: 142,
    suffix: 'GB/S',
    label: 'SUSTAINED FABRIC THROUGHPUT',
    unitCallout: '400GBE ROCEV2 NVME-OF TESTED',
  },
  {
    index: '04',
    value: 18,
    suffix: 'DAYS',
    label: 'AUTONOMOUS EDGE DISCONNECT',
    unitCallout: 'FULL SORTING RUNTIME AT -30°C',
  },
];
