
'use client';

import { Instagram, Linkedin, ChevronDown, ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Club = {
  name: string;
  slug: string;
  description: string;
  image: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
  };
};

export default function ClubDetail({ club }: { club: Club }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen text-black bg-white">

      {/* --- Header with Background Image --- */}
      <div className="relative w-full h-48  md:h-72 lg:h-96 border-b border-bottom-width: 2px">
        <Image
    src={club.image}
    alt={club.name}
    fill
    className="object-cover"
    priority
  />
        {/* Back Button */}
        <button
          onClick={() => router.push('/club')}
          className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 bg-white"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>

        {/* Dropdown Menu */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 bg-white "
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2.5 bg-white border rounded-md shadow-md p-2 flex flex-col gap-2 z-50">
                {club.socials.instagram && (
                    <a
                        href={club.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-600"
                    >
                    <Instagram className="w-5 h-5" />
                    </a>
                )}
                {club.socials.linkedin && (
                    <a
                        href={club.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-700"
                    >
                    <Linkedin className="w-5 h-5" />
                    </a>
  )}
  {/*update other social media links */}
</div>

          )}
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-1">{club.name}</h1>
        <p className="text-sm text-gray-600 mb-4">subtitle</p>
        <p className="text-base text-black leading-relaxed indent-8">
          {club.description}
        </p>
      </div>
    </div>
  );
}
