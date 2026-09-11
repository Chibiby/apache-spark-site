// path: src/data/nav.ts
import type { NavItem } from '@/types';

export const NAV_LINKS: NavItem[] = [
  { index: '01', label: 'PLATFORM', href: '/services' },
  { index: '02', label: 'NETWORKS', href: '/#networks' },
  { index: '03', label: 'INFRASTRUCTURE', href: '/#infrastructure' },
  { index: '04', label: 'SHOWCASE', href: '/#showcase' },
  { index: '05', label: 'SHEETS', href: '/projects' },
  { index: '06', label: 'CONTACT', href: '/contact' },
];

export const SITEMAP_SECTIONS = [
  {
    title: 'DISCIPLINES',
    links: [
      { label: 'Software Architecture', href: '/services#software' },
      { label: 'Systems & Compute', href: '/services#systems' },
      { label: 'Network Engineering', href: '/services#networks' },
      { label: 'Infrastructure & Power', href: '/services#infrastructure' },
    ],
  },
  {
    title: 'LIVE SYSTEMS',
    links: [
      { label: 'Interactive Systems Harness', href: '/#showcase' },
      { label: 'Project LiTrack (DepEd ARAL)', href: '/embed/litrack' },
      { label: 'ASPAJCCJSI Press Portal', href: '/embed/journalism' },
    ],
  },
  {
    title: 'PROJECT SHEETS',
    links: [
      { label: 'All Project Sheets', href: '/projects' },
      { label: 'Industrial SCADA (Sheet 01)', href: '/projects/vanguard-foundry-scada' },
      { label: 'Clinical Wi-Fi 6E (Sheet 02)', href: '/projects/metro-health-telemetry' },
      { label: 'Multimodal Dispatch (Sheet 03)', href: '/projects/apex-freight-dispatch' },
    ],
  },
  {
    title: 'ORGANIZATION',
    links: [
      { label: 'Engineering Ethos', href: '/about' },
      { label: 'Field Leadership', href: '/about#team' },
      { label: 'Technical FAQ', href: '/#faq' },
      { label: 'Contact & Specs', href: '/contact' },
    ],
  },
];

