import { notFound } from 'next/navigation';
import clubData from 'src/components/club/ClubData';
import ClubDetail from '@/components/club/ClubDetail';

export default async function ClubDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params); // simulate async destructuring

  const club = clubData.find((c) => c.slug === slug);
  if (!club) notFound();
  return <ClubDetail club={club} />;
}
