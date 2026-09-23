import React from 'react';
import type { Metadata } from 'next';
import { getProjects } from '@/lib/supabase';
import { ProjectGrid } from '@/components/ProjectGrid';

export const metadata: Metadata = {
  title: 'Open-Source Showcase — Nightbuild Studio',
  description:
    'A curated showcase of genuinely useful open-source products and student capstones we study and admire — with full credit to their original creators.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="w-full py-16 sm:py-24">
      <div className="site-container">
        {/* Expansive Header */}
        <div className="max-w-4xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--green)]">
            <span>Open-Source Showcase</span>
          </div>
          <h1 className="display-title text-4xl sm:text-6xl lg:text-7xl text-[var(--ink)] tracking-tight">
            Builds we study. Standards we chase.
          </h1>
          <p className="text-base sm:text-xl text-[var(--ink-soft)] leading-relaxed">
            A curated collection of genuinely useful, independently built open-source products —
            from world-famous tools to standout student capstones from our own community. Every
            entry credits its original creators and links to the real project. As our own builds
            ship, they will graduate into this archive alongside them.
          </p>
        </div>

        {/* Interactive Segmented Filter & Responsive Grid */}
        <ProjectGrid initialProjects={projects} />
      </div>
    </div>
  );
}
