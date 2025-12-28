import Link from 'next/link';

type Club = {
  name: string;
  slug: string;
  description: string;
  logo: string;
  category?: string[];
};

export default function ClubCard({ club }: { club: Club }) {
  return (
    <Link href={`/club/${club.slug}`}>
      <div className="bg-white rounded-3xl border-2 border-black hover:bg-gray-200 transition h-[300px] flex flex-col">
        <img
          src={club.logo}
          alt={club.name}
          className="w-full h-40 object-cover rounded-t-3xl border-b border-bottom-width-2px;"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-2xl text-black font-semibold">{club.name}</h2>
          <p className="text-sm text-gray-600 mb-1">
            {club.category && club.category.length ? club.category.join(', ') : ''}
          </p>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">{club.description}</p>
        </div>
      </div>
    </Link>
  );
}
