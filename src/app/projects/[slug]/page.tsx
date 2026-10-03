import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectBySlug, getProjects } from '@/lib/supabase';
import { ExternalLink, ArrowLeft, Sparkles, ArrowUpRight } from 'lucide-react';

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
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors shadow-sm hover:scale-[1.02]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects Archive</span>
          </Link>

          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--green)] text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-lg shadow-[var(--green)]/20 transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>Launch Live Site</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          )}
        </div>

        {/* Case Study Header */}
        <header className="space-y-6 pb-12 hairline-b">
          <div className="flex flex-wrap items-center gap-2">
            <span className="liquid-glass-pill inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-[var(--green)]">
              <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
              <span>Flagship Production Build</span>
            </span>
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
              <p className="font-semibold text-[var(--ink)]">Release Year</p>
              <p className="text-[var(--ink-soft)] mt-1">{project.year || '2026'}</p>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--surface)]/70 hairline-all">
              <p className="font-semibold text-[var(--ink)]">Engineering Role</p>
              <p className="text-[var(--ink-soft)] mt-1">{project.role || 'Full-Stack Architecture'}</p>
            </div>
            <div className="p-5 rounded-2xl bg-[var(--surface)]/70 hairline-all">
              <p className="font-semibold text-[var(--ink)]">Live Production Domain</p>
              {project.live_url ? (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-[var(--green)] font-semibold hover:underline"
                >
                  <span className="truncate">{project.live_url.replace('https://', '')}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
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
            <div className="space-y-4">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl hairline-all bg-[var(--surface)] shadow-2xl group">
                <Image
                  src={project.thumbnail_url}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 1536px) 100vw, 1536px"
                  className="object-cover object-top transition-transform duration-700 ease-apple group-hover:scale-[1.01]"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--ink-soft)] px-2">
                <span>Production Application UI — Active Dashboard Interface</span>
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--green)] font-medium hover:underline"
                  >
                    <span>Test Live In Browser</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ) : null}
        </section>

        {/* Architectural Innovations Showcase (Highlights Grid) */}
        {project.highlights && project.highlights.length > 0 && (
          <section className="py-16 hairline-b">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--green)] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Architectural Innovations</span>
              </div>
              <h2 className="display-heading text-3xl sm:text-4xl text-[var(--ink)] tracking-tight">
                Engineering breakthroughs under the hood.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.highlights.map((highlight, index) => (
                <div
                  key={highlight.title}
                  className="liquid-glass rounded-3xl p-7 space-y-3 hover:border-[var(--green)]/50 transition-all duration-300"
                >
                  <span className="text-xs font-mono font-bold text-[var(--green)]">
                    0{index + 1} / Breakthrough
                  </span>
                  <h3 className="display-heading text-xl text-[var(--ink)]">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                    {highlight.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Multi-Viewport Gallery Showcase */}
        {project.screenshots && project.screenshots.length > 1 && (
          <section className="py-16 hairline-b">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--green)] mb-3">
                <span>Visual Systems</span>
              </div>
              <h2 className="display-heading text-3xl sm:text-4xl text-[var(--ink)] tracking-tight">
                Tactile dual-theme design & analytics suite.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.screenshots.map((shot, idx) => {
                const captions = [
                  'Obsidian Dark Mode — Daily Habit Matrix with Streak Shields',
                  'Tactile Biscuit Linen — Zero-Blue Daytime Spectrometry',
                  'Growth Landscape — Topographic Elevation & Exponential Decay Analytics',
                  'Procedural Focus Mode — Document PiP Zen Timer & Web Audio Acoustics',
                ];
                return (
                  <div key={shot} className="space-y-3">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[var(--surface)] hairline-all shadow-xl group">
                      <Image
                        src={shot}
                        alt={`${project.title} View ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-500 ease-apple group-hover:scale-105"
                      />
                    </div>
                    <p className="text-xs font-mono text-[var(--ink-soft)]">
                      Fig {idx + 1} — {captions[idx] || 'System Viewpoint'}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Narrative Deep Dive */}
        <section className="py-16 space-y-16 hairline-b">
          {/* 1. The Concept */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            <div className="md:col-span-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--green)] mb-3">
                <span>01 Concept</span>
              </div>
              <h2 className="display-heading text-2xl sm:text-3xl text-[var(--ink)]">
                The Creative Philosophy
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
              Interested in commissioning a build like this?
            </h3>
            <p className="text-sm text-[var(--ink-soft)]">
              We engineer tailored web solutions, interactive instruments, and novel capstones.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[var(--green)] hover:opacity-90 transition-all rounded-full shadow-lg shadow-[var(--green)]/20 hover:scale-[1.03] active:scale-[0.97]"
              >
                <span>Launch upGrade Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--ink)] bg-[var(--surface)] hairline-all hover:border-[var(--green)] hover:text-[var(--green)] transition-all rounded-full shadow-sm hover:scale-[1.02]"
            >
              Start Your Project
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
