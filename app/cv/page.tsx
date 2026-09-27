import {
  getProfile,
  getEducation,
  getExperience,
  getPublications,
  getTeaching,
  getPatents,
} from '@/lib/content';
import { Download, Printer, GraduationCap, Briefcase, BookOpen, Award, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { PrintCVButton } from '@/components/PrintCVButton';

export const metadata = {
  title: 'Curriculum Vitae (CV) | Dr. Harshita Kaushik',
  description: 'Complete academic CV of Dr. Harshita Kaushik including PhD dissertation, publication record, work history, and teaching portfolio.',
};

export default function CVPage() {
  const profile = getProfile();
  const education = getEducation();
  const experience = getExperience();
  const publications = getPublications();
  const teaching = getTeaching();
  const patents = getPatents();

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-12">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/60 pb-8 gap-6">
        <div>
          <div className="flex items-center space-x-2 font-mono text-xs text-accent uppercase tracking-widest font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>Official Academic Resume</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-foreground">
            Curriculum Vitae
          </h1>
          <p className="font-mono text-xs text-muted-foreground uppercase mt-1">
            Last Verified & Updated: September 2026
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <PrintCVButton />
          <Link
            href="/contact"
            className="no-print inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-foreground text-background font-mono text-xs uppercase tracking-wider hover:bg-accent hover:text-accent-foreground transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Academic Contact</span>
          </Link>
        </div>
      </div>

      {/* CV Document Container */}
      <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-border space-y-12 shadow-xl bg-card">
        {/* Personal Header */}
        <div className="border-b border-border/60 pb-8 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            DR. HARSHITA KAUSHIK
          </h2>
          <p className="font-mono text-xs text-accent uppercase tracking-widest font-semibold">
            Assistant Professor · MBA | KSET | NET | Ph.D.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 font-mono text-xs text-muted-foreground border-t border-border/40">
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>Srinivas University · Mangaluru, Karnataka</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
              <a href={`mailto:${profile.email}`} className="text-foreground hover:underline">
                {profile.email}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>+91 9118209724</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>UGC NET Qualified (2020) & KSET Qualified (2020)</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center space-x-2">
            <span>01. PROFESSIONAL SUMMARY</span>
          </h3>
          <p className="font-serif text-base text-foreground/90 leading-relaxed italic">
            &quot;{profile.summary}&quot;
          </p>
        </div>

        {/* Education Section */}
        <div className="space-y-6 pt-4 border-t border-border/60">
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center space-x-2">
            <GraduationCap className="w-4 h-4" />
            <span>02. EDUCATION & ACADEMIC CREDENTIALS</span>
          </h3>

          <div className="space-y-6 divide-y divide-border/40">
            {education.map((edu: any) => (
              <div key={edu.id} className="pt-4 first:pt-0 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <span className="font-semibold text-foreground text-sm font-serif">{edu.degree}</span>
                  <span className="text-accent">{edu.year}</span>
                </div>
                <div className="text-xs font-mono text-muted-foreground">{edu.institution} · {edu.location}</div>
                {edu.gpa && <div className="text-xs font-mono text-foreground font-semibold">Grade: {edu.gpa}</div>}
                <p className="text-xs text-muted-foreground font-sans pt-1">{edu.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Experience */}
        <div className="space-y-6 pt-4 border-t border-border/60">
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center space-x-2">
            <Briefcase className="w-4 h-4" />
            <span>03. PROFESSIONAL & TEACHING APPOINTMENTS</span>
          </h3>

          <div className="space-y-6 divide-y divide-border/40">
            {experience.map((exp: any) => (
              <div key={exp.id} className="pt-4 first:pt-0 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-serif text-xl font-normal text-foreground">{exp.role}</h4>
                  <span className="font-mono text-xs text-accent font-semibold">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="font-mono text-xs text-muted-foreground">{exp.organization} · {exp.location}</div>
                <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground pt-1">
                  {exp.highlights.map((h: string, i: number) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Publications Record */}
        <div className="space-y-6 pt-4 border-t border-border/60">
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>04. PUBLICATIONS ARCHIVE ({publications.length} PAPERS)</span>
          </h3>

          <ol className="space-y-4 list-decimal list-inside font-sans text-xs text-foreground/90">
            {publications.map((pub: any) => (
              <li key={pub.id} className="leading-relaxed font-serif text-sm">
                <span className="font-semibold">{pub.title}.</span> ({pub.year}). <em>{pub.venue}</em>. Authors: {pub.authors.join(', ')}.
              </li>
            ))}
          </ol>
        </div>

        {/* Teaching Subjects */}
        <div className="space-y-4 pt-4 border-t border-border/60">
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            05. SUBJECTS HANDLED
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
            {teaching.map((sub: any, i: number) => (
              <div key={sub.id} className="p-3 rounded-xl bg-muted/40 border border-border/60 flex items-center space-x-2">
                <span className="text-accent font-semibold">{i + 1}.</span>
                <span className="text-foreground">{sub.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Patents Section */}
        {patents.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-border/60">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              06. PATENTS & INTELLECTUAL PROPERTY
            </h3>
            <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-1 font-mono text-xs">
              <div className="text-foreground font-semibold">{patents[0].title}</div>
              <div className="text-muted-foreground">{patents[0].category} · Status: {patents[0].status}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
