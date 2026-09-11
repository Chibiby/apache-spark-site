// path: src/app/@modal/(.)projects/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/data/projects';
import { QuickPreviewModal } from '@/components/projects/QuickPreviewModal';

interface InterceptedProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function InterceptedProjectPage({ params }: InterceptedProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <QuickPreviewModal project={project} />;
}
