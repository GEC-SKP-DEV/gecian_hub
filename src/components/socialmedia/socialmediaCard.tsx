import { SocialLink } from '@/data/social-media';
import { Instagram, Linkedin } from 'lucide-react';
import { FaReddit } from 'react-icons/fa';

export default function SocialMediaCard({
  social,
}: {
  social: SocialLink;
}) {
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white border-2 border-black rounded-3xl p-5 hover:bg-gray-100 transition"
    >
      <div className="flex items-center gap-3">
        {social.platform === 'instagram' && (
          <Instagram className="w-6 h-6 text-pink-500" />
        )}

        {social.platform === 'linkedin' && (
          <Linkedin className="w-6 h-6 text-blue-600" />
        )}

        {social.platform === 'reddit' && (
          <FaReddit className="w-6 h-6 text-orange-500" />
        )}

        <div>
          <h2 className="font-semibold text-black">
            {social.name}
          </h2>

          <p className="text-sm text-gray-500 capitalize">
            {social.platform}
          </p>
        </div>
      </div>
    </a>
  );
}