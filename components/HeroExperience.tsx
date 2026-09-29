'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  profile: {
    name: string;
    title: string;
    institution: string;
    heroStatement: string;
    phd: { topic: string; institution: string; year: number };
    photo?: { src: string; alt: string };
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
    <section ref={sectionRef} className="relative min-h-[75vh] pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col justify-center overflow-hidden z-0">
      {/* Ambient background glowing orbs */}
      <div className="absolute top-1/4 -left-20 w-[30rem] sm:w-[42rem] h-[30rem] sm:h-[42rem] bg-accent/15 rounded-full blur-[130px] pointer-events-none z-0 animate-pulse-subtle" />
      <div className="absolute top-1/3 right-[-5%] w-[32rem] sm:w-[48rem] h-[32rem] sm:h-[48rem] bg-accent/20 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse-subtle" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-10 left-1/3 w-[24rem] sm:w-[36rem] h-[24rem] sm:h-[36rem] bg-accent/12 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-subtle" style={{ animationDelay: '5.5s' }} />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6 mb-12 font-mono text-xs text-muted-foreground uppercase tracking-wider"
      >
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-foreground font-semibold">Academic Profile</span>
          <span className="text-border">|</span>
          <span>Srinivas University</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Ph.D. Management</span>
          <span className="text-border">·</span>
          <span>UGC NET &amp; KSET Qualified</span>
        </div>
      </motion.div>

      <div className="relative z-10 space-y-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-4"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 inline-block">
            Research Experience &amp; Academic Pedagogy
          </span>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-foreground leading-[0.98] uppercase flex flex-col items-start">
            <span>DR. HARSHITA</span>
            <span className="flex items-center gap-3 sm:gap-5 my-1 sm:my-2">
              {profile.photo?.src && (
                <motion.div
                  initial={{ width: 0, opacity: 0, scale: 0.8 }}
                  animate={{ width: 'auto', opacity: 1, scale: 1 }}
                  transition={{ duration: 0.95, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
                  className="inline-flex overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-accent/50 shadow-2xl shadow-accent/20 h-16 sm:h-24 md:h-32 lg:h-40 aspect-[1.35/1] shrink-0 relative align-middle group cursor-pointer"
                  whileHover={{ scale: 1.04, borderColor: 'var(--accent)' }}
                >
                  <Image src={profile.photo.src} alt={profile.photo.alt} fill sizes="220px" priority className="object-cover group-hover:scale-110 transition-transform duration-500" />
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
            <p className="italic text-foreground/80 font-serif text-sm">&quot;{profile.phd.topic}&quot;</p>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#home-tabs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 mx-auto mt-16 flex flex-col items-center gap-1 text-muted-foreground hover:text-accent transition-colors font-mono text-[11px] uppercase tracking-widest"
      >
        <span>Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
