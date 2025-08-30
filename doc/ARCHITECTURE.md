# Architecture

Stack:
- Next.js 15 App Router (`src/app/`)
- React 19 + TypeScript
- TailwindCSS for styling
- PWA support via `next-pwa`
- IndexedDB via `idb` for client storage
- Optional Firebase client/admin
- Charts via `chart.js` and `react-chartjs-2`

Key directories:
- `src/app/`: Route segments and pages
- `src/components/`: Reusable UI components per feature
- `src/lib/`: Client libraries (e.g., `src/lib/idb.ts`, `src/lib/expense/*`)
- `src/data/`: Static data and configs
- `src/types/`: Shared types
- `__test__/`: Jest tests

Navigation:
- Bottom/Top navigation components in `src/components/`

Persistence:
- Local: IndexedDB (`idb`), used for attendance/expense and caching
- Remote: Firebase or API routes in `src/app/api/*` (e.g., complaints)

Edge compatibility:
- Ensure server code uses Edge-compatible APIs when deployed to Cloudflare Workers.
