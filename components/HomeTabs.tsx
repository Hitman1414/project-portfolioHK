'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, GraduationCap, Briefcase, Award, Network, Tag, Calendar, User, ShieldCheck } from 'lucide-react';

interface HomeTabsProps {
  research: any[];
  publications: any[];
  experience: any[];
  education: any[];
  teaching: any[];
  patents: any[];
}

const tabs = [
  { id: 'research', label: 'Research', href: '/research', icon: Network },
  { id: 'publications', label: 'Publications', href: '/publications', icon: BookOpen },
  { id: 'teaching', label: 'Teaching', href: '/teaching', icon: GraduationCap },
  { id: 'journey', label: 'Journey', href: '/experience', icon: Briefcase },
  { id: 'patents', label: 'Patents', href: '/patents', icon: Award },
];

export function HomeTabs({ research, publications, experience, education, teaching, patents }: HomeTabsProps) {
  const [active, setActive] = useState('research');

  const featuredResearch = research ? research.filter((r) => r.featured).slice(0, 3) : [];
  const featuredPublications = publications ? publications.filter((p) => p.featured).slice(0, 5) : [];
  const activeTabObj = tabs.find((t) => t.id === active) || tabs[0];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      {/* Tab Controls Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-4 mb-10">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
                isActive
                  ? 'bg-accent text-accent-foreground shadow-md font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Condensed Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="space-y-8"
        >
          {/* RESEARCH TAB */}
          {active === 'research' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                  Core Doctoral & Applied Research Areas
                </h3>
                <p className="text-muted-foreground text-sm max-w-2xl font-sans">
                  Investigating AI personalization, conversational touchpoints, gamified retail, and Gen Z financial awareness.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {featuredResearch.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 rounded-2xl glass-panel border border-border/80 flex flex-col justify-between space-y-4 hover:border-accent/40 transition-colors"
                  >
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-xl font-normal text-foreground leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed font-sans">
                        {item.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                      {item.themes.slice(0, 3).map((theme: string, i: number) => (
                        <span key={i} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PUBLICATIONS TAB */}
          {active === 'publications' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                  Featured Academic Publications
                </h3>
                <p className="text-muted-foreground text-sm max-w-2xl font-sans">
                  Selection of peer-reviewed articles across marketing technology, consumer behavior, and financial literacy.
                </p>
              </div>

              <div className="divide-y divide-border/60 border-t border-b border-border/60">
                {featuredPublications.map((pub, idx) => (
                  <div key={pub.id} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                    <div className="space-y-1 max-w-3xl">
                      <div className="flex items-center space-x-2 font-mono text-xs text-muted-foreground">
                        <span className="text-accent font-semibold">{(idx + 1).toString().padStart(2, '0')}</span>
                        {pub.year && <span className="text-foreground font-semibold px-2 py-0.5 rounded bg-muted text-[11px]">{pub.year}</span>}
                        {pub.venue && <span className="text-muted-foreground italic font-serif text-sm">{pub.venue}</span>}
                      </div>
                      <h4 className="font-serif text-lg font-normal text-foreground group-hover:text-accent transition-colors">
                        {pub.title}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-1.5 shrink-0">
                      {pub.keywords.slice(0, 2).map((kw: string, i: number) => (
                        <span key={i} className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TEACHING TAB */}
          {active === 'teaching' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                  Pedagogy & Course Design
                </h3>
                <p className="text-muted-foreground text-sm max-w-2xl font-sans">
                  Core postgraduate (MBA) and undergraduate courses taught across marketing, strategy, and systems.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {teaching.map((sub, idx) => (
                  <div key={sub.id} className="p-4 rounded-xl glass-panel border border-border/70 space-y-2 hover:border-accent/40 transition-colors">
                    <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                      <span className="text-accent font-semibold font-mono">{(idx + 1).toString().padStart(2, '0')}</span>
                      <span className="uppercase px-2 py-0.5 rounded bg-muted">{sub.category}</span>
                    </div>
                    <h4 className="font-serif text-base font-normal text-foreground leading-snug">
                      {sub.title}
                    </h4>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {sub.level}{sub.code ? ` · ${sub.code}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* JOURNEY TAB */}
          {active === 'journey' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                  Academic Journey & Experience
                </h3>
                <p className="text-muted-foreground text-sm max-w-2xl font-sans">
                  Chronological progression of teaching appointments, doctoral research, and national qualifications.
                </p>
              </div>

              <div className="space-y-4 divide-y divide-border/60">
                {experience.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-serif text-xl font-normal text-foreground">{exp.role}</h4>
                      <span className="font-mono text-xs text-accent font-semibold">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">{exp.organization} · {exp.location}</div>
                    {exp.highlights && exp.highlights[0] && (
                      <p className="text-xs text-muted-foreground font-sans pt-1 leading-relaxed">
                        • {exp.highlights[0]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PATENTS TAB */}
          {active === 'patents' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                  Patents & Intellectual Property
                </h3>
                <p className="text-muted-foreground text-sm max-w-2xl font-sans">
                  Hardware-software systems and IoT-driven micro-node architecture.
                </p>
              </div>

              {patents && patents[0] && (
                <div className="p-8 rounded-2xl glass-panel border border-border/80 space-y-4">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                    <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground font-semibold">
                      REGISTERED PATENT
                    </span>
                    {patents[0].category && (
                      <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                        {patents[0].category}
                      </span>
                    )}
                    {patents[0].status && <span className="text-muted-foreground">• {patents[0].status}</span>}
                  </div>

                  <h4 className="font-serif text-2xl font-normal text-foreground leading-snug">
                    &quot;{patents[0].title}&quot;
                  </h4>

                  {patents[0].abstract && (
                    <p className="text-sm text-foreground/80 font-sans leading-relaxed">
                      {patents[0].abstract}
                    </p>
                  )}

                  {patents[0].inventors && patents[0].inventors.length > 0 && (
                    <div className="font-mono text-xs text-muted-foreground pt-2 border-t border-border/40">
                      INVENTORS: {patents[0].inventors.join(', ')}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* View All Link */}
          <div className="pt-4">
            <Link
              href={activeTabObj.href}
              className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider hover:gap-3 transition-all font-semibold"
            >
              <span>Explore full {activeTabObj.label} page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
