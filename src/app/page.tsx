import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Hero } from '@/components/Hero';
import { getProjects } from '@/lib/supabase';
import { ExternalLink, Terminal, Zap, ShieldCheck } from 'lucide-react';

export const revalidate = 60;

export default async function HomePage() {
  const allProjects = await getProjects();
  const featuredProjects = allProjects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="w-full">
      {/* 1. Fluid Hero Section */}
      <Hero />

      {/* 2. Selected Works Showcase */}
      <section className="w-full py-20 lg:py-28 hairline-b">
        <div className="site-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--green)] mb-3">
                <span>Selected Works</span>
              </div>
              <h2 className="display-heading text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
                Crafted for founders & CS researchers.
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--ink)] bg-[var(--surface)]/70 hover:bg-[var(--surface)] hairline-all transition-all rounded-full hover:scale-[1.02] active:scale-[0.98] self-start md:self-end"
            >
              View Full Portfolio Archive
            </Link>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col justify-between bg-[var(--bg)] hairline-all hover:border-[var(--green)]/50 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300 p-6 rounded-3xl"
              >
                <div>
                  {/* Thumbnail */}
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
                        No Preview Available
                      </div>
                    )}
                  </div>

                  {/* Metadata Tags */}
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

                {/* Card Footer: Tech Stack & Link */}
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
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs font-semibold text-[var(--ink)] group-hover:text-[var(--green)] transition-colors"
                  >
                    View Study
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Apple-Style Bento Grid: "The Workshop Method" */}
      <section className="w-full py-20 lg:py-28 bg-[var(--surface)] hairline-b">
        <div className="site-container">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg)] hairline-all text-xs font-semibold text-[var(--green)] mb-3 shadow-sm">
              <span>The Engineering Method</span>
            </div>
            <h2 className="display-heading text-3xl sm:text-5xl text-[var(--ink)] tracking-tight mb-4">
              How we construct digital artifacts.
            </h2>
            <p className="text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
              We operate as a nocturnal engineering lab, replacing agency bloat with direct code
              prototyping, edge performance, and complete repository ownership.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Bento Card 1: 48h Prototyping */}
            <div className="md:col-span-7 bg-[var(--bg)] hairline-all rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--surface)] hairline-all flex items-center justify-center text-[var(--green)]">
                  <Terminal className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="display-heading text-2xl text-[var(--ink)]">
                  48-Hour Midnight Prototyping
                </h3>
                <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed max-w-xl">
                  We skip weeks of static Figma deliberation. Within 48 hours of kickoff, you receive
                  a live URL sandbox with interactive layout physics, responsive shaders, and real
                  browser DOM.
                </p>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-[var(--surface)]/60 hairline-all font-mono text-xs text-[var(--ink-soft)] space-y-1">
                <p className="text-[var(--green)] font-semibold">// Live Workshop Compilation</p>
                <p>$ git checkout -b feature/interactive-physics</p>
                <p className="text-[var(--ink)]">$ pnpm build --benchmark: 0.74s [PASS]</p>
              </div>
            </div>

            {/* Bento Card 2: Zero-Bloat Performance */}
            <div className="md:col-span-5 bg-[var(--bg)] hairline-all rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--surface)] hairline-all flex items-center justify-center text-[var(--green)]">
                  <Zap className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="display-heading text-2xl text-[var(--ink)]">
                  Sub-Second Performance
                </h3>
                <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed">
                  Every byte must justify its existence. Hand-tuned WebGL buffers, edge routing, and
                  zero hydration thrash guarantee instantaneous mobile loads.
                </p>
              </div>

              <div className="mt-8 pt-6 hairline-t flex items-baseline justify-between">
                <div>
                  <span className="display-title text-4xl text-[var(--ink)] font-bold">98+</span>
                  <span className="block text-xs text-[var(--ink-soft)] mt-0.5">Average Lighthouse Score</span>
                </div>
                <div className="text-right">
                  <span className="display-title text-4xl text-[var(--green)] font-bold">&lt;0.8s</span>
                  <span className="block text-xs text-[var(--ink-soft)] mt-0.5">Global Edge TTFB</span>
                </div>
              </div>
            </div>

            {/* Bento Card 3: Complete Ownership */}
            <div className="md:col-span-12 bg-[var(--bg)] hairline-all rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-[var(--green)] text-xs font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Direct Delivery Guarantee</span>
                </div>
                <h3 className="display-heading text-2xl text-[var(--ink)]">
                  Clean Handover & Full Code Ownership
                </h3>
                <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed">
                  You receive clean Next.js App Router repositories, documented Supabase schemas, and
                  zero proprietary vendor lock-in. Full IP rights transfer immediately upon project completion.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[var(--green)] hover:opacity-90 transition-all rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  Commission a Build
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Cinematic Lab Transmission Reel */}
      <section className="w-full py-20 lg:py-28 hairline-b">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--green)]">
                <span>Lab Transmission</span>
              </div>
              <h2 className="display-heading text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
                Behind the screen in the midnight studio.
              </h2>
              <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed">
                Watch our raw development stream capturing real-time shader compilation, WebGL
                particle optimization, and client sprint debriefs. We document our engineering process
                publicly.
              </p>
              <div>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--ink)] hover:text-[var(--green)] transition-all"
                >
                  <span>Watch on YouTube Shorts</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-video w-full bg-[var(--surface)] hairline-all rounded-3xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&rel=0&playsinline=1"
                  title="Nightbuild Studio Reel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Apple-Style CTA Banner */}
      <section className="w-full py-20 lg:py-28 bg-[var(--bg)]">
        <div className="site-container">
          <div className="rounded-3xl bg-[var(--surface)] hairline-all p-10 sm:p-16 lg:p-20 text-center max-w-5xl mx-auto space-y-8 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--bg)] hairline-all text-xs font-semibold text-[var(--green)]">
              <span>Ready for Launch</span>
            </div>
            <h2 className="display-title text-3xl sm:text-5xl lg:text-6xl text-[var(--ink)] max-w-3xl mx-auto leading-tight">
              Have a build that requires unconventional craft?
            </h2>
            <p className="text-base sm:text-lg text-[var(--ink-soft)] max-w-2xl mx-auto leading-relaxed">
              Whether you are an ambitious founder ready to launch an unmistakable product site, or a
              fellow CS student needing a high-grade capstone implementation, our midnight workshop
              is ready.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-[var(--green)] hover:opacity-90 transition-all rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                Inquire With The Studio
              </Link>
              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink)] bg-[var(--bg)] hover:bg-[var(--surface)] hairline-all transition-all rounded-full hover:scale-[1.02] active:scale-[0.98]"
              >
                Inspect Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
