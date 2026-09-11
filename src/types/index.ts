// path: src/types/index.ts

export type Sector =
  | 'Manufacturing'
  | 'Healthcare'
  | 'Education'
  | 'Logistics'
  | 'Retail'
  | 'Public';

export type Discipline =
  | 'Software'
  | 'Systems'
  | 'Networks'
  | 'Infrastructure';

export interface ProjectMetric {
  label: string;
  value: string;
  unit?: string;
}

export interface ProjectSchematicStep {
  step: string;
  detail: string;
}

export interface ProjectGalleryItem {
  caption: string;
  ratio: '16/9' | '4/3' | '1/1';
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  sector: Sector;
  discipline: Discipline;
  year: number;
  duration: string;
  featured: boolean;
  sheetNo: string; // e2.g. "SHEET 04"
  summary: string;
  brief: string;
  approach: string;
  outcome: string;
  stack: string[];
  services: string[];
  metrics: ProjectMetric[];
  schematic: ProjectSchematicStep[];
  gallery: ProjectGalleryItem[];
  testimonial?: ProjectTestimonial;
}

export interface ServicePillar {
  index: string; // "01", "02", etc.
  title: Discipline;
  summary: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
}

export interface CapabilityItem {
  index: string;
  name: string;
  spec: string;
  code: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  sheetNo: string;
}

export interface TeamMember {
  name: string;
  role: string;
  specialization: string;
  credential: string;
  index: string;
  isHiring?: boolean;
  hiringLabel?: string;
  devNumber?: string;
  status?: 'ACTIVE' | 'HIRING';
}

export interface FAQItem {
  index: string;
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
  index: string;
}

export interface StatItem {
  index: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  unitCallout: string;
}
