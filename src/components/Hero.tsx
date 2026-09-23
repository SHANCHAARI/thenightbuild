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
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative w-full pt-8 sm:pt-12 lg:pt-14 pb-14 lg:pb-20 overflow-hidden hairline-b bg-structure">
      {/* Ambient Atmospheric Glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-[var(--green)]/12 blur-[140px] rounded-full" 
      />

      <div className="site-container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full space-y-7 sm:space-y-8"
        >
          {/* Status Badge (Liquid Glass pill) */}
          <motion.div variants={itemVariants} className="inline-flex items-center">
            <div className="liquid-glass-pill inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-medium text-[var(--ink-soft)] shadow-sm hover:scale-[1.02] transition-transform duration-300">
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
            className="display-title text-[var(--ink)] text-3xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] leading-[1.08] tracking-tight max-w-5xl"
          >
            We engineer websites and digital artifacts that conventional studios consider too ambitious, too weird, or too late at night.
          </motion.h1>

          {/* Mission Subhead */}
          <motion.p
            variants={itemVariants}
            className="text-[var(--ink-soft)] text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl font-normal"
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
              className="inline-flex items-center justify-center px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-[var(--green)] hover:opacity-90 transition-all duration-300 ease-apple rounded-full shadow-lg shadow-[var(--green)]/20 hover:scale-[1.03] active:scale-[0.97]"
            >
              Initiate a Build
            </Link>

            <Link
              href="/projects"
              className="liquid-glass-pill inline-flex items-center justify-center px-8 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink)] hover:text-[var(--green)] transition-all duration-300 ease-apple rounded-full hover:scale-[1.03] active:scale-[0.97]"
            >
              Explore Project Archive
            </Link>
          </motion.div>

          {/* Liquid Glass Workshop Telemetry Row */}
          <motion.div
            variants={itemVariants}
            className="pt-1 mt-4"
          >
            <div className="liquid-glass rounded-3xl p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs">
              <div className="space-y-1">
                <p className="font-semibold text-[var(--ink)]">Active Workshop</p>
                <p className="text-[var(--ink-soft)]">02:00 AM Sprint Hours</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-[var(--ink)]">Architecture</p>
                <p className="text-[var(--ink-soft)]">Direct Code & Shaders</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-[var(--ink)]">CS Cohort</p>
                <p className="text-[var(--ink-soft)]">CS Systems Lab</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-[var(--ink)]">Delivery Guarantee</p>
                <p className="text-[var(--ink-soft)]">100% Repository Handover</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
