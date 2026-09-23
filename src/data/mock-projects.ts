import { Project } from '@/types';

/**
 * CURATED OPEN-SOURCE SHOWCASE
 * =============================================================================
 * These are real, useful, independently-built open-source products that we
 * admire and study. They are NOT Nightbuild builds — the original creators
 * own their work, and each entry credits them and links to the live product
 * and the repository. We feature them here as reference points for the
 * standard of craft we hold our own builds to.
 * =============================================================================
 */
export const MOCK_PROJECTS: Project[] = [
  {
    id: 'showcase-excalidraw',
    title: 'Excalidraw',
    slug: 'excalidraw',
    hook: 'Virtual whiteboard for sketching hand-drawn style diagrams — 130k+ stars.',
    description:
      'A canvas-based collaborative whiteboard that renders diagrams with a hand-drawn feel. Started as a weekend experiment and grew into one of the most-loved open-source design tools on the internet, used by engineers at every major tech company. End-to-end encrypted collaboration, infinite canvas, and a plugin ecosystem.',
    tags: ['Open Source Spotlight', 'Productivity Tool'],
    tech_stack: ['TypeScript', 'React', 'Canvas API', 'PWA'],
    thumbnail_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1600&auto=format&fit=crop',
    video_embed_url: null,
    live_url: 'https://excalidraw.com',
    featured: true,
    created_at: '2020-01-01T00:00:00Z',
    client: 'by Excalidraw contributors — created by Christopher Chedeau (@vjeux) & team',
    year: '2020',
    role: 'Featured open-source build · not a Nightbuild project',
    challenge:
      'Diagramming tools were either heavyweight desktop apps or clunky web apps that lost the sketch-like spontaneity of a whiteboard session.',
    solution:
      'A zero-install web canvas with a hand-drawn rendering engine, real-time encrypted collaboration, and an embeddable React component — proof that a browser tool can feel as natural as pen and paper.',
  },
  {
    id: 'showcase-hoppscotch',
    title: 'Hoppscotch',
    slug: 'hoppscotch',
    hook: 'Open-source API development ecosystem — a Postman alternative, 80k+ stars.',
    description:
      'A lightweight, web-native API development suite for REST, GraphQL, WebSocket, and more. Built to run entirely in the browser with offline support, it became the go-to open-source Postman alternative for millions of developers worldwide.',
    tags: ['Open Source Spotlight', 'Developer Tool'],
    tech_stack: ['Vue', 'TypeScript', 'PWA', 'WebSockets', 'Service Workers'],
    thumbnail_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
    video_embed_url: null,
    live_url: 'https://hoppscotch.io',
    featured: true,
    created_at: '2019-08-21T13:15:24Z',
    client: 'by Hoppscotch — created by Liyas Thomas (@liyasthomas)',
    year: '2019',
    role: 'Featured open-source build · not a Nightbuild project',
    challenge:
      'Existing API clients were Electron-heavy, slow to start, and locked their best features behind paywalls — a barrier for students and indie developers.',
    solution:
      'An instant-loading PWA that needs no installation, works offline, syncs to your cloud of choice, and keeps every core feature free and open under MIT.',
  },
  {
    id: 'showcase-ish',
    title: 'iSH',
    slug: 'ish',
    hook: 'Linux shell running natively on iOS via a full x86 emulator — 20k+ stars.',
    description:
      'A project that runs an Alpine Linux shell directly on iPhone and iPad using a user-mode x86 emulator. An extraordinary systems-engineering feat: a complete virtual machine, terminal emulator, and package manager living inside the iOS sandbox.',
    tags: ['Open Source Spotlight', 'Systems Engineering'],
    tech_stack: ['C', 'Objective-C', 'x86 Emulation', 'Alpine Linux'],
    thumbnail_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
    video_embed_url: null,
    live_url: 'https://ish.app',
    featured: true,
    created_at: '2017-05-05T00:10:35Z',
    client: 'by iSH — created by Theodore Dubois (@tbodt) & contributors',
    year: '2017',
    role: 'Featured open-source build · not a Nightbuild project',
    challenge:
      'iOS sandboxing forbids just-in-time compilation, so running a foreign-architecture OS normally requires jailbreaking the device.',
    solution:
      'A pure interpreter-based x86-to-ARM emulator that respects every App Store rule — running apt, python, and vim on a phone at usable speeds, the hard way.',
  },
  {
    id: 'showcase-caldiy',
    title: 'Cal.com (cal.diy)',
    slug: 'cal-diy',
    hook: 'Open scheduling infrastructure for everyone — the Calendly alternative, 48k+ stars.',
    description:
      'A full scheduling platform — event types, availability logic, calendar sync, video links, team routing — shipped as open source so anyone can self-host their own scheduling stack. A masterclass in turning a simple idea into production infrastructure.',
    tags: ['Open Source Spotlight', 'SaaS Platform'],
    tech_stack: ['Next.js', 'TypeScript', 'Prisma', 'tRPC', 'PostgreSQL'],
    thumbnail_url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1600&auto=format&fit=crop',
    video_embed_url: null,
    live_url: 'https://cal.com',
    featured: false,
    created_at: '2021-03-22T13:47:42Z',
    client: 'by Cal.com — created by Alex vanOverbeek, Bailey Pumfleet & Sean Brydon',
    year: '2021',
    role: 'Featured open-source build · not a Nightbuild project',
    challenge:
      'Scheduling is deceptively complex — timezones, recurring events, calendar round-trips, and double-booking races — and closed SaaS meant no data ownership.',
    solution:
      'A complete open-source scheduling core with 100+ app integrations, self-hostable end to end, and an API platform other companies build on top of.',
  },
  {
    id: 'showcase-dub',
    title: 'Dub',
    slug: 'dub',
    hook: 'Modern open-source link attribution platform — 24k+ stars, loved by marketing teams.',
    description:
      'Short links with serious analytics: geolocation, device targeting, conversion tracking, QR codes, and an API for custom domains. Started by a solo student builder and grown into infrastructure used by companies like Framer and Perplexity.',
    tags: ['Open Source Spotlight', 'Analytics Platform'],
    tech_stack: ['Next.js', 'TypeScript', 'Upstash Redis', 'PostgreSQL', 'Tailwind CSS'],
    thumbnail_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1600&auto=format&fit=crop',
    video_embed_url: null,
    live_url: 'https://dub.co',
    featured: false,
    created_at: '2023-02-01T00:00:00Z',
    client: 'by Dub — created by Steven Tey (@steventey)',
    year: '2023',
    role: 'Featured open-source build · not a Nightbuild project',
    challenge:
      'Link shorteners were commodity tools with shallow analytics, while enterprise attribution platforms were expensive black boxes.',
    solution:
      'An open middle ground — a beautifully engineered link platform with real-time click analytics, custom domains, and developer-first APIs, free to self-host.',
  },
  {
    id: 'showcase-civiclens',
    title: 'CivicLens',
    slug: 'civiclens',
    hook: 'AI + geospatial civic issue platform: see a problem, prove it, fix it.',
    description:
      'A civic issue intelligence platform combining AI photo analysis, computer vision, geospatial mapping, and citizen verification to track public infrastructure problems from report to resolution. A complete production-quality build with role-based dashboards for citizens, authorities, and admins.',
    tags: ['Open Source Spotlight', 'AI + Civic Tech'],
    tech_stack: ['Next.js 14', 'TypeScript', 'Prisma', 'React-Leaflet', 'NextAuth', 'Recharts'],
    thumbnail_url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1600&auto=format&fit=crop',
    video_embed_url: null,
    live_url: 'https://github.com/SHANCHAARI/civiclens',
    featured: true,
    created_at: '2026-09-01T00:00:00Z',
    client: 'by SHANCHAARI — a student-built capstone from our own community',
    year: '2026',
    role: 'Featured community build · not a Nightbuild client project',
    challenge:
      'Public infrastructure complaints vanish into bureaucratic black holes — citizens never learn if their report was seen, prioritized, or fixed.',
    solution:
      'A full issue lifecycle with AI-powered classification and severity scoring, duplicate detection, priority queues, hotspot maps, and citizen verification loops that close the accountability gap.',
  },
  {
    id: 'showcase-agririsk',
    title: 'AgriRisk AI',
    slug: 'agririsk-ai',
    hook: 'Farmer financial intelligence: yield, income & crop-insurance risk predictions.',
    description:
      'An AI-powered agricultural assistant for Indian farmers, banks, and insurers — predicting yields, weather risk scores, and PMFBY-style insurance claims from real farm profiles. Includes farmer, bank-officer, and admin dashboards with a FastAPI ML backend.',
    tags: ['Open Source Spotlight', 'AI for Good'],
    tech_stack: ['Next.js', 'Supabase', 'FastAPI', 'Python', 'scikit-learn', 'RLS'],
    thumbnail_url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1600&auto=format&fit=crop',
    video_embed_url: null,
    live_url: 'https://github.com/SHANCHAARI/AGRIRISK-AI',
    featured: false,
    created_at: '2026-02-26T00:00:00Z',
    client: 'by SHANCHAARI — a student-built hackathon winner from our community',
    year: '2026',
    role: 'Featured community build · not a Nightbuild client project',
    challenge:
      'Small-holder farmers lack data-driven guidance on income risk, loan safety, and insurance claims, while banks lack structured risk views of agricultural portfolios.',
    solution:
      'Deterministic ML scoring with a transparent formula fallback, mobile-first low-bandwidth UI, and role-based dashboards — a production-ready MVP for rural fintech.',
  },
];
