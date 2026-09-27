import {
  getProfile,
  getResearch,
  getPublications,
  getExperience,
  getEducation,
  getTeaching,
  getPatents,
} from '@/lib/content';
import { HeroExperience } from '@/components/HeroExperience';
import { ResearchMap } from '@/components/ResearchMap';
import { PublicationIndex } from '@/components/PublicationIndex';
import { AcademicTimeline } from '@/components/AcademicTimeline';
import { TeachingIndex } from '@/components/TeachingIndex';
import { InnovationSection } from '@/components/InnovationSection';
import { ChapterIndicator } from '@/components/ChapterIndicator';

export default function HomePage() {
  const profile = getProfile();
  const research = getResearch();
  const publications = getPublications();
  const experience = getExperience();
  const education = getEducation();
  const teaching = getTeaching();
  const patents = getPatents();

  return (
    <div className="space-y-0 relative">
      {/* Montfort Style Left Vertical Chapter Tracker */}
      <ChapterIndicator />

      {/* SECTION 00: HERO */}
      <section className="bg-background">
        <HeroExperience profile={profile} />
      </section>

      {/* SECTION 01: RESEARCH MAP (Muted Accent Background) */}
      <section id="research-map" className="bg-muted/30 border-t border-b border-border/40 relative">
        <div className="max-w-7xl mx-auto px-6 pt-6 font-mono text-[11px] text-accent font-semibold tracking-widest uppercase flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent2" />
          <span>01 // RESEARCH MAP ARCHITECTURE</span>
        </div>
        <ResearchMap topics={research} />
      </section>

      {/* SECTION 02: PUBLICATIONS ARCHIVE (Clean Canvas Background) */}
      <section id="publications-archive" className="bg-background relative">
        <div className="max-w-7xl mx-auto px-6 pt-10 font-mono text-[11px] text-accent font-semibold tracking-widest uppercase flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>02 // PEER-REVIEWED PUBLICATIONS</span>
        </div>
        <PublicationIndex publications={publications} />
      </section>

      {/* SECTION 03: ACADEMIC TIMELINE (Muted Accent Background) */}
      <section id="academic-timeline" className="bg-muted/30 border-t border-b border-border/40 relative">
        <div className="max-w-7xl mx-auto px-6 pt-10 font-mono text-[11px] text-accent font-semibold tracking-widest uppercase flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent2" />
          <span>03 // ACADEMIC & PROFESSIONAL PROGRESSION</span>
        </div>
        <AcademicTimeline education={education} experience={experience} />
      </section>

      {/* SECTION 04: TEACHING INDEX (Clean Canvas Background) */}
      <section id="teaching-index" className="bg-background relative">
        <div className="max-w-7xl mx-auto px-6 pt-10 font-mono text-[11px] text-accent font-semibold tracking-widest uppercase flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>04 // MBA PEDAGOGY & COURSE INDEX</span>
        </div>
        <TeachingIndex subjects={teaching} />
      </section>

      {/* SECTION 05: INNOVATION & PATENTS (Muted Accent Background) */}
      <section id="innovation-patents" className="bg-muted/30 border-t border-border/40 relative">
        <div className="max-w-7xl mx-auto px-6 pt-10 font-mono text-[11px] text-accent font-semibold tracking-widest uppercase flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent2" />
          <span>05 // REGISTERED PATENTS & INTELLECTUAL PROPERTY</span>
        </div>
        <InnovationSection patents={patents} />
      </section>
    </div>
  );
}
