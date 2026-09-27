import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { MouseGlow } from '@/components/MouseGlow';

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background/50 pt-20 pb-12 transition-colors duration-300 overflow-hidden z-0">
      <MouseGlow />
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-6 space-y-6">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="font-mono text-xs text-accent tracking-widest uppercase font-semibold">
              Research & Academic Profile
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-foreground">
            Let&apos;s talk research, teaching, and academic collaboration.
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
            Assistant Professor at Srinivas University. Open to scholarly research discussions, guest lectures, conference panels, and academic inquiry.
          </p>
          <div className="pt-2">
            <a
              href="mailto:harshitakaushik2409@gmail.com"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-all group"
            >
              <span>harshitakaushik2409@gmail.com</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3 space-y-4">
          <h3 className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">
            Navigation
          </h3>
          <ul className="space-y-2.5 font-mono text-xs">
            <li>
              <Link href="/research" className="hover:text-accent transition-colors">
                01 RESEARCH MAP
              </Link>
            </li>
            <li>
              <Link href="/publications" className="hover:text-accent transition-colors">
                02 PUBLICATIONS ARCHIVE
              </Link>
            </li>
            <li>
              <Link href="/teaching" className="hover:text-accent transition-colors">
                03 TEACHING INDEX
              </Link>
            </li>
            <li>
              <Link href="/experience" className="hover:text-accent transition-colors">
                04 ACADEMIC JOURNEY
              </Link>
            </li>
            <li>
              <Link href="/patents" className="hover:text-accent transition-colors">
                05 PATENT & INNOVATION
              </Link>
            </li>
            <li>
              <Link href="/cv" className="hover:text-accent transition-colors">
                06 ACADEMIC CV
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-4">
          <h3 className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">
            Academic Credentials
          </h3>
          <ul className="space-y-2 font-mono text-xs text-muted-foreground">
            <li>Ph.D. Management · Tumkur University</li>
            <li>MBA Marketing · BHU Varanasi</li>
            <li>UGC NET Qualified (2020)</li>
            <li>KSET Qualified (2020)</li>
            <li>Srinivas University · Mangaluru</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] text-muted-foreground space-y-4 sm:space-y-0">
        <div>© 2026 DR. HARSHITA KAUSHIK. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center space-x-6">
          <a
            href="https://www.linkedin.com/in/dr-harshita-kaushik-897210240"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors flex items-center space-x-1"
          >
            <span>LINKEDIN</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
