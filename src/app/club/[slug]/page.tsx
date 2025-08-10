// app/club/[slug]/page.tsx
import { notFound } from 'next/navigation';
import clubData from 'src/components/club/ClubData';
import ClubDetail from '@/components/club/ClubDetail';
export const runtime = 'edge';

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
