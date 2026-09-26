import { getTeaching } from '@/lib/content';
import { TeachingIndex } from '@/components/TeachingIndex';

export const metadata = {
  title: 'Teaching Index | Dr. Harshita Kaushik',
  description: 'MBA and management course design in marketing, strategy, digital business, and financial systems.',
};

export default function TeachingPage() {
  const subjects = getTeaching();

  return (
    <div className="pt-32 pb-24">
      <TeachingIndex subjects={subjects} />
    </div>
  );
}
