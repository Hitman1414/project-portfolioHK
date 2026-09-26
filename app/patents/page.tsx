import { getPatents } from '@/lib/content';
import { InnovationSection } from '@/components/InnovationSection';

export const metadata = {
  title: 'Patents & Technology Innovation | Dr. Harshita Kaushik',
  description: 'Registered patent details on IoT micro-node architecture and hyperlocal distribution systems.',
};

export default function PatentsPage() {
  const patents = getPatents();

  return (
    <div className="pt-32 pb-24">
      <InnovationSection patents={patents} />
    </div>
  );
}
