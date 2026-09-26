import { getProfile, getEducation } from '@/lib/content';
import { Award, BookOpen, GraduationCap, MapPin, Mail, Globe, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About Dr. Harshita Kaushik | Academic Profile',
  description: 'Academic background, Ph.D. thesis details, teaching philosophy, and qualifications of Dr. Harshita Kaushik.',
};

export default function AboutPage() {
  const profile = getProfile();
  const education = getEducation();

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <div className="border-b border-border/60 pb-10 space-y-4">
        <div className="flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-widest font-semibold">
          <GraduationCap className="w-4 h-4" />
          <span>Academic Profile & Bio</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-foreground">
          Dr. Harshita Kaushik
        </h1>
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          Assistant Professor · Department of Management / MBA · Srinivas University
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Biography & Research Focus */}
        <div className="lg:col-span-8 space-y-10">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-border/80 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground">
              Professional Summary
            </h2>
            <p className="font-serif text-lg text-foreground/90 leading-relaxed italic">
              &quot;{profile.summary}&quot;
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dr. Kaushik completed her Ph.D. in Management from Tumkur University, Karnataka in February 2026. Her doctoral dissertation evaluated customer engagement patterns across artificial intelligence platforms and conversational interfaces in Bengaluru&apos;s e-commerce sector. She holds a Master of Business Administration (MBA) with specialization in Marketing from the Institute of Management Studies, Banaras Hindu University (BHU), Varanasi.
            </p>
          </div>

          {/* PhD Dissertation Showcase */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-border/80 space-y-6 bg-tech-grid">
            <div className="flex items-center justify-between font-mono text-xs text-accent font-semibold uppercase">
              <span>DOCTORAL DISSERTATION</span>
              <span>TUMKUR UNIVERSITY // FEB 2026</span>
            </div>
            <h3 className="font-serif text-2xl font-normal text-foreground leading-snug">
              &quot;{profile.phd.topic}&quot;
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/40 font-mono text-xs text-muted-foreground">
              <div>
                <span className="text-foreground font-semibold">DEGREE:</span> Ph.D. in Management
              </div>
              <div>
                <span className="text-foreground font-semibold">LOCATION:</span> Tumkur, Karnataka
              </div>
            </div>
          </div>

          {/* Academic Qualifications & Accreditations */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-normal text-foreground">
              Certifications & Qualifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.qualifications.map((qual: string, idx: number) => (
                <div key={idx} className="p-5 rounded-2xl glass-panel border border-border flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono text-xs font-semibold text-foreground">{qual}</div>
                    <div className="font-mono text-[11px] text-muted-foreground mt-1">National & State Level Professorship Eligibility</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Quick Facts & Contact */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-panel p-8 rounded-3xl border border-border space-y-6">
            <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest border-b border-border/60 pb-3">
              Fast Facts
            </h3>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="text-muted-foreground">CURRENT APPOINTMENT</div>
                <div className="text-foreground font-semibold mt-0.5">Srinivas University</div>
                <div className="text-muted-foreground text-[11px]">Mangaluru, Karnataka</div>
              </div>

              <div>
                <div className="text-muted-foreground">ALMA MATER</div>
                <div className="text-foreground font-semibold mt-0.5">Banaras Hindu University (BHU)</div>
                <div className="text-muted-foreground text-[11px]">MBA Marketing & B.Sc. Botany</div>
              </div>

              <div>
                <div className="text-muted-foreground">RESEARCH DOMAINS</div>
                <div className="text-foreground mt-0.5 font-sans text-xs">
                  AI Marketing, Conversational UI, Customer Engagement, E-Commerce, Data Privacy, Gen Z Consumer Behaviour.
                </div>
              </div>

              <div>
                <div className="text-muted-foreground">LANGUAGES</div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {profile.languages.map((l: any, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-muted text-foreground text-[11px]">
                      {l.name} ({l.proficiency})
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border/60 space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-foreground text-background font-mono text-xs uppercase tracking-wider hover:bg-accent hover:text-accent-foreground transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Dr. Kaushik</span>
              </a>
              <Link
                href="/cv"
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-muted border border-border text-foreground font-mono text-xs uppercase tracking-wider hover:border-accent transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Full Academic CV</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
