import { SocialLink } from '@/data/social-media';
import { QuickActionButton } from '@/components/QuickActionButton';

export default function SocialMediaButtons({
  socials,
}: {
  socials: SocialLink[];
}) {
  return (
    <div className="space-y-3">
      {socials.map((social) => (
        <a
          key={social.url}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <QuickActionButton
            text={social.name}
          />
        </a>
      ))}
    </div>
  );
}