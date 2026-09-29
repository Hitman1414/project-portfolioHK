'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Chapter {
  id: string;
  num: string;
  label: string;
  shortLabel: string;
}

const chapters: Chapter[] = [
  { id: 'research-map', num: '01', label: 'RESEARCH MAP ARCHITECTURE', shortLabel: 'RESEARCH MAP' },
  { id: 'publications-archive', num: '02', label: 'PEER-REVIEWED PUBLICATIONS', shortLabel: 'PUBLICATIONS' },
  { id: 'academic-timeline', num: '03', label: 'ACADEMIC & PROFESSIONAL JOURNEY', shortLabel: 'TIMELINE' },
  { id: 'teaching-index', num: '04', label: 'MBA PEDAGOGY & COURSE INDEX', shortLabel: 'PEDAGOGY' },
  { id: 'innovation-patents', num: '05', label: 'PATENTS & IOT TECH', shortLabel: 'PATENTS' },
];

export function ChapterIndicator() {
  const [activeId, setActiveId] = useState<string>('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const focalPoint = window.scrollY + window.innerHeight * 0.35;
      let currentSection = '';

      for (const chap of chapters) {
        const el = document.getElementById(chap.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + rect.height;

          if (focalPoint >= top && focalPoint <= bottom) {
            currentSection = chap.id;
            break;
          }
        }
      }

      if (currentSection) {
        setActiveId(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial detection after DOM render
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-start space-y-5 pointer-events-auto">
      {/* Montfort Style Vertical Track Bar */}
      <div className="relative pl-3 border-l border-border/60 space-y-4">
        {chapters.map((chap) => {
          const isActive = activeId === chap.id;
          const isHovered = hoveredId === chap.id;

          return (
            <div
              key={chap.id}
              onClick={() => scrollToChapter(chap.id)}
              onMouseEnter={() => setHoveredId(chap.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative flex items-center space-x-3 cursor-pointer group py-1"
              role="button"
              tabIndex={0}
              aria-label={`Scroll to ${chap.label}`}
            >
              {/* Left Line Bullet Indicator */}
              <div
                className={`absolute -left-[16px] w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-accent scale-125 shadow-lg shadow-teal-500/50 ring-4 ring-accent/20'
                    : 'bg-muted-foreground/40 group-hover:bg-accent group-hover:scale-110'
                }`}
              />

              {/* Tooltip / Hover Label Reveal */}
              <AnimatePresence>
                {(isActive || isHovered) && (
                  <motion.div
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.2 }}
                    className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border whitespace-nowrap shadow-sm ${
                      isActive
                        ? 'bg-accent/10 border-accent/40 text-accent font-semibold'
                        : 'bg-card border-border text-foreground/80'
                    }`}
                  >
                    {chap.shortLabel}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
