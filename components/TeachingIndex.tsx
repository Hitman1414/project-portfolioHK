'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowUpRight, BookOpen } from 'lucide-react';

interface Subject {
  id: string;
  code?: string;
  title: string;
  category: string;
  level: string;
  description: string;
}

interface TeachingIndexProps {
  subjects: Subject[];
}

export function TeachingIndex({ subjects }: TeachingIndexProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/60 pb-8 gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-widest font-semibold">
            <GraduationCap className="w-4 h-4" />
            <span>Pedagogy & Course Design</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
            Teaching Index
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            Core MBA & undergraduate management subjects delivered across marketing strategy, digital commerce, consumer insights, and financial systems.
          </p>
        </div>
        <div className="font-mono text-xs text-muted-foreground bg-muted/50 px-4 py-2 rounded-full border border-border/60">
          INDEXED // {subjects.length} SUBJECTS
        </div>
      </div>

      {/* Structured Academic Index Table */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.03 },
          },
        }}
        className="divide-y divide-border/60 border-t border-b border-border/60"
      >
        {subjects.map((sub, idx) => {
          const num = (idx + 1).toString().padStart(2, '0');
          const isVisible = hoveredId === sub.id || selectedId === sub.id;

          return (
            <motion.div
              key={sub.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } },
              }}
              onClick={() => setSelectedId(selectedId === sub.id ? null : sub.id)}
              onMouseEnter={() => setHoveredId(sub.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group py-6 transition-all hover:bg-muted/40 px-4 rounded-xl cursor-pointer focus:outline-none"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedId(selectedId === sub.id ? null : sub.id);
                }
              }}
              aria-expanded={isVisible}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Index Number */}
                <div className="md:col-span-1 font-mono text-xs font-semibold text-accent">
                  {num}
                </div>

                {/* Course Title & Level */}
                <div className="md:col-span-6 space-y-1">
                  <h3 className="font-serif text-2xl font-normal text-foreground group-hover:text-accent transition-colors">
                    {sub.title}
                  </h3>
                  <div className="font-mono text-[11px] text-muted-foreground">
                    {sub.level}{sub.code ? ` · ${sub.code}` : ''}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="md:col-span-3">
                  <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground uppercase">
                    {sub.category}
                  </span>
                </div>

                {/* Hover indicator */}
                <div className="md:col-span-2 flex items-center justify-end font-mono text-xs text-muted-foreground">
                  <span className="group-hover:text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    {isVisible ? 'LESS' : 'VIEW SCOPE'} <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Description reveal on hover/focus/click */}
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 pt-3 border-t border-border/40 font-sans text-sm text-foreground/90 pl-4 border-l-2 border-accent"
                >
                  <p>{sub.description}</p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
