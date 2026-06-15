'use client';

import { useState } from 'react';
import { socialLinks } from '@/data/social-media';
import SocialMediaCard from '@/components/socialmedia/socialmediaCard';

type FilterType =
  | 'all'
  | 'instagram'
  | 'linkedin'
  | 'reddit'
  | 'whatsapp';

const filters: FilterType[] = [
  'all',
  'instagram',
  'linkedin',
  'reddit',
  'whatsapp',
];

export default function SocialMediaList() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredLinks = socialLinks.filter((link) => {
    if (filter === 'all') return true;
    return link.platform === filter;
  });

  const colors: Record<FilterType, string> = {
    all: 'bg-black text-white',
    instagram: 'bg-pink-500 text-white',
    linkedin: 'bg-blue-600 text-white',
    reddit: 'bg-orange-500 text-white',
    whatsapp: 'bg-green-500 text-white',
  };

  return (
    <div className="space-y-6">
      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-2 rounded-full border transition ${
              filter === item
                ? colors[item]
                : 'bg-white text-black'
            }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLinks.map((social) => (
          <SocialMediaCard
            key={social.url}
            social={social}
          />
        ))}
      </div>
    </div>
  );
}