'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Network, Sparkles, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface ResearchTopic {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  themes: string[];
  relatedPublications: string[];
  featured: boolean;
  nodes?: { id: string; label: string; level: number }[];
}

interface ResearchMapProps {
  topics: ResearchTopic[];
}

export function ResearchMap({ topics }: ResearchMapProps) {
  const [activeId, setActiveId] = useState<string>(topics[0]?.id || 'res-01');
  const activeTopic = topics.find((t) => t.id === activeId) || topics[0];

  const mapNodes = [
    { id: 'res-01', label: 'ARTIFICIAL INTELLIGENCE', x: 50, y: 15, sub: 'Conversational Interfaces & E-Commerce' },
    { id: 'res-02', label: 'PERSONALIZATION & PRIVACY', x: 20, y: 45, sub: 'AI Ethics & Data Safeguards' },
    { id: 'res-03', label: 'CUSTOMER ENGAGEMENT', x: 80, y: 45, sub: 'Swiggy & Mobile Gamification' },
    { id: 'res-04', label: 'EMERGING RETAIL TECH', x: 35, y: 78, sub: 'AR & Voice Assistants' },
    { id: 'res-05', label: 'GEN Z & ENTREPRENEURSHIP', x: 65, y: 78, sub: 'Mutual Funds & Women Leaders' },
  ];

  return (
    <section id="research-map" className="py-24 px-6 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/60 pb-8 gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-widest font-semibold">
            <Network className="w-4 h-4" />
            <span>Interactive Systems Architecture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
            The Research Network
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            An interconnected system of doctoral inquiries mapping Artificial Intelligence, Conversational UI, Data Privacy, and Digital Commerce.
          </p>
        </div>
        <div className="font-mono text-xs text-muted-foreground bg-muted/50 px-4 py-2 rounded-full border border-border/60 self-start md:self-auto">
          SELECT NODES TO EXPLORE RELATIONSHIPS
        </div>
      </div>

      {/* Desktop Canvas Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Visual Map Canvas (Desktop/Tablet) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 relative min-h-[460px] flex flex-col justify-between overflow-hidden bg-noise">
          <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground uppercase border-b border-border/40 pb-4">
            <span>Canvas View // 5 Central Nodes</span>
            <span className="text-accent flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Live Topic Sync
            </span>
          </div>

          {/* SVG Connecting Lines with animated energy pulse */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {/* Center node to side nodes */}
            <line x1="50%" y1="22%" x2="20%" y2="48%" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" className="animate-svg-dash" />
            <line x1="50%" y1="22%" x2="80%" y2="48%" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" className="animate-svg-dash" />
            <line x1="20%" y1="48%" x2="35%" y2="78%" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" className="animate-svg-dash" />
            <line x1="80%" y1="48%" x2="65%" y2="78%" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" className="animate-svg-dash" />
            <line x1="35%" y1="78%" x2="65%" y2="78%" stroke="var(--border)" strokeWidth="1.5" />
          </svg>

          {/* Canvas Interactive Nodes */}
          <div className="relative w-full h-[360px] my-auto" style={{ zIndex: 2 }}>
            {mapNodes.map((node, i) => {
              const isSelected = activeId === node.id;
              return (
                <motion.button
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
                  whileInView={{ opacity: 1, scale: isSelected ? 1.1 : 1, x: '-50%', y: '-50%' }}
                  whileHover={{ scale: isSelected ? 1.12 : 1.06, x: '-50%', y: '-50%' }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  onClick={() => setActiveId(node.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveId(node.id);
                    }
                  }}
                  style={{ top: `${node.y}%`, left: `${node.x}%` }}
                  className={`absolute p-4 rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent ${
                    isSelected
                      ? 'bg-accent2 text-black font-semibold shadow-lg shadow-amber-500/20 z-20 border border-accent2'
                      : 'bg-card text-foreground hover:border-accent hover:text-accent border border-border/80 shadow-sm'
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`Explore research topic: ${node.label}`}
                >
                  <div className={`font-mono text-[10px] tracking-wider uppercase mb-0.5 ${isSelected ? 'text-black/80 font-bold' : 'text-accent'}`}>
                    {node.sub}
                  </div>
                  <div className="font-serif text-sm sm:text-base font-semibold leading-tight whitespace-nowrap">
                    {node.label}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground pt-4 border-t border-border/40">
            <span>WCAG ACCESSIBLE KEYBOARD CONTROLLED</span>
            <span>DR. HARSHITA KAUSHIK PH.D. MAP</span>
          </div>
        </div>

        {/* Selected Topic Detail Card */}
        <div className="lg:col-span-5 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTopic.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-3xl p-8 flex flex-col justify-between h-full space-y-6 border border-border"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase text-accent font-semibold px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                    {activeTopic.category}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">TOPIC ID // {activeTopic.id}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-foreground leading-tight">
                  {activeTopic.title}
                </h3>

                <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                  {activeTopic.description}
                </p>

                {/* Key Research Themes Tags */}
                <div className="pt-2 space-y-2">
                  <div className="font-mono text-[11px] text-muted-foreground uppercase flex items-center space-x-1">
                    <Layers className="w-3.5 h-3.5 text-accent" />
                    <span>Associated Themes</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeTopic.themes.map((theme, i) => (
                      <span
                        key={i}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border/60"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connected Publications */}
                <div className="pt-4 border-t border-border/60 space-y-2">
                  <div className="font-mono text-[11px] text-muted-foreground uppercase flex items-center space-x-1">
                    <BookOpen className="w-3.5 h-3.5 text-accent" />
                    <span>Verified Publications</span>
                  </div>
                  <p className="font-mono text-xs text-foreground font-medium">
                    {activeTopic.relatedPublications.length} peer-reviewed research papers addressing this area.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-border/60 flex items-center justify-between">
                <Link
                  href={`/research/${activeTopic.slug}`}
                  className="w-full inline-flex items-center justify-between px-6 py-3 rounded-full bg-foreground text-background font-mono text-xs uppercase tracking-wider hover:bg-accent hover:text-accent-foreground transition-colors group"
                >
                  <span>Read Detailed Topic Narrative</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Vertical Flow Fallback */}
      <div className="block lg:hidden space-y-4 pt-6">
        <h3 className="font-mono text-xs uppercase text-muted-foreground tracking-widest mb-2">
          Mobile Linear View
        </h3>
        <div className="space-y-3">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveId(topic.id)}
              className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                activeId === topic.id
                  ? 'bg-accent/10 border-accent text-foreground font-semibold'
                  : 'bg-card border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="font-mono text-[10px] text-accent uppercase">{topic.category}</div>
              <div className="font-serif text-base">{topic.title}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
