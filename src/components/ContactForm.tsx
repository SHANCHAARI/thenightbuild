'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { submitLead } from '@/lib/supabase';
import { CheckCircle2, AlertCircle, Loader2, Sparkles, X } from 'lucide-react';

const PROJECT_TYPES = [
  'Client Commercial Website',
  'CS Capstone / Senior Project',
  'Interactive Web Application / Tool',
  'Experimental Shader / Creative Code Build',
  'Other Custom Architecture',
];

// FormSubmit routes every inquiry to the studio inbox as email.
// First-ever submission triggers a one-time activation email — after the
// team clicks "Activate" in that mail, all future briefs are delivered.
const STUDIO_EMAIL = 'nightbuildstudio@gmail.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${STUDIO_EMAIL}`;

async function submitToFormSubmit(lead: {
  name: string;
  email: string;
  project_type: string;
  message: string;
}): Promise<{ ok: boolean; needsActivation: boolean; error?: string }> {
  try {
    const res = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        project_type: lead.project_type,
        message: lead.message,
        _subject: `🌙 New Project Brief — ${lead.project_type}`,
        _template: 'table',
        _captcha: 'false',
        _autoresponse: `Hi ${lead.name},\n\nNightbuild Studio received your project brief (${lead.project_type}). We review inquiries during midnight sprint hours and will reply to this email within 24 hours.\n\n— The Nightbuild Studio Team\n${STUDIO_EMAIL}`,
      }),
    });
    const data = await res.json().catch(() => ({}));
    const message = String(data?.message || data?.error || '');
    const needsActivation = /activat/i.test(message);
    return { ok: res.ok && String(data?.success).toLowerCase() === 'true', needsActivation, error: message || undefined };
  } catch (err: any) {
    return { ok: false, needsActivation: false, error: err?.message || 'FormSubmit network error' };
  }
}

