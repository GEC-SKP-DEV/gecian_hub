// app/club/[slug]/page.tsx
import { notFound } from 'next/navigation';
import clubData from '@/data/club';
import ClubDetail from '@/components/club/ClubDetail';
export const runtime = 'edge';
import type { Metadata } from 'next';

export default async function ClubDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;   

  const club = clubData.find((c) => c.slug === slug);
  if (!club) notFound();

  return <ClubDetail club={club} />;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const club = clubData.find((c) => c.slug === slug);
  if (!club) return {};

  const base = new URL('https://gecian-hub.pages.dev');
  const title = `${club.name} — Club @ Gecian Hub`;
  const description = club.description.slice(0, 160);
  const ogImage = `/api/og?title=${encodeURIComponent(club.name)}`;

  return {
    title,
    description,
    alternates: { canonical: `/club/${club.slug}` },
    openGraph: {
      title,
      description,
      url: new URL(`/club/${club.slug}`, base).toString(),
      images: [ogImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
