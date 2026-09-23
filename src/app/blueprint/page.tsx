import React from 'react';
import type { Metadata } from 'next';
import { BlueprintEstimator } from '@/components/BlueprintEstimator';
import { Sparkles, Terminal, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Midnight Architect — Interactive Scope & Blueprint Estimator | Nightbuild Studio',
  description:
    'Plan, configure, and calculate your custom web application architecture in real time. Get instant sprint timelines, transparent pricing, and AI-synthesized system briefs.',
};

export default function BlueprintPage() {
  return (
    <div className="w-full py-14 sm:py-20 lg:py-24">
      <div className="site-container">
        
        {/* Page Hero Header */}
        <div className="max-w-4xl mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--green)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Engineering Tool</span>
          </div>

          <h1 className="display-title text-4xl sm:text-6xl lg:text-7xl text-[var(--ink)] tracking-tight">
            The Midnight Architect.
          </h1>

          <p className="text-base sm:text-xl text-[var(--ink-soft)] leading-relaxed max-w-3xl">
            No vague estimates, no sales friction, and zero agency fluff. Select your build archetype,
            toggle technical capabilities, and instantly calculate realistic sprint timelines,
            engineering complexity, and fixed investment brackets.
          </p>
        </div>

        {/* The Core Interactive Estimator App */}
        <BlueprintEstimator />

      </div>
    </div>
  );
}
