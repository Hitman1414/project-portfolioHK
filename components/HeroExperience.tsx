'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { ArrowDownRight, Award, BookOpen, GraduationCap, Network, ChevronDown } from 'lucide-react';

import { MouseGlow } from '@/components/MouseGlow';
import { AsciiParticleMatrix } from '@/components/AsciiParticleMatrix';

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
    photo?: {
      src: string;
      alt: string;
    };
  };
}

export function HeroExperience({ profile }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setOffset({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };
    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMove);
    return () => section?.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col justify-between overflow-hidden z-0">
      {/* Tactile Film Grain Noise Background + ASCII Particle Matrix & Soft Ambient Light Orbs */}
      <div className="absolute inset-0 bg-noise pointer-events-none z-0 opacity-80" />
      <AsciiParticleMatrix />
      <MouseGlow />
      <div className="absolute top-1/4 left-1/6 w-[32rem] h-[32rem] bg-accent/15 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-subtle" />
      <div className="absolute bottom-10 right-10 w-[28rem] h-[28rem] bg-accent2/15 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Top Identity Meta Bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6 font-mono text-xs text-muted-foreground uppercase tracking-wider"
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

      {/* Hero Core Ochi-Style Headline Statement with Inline Expanding Photo Box */}
      <div className="relative z-10 my-12 lg:my-16 max-w-7xl space-y-8">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 inline-block">
              RESEARCH EXPERIENCE & ACADEMIC PEDAGOGY
            </span>
            
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-foreground leading-[0.98] uppercase flex flex-col items-start">
              <span>DR. HARSHITA</span>
              <span className="flex items-center gap-3 sm:gap-5 my-1 sm:my-2">
                {/* Ochi Design Signature Inline Expanding Photo Frame */}
                {profile.photo?.src && (
                  <motion.div
                    initial={{ width: 0, opacity: 0, scale: 0.8 }}
                    animate={{ width: 'auto', opacity: 1, scale: 1 }}
                    transition={{ duration: 0.95, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
                    className="inline-flex overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-accent/50 shadow-2xl shadow-accent/20 h-14 sm:h-20 md:h-24 lg:h-28 aspect-[1.35/1] shrink-0 relative align-middle group cursor-pointer"
                    whileHover={{ scale: 1.04, borderColor: 'var(--accent-2)' }}
                  >
                    <Image
                      src={profile.photo.src}
                      alt={profile.photo.alt}
                      fill
                      sizes="220px"
                      priority
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                )}
                <span className="italic font-light text-accent">KAUSHIK</span>
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6 pt-2"
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

            {/* Quick Research Theme Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="font-mono text-[11px] text-muted-foreground uppercase font-semibold mr-1">Focus Areas:</span>
              {['AI Marketing', 'Conversational Commerce', 'Customer Engagement', 'Swiggy & Gamification', 'IoT Retail Innovation', 'Gen Z Finance'].map((chip, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[11px] px-3.5 py-1 rounded-full glass-panel border border-border/80 text-foreground/90 hover:border-accent hover:text-accent transition-all cursor-default"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Navigation Cards & Scroll Micro-cue */}
      <div className="relative z-10 space-y-4 pt-4 border-t border-border/60">
        <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground uppercase">
          <span>QUICK ARCHIVE NAVIGATION</span>
          <a href="#research-map" className="flex items-center space-x-1 hover:text-accent transition-colors">
            <span>(SCROLL)</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
            <Link
              href="#research-map"
              className="group p-5 rounded-2xl glass-panel hover:border-accent/40 transition-all flex flex-col justify-between space-y-4 h-full block"
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
          </motion.div>

          <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
            <Link
              href="/publications"
              className="group p-5 rounded-2xl glass-panel hover:border-accent/40 transition-all flex flex-col justify-between space-y-4 h-full block"
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
          </motion.div>

          <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
            <Link
              href="/teaching"
              className="group p-5 rounded-2xl glass-panel hover:border-accent/40 transition-all flex flex-col justify-between space-y-4 h-full block"
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
          </motion.div>

          <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
            <Link
              href="/patents"
              className="group p-5 rounded-2xl glass-panel hover:border-accent/40 transition-all flex flex-col justify-between space-y-4 h-full block"
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
        </motion.div>
      </div>
    </section>
  );
}
