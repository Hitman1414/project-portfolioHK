import { getExperience, getEducation } from '@/lib/content';
import { AcademicTimeline } from '@/components/AcademicTimeline';

export const metadata = {
  title: 'Academic Journey & Experience | Dr. Harshita Kaushik',
  description: 'Chronological professorship appointments, doctoral milestones, and academic history.',
};

export default function ExperiencePage() {
  const experience = getExperience();
  const education = getEducation();

  return (
    <div className="pt-32 pb-24">
      <AcademicTimeline education={education} experience={experience} />
    </div>
  );
}
