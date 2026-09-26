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

export default function HomePage() {
  const profile = getProfile();
  const research = getResearch();
  const publications = getPublications();
  const experience = getExperience();
  const education = getEducation();
  const teaching = getTeaching();
  const patents = getPatents();

  return (
    <div className="space-y-12">
      <HeroExperience profile={profile} />
      <ResearchMap topics={research} />
      <PublicationIndex publications={publications} />
      <AcademicTimeline education={education} experience={experience} />
      <TeachingIndex subjects={teaching} />
      <InnovationSection patents={patents} />
    </div>
  );
}
