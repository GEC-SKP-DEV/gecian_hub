// app/club/[slug]/page.tsx
import { notFound } from 'next/navigation';
import clubData from '@/components/club/ClubData';

export default async function ClubDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;  // 🚨 params must be a Promise
}) {
  const { slug } = await params;        // 🚨 await it before using

  const club = clubData.find((c) => c.slug === slug);
  if (!club) notFound();

  return <h1>Club Details: {slug}</h1>;
}
