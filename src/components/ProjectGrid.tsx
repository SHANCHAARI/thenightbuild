'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project, ProjectTag } from '@/types';
import { ExternalLink } from 'lucide-react';

interface ProjectGridProps {
  initialProjects: Project[];
}

const FILTER_TAGS: ProjectTag[] = ['All', 'Client Site', 'Student Project', 'Concept Build'];

export function ProjectGrid({ initialProjects }: ProjectGridProps) {
  const [selectedTag, setSelectedTag] = useState<ProjectTag>('All');

  const filteredProjects =
    selectedTag === 'All'
      ? initialProjects
      : initialProjects.filter((project) =>
          project.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
        );

  return (
    <div className="w-full space-y-10">
      {/* Apple-style Segmented Pill Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-8">
        <div className="inline-flex flex-wrap items-center p-1.5 rounded-full bg-[var(--surface)] hairline-all gap-1 shadow-sm">
          {FILTER_TAGS.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isSelected
                    ? 'bg-[var(--bg)] text-[var(--ink)] shadow-sm font-semibold'
                    : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-[var(--ink-soft)] font-mono">
          Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'build' : 'builds'}
        </span>
      </div>

      {/* Responsive Auto-Adjusting Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-24 text-center rounded-3xl bg-[var(--surface)]/50 hairline-all p-8">
          <p className="text-sm text-[var(--ink-soft)]">
            No projects found under this classification tag.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col justify-between bg-[var(--bg)] hairline-all hover:border-[var(--green)]/50 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300 p-6 rounded-3xl"
            >
              <div>
                {/* Media Preview */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[var(--surface)] hairline-all mb-6">
                  {project.thumbnail_url ? (
                    <Image
                      src={project.thumbnail_url}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[var(--ink-soft)]">
                      Visual Record Pending
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-3 py-1 bg-[var(--green-soft)] text-[var(--green)] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title & Hook */}
                <h3 className="display-heading text-xl sm:text-2xl text-[var(--ink)] group-hover:text-[var(--green)] transition-colors mb-2">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-6">
                  {project.hook}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-5 hairline-t flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                  {project.tech_stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] text-[var(--ink-soft)] font-mono px-2 py-0.5 rounded-md bg-[var(--surface)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--ink-soft)] hover:text-[var(--green)] transition-colors"
                      aria-label={`Open live site for ${project.title}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs font-semibold text-[var(--ink)] group-hover:text-[var(--green)] transition-colors"
                  >
                    View Study
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
