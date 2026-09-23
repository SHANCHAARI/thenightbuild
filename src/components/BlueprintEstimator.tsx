'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Cpu,
  Layers,
  Zap,
  Clock,
  ArrowRight,
  Copy,
  Check,
  Code2,
  Terminal,
  Activity,
  RefreshCw,
} from 'lucide-react';

interface Archetype {
  id: string;
  name: string;
  badge: string;
  description: string;
  baseWeeks: number;
  basePrice: [number, number];
  baseComplexity: number;
  defaultFeatures: string[];
}

interface FeatureOption {
  id: string;
  label: string;
  category: 'core' | 'ai' | 'interactive' | 'scale';
  description: string;
  extraWeeks: number;
  priceDelta: [number, number];
  complexityDelta: number;
  recommendedStack: string;
}

const inrFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
});

export const formatINR = (amt: number): string => `₹${inrFormatter.format(amt)}`;

function formatTimeline(totalWeeks: number): { display: string; unit: string; full: string } {
  if (totalWeeks < 1) {
    const days = Math.max(2, Math.round(totalWeeks * 7));
    return {
      display: `~${days}`,
      unit: days === 1 ? 'day' : 'days',
      full: `~${days} ${days === 1 ? 'day' : 'days'}`,
    };
  }
  const roundedWeeks = Math.round(totalWeeks * 10) / 10;
  const formatted = roundedWeeks % 1 === 0 ? roundedWeeks.toFixed(0) : roundedWeeks.toFixed(1);
  return {
    display: `~${formatted}`,
    unit: 'wks',
    full: `~${formatted} wks`,
  };
}

const ARCHETYPES: Archetype[] = [
  {
    id: 'commercial',
    name: 'Bespoke Commercial Platform',
    badge: 'Founders & Startups',
    description: 'High-conversion, zero-template product site with custom UI, brand storytelling, and scalable CMS/DB.',
    baseWeeks: 1.5,
    basePrice: [35000, 70000],
    baseComplexity: 2,
    defaultFeatures: ['database', 'seo', 'framer'],
  },
  {
    id: 'capstone',
    name: 'CS Capstone & Research Tool',
    badge: 'Students & Academia',
    description: 'Algorithmic web application, academic prototype, or experimental research dashboard built for defense.',
    baseWeeks: 0.8,
    basePrice: [8000, 18000],
    baseComplexity: 3,
    defaultFeatures: ['database', 'ai'],
  },
  {
    id: 'creative',
    name: 'Interactive Creative Showcase',
    badge: 'Studios & Portfolios',
    description: 'Experimental, award-winning visual portfolio featuring bespoke WebGL/Canvas micro-interactions and audio-visuals.',
    baseWeeks: 1.2,
    basePrice: [25000, 50000],
    baseComplexity: 3,
    defaultFeatures: ['framer', 'realtime'],
  },
  {
    id: 'saas',
    name: 'AI-Augmented Micro-SaaS MVP',
    badge: 'Product Validation',
    description: 'Full-stack application with user authentication, billing rails, and LLM-powered intelligence out of the box.',
    baseWeeks: 2.5,
    basePrice: [65000, 140000],
    baseComplexity: 4,
    defaultFeatures: ['database', 'ai', 'billing', 'seo'],
  },
];

