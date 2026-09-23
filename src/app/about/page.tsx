import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, Twitter, Globe, Linkedin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About The Studio — Nightbuild Studio',
  description:
    'The story behind Nightbuild Studio: a student-run creative web engineering agency crafting unconventional digital artifacts at midnight.',
};

interface TeamMember {
  name: string;
  role: string;
  focus: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Nirmal Kumar',
    role: 'Co-Founder & Systems / Full-Stack Engineer',
    focus: 'Next.js architecture, edge services, API integration, and full-stack performance.',
    linkedin: 'https://www.linkedin.com/in/nirmal-kumar-a43a56392',
    github: 'https://github.com',
  },
  {
    name: 'Pusarla Aakash',
    role: 'Co-Founder & Creative Technologist',
    focus: 'Interactive UI systems, motion choreography, responsive design systems, and frontend craft.',
    linkedin: 'https://www.linkedin.com/in/pusarla-aakash-79b9a9392?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    github: 'https://github.com',
  },
  {
    name: 'Vidya Sagar',
    role: 'Co-Founder & Backend / Platform Engineer',
    focus: 'Cloud architecture, distributed workflows, database design, and algorithmic systems.',
    linkedin: 'https://www.linkedin.com/in/vidyasagarcodes/',
    github: 'https://github.com',
  },
  {
    name: 'Pusarla Manoj Kumar',
    role: 'Co-Founder & Cloud Infrastructure / Security Lead',
    focus: 'Cloud security protocols, edge deployment automation, infrastructure hardening, and CI/CD pipelines.',
    linkedin: 'https://www.linkedin.com/in/pusarla-manoj-kumar-b3454a3b3',
    github: 'https://github.com',
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
              Nightbuild Studio was founded by a collective of computer science students
              who grew restless watching agencies churn out identical, beige corporate templates.
              We noticed two worlds that desperately needed each other: visionary founders who
              wanted unconventional web presence, and CS researchers building groundbreaking
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
              Computer science students, systems builders, and interface artisans.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="bg-[var(--bg)] hairline-all rounded-3xl p-8 space-y-5 hover:border-[var(--green)]/50 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="display-heading text-xl text-[var(--ink)]">{member.name}</h3>
                    <p className="text-xs font-semibold text-[var(--green)] mt-1">{member.role}</p>
                  </div>

                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{member.focus}</p>
                </div>

                <div className="pt-4 hairline-t flex items-center gap-3 text-[var(--ink-soft)]">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface)] hover:bg-[var(--surface)]/80 hover:text-[var(--green)] text-xs font-medium transition-colors hairline-all"
                      aria-label={`${member.name} LinkedIn profile`}
                    >
                      <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[var(--surface)] hover:text-[var(--green)] transition-colors hairline-all"
                      aria-label={`${member.name} GitHub profile`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="hairline-t pt-16">
          <div className="liquid-glass rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
            <h2 className="display-heading text-3xl sm:text-4xl text-[var(--ink)]">
              Have an ambitious build in mind?
            </h2>
            <p className="text-sm sm:text-base text-[var(--ink-soft)] max-w-xl mx-auto">
              We review new client and CS capstone proposals every midnight. No bureaucracy, just
              direct architecture conversations with our engineers.
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[var(--green)] rounded-full hover:opacity-90 transition-all ease-apple hover:scale-[1.03]"
              >
                <span>Initiate a Commission</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
