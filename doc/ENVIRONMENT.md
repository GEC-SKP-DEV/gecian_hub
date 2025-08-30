# Environment & Configuration

Primary configs:
- Next.js config: `next.config.js`
- Tailwind: `tailwind.config.ts`
- TypeScript: `tsconfig.json`
- OpenNext: `open-next.config.ts`
- Cloudflare (Workers/Wrangler): `wrangler.toml`

Environment variables (examples, adjust to your setup):
- Firebase client: `NEXT_PUBLIC_FIREBASE_*`
- Firebase admin (server-side only): `FIREBASE_*`
- PWA options via `next-pwa` if used

Edge runtime:
- Uses `@opennextjs/cloudflare` to support Cloudflare deployment.
- Some APIs may require KV/D1 bindings configured in `wrangler.toml`.

Static assets:
- `public/` holds icons and images used across features.
