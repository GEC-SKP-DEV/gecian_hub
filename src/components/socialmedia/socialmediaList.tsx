'use client';

import { useState } from 'react';
import { socialLinks } from '@/data/social-media';
import SocialMediaCard from '@/components/socialmedia/socialmediaCard';

type FilterType =
  | 'all'
  | 'instagram'
  | 'linkedin'
  | 'reddit';

export default function SocialMediaList() {
  const [filter, setFilter] =
    useState<FilterType>('all');

  const filteredLinks = socialLinks.filter(
    (link) => {
      if (filter === 'all') return true;

      return link.platform === filter;
    }
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[
          'all',
          'instagram',
          'linkedin',
          'reddit',
        ].map((item) => (
          <button
            key={item}
            onClick={() =>
              setFilter(item as FilterType)
            }
            className={`px-4 py-2 rounded-full border transition ${
              filter === item
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            {item.charAt(0).toUpperCase() +
              item.slice(1)}
          </button>
        ))}
      </div>

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