export function ContactForm() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: PROJECT_TYPES[0],
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [emailPendingActivation, setEmailPendingActivation] = useState<boolean>(false);
  const [blueprintActive, setBlueprintActive] = useState<boolean>(false);
  const [blueprintSummary, setBlueprintSummary] = useState<string>('');

  useEffect(() => {
    if (!searchParams) return;

    const typeParam = searchParams.get('type');
    const budgetParam = searchParams.get('budget');
    const weeksParam = searchParams.get('weeks');
    const featuresParam = searchParams.get('features');
    const notesParam = searchParams.get('notes');

    if (typeParam || budgetParam || weeksParam || featuresParam) {
      setBlueprintActive(true);

      // Check matched project type
      const matchedType = PROJECT_TYPES.find((t) => t.toLowerCase() === typeParam?.toLowerCase()) || (typeParam ? typeParam : PROJECT_TYPES[0]);
      
      const summaryParts = [];
      if (weeksParam) summaryParts.push(`Timeline: ${weeksParam}`);
      if (budgetParam) summaryParts.push(`Est. Bracket: ${budgetParam}`);
      setBlueprintSummary(summaryParts.join(' • '));

      // Construct formatted brief into message
      const initialMessage = [
        `[The Midnight Architect Blueprint Specification]`,
        weeksParam ? `• Target Timeline: ${weeksParam}` : null,
        budgetParam ? `• Estimated Investment Bracket: ${budgetParam}` : null,
        featuresParam ? `• Selected Capabilities: ${featuresParam}` : null,
        notesParam ? `• Project Vision: ${notesParam}` : null,
        `\n[Additional Project Notes]`,
      ]
        .filter(Boolean)
        .join('\n');

      setFormData((prev) => ({
        ...prev,
        project_type: matchedType,
        message: prev.message ? prev.message : initialMessage,
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Fire both channels: Supabase (database record) + FormSubmit (email to studio inbox)
      const [result, formSubmitResult] = await Promise.all([
        submitLead({
          name: formData.name,
          email: formData.email,
          project_type: formData.project_type,
          message: formData.message,
        }),
        submitToFormSubmit({
          name: formData.name,
          email: formData.email,
          project_type: formData.project_type,
          message: formData.message,
        }),
      ]);

      if (result.success || formSubmitResult.ok) {
        setEmailPendingActivation(formSubmitResult.needsActivation);
        setStatus('success');
        setSubmittedLeadId(result.leadId || 'NB-' + Date.now().toString().slice(-6));
      } else {
        setStatus('error');
        setErrorMessage(result.error || formSubmitResult.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.message || 'An unexpected error occurred. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      project_type: PROJECT_TYPES[0],
      message: '',
    });
    setStatus('idle');
    setErrorMessage('');
    setSubmittedLeadId(null);
    setBlueprintActive(false);
    setEmailPendingActivation(false);
  };

  if (status === 'success') {
    return (
      <div className="liquid-glass rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl">
        <div className="flex items-center gap-3 text-[var(--green)]">
          <CheckCircle2 className="w-6 h-6 stroke-[2]" />
          <span className="text-xs font-mono uppercase tracking-wider font-bold">
            Transmission Logged / Ref #{submittedLeadId}
          </span>
        </div>

        <h2 className="display-heading text-2xl sm:text-3xl text-[var(--ink)]">
          Inquiry received into the studio queue.
        </h2>

        <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed max-w-xl">
          Thank you, <strong className="text-[var(--ink)]">{formData.name}</strong>. Your project
          specification for a <span className="text-[var(--ink)]">{formData.project_type}</span> has
          been logged into the studio queue and emailed to the team. Our team conducts architectural
          review during midnight sprint hours and will reply to{' '}
          <span className="text-[var(--green)] underline">{formData.email}</span> within 24 hours.
        </p>

        {emailPendingActivation && (
          <div className="p-4 rounded-2xl bg-[var(--green-soft)]/40 border border-[var(--green)]/30 text-xs text-[var(--ink)] max-w-xl">
            <p className="font-semibold text-[var(--green)]">First-time email setup pending</p>
            <p className="mt-1 text-[var(--ink-soft)]">
              One-time action for the team: open the <strong>nightbuildstudio@gmail.com</strong> inbox
              and click <strong>“Activate Form”</strong> in the FormSubmit email so future briefs
              land directly in the inbox. Your inquiry is already safe in the queue.
            </p>
          </div>
        )}

        <div className="pt-4 hairline-t">
          <button
            onClick={handleReset}
            className="liquid-glass-pill inline-flex items-center px-7 py-3 rounded-full text-xs font-semibold text-[var(--ink)] hover:text-[var(--green)] transition-all duration-300 ease-apple hover:scale-[1.03]"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="liquid-glass rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl relative">
      {/* Blueprint Ingestion Banner */}
      {blueprintActive && (
        <div className="p-4 rounded-2xl bg-[var(--green-soft)]/40 border border-[var(--green)]/30 flex items-center justify-between gap-3 text-xs text-[var(--ink)]">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[var(--green)] shrink-0" />
            <div>
              <p className="font-semibold text-[var(--green)]">Blueprint Ingested from Midnight Architect</p>
              <p className="text-[11px] text-[var(--ink-soft)] font-mono">{blueprintSummary}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setBlueprintActive(false)}
            className="text-[var(--ink-soft)] hover:text-[var(--ink)] p-1 rounded-full"
            title="Dismiss badge"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs rounded-2xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink)]">
          Name / Collective <span className="text-[var(--green)]">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Elena Rostova / Lumina AI"
          className="w-full px-4 py-3.5 text-sm bg-[var(--surface)]/50 hairline-all text-[var(--ink)] placeholder:text-[var(--ink-soft)]/50 focus:border-[var(--green)] rounded-2xl transition-all duration-300 ease-apple shadow-inner"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink)]">
          Email Address <span className="text-[var(--green)]">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="e.g. elena@lumina-lab.org"
          className="w-full px-4 py-3.5 text-sm bg-[var(--surface)]/50 hairline-all text-[var(--ink)] placeholder:text-[var(--ink-soft)]/50 focus:border-[var(--green)] rounded-2xl transition-all duration-300 ease-apple shadow-inner"
        />
      </div>

      {/* Project Type */}
      <div className="space-y-2">
        <label htmlFor="project_type" className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink)]">
          Project Classification <span className="text-[var(--green)]">*</span>
        </label>
        <div className="relative">
          <select
            id="project_type"
            value={formData.project_type}
            onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
            className="w-full px-4 py-3.5 text-sm bg-[var(--surface)]/50 hairline-all text-[var(--ink)] focus:border-[var(--green)] rounded-2xl transition-all duration-300 ease-apple cursor-pointer appearance-none shadow-inner"
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-[var(--bg)] text-[var(--ink)]">
                {type}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--ink-soft)]">
            ▼
          </span>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[var(--ink)]">
          Project Brief & Scope <span className="text-[var(--green)]">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us what you are building, the unconventional elements, and any target deadlines..."
          className="w-full px-4 py-3.5 text-sm bg-[var(--surface)]/50 hairline-all text-[var(--ink)] placeholder:text-[var(--ink-soft)]/50 focus:border-[var(--green)] rounded-2xl transition-all duration-300 ease-apple resize-y shadow-inner font-mono text-xs leading-relaxed"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-[var(--green)] hover:opacity-90 disabled:opacity-50 transition-all duration-300 ease-apple rounded-full shadow-lg shadow-[var(--green)]/25 hover:scale-[1.03] active:scale-[0.97]"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <span>Submit Project Brief</span>
          )}
        </button>
      </div>

      <p className="text-[11px] text-[var(--ink-soft)] pt-2">
        * Delivered straight to <strong>nightbuildstudio@gmail.com</strong> via FormSubmit and stored
        in our Supabase database. We never share client or capstone proposals.
      </p>
    </form>
  );
}
