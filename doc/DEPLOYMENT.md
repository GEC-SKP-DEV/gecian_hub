# Deployment

## Vercel
- Standard Next.js deployment supported.

## Cloudflare Workers (via OpenNext)
- Build and preview locally:
  ```bash
  npm run preview
  ```
- Deploy:
  ```bash
  npm run deploy
  ```
- Configure bindings and env in `wrangler.toml`.
- OpenNext config: `open-next.config.ts`

Notes:
- Ensure serverless/edge-compatible code paths where required.
- Static assets are handled by OpenNext asset pipeline.