const FEATURES: FeatureOption[] = [
  {
    id: 'database',
    label: 'Supabase PostgreSQL + RLS',
    category: 'core',
    description: 'Production-ready relational DB with Row Level Security, auto-generated APIs, and secure schema migrations.',
    extraWeeks: 0.3,
    priceDelta: [4000, 8000],
    complexityDelta: 1.0,
    recommendedStack: 'Supabase + Postgres',
  },
  {
    id: 'ai',
    label: 'Gemini AI Intelligence Gateway',
    category: 'ai',
    description: 'Custom LLM inference pipeline, semantic search, or generative workflows integrated seamlessly via edge API routes.',
    extraWeeks: 0.5,
    priceDelta: [7000, 14000],
    complexityDelta: 1.0,
    recommendedStack: 'Google Gemini 3.6 Flash',
  },
  {
    id: 'framer',
    label: 'Framer Motion Fluidity',
    category: 'interactive',
    description: 'Bespoke entrance choreography, magnetic gestures, scroll-linked parallax, and zero-jank 60FPS fluid physics.',
    extraWeeks: 0.2,
    priceDelta: [3000, 6000],
    complexityDelta: 0.5,
    recommendedStack: 'Framer Motion + Tailwind',
  },
  {
    id: 'billing',
    label: 'Razorpay Payments & Subscriptions',
    category: 'scale',
    description: 'UPI, QR, NetBanking, auto-debit subscriptions, and webhook event reconciliation tailored for Indian & global transactions.',
    extraWeeks: 0.4,
    priceDelta: [5000, 10000],
    complexityDelta: 1.0,
    recommendedStack: 'Razorpay SDK + Webhooks',
  },
  {
    id: 'realtime',
    label: 'Realtime WebSockets & Presence',
    category: 'scale',
    description: 'Low-latency multiplayer sync, live activity pulses, cursor tracking, or streaming data feeds.',
    extraWeeks: 0.4,
    priceDelta: [6000, 12000],
    complexityDelta: 1.0,
    recommendedStack: 'Supabase Realtime / WebSockets',
  },
  {
    id: 'seo',
    label: 'Edge SSR & SEO 100 Hardening',
    category: 'core',
    description: 'Aggressive edge caching, dynamic OpenGraph card generation, strict JSON-LD schemas, and Core Web Vitals perfection.',
    extraWeeks: 0.2,
    priceDelta: [3000, 6000],
    complexityDelta: 0.5,
    recommendedStack: 'Next.js Edge Runtime',
  },
];

const VELOCITIES = [
  {
    id: 'express',
    name: 'Midnight Express (Rapid)',
    factor: 0.6,
    tag: '⚡ Rapid Sprints',
    description: 'Consecutive night sprints with daily asynchronous push updates. Fastest turnaround.',
  },
  {
    id: 'standard',
    name: 'Iterative Track (Balanced)',
    factor: 0.9,
    tag: '🎯 Recommended',
    description: 'Milestone demos, staged user testing, and collaborative Slack/Discord channel.',
  },
  {
    id: 'deep',
    name: 'Deep Architecture (Hardened)',
    factor: 1.3,
    tag: '🛡️ Production-Grade',
    description: 'Comprehensive load testing, multi-environment CI/CD, and full technical documentation handoff.',
  },
];

