// path: src/app/projects/[slug]/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjectSlugs, getAdjacentProjects } from '@/data/projects';
import { ProjectCover } from '@/components/projects/ProjectCover';
import { ProjectMeta } from '@/components/projects/ProjectMeta';
import { ProjectNav } from '@/components/projects/ProjectNav';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { BeforeAfterSlider } from '@/components/projects/BeforeAfterSlider';
import { WipeText } from '@/components/fx/WipeText';
import { Counter } from '@/components/fx/Counter';
import { MarginNote } from '@/components/brand/MarginNote';
import { DimensionLine } from '@/components/brand/DimensionLine';
import { ArrowLeft } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Sheet Not Found  Apache Spark',
    };
  }

  return {
    title: `${project.sheetNo}: ${project.title}  Apache Spark`,
    description: project.summary,
    openGraph: {
      title: `${project.sheetNo}: ${project.title}`,
      description: project.summary,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(slug);

  // JSON-LD structured data for CreativeWork
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.title,
    description: project.summary,
    creator: {
      '@type': 'Organization',
      name: 'APACHE SPARK',
      url: 'https://apachespark.tech',
    },
    client: project.client,
    dateCreated: `${project.year}`,
  };

  return (
    <article className="pt-32 pb-24 max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-16 select-none">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between w-full border-b border-[rgba(20,24,28,0.16)] pb-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-[#7C7568] hover:text-[#14181C] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>BACK TO SHEETS</span>
        </Link>
        <MarginNote>{project.sheetNo} // MASTER SPECIFICATION</MarginNote>
      </div>

      {/* Oversized Wipe Title */}
      <div className="flex flex-col gap-6 max-w-5xl">
        <div className="flex items-center gap-3 font-mono text-[12px] tracking-[0.22em] text-[#9E5430] uppercase">
          <span>{project.sector}</span>
          <span>//</span>
          <span>{project.discipline}</span>
          <span>//</span>
          <span>{project.year}</span>
        </div>

        <h1 className="font-sans text-[clamp(34px,6vw,84px)] font-bold text-[#14181C] tracking-[-0.02em] leading-[1.02]">
          <WipeText text={project.title} as="span" />
        </h1>

        <p className="font-mono text-[15px] md:text-[17px] text-[#7C7568] leading-[1.8] max-w-3xl">
          {project.summary}
        </p>
      </div>

      {/* Technical Drawing Cover */}
      <div className="w-full">
        <ProjectCover
          slug={project.slug}
          sheetNo={project.sheetNo}
          aspectRatio="16/9"
        />
      </div>

      {/* Structured Meta Grid */}
      <ProjectMeta project={project} />

      {/* Two-Column Layout: Sticky Side-Rail TOC + Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
        {/* Sticky side rail navigation */}
        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-28 flex flex-col gap-3 font-mono text-[11px] tracking-[0.16em] uppercase border-l-2 border-[rgba(20,24,28,0.12)] pl-4">
            <span className="text-[#9E5430] text-[9px] tracking-[0.24em] font-semibold mb-2">
              CONTENTS
            </span>
            <a href="#brief" className="text-[#7C7568] hover:text-[#14181C] transition-colors">
              01 // The Brief
            </a>
            <a href="#approach" className="text-[#7C7568] hover:text-[#14181C] transition-colors">
              02 // Engineering Approach
            </a>
            <a href="#outcome" className="text-[#7C7568] hover:text-[#14181C] transition-colors">
              03 // Operational Outcome
            </a>
            <a href="#schematic" className="text-[#7C7568] hover:text-[#14181C] transition-colors">
              04 // Architectural Steps
            </a>
            <a href="#comparison" className="text-[#7C7568] hover:text-[#14181C] transition-colors">
              05 // Architecture Slider
            </a>
            <a href="#gallery" className="text-[#7C7568] hover:text-[#14181C] transition-colors">
              06 // Technical Plates
            </a>
          </div>
        </aside>

        {/* Main Content Body */}
        <div className="lg:col-span-9 flex flex-col gap-16">
          {/* Brief */}
          <section id="brief" className="flex flex-col gap-4 border-b border-[rgba(20,24,28,0.12)] pb-12">
            <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.24em] uppercase">
              01 // PROBLEM STATEMENT
            </span>
            <h2 className="font-sans text-[26px] md:text-[32px] font-bold text-[#14181C] tracking-[-0.01em]">
              The Brief
            </h2>
            <div className="font-mono text-[13px] md:text-[14px] text-[#14181C] leading-[1.9] space-y-6">
              {project.brief.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Approach */}
          <section id="approach" className="flex flex-col gap-4 border-b border-[rgba(20,24,28,0.12)] pb-12">
            <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.24em] uppercase">
              02 // TECHNICAL ARCHITECTURE
            </span>
            <h2 className="font-sans text-[26px] md:text-[32px] font-bold text-[#14181C] tracking-[-0.01em]">
              Engineering Approach
            </h2>
            <p className="font-mono text-[13px] md:text-[14px] text-[#14181C] leading-[1.9]">
              {project.approach}
            </p>
          </section>

          {/* Outcome & Key Results Strip */}
          <section id="outcome" className="flex flex-col gap-6 border-b border-[rgba(20,24,28,0.12)] pb-12">
            <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.24em] uppercase">
              03 // MEASURED IMPACT
            </span>
            <h2 className="font-sans text-[26px] md:text-[32px] font-bold text-[#14181C] tracking-[-0.01em]">
              Operational Outcome
            </h2>
            <p className="font-mono text-[13px] md:text-[14px] text-[#14181C] leading-[1.9]">
              {project.outcome}
            </p>

            {/* Results Count-Up Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[rgba(20,24,28,0.03)] border border-[rgba(20,24,28,0.12)] mt-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] text-[#7C7568] tracking-[0.2em] uppercase">
                    {m.label}
                  </span>
                  <div className="font-sans font-bold text-[24px] md:text-[32px] text-[#14181C]">
                    <Counter
                      value={parseFloat(m.value.replace(/[^0-9.]/g, '')) || 0}
                      prefix={m.value.startsWith('$') ? '$' : ''}
                      suffix={m.unit ? ` ${m.unit}` : ''}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Schematic Steps with scroll-drawn connector */}
          <section id="schematic" className="flex flex-col gap-6 border-b border-[rgba(20,24,28,0.12)] pb-12">
            <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.24em] uppercase">
              04 // SPECIFICATION PHASING
            </span>
            <h2 className="font-sans text-[26px] md:text-[32px] font-bold text-[#14181C] tracking-[-0.01em]">
              Schematic Delivery Pipeline
            </h2>
            <div className="flex flex-col divide-y divide-[rgba(20,24,28,0.10)] border-t border-b border-[rgba(20,24,28,0.10)]">
              {project.schematic.map((step) => (
                <div key={step.step} className="py-6 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8">
                  <span className="font-mono text-[12px] font-semibold text-[#9E5430] tracking-[0.18em] uppercase shrink-0 min-w-[180px]">
                    {step.step}
                  </span>
                  <p className="font-mono text-[13px] text-[#14181C] leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Before/After Architecture Comparison Slider */}
          <section id="comparison" className="flex flex-col gap-6 border-b border-[rgba(20,24,28,0.12)] pb-12">
            <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.24em] uppercase">
              05 // RETROFIT VERIFICATION
            </span>
            <h2 className="font-sans text-[26px] md:text-[32px] font-bold text-[#14181C] tracking-[-0.01em]">
              Legacy vs Modernized Architecture
            </h2>
            <BeforeAfterSlider />
          </section>

          {/* Technical Drawing Gallery with Lightbox */}
          <section id="gallery" className="flex flex-col gap-6 border-b border-[rgba(20,24,28,0.12)] pb-12">
            <span className="font-mono text-[10px] text-[#9E5430] tracking-[0.24em] uppercase">
              06 // REGISTERED DRAWINGS
            </span>
            <h2 className="font-sans text-[26px] md:text-[32px] font-bold text-[#14181C] tracking-[-0.01em]">
              Technical Plates &amp; Trace Graphs
            </h2>
            <ProjectGallery items={project.gallery} sheetNo={project.sheetNo} />
          </section>

          {/* Testimonial Pull-Quote */}
          {project.testimonial && (
            <div className="p-8 md:p-12 border-l-2 border-[#9E5430] bg-[rgba(20,24,28,0.02)]">
              <p className="font-sans text-[20px] md:text-[24px] text-[#14181C] font-medium leading-snug tracking-[-0.01em] mb-6">
                &ldquo;{project.testimonial.quote}&rdquo;
              </p>
              <div className="font-mono text-[11px] text-[#7C7568] tracking-[0.14em]">
                <strong className="text-[#14181C] block">{project.testimonial.author}</strong>
                <span>{project.testimonial.role}</span>
              </div>
            </div>
          )}

          {/* Adjacent Project Navigation */}
          <ProjectNav prev={prev} next={next} />

          {/* Call to action card */}
          <div className="p-8 md:p-12 border border-[rgba(20,24,28,0.16)] bg-[#14181C] text-[#F2EFE8] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-[#C97A4A] tracking-[0.24em] uppercase">
                // COMMISSION AN ARCHITECTURAL SPRINT
              </span>
              <h3 className="font-sans text-[24px] md:text-[28px] font-bold text-[#F2EFE8]">
                Need similar systems built to spec?
              </h3>
              <p className="font-mono text-[12px] text-[#C0B9AA]">
                Our Principal Engineers build and deploy production-grade software and physical architectures on deterministic fixed-price sprints.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href={`/contact?service=${encodeURIComponent(project.discipline)}&notes=${encodeURIComponent(`Inquiry regarding replication or modernizing systems similar to ${project.sheetNo}: ${project.title}`)}`}
                className="btn-spark solid text-[11px] py-3.5 px-6 whitespace-nowrap"
              >
                COMMISSION SPRINT →
              </Link>
              <Link
                href="/#scope-calculator"
                className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.16em] uppercase px-4 py-3.5 border border-[#F2EFE8]/20 text-[#F2EFE8] hover:bg-[#F2EFE8] hover:text-[#14181C] transition-colors whitespace-nowrap"
              >
                ESTIMATE SCOPE
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <DimensionLine label={`${project.sheetNo} // CERTIFIED DRAWING // APACHE SPARK ARCHIVE`} />
      </div>
    </article>
  );
}
