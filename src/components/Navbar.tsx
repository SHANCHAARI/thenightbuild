'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Overview' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'Studio' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full frosted-glass hairline-b transition-colors duration-200">
      <div className="site-container h-18 py-4 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-[var(--ink)] font-display text-base sm:text-lg tracking-tight font-bold hover:opacity-90 transition-opacity"
        >
          <span>Nightbuild Studio</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--green)] group-hover:scale-125 transition-transform" />
        </Link>

        {/* Apple-style Centered Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[var(--surface)]/70 hairline-all rounded-full px-4 py-1.5">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--bg)] text-[var(--ink)] shadow-sm font-semibold'
                    : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[var(--green)] hover:opacity-90 transition-all rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            Start a Build
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            className="p-2 text-[var(--ink)] hover:text-[var(--green)] border border-[var(--line)] rounded-full transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[var(--bg)] hairline-b px-6 py-6 transition-all duration-200">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base py-2.5 flex items-center justify-between hairline-b ${
                    isActive
                      ? 'text-[var(--ink)] font-bold'
                      : 'text-[var(--ink-soft)] hover:text-[var(--ink)]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[var(--green)]" />}
                </Link>
              );
            })}
            <div className="pt-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[var(--green)] rounded-full shadow-sm"
              >
                Start a Build
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
