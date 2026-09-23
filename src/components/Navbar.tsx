'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Overview' },
  { href: '/projects', label: 'Projects' },
  { href: '/blueprint', label: 'Blueprint', badge: 'Tool' },
  { href: '/about', label: 'Studio' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full pt-4 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto liquid-glass-pill rounded-full px-5 sm:px-7 py-3 flex items-center justify-between shadow-lg">
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-[var(--ink)] font-display text-sm sm:text-base tracking-tight font-bold hover:opacity-85 transition-opacity"
        >
          <div className="w-7 h-7 rounded-xl bg-black flex items-center justify-center text-white border border-[var(--green)]/50 group-hover:border-[var(--green)] transition-all shadow-sm group-hover:scale-105">
            <svg
              viewBox="0 0 100 60"
              fill="currentColor"
              className="w-4 h-4 text-white group-hover:text-emerald-400 transition-colors"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M50 10 C46 18, 43 21, 37 22 C33 17, 27 15, 19 14 C23 21, 23 27, 20 33 C12 33, 4 29, 0 22 C2 36, 10 45, 24 49 C20 55, 21 59, 26 60 C32 53, 38 49, 44 48 C47 50, 48 53, 50 56 C52 53, 53 50, 56 48 C62 49, 68 53, 74 60 C79 59, 80 55, 76 49 C90 45, 98 36, 100 22 C96 29, 88 33, 80 33 C77 27, 77 21, 81 14 C73 15, 67 17, 63 22 C57 21, 54 18, 50 10 Z" />
            </svg>
          </div>
          <span>Nightbuild Studio</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--green)] group-hover:scale-150 transition-transform duration-300" />
        </Link>

        {/* Apple-style Centered Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ease-apple flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[var(--ink)] text-[var(--bg)] shadow-sm font-semibold'
                    : 'text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--surface)]/50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                    isActive ? 'bg-[var(--bg)] text-[var(--ink)]' : 'bg-[var(--green-soft)] text-[var(--green)] font-bold'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[var(--green)] hover:opacity-90 transition-all duration-300 ease-apple rounded-full shadow-sm hover:scale-[1.03] active:scale-[0.97]"
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
            className="p-2 text-[var(--ink)] hover:text-[var(--green)] rounded-full transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto mt-3 liquid-glass rounded-3xl p-6 transition-all duration-300 ease-apple">
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
                  <div className="flex items-center gap-2">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--green-soft)] text-[var(--green)] font-semibold uppercase">
                        {link.badge}
                      </span>
                    )}
                  </div>
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
