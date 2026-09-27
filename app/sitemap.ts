import { MetadataRoute } from 'next';
import { getPublications, getResearch } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://project-portfolio-hk.vercel.app';

  const pubs = getPublications();
  const research = getResearch();

  const staticRoutes = [
    '',
    '/about',
    '/research',
    '/publications',
    '/teaching',
    '/experience',
    '/patents',
    '/cv',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const pubRoutes = pubs.map((p: any) => ({
    url: `${baseUrl}/publications/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const researchRoutes = research.map((r: any) => ({
    url: `${baseUrl}/research/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...pubRoutes, ...researchRoutes];
}
