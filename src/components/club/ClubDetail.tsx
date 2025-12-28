
'use client';

import { Instagram, Linkedin, ArrowLeftIcon, Globe, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Club = {
  name: string;
  slug: string;
  description: string;
  logo: string;
  category?: string[];
  lead?: {
    name?: string;
    phone?: string;
  };
  socials?: {
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
    website?: string;
  };
};

export default function ClubDetail({ club }: { club: Club }) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen text-black bg-white">

      {/* --- Header with Background Image --- */}
      <div className="relative w-full h-48  md:h-72 lg:h-96 border-b border-bottom-width: 2px">
        <Image src={club.logo} alt={club.name} fill className="object-cover" priority />
        {/* Back Button */}
        <button
          onClick={() => router.push('/club')}
          className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 bg-white"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      </div>

      {/* --- Main Content --- */}
      <div className="p-6 overflow-y-auto flex-1">
        <h1 className="text-3xl font-bold mb-1">{club.name}</h1>
        <p className="text-sm text-gray-600 mb-4">
          {club.category && club.category.length ? club.category.join(', ') : null}
        </p>

        {/* --- Description and Social Links --- */}
        <div className="flex gap-6">
          {/* Description */}
          <p className="text-base text-black leading-relaxed indent-8 flex-1">
            {club.description}
          </p>

          {/* Social Links - Vertical */}
          {club.socials && (
            <div className="flex flex-col gap-3 flex-shrink-0">
              {club.socials?.instagram && (
                <a
                  href={club.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-pink-600 rounded-lg hover:bg-pink-50 transition whitespace-nowrap"
                >
                  <Instagram className="w-5 h-5 text-pink-600" />
                  <span className="text-sm text-pink-600">Instagram</span>
                </a>
              )}
              {club.socials?.linkedin && (
                <a
                  href={club.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-blue-700 rounded-lg hover:bg-blue-50 transition whitespace-nowrap"
                >
                  <Linkedin className="w-5 h-5 text-blue-700" />
                  <span className="text-sm text-blue-700">LinkedIn</span>
                </a>
              )}
              {club.socials?.website && (
                <a
                  href={club.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-blue-700 rounded-lg hover:bg-blue-50 transition whitespace-nowrap"
                >
                  <Globe className="w-5 h-5 text-blue-700" />
                  <span className="text-sm text-blue-700">Website</span>
                </a>
              )}
              {club.socials?.whatsapp && (
                <a
                  href={club.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-green-600 rounded-lg hover:bg-green-50 transition whitespace-nowrap"
                >
                  <Phone className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-600">WhatsApp</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
