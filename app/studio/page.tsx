import { notFound } from 'next/navigation';
import StudioClient from './StudioClient';

export const metadata = {
  title: 'Portfolio Studio | Local Editor',
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioPage() {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  return <StudioClient />;
}
