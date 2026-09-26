import { getPublications } from '@/lib/content';
import { PublicationIndex } from '@/components/PublicationIndex';

export const metadata = {
  title: 'Publications Archive | Dr. Harshita Kaushik',
  description: 'Peer-reviewed academic research papers on AI marketing, conversational commerce, consumer behavior, and retail technology.',
};

export default function PublicationsPage() {
  const publications = getPublications();

  return (
    <div className="pt-32 pb-24">
      <PublicationIndex publications={publications} showTitle={true} />
    </div>
  );
}
