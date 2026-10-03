import { Project } from '@/types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'upgrade-flagship-001',
    title: 'upGrade',
    slug: 'upgrade',
    hook: 'A ritual laboratory for human momentum — offline-first habit engine & focus tracking instrument with Dexie reactive storage, streak forgiveness, and tactile analytics.',
    description:
      'Conceived, designed, and coded by Nightbuild Studio, upGrade is an architectural instrument for daily life that replaces the predatory dopamine traps of conventional habit trackers with calm mathematical momentum. Built with an offline-first reactive Dexie (IndexedDB) architecture, zero-blue spectrometry (warm tactile linen by day, abyssal obsidian #050505 by night), rolling 28-day exponential decay scoring, procedural Web Audio acoustics, and seamless 1-click Supabase cloud backup.',
    tags: ['Client Site', 'Student Project', 'Concept Build'],
    tech_stack: [
      'React 19',
      'TypeScript',
      'Dexie.js (IndexedDB)',
      'Tailwind CSS v4',
      'Framer Motion',
      'Supabase',
      'Web Audio API',
      'Vitest',
    ],
    thumbnail_url: '/projects/upgrade/hero-dashboard.png',
    screenshots: [
      '/projects/upgrade/hero-dashboard.png',
      '/projects/upgrade/biscuit-light.png',
      '/projects/upgrade/trends-heatmap.png',
      '/projects/upgrade/focus-pomodoro.png',
    ],
    highlights: [
      {
        title: 'Rolling 28-Day Exponential Decay',
        desc: 'Weighted momentum curve (lambda = 0.96) where missing a single day dents consistency without destroying months of hard-earned discipline.',
      },
      {
        title: 'Streak Shields & Rest Days',
        desc: 'Earn auto-deploying shields every 14 days of consistency. Configurable scheduled rest days ensure travel or recovery never count against momentum.',
      },
      {
        title: 'Command Bar (⌘K / Ctrl+K)',
        desc: 'Natural language parser enables instantaneous zero-friction keyboard habit logging, focus timers, and quick entries.',
      },
      {
        title: 'Local-First Dexie.js + Supabase Sync',
        desc: 'Zero-latency 0ms execution via IndexedDB, with optional 1-click Supabase cloud backup across multiple devices.',
      },
      {
        title: 'Synthesized Web Audio Acoustics',
        desc: 'Pure browser procedural sound engine generating rain, brown noise, and Parisian cafe acoustics on-the-fly with 0 external audio files.',
      },
    ],
    video_embed_url: null,
    live_url: 'https://upgrade-zeta.vercel.app/',
    featured: true,
    created_at: '2026-10-02T12:00:00Z',
    client: 'The Night Build Studio Lab',
    year: '2026',
    role: 'Full-Stack Architecture, Offline-First Dexie Engine, UI/UX System & DSP Acoustics',
    challenge:
      'Most productivity applications act as high-friction predatory slot machines: they wipe months of discipline over a single missed day, blast cold blue light at midnight, and depend on unstable network connections that introduce latency on every click.',
    solution:
      'We engineered upGrade around architectural restraint and local-first speed. Utilizing Dexie.js (IndexedDB v2), all habit completions and state transitions execute with 0ms local latency. We replaced fragile binary streaks with a rolling 28-day exponential decay momentum curve (lambda = 0.96) and auto-deploying streak shields. We sculpted a warm zero-blue palette (tactile biscuit linen by day, obsidian #050505 by night), procedural soundscapes generated via Web Audio API, and optional 1-click Supabase cloud backup.',
  },
];
