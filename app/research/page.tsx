import { getResearch } from '@/lib/content';
import { ResearchMap } from '@/components/ResearchMap';
import Link from 'next/link';
import { ArrowRight, Layers, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Research Overview | Dr. Harshita Kaushik',
  description: 'Exploration of AI, conversational interfaces, consumer behaviour, and digital commerce research themes.',
};

export default function ResearchPage() {
  const topics = getResearch();

  return (
    <div className="pt-32 pb-24 space-y-16">
      <div className="max-w-7xl mx-auto px-6 space-y-4 border-b border-border/60 pb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold px-3 py-1 rounded-full bg-accent/10 border border-accent/20 inline-block">
          INTERDISCIPLINARY SCHOLARSHIP
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-foreground">
          Research System & Themes
        </h1>
        <p className="text-muted-foreground text-base max-w-2xl">
          Dr. Harshita Kaushik&apos;s scholarship focuses on how artificial intelligence algorithms and conversational interfaces transform consumer engagement, digital marketing dynamics, and e-commerce strategy.
        </p>
      </div>

      <ResearchMap topics={topics} />

      {/* Comprehensive List of Research Focus Areas */}
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <h2 className="font-serif text-3xl font-normal text-foreground">
          All Research Focus Areas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics.map((topic: any) => (
            <div
              key={topic.id}
              className="glass-panel p-8 rounded-3xl border border-border flex flex-col justify-between space-y-6 hover:border-accent/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-accent uppercase font-semibold">{topic.category}</span>
                  <span className="text-muted-foreground">TOPIC // {topic.id}</span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-foreground leading-tight">
                  {topic.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {topic.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {topic.themes.map((theme: string, i: number) => (
                    <span key={i} className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">
                  {topic.relatedPublications.length} Related Papers
                </span>
                <Link
                  href={`/research/${topic.slug}`}
                  className="inline-flex items-center space-x-2 font-mono text-xs text-accent hover:underline group"
                >
                  <span>Explore Topic Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
