import { notFound } from 'next/navigation';
import clubData from '@/components/club/ClubData';


export default async function ClubDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await Promise.resolve(params); // simulate async destructuring

  const club = clubData.find((c) => c.slug === slug);
  if (!club) notFound();
  return <h1>Club Details</h1>;
}