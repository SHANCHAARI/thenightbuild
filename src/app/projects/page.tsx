import React from 'react';
import type { Metadata } from 'next';
import { getProjects } from '@/lib/supabase';
import { ProjectGrid } from '@/components/ProjectGrid';

export const metadata: Metadata = {
  title: 'Portfolio & Archive — Nightbuild Studio',
  description:
    'Explore our live archive of bespoke client web platforms, interactive creative tools, and CS capstone projects.',
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
            <span>Workshop Archive</span>
          </div>
          <h1 className="display-title text-4xl sm:text-6xl lg:text-7xl text-[var(--ink)] tracking-tight">
            Built with intention. Tested in production.
          </h1>
          <p className="text-base sm:text-xl text-[var(--ink-soft)] leading-relaxed">
            Every entry in this registry was designed and coded from scratch during midnight studio
            sessions. Filter between bespoke commercial deployments, CS capstones, and experimental
            creative tools.
          </p>
        </div>

        {/* Interactive Segmented Filter & Responsive Grid */}
        <ProjectGrid initialProjects={projects} />
      </div>
    </div>
  );
}
