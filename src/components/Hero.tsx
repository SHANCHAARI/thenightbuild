'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative w-full pt-16 sm:pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden hairline-b">
      <div className="site-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full space-y-10"
        >
          {/* Status Badge (Apple pill format) */}
          <motion.div variants={itemVariants} className="inline-flex items-center">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--surface)] hairline-all text-xs font-medium text-[var(--ink-soft)] shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--green)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--green)]" />
              </span>
              <span>Available for select client & CS capstone commissions</span>
            </div>
          </motion.div>

          {/* Lead Headline (Apple SF Pro scale) */}
          <motion.h1
            variants={itemVariants}
            className="display-title text-[var(--ink)] text-4xl sm:text-6xl lg:text-7xl xl:text-[4.75rem] leading-[1.08] tracking-tight max-w-5xl"
          >
            We engineer websites and digital artifacts that conventional studios consider too ambitious, too weird, or too late at night.
          </motion.h1>

          {/* Mission Subhead */}
          <motion.p
            variants={itemVariants}
            className="text-[var(--ink-soft)] text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl font-normal"
          >
            Nightbuild Studio is an independent, student-run creative engineering agency. We sculpt
            bespoke commercial platforms, interactive web experiences, and computer science
            capstones from scratch — with zero templates and sub-second execution.
          </motion.p>

          {/* Apple-style Action Group */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[var(--green)] hover:opacity-90 transition-all rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              Initiate a Build
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--ink)] bg-[var(--surface)]/70 hover:bg-[var(--surface)] hairline-all transition-all rounded-full hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Project Archive
            </Link>
          </motion.div>

          {/* Studio Telemetry Row (Spans full width dynamically) */}
          <motion.div
            variants={itemVariants}
            className="pt-8 mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[var(--surface)]/50 hairline-all text-xs"
          >
            <div>
              <p className="font-semibold text-[var(--ink)]">Active Workshop</p>
              <p className="text-[var(--ink-soft)] mt-0.5">02:00 AM Sprint Hours</p>
            </div>
            <div>
              <p className="font-semibold text-[var(--ink)]">Architecture</p>
              <p className="text-[var(--ink-soft)] mt-0.5">Direct Code & Shaders</p>
            </div>
            <div>
              <p className="font-semibold text-[var(--ink)]">CS Cohort</p>
              <p className="text-[var(--ink-soft)] mt-0.5">Senior Systems Lab</p>
            </div>
            <div>
              <p className="font-semibold text-[var(--ink)]">Delivery Guarantee</p>
              <p className="text-[var(--ink-soft)] mt-0.5">100% Repository Handover</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
