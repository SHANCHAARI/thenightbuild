import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-[var(--bg)] hairline-t text-sm mt-24 transition-colors duration-200">
      <div className="site-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-12 hairline-b">
          {/* Studio Hook */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold tracking-tight text-[var(--ink)]">
                Nightbuild Studio
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" />
            </div>
            <p className="text-[var(--ink-soft)] max-w-md text-sm leading-relaxed">
              An independent, student-run creative web engineering agency. We architect high-craft
              web applications, bespoke client showcases, and ambitious CS capstone projects.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--ink-soft)] pt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
              <span>Studio Active — 02:00 AM Workshop Hours</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs uppercase font-bold tracking-wider text-[var(--ink)]">Directory</p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="text-[var(--ink-soft)] hover:text-[var(--green)] transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-[var(--ink-soft)] hover:text-[var(--green)] transition-colors">
                  Portfolio & Archive
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[var(--ink-soft)] hover:text-[var(--green)] transition-colors">
                  Studio Story & Craft
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--ink-soft)] hover:text-[var(--green)] transition-colors">
                  Inquire & Estimate
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs uppercase font-bold tracking-wider text-[var(--ink)]">Transmission</p>
            <ul className="space-y-2 text-xs text-[var(--ink-soft)]">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--green)] transition-colors"
                >
                  GitHub / Nightbuild-Lab
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--green)] transition-colors"
                >
                  Twitter / @thenightbuild
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--green)] transition-colors"
                >
                  Instagram / @nightbuildstudio
                </a>
              </li>
              <li>
                <a
                  href="mailto:nigthbulid@gmail.com"
                  className="text-xs opacity-75 hover:opacity-100 hover:text-[var(--green)] transition-colors font-mono"
                >
                  nigthbulid@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--ink-soft)]">
          <p>© {new Date().getFullYear()} Nightbuild Studio. Hand-crafted at midnight. No templates.</p>
          <p className="flex items-center gap-1">
            <span>Engineered with Next.js & Supabase</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
