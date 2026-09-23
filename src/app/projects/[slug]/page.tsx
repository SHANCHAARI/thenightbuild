import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectBySlug, getProjects } from '@/lib/supabase';
import { ExternalLink, ArrowLeft } from 'lucide-react';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return { title: 'Project Not Found — Nightbuild Studio' };
  }
  return {
    title: `${project.title} — Case Study | Nightbuild Studio`,
    description: project.hook,
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="w-full py-12 sm:py-20">
      <div className="site-container">
        {/* Navigation Breadcrumb Pill */}
        <div className="mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects Archive</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="space-y-6 pb-12 hairline-b">
          <div className="flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3.5 py-1 bg-[var(--green-soft)] text-[var(--green)] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="display-title text-4xl sm:text-6xl lg:text-7xl text-[var(--ink)] leading-tight max-w-5xl">
            {project.title}
          </h1>

          <p className="text-lg sm:text-2xl text-[var(--ink-soft)] leading-relaxed max-w-4xl font-normal">
            {project.hook}
          </p>

          {/* Apple-style Specs Grid */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-[var(--surface)]/70 hairline-all">
              <p className="font-semibold text-[var(--ink)]">Client / Context</p>
              <p className="text-[var(--ink-soft)] mt-1">{project.client || 'Nightbuild Atelier'}</p>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--surface)]/70 hairline-all">
              <p className="font-semibold text-[var(--ink)]">Year</p>
              <p className="text-[var(--ink-soft)] mt-1">{project.year || '2026'}</p>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--surface)]/70 hairline-all">
              <p className="font-semibold text-[var(--ink)]">Engineering Role</p>
              <p className="text-[var(--ink-soft)] mt-1">{project.role || 'Full-Stack Architecture'}</p>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--surface)]/70 hairline-all">
              <p className="font-semibold text-[var(--ink)]">Live Deployment</p>
              {project.live_url ? (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-[var(--green)] font-semibold hover:underline"
                >
                  <span>Visit Domain</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <p className="text-[var(--ink-soft)] mt-1">Internal Build</p>
              )}
            </div>
          </div>
        </header>

        {/* Primary Visual Media / Video */}
        <section className="py-14 hairline-b">
          {project.video_embed_url ? (
            <div className="space-y-4">
              <div className="relative aspect-video w-full bg-[var(--surface)] hairline-all rounded-3xl overflow-hidden shadow-2xl">
                <iframe
                  src={project.video_embed_url}
                  title={`${project.title} Video Reel`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
              <p className="text-xs text-[var(--ink-soft)] italic px-2">
                Interactive video demonstration recorded in the midnight studio lab.
              </p>
            </div>
          ) : project.thumbnail_url ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl hairline-all bg-[var(--surface)] shadow-2xl">
              <Image
                src={project.thumbnail_url}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1536px) 100vw, 1536px"
                className="object-cover"
              />
            </div>
          ) : null}
        </section>

        {/* Narrative Deep Dive */}
        <section className="py-16 space-y-16 hairline-b">
          {/* 1. The Concept */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            <div className="md:col-span-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--green)] mb-3">
                <span>01 Concept</span>
              </div>
              <h2 className="display-heading text-2xl sm:text-3xl text-[var(--ink)]">
                The Creative Idea
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4">
              <p className="text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* 2. The Challenge */}
          {project.challenge && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 hairline-t pt-16">
              <div className="md:col-span-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--green)] mb-3">
                  <span>02 Challenge</span>
                </div>
                <h2 className="display-heading text-2xl sm:text-3xl text-[var(--ink)]">
                  The Technical Bottleneck
                </h2>
              </div>
              <div className="md:col-span-8 space-y-4">
                <p className="text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            </div>
          )}

          {/* 3. The Architecture */}
          {project.solution && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 hairline-t pt-16">
              <div className="md:col-span-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--green)] mb-3">
                  <span>03 Engineering</span>
                </div>
                <h2 className="display-heading text-2xl sm:text-3xl text-[var(--ink)]">
                  The Architectural Solution
                </h2>
              </div>
              <div className="md:col-span-8 space-y-4">
                <p className="text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          )}

          {/* 4. Full Tech Stack Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 hairline-t pt-16">
            <div className="md:col-span-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--green)] mb-3">
                <span>04 Tooling</span>
              </div>
              <h2 className="display-heading text-2xl sm:text-3xl text-[var(--ink)]">
                Technologies & APIs
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="flex flex-wrap gap-2.5">
                {project.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-xs font-mono bg-[var(--surface)] text-[var(--ink)] hairline-all rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live CTA Bar */}
        <section className="pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="display-heading text-2xl text-[var(--ink)]">
              Interested in a build like this?
            </h3>
            <p className="text-sm text-[var(--ink-soft)]">
              We engineer tailored web solutions and novel student capstones.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--ink)] bg-[var(--surface)] hairline-all hover:border-[var(--green)] hover:text-[var(--green)] transition-all rounded-full"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[var(--green)] hover:opacity-90 transition-all rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Your Project
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
