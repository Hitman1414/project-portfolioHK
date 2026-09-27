'use client';

import { motion } from 'framer-motion';
import { Cpu, Award, ShieldCheck, Network, Layers } from 'lucide-react';

interface Patent {
  id: string;
  title: string;
  inventors: string[];
  category: string;
  abstract: string;
  status: string;
  year: number;
  highlights: string[];
}

interface InnovationProps {
  patents: Patent[];
}

export function InnovationSection({ patents }: InnovationProps) {
  if (!patents || patents.length === 0) return null;
  const patent = patents[0];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/60 pb-8 gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-widest font-semibold">
            <Award className="w-4 h-4" />
            <span>Patent & Systems Innovation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
            Decentralized IoT Architecture
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            Intellectual property and hardware-software system design for hyperlocal inventory synchronization.
          </p>
        </div>
        <div className="font-mono text-xs text-accent bg-accent/10 px-4 py-2 rounded-full border border-accent/30 font-semibold">
          REGISTERED PATENT // {patent.year}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-8 sm:p-12 rounded-3xl border border-border/80 relative overflow-hidden bg-noise"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Cpu className="w-64 h-64 text-accent" />
        </div>

        <div className="max-w-4xl space-y-8 relative z-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground font-semibold">
              INNOVATION 01
            </span>
            <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
              {patent.category}
            </span>
            <span className="text-muted-foreground">• STATUS: {patent.status}</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl font-normal text-foreground leading-snug">
            &quot;{patent.title}&quot;
          </h3>

          <p className="font-sans text-base sm:text-lg text-foreground/80 leading-relaxed">
            {patent.abstract}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border/40">
            {patent.highlights.map((h, i) => (
              <div key={i} className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-2">
                <div className="font-mono text-xs text-accent font-semibold flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>KEY ARCHITECTURE 0{i + 1}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{h}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between font-mono text-xs text-muted-foreground border-t border-border/40">
            <div>INVENTORS: {patent.inventors.join(', ')}</div>
            <div>VERIFIED SOURCE: LINKEDIN REGISTERED PATENT</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
