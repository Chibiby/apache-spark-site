// path: src/data/projects.ts
import type { Project } from '@/types';
import { PROJECTS_PART1 } from './projects-part1';
import { PROJECTS_PART2 } from './projects-part2';
import { PROJECTS_PART3 } from './projects-part3';
import { PROJECTS_EMBED } from './projects-embed';

export const PROJECTS: Project[] = [
  ...PROJECTS_PART1,
  ...PROJECTS_PART2,
  ...PROJECTS_PART3,
  ...PROJECTS_EMBED,
];

export const FEATURED_PROJECTS: Project[] = PROJECTS.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}

export function getAdjacentProjects(currentSlug: string): { prev: Project; next: Project } {
  const index = PROJECTS.findIndex((p) => p.slug === currentSlug);
  const total = PROJECTS.length;
  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;
  return {
    prev: PROJECTS[prevIndex],
    next: PROJECTS[nextIndex],
  };
}
