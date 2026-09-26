import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/studio', '/studio'],
    },
    sitemap: 'https://harshitakaushik.com/sitemap.xml',
  };
}
