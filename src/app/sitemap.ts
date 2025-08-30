import type { MetadataRoute } from 'next';
import { eventsData } from '@/data/events';
import clubData from '@/data/club';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://gecian-hub.pages.dev';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/home',
    '/events',
    '/club',
    '/bus',
    '/floor',
    '/map',
    '/attendance',
    '/expense',
    '/studymaterial',
  ].map((path) => ({ url: `${base}${path || '/'}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 }));

  const eventRoutes: MetadataRoute.Sitemap = eventsData.map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified: new Date(e.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const clubRoutes: MetadataRoute.Sitemap = clubData.map((c) => ({
    url: `${base}/club/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...eventRoutes, ...clubRoutes];
}
