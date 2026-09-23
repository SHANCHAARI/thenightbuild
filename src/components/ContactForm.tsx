'use client';

import React, { useState } from 'react';
import { submitLead } from '@/lib/supabase';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const PROJECT_TYPES = [
  'Client Commercial Website',
  'CS Capstone / Senior Project',
  'Interactive Web Application / Tool',
  'Experimental Shader / Creative Code Build',
  'Other Custom Architecture',
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: PROJECT_TYPES[0],
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

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
      const result = await submitLead({
        name: formData.name,
        email: formData.email,
        project_type: formData.project_type,
        message: formData.message,
      });

      if (result.success) {
        setStatus('success');
        setSubmittedLeadId(result.leadId || 'NB-' + Date.now().toString().slice(-6));
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Failed to submit inquiry. Please try again.');
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
          been saved to our database. Our team conducts architectural review during midnight sprint
          hours and will reply to <span className="text-[var(--green)] underline">{formData.email}</span> within
          24 hours.
        </p>

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
    <form onSubmit={handleSubmit} className="liquid-glass rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl">
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
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us what you are building, the unconventional elements, and any target deadlines..."
          className="w-full px-4 py-3.5 text-sm bg-[var(--surface)]/50 hairline-all text-[var(--ink)] placeholder:text-[var(--ink-soft)]/50 focus:border-[var(--green)] rounded-2xl transition-all duration-300 ease-apple resize-y shadow-inner"
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
        * Stored securely in our Supabase database. We never share client or capstone proposals.
      </p>
    </form>
  );
}
