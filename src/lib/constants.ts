// path: src/lib/constants.ts

export const BRAND_COLORS = {
  ink: '#14181C',
  paper: '#F2EFE8',
  accent: '#9E5430',
  accentLt: '#C97A4A',
  soft: '#7C7568',
  rule: 'rgba(20, 24, 28, 0.16)',
  guide: 'rgba(20, 24, 28, 0.30)',
  tick: 'rgba(20, 24, 28, 0.34)',
  grid: 'rgba(20, 24, 28, 0.05)',
} as const;

export const BRAND_GEOMETRY = {
  viewBox: '0 0 256 256',
  outer: 'M128,32 L224,128 L128,224 L32,128 Z',
  inner: 'M128,84 L172,128 L128,172 L84,128 Z',
  edges: [
    [0, -96, 96, 0],
    [96, 0, 0, 96],
    [0, 96, -96, 0],
    [-96, 0, 0, -96],
  ],
  vertices: [
    [0, -96],
    [96, 0],
    [0, 96],
    [-96, 0],
  ],
  innerScale: 0.46,
} as const;

export const BRAND_COPY = {
  h1Soft: 'We build the',
  h1Ink: 'systems your business runs on.',
  lede: 'Software, networks and infrastructure, drafted to spec and deployed end to end. One team from the wiring closet to the deployment pipeline.',
  contactEmail: 'engage@apachespark.tech',
  phone:'+1 (555) 488-2890',
  location: 'San Francisco / Chicago',
  siteName: 'APACHE SPARK',
  siteUrl: 'https://apachespark.tech',
  descriptors: ['SOFTWARE', 'SYSTEMS', 'NETWORKS', 'INFRASTRUCTURE'],
} as const;