export function BlueprintEstimator() {
  const router = useRouter();

  const [selectedArchetype, setSelectedArchetype] = useState<string>('commercial');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['database', 'seo', 'framer']);
  const [selectedVelocity, setSelectedVelocity] = useState<string>('standard');
  const [projectDescription, setProjectDescription] = useState<string>('');

  // AI Spec State
  const [aiSpec, setAiSpec] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Switch Archetype and sync defaults
  const handleSelectArchetype = (archId: string) => {
    setSelectedArchetype(archId);
    const arch = ARCHETYPES.find((a) => a.id === archId);
    if (arch) {
      setSelectedFeatures(arch.defaultFeatures);
    }
  };

  const toggleFeature = (featId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featId) ? prev.filter((id) => id !== featId) : [...prev, featId]
    );
  };

  // Calculations
  const calculations = useMemo(() => {
    const arch = ARCHETYPES.find((a) => a.id === selectedArchetype) || ARCHETYPES[0];
    const velocity = VELOCITIES.find((v) => v.id === selectedVelocity) || VELOCITIES[1];

    let totalWeeksSum = arch.baseWeeks;
    let minPrice = arch.basePrice[0];
    let maxPrice = arch.basePrice[1];
    let complexityScore = arch.baseComplexity;

    selectedFeatures.forEach((featId) => {
      const feat = FEATURES.find((f) => f.id === featId);
      if (feat) {
        totalWeeksSum += feat.extraWeeks;
        minPrice += feat.priceDelta[0];
        maxPrice += feat.priceDelta[1];
        complexityScore += feat.complexityDelta;
      }
    });

    const totalWeeks = totalWeeksSum * velocity.factor;
    const complexity = Math.min(5, Math.round(complexityScore * 10) / 10);
    const timeline = formatTimeline(totalWeeks);

    // Recommended Tech Stack
    const stackItems = new Set<string>(['Next.js 14 (App Router)', 'TypeScript', 'Tailwind CSS']);
    if (selectedFeatures.includes('database')) stackItems.add('Supabase (PostgreSQL)');
    if (selectedFeatures.includes('ai')) stackItems.add('Google Gemini 3.6 Flash');
    if (selectedFeatures.includes('framer')) stackItems.add('Framer Motion 11');
    if (selectedFeatures.includes('billing')) stackItems.add('Razorpay SDK + Webhooks');
    if (selectedFeatures.includes('realtime')) stackItems.add('WebSockets / Live Presence');
    if (selectedFeatures.includes('seo')) stackItems.add('Vercel Edge Network');

    return {
      arch,
      velocity,
      totalWeeks,
      timeline,
      minPrice,
      maxPrice,
      complexity,
      stack: Array.from(stackItems),
    };
  }, [selectedArchetype, selectedFeatures, selectedVelocity]);

  // AI Architecture Generator
  const handleGenerateAiSpec = async () => {
    setIsGeneratingAi(true);
    setAiSpec(null);

    const arch = ARCHETYPES.find((a) => a.id === selectedArchetype);
    const activeFeats = FEATURES.filter((f) => selectedFeatures.includes(f.id)).map((f) => f.label);

    const promptMessage = `Generate a concise, razor-sharp technical architecture brief for a project with archetype: "${arch?.name}". Key features: [${activeFeats.join(', ')}]. Additional visitor notes: "${projectDescription || 'No extra notes'}". Format into three distinct sections: 1. System Topology & Data Flow, 2. Database Entities / API Schema Recommendation, 3. Critical Failure Mode & Mitigation.`;

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptMessage,
          projectContext: {
            title: arch?.name,
            techStack: calculations.stack,
            scope: `${calculations.timeline.full} timeline, investment bracket ${formatINR(calculations.minPrice)}–${formatINR(calculations.maxPrice)} INR, complexity score ${calculations.complexity}/5`,
          },
        }),
      });

      const data = await res.json();
      if (data.status === 'success' && data.data?.result) {
        setAiSpec(data.data.result);
      } else {
        // High quality fallback spec based on exact inputs
        const fallback = `### 1. System Topology & Data Flow
• **Runtime**: Next.js 14 App Router on Vercel Edge with zero-cold-start server actions.
• **State & DB**: ${selectedFeatures.includes('database') ? 'Supabase PostgreSQL via connection pooling with strictly typed Supabase-js client and RLS policies.' : 'Stateless edge architecture with client-side reactive store.'}
• **Inference**: ${selectedFeatures.includes('ai') ? 'Gemini 3.6 Flash streaming API routed via secure /api gateway with token usage throttling.' : 'Static asset optimization.'}
• **Payment Rails**: ${selectedFeatures.includes('billing') ? 'Razorpay webhook listeners & checkout session rails.' : 'Standard digital invoicing.'}

### 2. Recommended Database Entities & Schema
• \`profiles\`: \`{ id: uuid, auth_user_id: text, tier: enum, created_at: timestamptz }\`
• \`workspaces\`: \`{ id: uuid, owner_id: uuid, metadata: jsonb, status: text }\`
• \`audit_log\`: \`{ event_id: uuid, actor_id: uuid, payload: jsonb, timestamp: timestamptz }\`

### 3. Critical Failure Mode & Mitigation
• **Risk**: Unbounded client-side hydration delays and unthrottled API edge spikes.
• **Mitigation**: Implement optimistic UI mutations via React 18 Transitions, strict Edge Middleware rate-limiting, and cached static shells with dynamic streaming blocks.`;
        setAiSpec(fallback);
      }
    } catch {
      // Deterministic fallback
      setAiSpec(`### 1. System Topology & Data Flow
• **Runtime**: Next.js 14 App Router on Vercel Edge with zero-cold-start server actions.
• **State & DB**: Supabase PostgreSQL via connection pooling with strictly typed Supabase-js client and RLS policies.
• **Performance**: 60FPS fluid interactions with hardware-accelerated Framer Motion choreography.

### 2. Core Entities
• \`users\` (UUID, RLS public read, private write)
• \`projects\` (UUID, slug, metadata jsonb, status)

### 3. Engineering Guidance
• Pre-render static shells and stream interactive modules via React Suspense.`);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Copy Markdown to Clipboard
  const handleCopyMarkdown = () => {
    const arch = ARCHETYPES.find((a) => a.id === selectedArchetype);
    const activeFeats = FEATURES.filter((f) => selectedFeatures.includes(f.id)).map((f) => f.label);

    const markdownDoc = `# Nightbuild Studio — Project Architecture Blueprint
Generated on: ${new Date().toLocaleDateString('en-IN')}

## 1. Project Overview
- **Archetype**: ${arch?.name} (${arch?.badge})
- **Estimated Timeline**: ${calculations.timeline.full} (${calculations.velocity.name})
- **Complexity Rating**: ${calculations.complexity} / 5.0
- **Investment Bracket**: ${formatINR(calculations.minPrice)} – ${formatINR(calculations.maxPrice)} INR
${projectDescription ? `- **Visitor Notes**: ${projectDescription}\n` : ''}

## 2. Integrated Feature Capabilities
${activeFeats.map((f) => `- ${f}`).join('\n')}

## 3. Recommended Modern Tech Stack
${calculations.stack.map((s) => `- ${s}`).join('\n')}

${aiSpec ? `\n## 4. Architectural Specification Brief\n${aiSpec}\n` : ''}
---
*Produced by The Midnight Architect at Nightbuild Studio (https://thenightbuild.dev)*
`;

    navigator.clipboard.writeText(markdownDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Transfer Blueprint to Contact Form
  const handleTransferToInquiry = () => {
    const arch = ARCHETYPES.find((a) => a.id === selectedArchetype);
    const activeFeats = FEATURES.filter((f) => selectedFeatures.includes(f.id)).map((f) => f.label);

    const queryParams = new URLSearchParams({
      type: arch?.id === 'capstone' ? 'CS Capstone / Senior Project' : arch?.id === 'creative' ? 'Experimental Shader / Creative Code Build' : 'Client Commercial Website',
      budget: `${formatINR(calculations.minPrice)} - ${formatINR(calculations.maxPrice)}`,
      weeks: calculations.timeline.full,
      features: activeFeats.join(', '),
      notes: projectDescription || '',
    });

    router.push(`/contact?${queryParams.toString()}`);
  };

  return (
    <div className="w-full space-y-12">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* =====================================================================
            LEFT COLUMN: INTERACTIVE INPUT CONFIGURATORS
            ===================================================================== */}
        <div className="lg:col-span-7 space-y-10">

          {/* Section 1: Choose Project Archetype */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--green)] flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>01. Select Project Archetype</span>
              </label>
              <span className="text-[11px] text-[var(--ink-soft)]">Sets baseline scope</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {ARCHETYPES.map((arch) => {
                const isSelected = selectedArchetype === arch.id;
                return (
                  <button
                    key={arch.id}
                    type="button"
                    onClick={() => handleSelectArchetype(arch.id)}
                    className={`text-left p-5 rounded-2xl transition-all duration-300 ease-apple relative flex flex-col justify-between ${
                      isSelected
                        ? 'liquid-glass border-[var(--green)] ring-1 ring-[var(--green)]/30 shadow-lg'
                        : 'bg-[var(--surface)]/70 hairline-all hover:bg-[var(--surface)] hover:scale-[1.01]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[var(--bg)] text-[var(--green)] hairline-all">
                          {arch.badge}
                        </span>
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
                        )}
                      </div>
                      <h3 className="font-display font-bold text-sm sm:text-base text-[var(--ink)] mb-1">
                        {arch.name}
                      </h3>
                      <p className="text-xs text-[var(--ink-soft)] leading-relaxed line-clamp-2">
                        {arch.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 hairline-t flex items-center justify-between text-[11px] text-[var(--ink-soft)]">
                      <span>Base: {arch.baseWeeks < 1 ? `~${Math.round(arch.baseWeeks * 7)} days` : `~${arch.baseWeeks} wks`}</span>
                      <span className="font-semibold text-[var(--ink)]">
                        {formatINR(arch.basePrice[0])}+
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Technical Capabilities & Components */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--green)] flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                <span>02. Select Infrastructure & Features</span>
              </label>
              <span className="text-[11px] text-[var(--ink-soft)]">
                {selectedFeatures.length} selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURES.map((feat) => {
                const isActive = selectedFeatures.includes(feat.id);
                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => toggleFeature(feat.id)}
                    className={`text-left p-4 rounded-2xl transition-all duration-300 ease-apple flex items-start gap-3.5 ${
                      isActive
                        ? 'liquid-glass border-[var(--green)]/70 bg-[var(--green-soft)]/20'
                        : 'bg-[var(--surface)]/70 hairline-all hover:bg-[var(--surface)]'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-[var(--green)] text-white shadow-sm'
                          : 'border border-[var(--line)] bg-[var(--bg)]'
                      }`}
                    >
                      {isActive && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[var(--ink)]">
                          {feat.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--ink-soft)] leading-snug">
                        {feat.description}
                      </p>
                      <div className="pt-1.5 flex items-center gap-2 text-[10px] text-[var(--green)] font-mono">
                        <span>+{feat.extraWeeks} wk</span>
                        <span>•</span>
                        <span>+{formatINR(feat.priceDelta[0])}–{formatINR(feat.priceDelta[1])}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Sprint Velocity */}
          <div className="space-y-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--green)] flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>03. Sprint Velocity & Delivery Cadence</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {VELOCITIES.map((vel) => {
                const isSelected = selectedVelocity === vel.id;
                return (
                  <button
                    key={vel.id}
                    type="button"
                    onClick={() => setSelectedVelocity(vel.id)}
                    className={`text-left p-4 rounded-2xl transition-all duration-300 ease-apple ${
                      isSelected
                        ? 'liquid-glass border-[var(--green)] shadow-md'
                        : 'bg-[var(--surface)]/70 hairline-all hover:bg-[var(--surface)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-semibold text-[var(--green)] font-mono">
                        {vel.tag}
                      </span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" />}
                    </div>
                    <p className="font-bold text-xs text-[var(--ink)] mb-1">{vel.name}</p>
                    <p className="text-[11px] text-[var(--ink-soft)] leading-snug">
                      {vel.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Optional Notes / Specific Vision */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)] flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>04. Project Specifics or Abstract (Optional)</span>
            </label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="e.g., A peer-to-peer collaborative whiteboard with WebSockets and generative SVG vector export..."
              rows={3}
              className="w-full rounded-2xl bg-[var(--surface)]/70 hairline-all p-4 text-xs text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 focus:outline-none focus:border-[var(--green)] transition-all resize-none"
            />
          </div>

        </div>

        {/* =====================================================================
            RIGHT COLUMN: REAL-TIME ARCHITECTURE & ESTIMATION PANEL
            ===================================================================== */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">

          {/* Master Liquid Glass Estimator Card */}
          <div className="liquid-glass rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--green)]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--green)] animate-ping" />
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--ink)] font-bold">
                  Blueprint Output
                </span>
              </div>
              <span className="text-[11px] font-mono text-[var(--green)] px-2.5 py-0.5 rounded-full bg-[var(--green-soft)]">
                Live Calculated
              </span>
            </div>

            {/* Primary Metrics: Timeline & Investment */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[var(--surface)]/80 hairline-all space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[var(--ink-soft)]">
                  <Clock className="w-3.5 h-3.5 text-[var(--green)]" />
                  <span>Est. Timeline</span>
                </div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-[var(--ink)]">
                  {calculations.timeline.display} <span className="text-sm font-sans font-normal text-[var(--ink-soft)]">{calculations.timeline.unit}</span>
                </div>
                <p className="text-[10px] text-[var(--ink-soft)]">
                  {calculations.velocity.name.split(' ')[0]} track
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--surface)]/80 hairline-all space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-[var(--ink-soft)]">
                  <span className="text-xs font-bold font-mono text-[var(--green)] w-3.5 h-3.5 inline-flex items-center justify-center">₹</span>
                  <span>Investment (INR)</span>
                </div>
                <div className="text-lg sm:text-2xl font-display font-bold text-[var(--green)]">
                  {formatINR(calculations.minPrice)}–{formatINR(calculations.maxPrice)}
                </div>
                <p className="text-[10px] text-[var(--ink-soft)]">
                  Transparent fixed bracket
                </p>
              </div>
            </div>

            {/* Complexity Rating Meter */}
            <div className="space-y-2 p-4 rounded-2xl bg-[var(--surface)]/60 hairline-all">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--ink)] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[var(--green)]" />
                  Engineering Complexity
                </span>
                <span className="font-mono font-bold text-[var(--green)]">
                  {calculations.complexity} / 5.0
                </span>
              </div>
              <div className="w-full bg-[var(--bg)] h-2 rounded-full overflow-hidden hairline-all">
                <div
                  className="bg-gradient-to-r from-[var(--green)] to-emerald-400 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(calculations.complexity / 5) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-[var(--ink-soft)] flex justify-between">
                <span>Accessible Prototype</span>
                <span>Production Hardened</span>
              </p>
            </div>

            {/* Recommended Stack Badges */}
            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-[var(--ink-soft)] uppercase tracking-wider block">
                Recommended Architecture
              </span>
              <div className="flex flex-wrap gap-1.5">
                {calculations.stack.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--surface)] hairline-all text-[11px] font-mono text-[var(--ink)] hover:border-[var(--green)]/50 transition-colors"
                  >
                    <Code2 className="w-3 h-3 text-[var(--green)]" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* AI Architecture Generator Trigger */}
            <div className="pt-2 border-t border-[var(--line)] space-y-3">
              <button
                type="button"
                onClick={handleGenerateAiSpec}
                disabled={isGeneratingAi}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-xs font-semibold text-[var(--ink)] bg-[var(--surface)] hover:bg-[var(--surface)]/80 hairline-all hover:border-[var(--green)]/60 transition-all duration-300 disabled:opacity-50"
              >
                {isGeneratingAi ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[var(--green)]" />
                    <span>Synthesizing Architecture...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[var(--green)]" />
                    <span>Generate AI Architectural Spec</span>
                  </>
                )}
              </button>

              {/* AI Spec Reveal Box */}
              <AnimatePresence>
                {aiSpec && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 rounded-2xl bg-[var(--bg)]/90 hairline-all space-y-2.5 text-xs text-[var(--ink-soft)] font-sans leading-relaxed">
                      <div className="flex items-center justify-between text-[11px] font-mono text-[var(--green)] border-b border-[var(--line)] pb-1.5">
                        <span className="flex items-center gap-1">
                          <Terminal className="w-3 h-3" />
                          <span>Gemini Technical Brief</span>
                        </span>
                        <span className="text-[10px] text-[var(--ink-soft)]">Model: Gemini 3.6</span>
                      </div>
                      <div className="whitespace-pre-line text-[11px] text-[var(--ink)]/90">
                        {aiSpec}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons: Transfer & Copy */}
            <div className="pt-3 border-t border-[var(--line)] space-y-2.5">
              <button
                type="button"
                onClick={handleTransferToInquiry}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[var(--green)] hover:opacity-95 transition-all duration-300 ease-apple shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Transfer Blueprint to Studio Inquiry</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--surface)]/50 transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[var(--green)]" />
                    <span className="text-[var(--green)]">Copied Blueprint Markdown to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Blueprint Specification (.md)</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Guarantee / Transparency Note */}
          <div className="p-4 rounded-2xl bg-[var(--surface)]/40 hairline-all text-xs text-[var(--ink-soft)] space-y-1">
            <p className="font-semibold text-[var(--ink)]">Zero Hidden Agency Markup</p>
            <p className="text-[11px] leading-relaxed">
              Every Nightbuild Studio project includes a fixed sprint contract, complete GitHub ownership, Supabase database transfer, and 14 days of post-launch warranty.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
