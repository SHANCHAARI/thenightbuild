'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('nightbuild-theme') as 'light' | 'dark' | null;
    if (stored === 'light') {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      setTheme('dark');
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('nightbuild-theme', next);
  };

  if (!mounted) {
    // SSR: render the toggle shell statically so exported HTML keeps the theme button
    return (
      <button
        type="button"
        aria-label="Switch to light theme"
        className="w-9 h-9 flex items-center justify-center text-[var(--ink-soft)] rounded-full border border-[var(--line)] bg-[var(--surface)]/60"
      >
        <Sun className="w-4 h-4 stroke-[1.75]" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="w-9 h-9 flex items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)] hover:border-[var(--green)] transition-all rounded-full border border-[var(--line)] bg-[var(--surface)]/60 hover:bg-[var(--surface)]"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 stroke-[1.75]" />
      ) : (
        <Moon className="w-4 h-4 stroke-[1.75]" />
      )}
    </button>
  );
}
