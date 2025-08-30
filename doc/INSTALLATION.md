# Installation

Prerequisites:
- Node.js 20+
- npm 9+

Steps:
1. Clone the repo and install dependencies
   ```bash
   npm install
   ```
2. Start dev server
   ```bash
   npm run dev
   ```
3. Build and run production
   ```bash
   npm run build
   npm start
   ```

Useful scripts (`package.json`):
- `dev`: Next.js dev server (Turbopack)
- `build`: Production build
- `start`: Production server
- `test`: Run Jest tests
- `update-snapshot`: Update Jest snapshots
- `preview` / `deploy`: OpenNext Cloudflare build and preview/deploy
- `cf-typegen`: Wrangler types
