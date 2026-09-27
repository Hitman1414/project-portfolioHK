'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, Filter, ChevronDown, BookOpen, Tag, Copy, Check } from 'lucide-react';

interface Publication {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  year?: number;
  venue?: string;
  abstract?: string;
  keywords: string[];
  researchAreas: string[];
  featured: boolean;
  doi?: string | null;
  url?: string | null;
  pdf?: string | null;
}

interface PublicationIndexProps {
  publications: Publication[];
  showTitle?: boolean;
}

export function PublicationIndex({ publications, showTitle = true }: PublicationIndexProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedArea, setSelectedArea] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCitation = (pub: Publication, type: 'apa' | 'bibtex') => {
    const year = pub.year ?? 'n.d.';
    let citation = '';
    if (type === 'apa') {
      citation = `${pub.authors.join(', ')} (${year}). ${pub.title}.${pub.venue ? ` ${pub.venue}.` : ''}`;
    } else {
      const citeKey = `${pub.authors[0]?.split(' ').pop()?.toLowerCase() || 'paper'}${pub.year ?? ''}`;
      citation = `@article{${citeKey},\n  title={${pub.title}},\n  author={${pub.authors.join(' and ')}},\n  year={${year}}${pub.venue ? `,\n  journal={${pub.venue}}` : ''}\n}`;
    }
    navigator.clipboard.writeText(citation);
    setCopiedId(`${pub.id}-${type}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Extract unique years and research areas
  const years = Array.from(new Set(publications.filter((p) => p.year).map((p) => p.year!.toString()))).sort((a, b) => b.localeCompare(a));
  const areas = Array.from(new Set(publications.flatMap((p) => p.researchAreas))).sort();

  const filteredPublications = publications.filter((pub) => {
    const matchesQuery =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pub.abstract && pub.abstract.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pub.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesYear = selectedYear === 'ALL' || (pub.year && pub.year.toString() === selectedYear);
    const matchesArea = selectedArea === 'ALL' || pub.researchAreas.includes(selectedArea);

    return matchesQuery && matchesYear && matchesArea;
  });

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto space-y-12">
      {showTitle && (
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/60 pb-8 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-widest font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>Academic Archive</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
              Publications Archive
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl">
              Chronological index of peer-reviewed publications across AI marketing, conversational commerce, Gen Z finance, and emerging retail technologies.
            </p>
          </div>
          <div className="font-mono text-xs text-muted-foreground bg-muted/50 px-4 py-2 rounded-full border border-border/60">
            TOTAL RECORDS // {publications.length} PAPERS
          </div>
        </div>
      )}

      {/* Filtering & Search Controls */}
      <div className="glass-panel p-6 rounded-2xl border border-border space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Bar */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search publications by title, keyword, or abstract..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-background border border-border text-foreground font-mono text-xs focus:outline-none focus:border-accent"
              aria-label="Search publications"
            />
          </div>

          {/* Year Filter */}
          <div className="md:col-span-3 relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-mono text-xs appearance-none focus:outline-none focus:border-accent"
              aria-label="Filter by publication year"
            >
              <option value="ALL">FILTER BY YEAR: ALL</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  YEAR: {year}
                </option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>

          {/* Area Filter */}
          <div className="md:col-span-3 relative">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-mono text-xs appearance-none focus:outline-none focus:border-accent"
              aria-label="Filter by research area"
            >
              <option value="ALL">RESEARCH AREA: ALL</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area.toUpperCase()}
                </option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground pt-2 border-t border-border/40">
          <span>SHOWING {filteredPublications.length} OF {publications.length} PUBLICATIONS</span>
          {(searchQuery || selectedYear !== 'ALL' || selectedArea !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedYear('ALL');
                setSelectedArea('ALL');
              }}
              className="text-accent underline hover:text-foreground"
            >
              CLEAR FILTERS
            </button>
          )}
        </div>
      </div>

      {/* Publications Archive Rows */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedYear}-${selectedArea}-${searchQuery}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="divide-y divide-border/60 border-t border-b border-border/60"
        >
          {filteredPublications.map((pub, idx) => {
            const isExpanded = expandedId === pub.id;
            const paperNum = (idx + 1).toString().padStart(2, '0');

            return (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="group py-6 sm:py-8 transition-colors hover:bg-muted/30"
              >
              <div
                onClick={() => setExpandedId(isExpanded ? null : pub.id)}
                className="cursor-pointer grid grid-cols-1 md:grid-cols-12 gap-4 items-start focus:outline-none"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setExpandedId(isExpanded ? null : pub.id);
                  }
                }}
                aria-expanded={isExpanded}
              >
                {/* Left Number & Year */}
                <div className="md:col-span-2 font-mono text-xs text-muted-foreground flex items-center space-x-3">
                  <span className="text-accent font-semibold">{paperNum}</span>
                  {pub.year && (
                    <>
                      <span className="text-border">/</span>
                      <span className="text-foreground font-semibold px-2 py-0.5 rounded bg-muted">
                        {pub.year}
                      </span>
                    </>
                  )}
                </div>

                {/* Center Title & Tags */}
                <div className="md:col-span-8 space-y-2">
                  <div className="flex items-center space-x-2">
                    {pub.featured && (
                      <span className="font-mono text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-accent2/10 text-accent2 border border-accent2/30">
                        ★ FEATURED RESEARCH
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground group-hover:text-accent transition-colors leading-tight">
                    {pub.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground">
                    {pub.venue && <span className="text-foreground/80 font-sans font-medium">{pub.venue}</span>}
                    {pub.venue && <span className="text-border">•</span>}
                    <span>{pub.authors.join(', ')}</span>
                  </div>
                </div>

                {/* Right Expand Icon */}
                <div className="md:col-span-2 flex items-center justify-end space-x-3 font-mono text-xs text-muted-foreground">
                  <span className="hidden sm:inline text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
                    {isExpanded ? 'LESS' : 'ABSTRACT'}
                  </span>
                  <div className={`p-2 rounded-full border border-border transition-transform ${isExpanded ? 'rotate-180 bg-accent text-accent-foreground' : 'group-hover:border-accent'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Expandable Abstract Drawer */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pt-6 mt-4 border-t border-border/40 font-sans text-sm text-foreground/90 space-y-4"
                  >
                    <div className="p-5 rounded-2xl glass-panel space-y-4 bg-muted/40">
                      {pub.abstract && (
                        <div>
                          <h4 className="font-mono text-xs text-muted-foreground uppercase mb-1">Abstract</h4>
                          <p className="leading-relaxed font-serif text-base text-foreground/90">{pub.abstract}</p>
                        </div>
                      )}

                      {/* Keywords */}
                      <div className="space-y-2 pt-2 border-t border-border/40">
                        <div className="font-mono text-[11px] text-muted-foreground uppercase flex items-center space-x-1">
                          <Tag className="w-3 h-3 text-accent" />
                          <span>Keywords</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {pub.keywords.map((kw, i) => (
                            <span
                              key={i}
                              className="font-mono text-[11px] px-2 py-0.5 rounded bg-background border border-border text-foreground/80"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links & Citation Copier */}
                      <div className="pt-3 flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-t border-border/40">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyCitation(pub, 'apa')}
                            className="px-3 py-1 rounded-full bg-background border border-border text-foreground hover:border-accent hover:text-accent transition-colors flex items-center space-x-1.5 text-[11px]"
                            title="Copy APA style citation"
                          >
                            {copiedId === `${pub.id}-apa` ? <Check className="w-3 h-3 text-teal-500" /> : <Copy className="w-3 h-3 text-accent" />}
                            <span>{copiedId === `${pub.id}-apa` ? 'APA Copied!' : 'Copy APA Citation'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyCitation(pub, 'bibtex')}
                            className="px-3 py-1 rounded-full bg-background border border-border text-foreground hover:border-accent hover:text-accent transition-colors flex items-center space-x-1.5 text-[11px]"
                            title="Copy BibTeX code snippet"
                          >
                            {copiedId === `${pub.id}-bibtex` ? <Check className="w-3 h-3 text-teal-500" /> : <Copy className="w-3 h-3 text-accent" />}
                            <span>{copiedId === `${pub.id}-bibtex` ? 'BibTeX Copied!' : 'Copy BibTeX'}</span>
                          </button>
                        </div>

                        <Link
                          href={`/publications/${pub.slug}`}
                          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-accent text-accent-foreground hover:bg-foreground hover:text-background transition-colors"
                        >
                          <span>Full Publication Detail Page ↗</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {filteredPublications.length === 0 && (
          <div className="py-16 text-center space-y-3 font-mono text-sm text-muted-foreground">
            <p>NO PUBLICATIONS MATCHED YOUR CURRENT SEARCH OR FILTER CRITERIA.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedYear('ALL');
                setSelectedArea('ALL');
              }}
              className="text-accent underline hover:text-foreground text-xs"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
