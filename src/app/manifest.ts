// app/manifest.ts
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gecian Hub',
    short_name: 'Gecian',
    description: 'A modern student portal for GECians to manage complaints, expenses, attendance, clubs, and events.',
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait',
    dir: 'ltr',
    lang: 'en',
    categories: ['education', 'productivity'],
    prefer_related_applications: false,
    related_applications: [],
    // Optional: screenshots to improve install dialogs and store listings
    screenshots: [
      {
        src: '/INVENTO.jpg',
        type: 'image/jpeg',
        label: 'Home and events overview'
      },
      {
        src: '/images/FingerprintImg.png',
        type: 'image/png',
        label: 'Attendance quick action'
      }
    ],
    launch_handler: { client_mode: 'focus-existing' },
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-256.png', sizes: '256x256', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-384.png', sizes: '384x384', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-192-maskable.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
