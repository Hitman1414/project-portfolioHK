'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDownRight, Award, BookOpen, GraduationCap, Network } from 'lucide-react';

interface HeroProps {
  profile: {
    name: string;
    title: string;
    institution: string;
    heroStatement: string;
    phd: {
      topic: string;
      institution: string;
      year: number;
    };
  };
}

export function HeroExperience({ profile }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col justify-between overflow-hidden bg-tech-grid">
      {/* Background subtle ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Identity Meta */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6 font-mono text-xs text-muted-foreground uppercase tracking-wider"
      >
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span className="text-foreground font-semibold">2026 ACADEMIC PROFILE</span>
          <span className="text-border">|</span>
          <span>SRINIVAS UNIVERSITY</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>PH.D. MANAGEMENT</span>
          <span className="text-border">·</span>
          <span>UGC NET & KSET QUALIFIED</span>
        </div>
      </motion.div>

      {/* Hero Core Editorial Statement */}
      <div className="my-12 lg:my-16 max-w-5xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-4"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold px-3 py-1 rounded-full bg-accent/10 border border-accent/20 inline-block">
            RESEARCH EXPERIENCE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-foreground leading-[1.05]">
            DR. HARSHITA <br className="hidden sm:inline" />
            <span className="italic font-light text-accent">KAUSHIK</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="space-y-6"
        >
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground/90 font-light leading-snug max-w-4xl">
            Researching how <span className="text-accent underline decoration-accent/30 underline-offset-8">artificial intelligence</span> and <span className="text-foreground font-normal">conversational interfaces</span> transform customer engagement across digital commerce platforms.
          </p>

          <div className="font-mono text-xs text-muted-foreground space-y-1 border-l-2 border-accent/40 pl-4 py-1">
            <p className="font-semibold text-foreground uppercase tracking-wider">DOCTORAL THESIS (TUMKUR UNIVERSITY, FEB 2026):</p>
            <p className="italic text-foreground/80 font-serif text-sm">
              &quot;{profile.phd.topic}&quot;
            </p>
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Stats & Quick Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-border/60"
      >
        <Link
          href="#research-map"
          className="group p-5 rounded-2xl glass-panel hover:border-accent/40 transition-all flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <Network className="w-5 h-5 text-accent" />
            <ArrowDownRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </div>
          <div>
            <div className="font-mono text-[11px] text-muted-foreground uppercase">Interactive</div>
            <div className="font-serif text-xl font-medium text-foreground group-hover:text-accent">
              Research Map
            </div>
          </div>
        </Link>

        <Link
          href="/publications"
          className="group p-5 rounded-2xl glass-panel hover:border-accent/40 transition-all flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <BookOpen className="w-5 h-5 text-accent" />
            <span className="font-mono text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded">
              9 PAPERS
            </span>
          </div>
          <div>
            <div className="font-mono text-[11px] text-muted-foreground uppercase">Academic Archive</div>
            <div className="font-serif text-xl font-medium text-foreground group-hover:text-accent">
              Publications
            </div>
          </div>
        </Link>

        <Link
          href="/teaching"
          className="group p-5 rounded-2xl glass-panel hover:border-accent/40 transition-all flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <GraduationCap className="w-5 h-5 text-accent" />
            <span className="font-mono text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded">
              10 COURSES
            </span>
          </div>
          <div>
            <div className="font-mono text-[11px] text-muted-foreground uppercase">MBA Pedagogy</div>
            <div className="font-serif text-xl font-medium text-foreground group-hover:text-accent">
              Teaching Index
            </div>
          </div>
        </Link>

        <Link
          href="/patents"
          className="group p-5 rounded-2xl glass-panel hover:border-accent/40 transition-all flex flex-col justify-between space-y-4"
        >
          <div className="flex items-center justify-between">
            <Award className="w-5 h-5 text-accent" />
            <span className="font-mono text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded">
              IOT PATENT
            </span>
          </div>
          <div>
            <div className="font-mono text-[11px] text-muted-foreground uppercase">Registered Tech</div>
            <div className="font-serif text-xl font-medium text-foreground group-hover:text-accent">
              IoT Innovation
            </div>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
