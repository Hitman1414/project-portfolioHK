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
import { HomeTabs } from '@/components/HomeTabs';

export default function HomePage() {
  const profile = getProfile();
  const research = getResearch();
  const publications = getPublications();
  const experience = getExperience();
  const education = getEducation();
  const teaching = getTeaching();
  const patents = getPatents();

  return (
    <div className="relative">
      <section className="bg-background">
        <HeroExperience profile={profile} />
      </section>

      <HomeTabs
        research={research}
        publications={publications}
        experience={experience}
        education={education}
        teaching={teaching}
        patents={patents}
      />
    </div>
  );
}
