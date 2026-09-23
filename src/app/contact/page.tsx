import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { Mail, Clock, ShieldCheck, Loader2, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Inquire & Commission — Nightbuild Studio',
  description:
    'Initiate a project commission or CS capstone collaboration with Nightbuild Studio. Direct communication with engineering leads.',
};

export default function ContactPage() {
  return (
    <div className="w-full py-16 sm:py-24">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Guidelines */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface)] hairline-all text-xs font-semibold text-[var(--green)]">
                <span>Project Initiation</span>
              </div>
              <h1 className="display-title text-4xl sm:text-6xl text-[var(--ink)] leading-tight tracking-tight">
                Let&apos;s build something that doesn&apos;t look like everything else.
              </h1>
              <p className="text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed">
                Whether you have a fully formed technical specification or a raw, experimental concept
                waiting for a working prototype, write to us directly.
              </p>
            </div>

            {/* Studio Availability & Logistics (Apple-style cards) */}
            <div className="space-y-4 pt-6 hairline-t">
              <div className="p-5 rounded-2xl bg-[var(--surface)]/70 hairline-all flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-[var(--bg)] text-[var(--green)] shadow-sm shrink-0">
                  <Clock className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="space-y-0.5 text-xs">
                  <p className="font-semibold text-[var(--ink)] text-sm">Review Rhythm</p>
                  <p className="text-[var(--ink-soft)] leading-relaxed">
                    Inquiries are triaged daily between 23:00 and 03:00 UTC during active workshop sprints.
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/?text=Hi%20Nightbuild%20Studio!%20I%20would%20like%20to%20discuss%20a%20project%20with%20your%20team."
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[var(--surface)]/70 hairline-all flex items-start gap-4 hover:border-emerald-500/50 hover:bg-[var(--surface)] transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="space-y-0.5 text-xs flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[var(--ink)] text-sm group-hover:text-emerald-400 transition-colors">Instant WhatsApp Channel</p>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold">LIVE</span>
                  </div>
                  <p className="text-[var(--ink-soft)] leading-relaxed">
                    Chat directly with Nirmal, Aakash, Vidya, and Manoj for rapid scoping, questions, or triage.
                  </p>
                </div>
              </a>

              <div className="p-5 rounded-2xl bg-[var(--surface)]/70 hairline-all flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-[var(--bg)] text-[var(--green)] shadow-sm shrink-0">
                  <Mail className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="space-y-0.5 text-xs">
                  <p className="font-semibold text-[var(--ink)] text-sm">Direct Transmission</p>
                  <p className="text-[var(--ink-soft)] leading-relaxed">
                    <a href="mailto:nigthbulid@gmail.com" className="text-[var(--green)] hover:underline font-mono">nigthbulid@gmail.com</a> for project briefs, sensitive specs, or academic research inquiries.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--surface)]/70 hairline-all flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-[var(--bg)] text-[var(--green)] shadow-sm shrink-0">
                  <ShieldCheck className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="space-y-0.5 text-xs">
                  <p className="font-semibold text-[var(--ink)] text-sm">Confidentiality Guarantee</p>
                  <p className="text-[var(--ink-soft)] leading-relaxed">
                    All client roadmaps and proprietary student capstone algorithms remain strictly confidential.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="liquid-glass rounded-3xl p-8 sm:p-12 flex items-center justify-center min-h-[420px]">
                  <Loader2 className="w-6 h-6 animate-spin text-[var(--green)]" />
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
