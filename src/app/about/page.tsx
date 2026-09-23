import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, Twitter, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About The Studio — Nightbuild Studio',
  description:
    'The story behind Nightbuild Studio: a student-run creative web engineering agency crafting unconventional digital artifacts at midnight.',
};

interface TeamMember {
  name: string;
  role: string;
  focus: string;
  github?: string;
  twitter?: string;
  website?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Kaelen Vance',
    role: 'Co-Founder & Creative Systems Lead',
    focus: 'WebGL shaders, Web Audio DSP, and high-performance tactile interfaces.',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },
  {
    name: 'Mira Thorne',
    role: 'Co-Founder & Architecture Lead',
    focus: 'Distributed systems, Next.js App Router, edge runtimes, and database design.',
    github: 'https://github.com',
    website: 'https://thenightbuild.dev',
  },
  {
    name: 'Devin Zhao',
    role: 'Creative Developer & Capstone Engineer',
    focus: 'Wasm compilation, micro-interactions, hardware simulations, and typography.',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },
];

export default function AboutPage() {
  return (
    <div className="w-full py-16 sm:py-24">
      <div className="site-container space-y-24">
        {/* Story Intro */}
        <section className="space-y-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--green)]">
            <span>Origin & Manifesto</span>
          </div>

          <h1 className="display-title text-4xl sm:text-6xl lg:text-7xl text-[var(--ink)] leading-tight tracking-tight">
            Born in university computer labs between 11 PM and 4 AM.
          </h1>

          <div className="space-y-6 text-base sm:text-xl text-[var(--ink-soft)] leading-relaxed font-normal">
            <p>
              Nightbuild Studio was founded by a collective of final-year computer science students
              who grew restless watching agencies churn out identical, beige corporate templates.
              We noticed two worlds that desperately needed each other: visionary founders who
              wanted unconventional web presence, and senior CS researchers building groundbreaking
              capstone engines without an interface worthy of their code.
            </p>
            <p>
              We established a single rule: <strong className="text-[var(--ink)]">our portfolio is our only marketing</strong>. 
              We don&apos;t run cold sales cadences or produce 40-slide sales pitches. Every hour of our
              energy is poured into shipping undeniable digital artifacts that command attention on
              their own merits.
            </p>
          </div>
        </section>

        {/* Studio Principles (Apple Bento Grid) */}
        <section className="hairline-t pt-16">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--green)] mb-3">
              <span>Core Tenets</span>
            </div>
            <h2 className="display-heading text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
              How we approach every build.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--surface)]/60 hairline-all rounded-3xl p-8 space-y-4">
              <span className="text-xs font-mono font-bold text-[var(--green)]">01 / Ideation</span>
              <h3 className="display-heading text-xl text-[var(--ink)]">Scaffold in Code</h3>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                Figma is a compass, not the destination. The nuances of frame rate, scroll physics,
                and responsive text elasticity only become real once rendered in actual browser DOM.
              </p>
            </div>

            <div className="bg-[var(--surface)]/60 hairline-all rounded-3xl p-8 space-y-4">
              <span className="text-xs font-mono font-bold text-[var(--green)]">02 / Performance</span>
              <h3 className="display-heading text-xl text-[var(--ink)]">Sub-Second Baseline</h3>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                Visual boldness cannot come at the cost of network punishment. We hand-tune asset
                budgets, compress shader pipelines, and leverage edge databases for instantaneous
                traversal.
              </p>
            </div>

            <div className="bg-[var(--surface)]/60 hairline-all rounded-3xl p-8 space-y-4">
              <span className="text-xs font-mono font-bold text-[var(--green)]">03 / Authorship</span>
              <h3 className="display-heading text-xl text-[var(--ink)]">No Anonymous Work</h3>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                Every client site and student capstone is treated as a landmark publication. We sign
                our source code, document our architecture publicly, and stand behind every release.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section (Apple-style sleek cards) */}
        <section className="hairline-t pt-16">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--green)] mb-3">
              <span>The Collective</span>
            </div>
            <h2 className="display-heading text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
              Engineers & creative technologists.
            </h2>
            <p className="text-base text-[var(--ink-soft)] mt-2">
              Student researchers, systems tinkerers, and front-end artisans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-[var(--bg)] hairline-all rounded-3xl p-8 space-y-5 hover:border-[var(--green)]/50 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300"
              >
                <div>
                  <h3 className="display-heading text-xl text-[var(--ink)]">{member.name}</h3>
                  <p className="text-xs font-semibold text-[var(--green)] mt-1">{member.role}</p>
                </div>

                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{member.focus}</p>

                <div className="pt-4 hairline-t flex items-center gap-3 text-[var(--ink-soft)]">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[var(--surface)] hover:text-[var(--green)] transition-colors"
                      aria-label={`${member.name} GitHub profile`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[var(--surface)] hover:text-[var(--green)] transition-colors"
                      aria-label={`${member.name} Twitter profile`}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.website && (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[var(--surface)] hover:text-[var(--green)] transition-colors"
                      aria-label={`${member.name} Personal site`}
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Direct Link to Inquire */}
        <section className="hairline-t pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="display-heading text-2xl text-[var(--ink)]">
              Ready to create something memorable?
            </h3>
            <p className="text-sm text-[var(--ink-soft)]">
              Let&apos;s build an unforgettable site or bring your capstone engineering to life.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[var(--green)] hover:opacity-90 transition-all rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            Start A Conversation
          </Link>
        </section>
      </div>
    </div>
  );
}
