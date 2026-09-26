import { getPublications, getPublicationBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Tag, Calendar, User, ExternalLink } from 'lucide-react';

export async function generateStaticParams() {
  const list = getPublications();
  return list.map((p: any) => ({ slug: p.slug }));
}

export default function PublicationDetailPage({ params }: { params: { slug: string } }) {
  const pub = getPublicationBySlug(params.slug);
  if (!pub) notFound();

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto space-y-12">
      {/* Back Button */}
      <Link
        href="/publications"
        className="inline-flex items-center space-x-2 font-mono text-xs text-muted-foreground hover:text-accent transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO PUBLICATIONS ARCHIVE</span>
      </Link>

      {/* Title & Metadata Header */}
      <div className="space-y-6 border-b border-border/60 pb-8">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground font-semibold">
            YEAR {pub.year}
          </span>
          <span className="text-muted-foreground">{pub.venue}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-foreground leading-tight">
          {pub.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground border-t border-border/40 pt-4">
          <div className="flex items-center space-x-1">
            <User className="w-3.5 h-3.5 text-accent" />
            <span className="text-foreground">{pub.authors.join(', ')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>{pub.year}</span>
          </div>
        </div>
      </div>

      {/* Abstract & Body */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-border space-y-6">
        <h2 className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          Paper Abstract
        </h2>
        <p className="font-serif text-xl text-foreground/90 leading-relaxed italic">
          &quot;{pub.abstract}&quot;
        </p>
      </div>

      {/* Keywords & Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="space-y-3">
          <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest flex items-center space-x-2">
            <Tag className="w-3.5 h-3.5 text-accent" />
            <span>Keywords</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {pub.keywords.map((kw: string, i: number) => (
              <span
                key={i}
                className="font-mono text-xs px-3 py-1 rounded-md bg-muted text-foreground border border-border"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest flex items-center space-x-2">
            <BookOpen className="w-3.5 h-3.5 text-accent" />
            <span>Research Classification</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {pub.researchAreas.map((area: string, i: number) => (
              <span
                key={i}
                className="font-mono text-xs px-3 py-1 rounded-md bg-accent/10 text-accent border border-accent/20 font-semibold"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Links */}
      <div className="pt-8 border-t border-border/60 flex items-center justify-between font-mono text-xs">
        <div className="text-muted-foreground">
          DOI: {pub.doi || 'Available upon academic request'}
        </div>
        {pub.url && (
          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-foreground hover:text-background transition-colors"
          >
            <span>External Publisher Link</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
