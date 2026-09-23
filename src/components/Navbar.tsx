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
