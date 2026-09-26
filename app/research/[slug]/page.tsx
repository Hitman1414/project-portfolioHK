import { getResearch, getResearchBySlug, getPublications } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Layers, CheckCircle2, ArrowUpRight } from 'lucide-react';

export async function generateStaticParams() {
  const topics = getResearch();
  return topics.map((t: any) => ({ slug: t.slug }));
}

export default function ResearchDetailPage({ params }: { params: { slug: string } }) {
  const topic = getResearchBySlug(params.slug);
  if (!topic) notFound();

  const allPubs = getPublications();
  const relatedPubs = allPubs.filter((p: any) => topic.relatedPublications.includes(p.id));

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-12">
      {/* Back Button */}
      <Link
        href="/research"
        className="inline-flex items-center space-x-2 font-mono text-xs text-muted-foreground hover:text-accent transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO RESEARCH MAP</span>
      </Link>

      {/* Header */}
      <div className="space-y-4 border-b border-border/60 pb-8">
        <span className="font-mono text-xs uppercase text-accent font-semibold px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
          {topic.category}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-foreground leading-tight">
          {topic.title}
        </h1>
        <p className="font-serif text-xl text-foreground/80 italic leading-relaxed">
          {topic.summary}
        </p>
      </div>

      {/* Detailed Content */}
      <div className="space-y-8 font-sans text-foreground/90">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-border space-y-6">
          <h2 className="font-serif text-2xl font-medium text-foreground">
            Research Scope & Objectives
          </h2>
          <p className="leading-relaxed text-base">
            {topic.description}
          </p>
        </div>

        {/* Associated Themes */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest flex items-center space-x-2">
            <Layers className="w-4 h-4 text-accent" />
            <span>Associated Theoretical Themes</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {topic.themes.map((theme: string, i: number) => (
              <span
                key={i}
                className="font-mono text-xs px-3.5 py-1.5 rounded-lg bg-card border border-border text-foreground font-medium"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        {/* Related Publications */}
        {relatedPubs.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-border/60">
            <h3 className="font-serif text-2xl font-normal text-foreground flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-accent" />
              <span>Related Publications ({relatedPubs.length})</span>
            </h3>

            <div className="space-y-4">
              {relatedPubs.map((pub: any) => (
                <div
                  key={pub.id}
                  className="p-6 rounded-2xl glass-panel border border-border space-y-3"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                    <span className="text-accent font-semibold">{pub.year}</span>
                    <span>{pub.venue}</span>
                  </div>
                  <h4 className="font-serif text-xl font-normal text-foreground">
                    {pub.title}
                  </h4>
                  <p className="text-sm text-muted-foreground font-serif italic">
                    {pub.abstract}
                  </p>
                  <div className="pt-2 flex justify-end font-mono text-xs">
                    <Link
                      href={`/publications/${pub.slug}`}
                      className="text-accent hover:underline flex items-center space-x-1"
                    >
                      <span>Read Publication Page</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
