# Development

- Run dev server: `npm run dev`
- Code style: TypeScript + React functional components
- Styling: TailwindCSS utilities
- Components live in `src/components/*`
- Routes live in `src/app/*`

Conventions:
- Use feature folders in `src/app/<feature>` and `src/components/<feature>`
- Keep side effects in `useEffect` and data fetching in server components where possible
- Prefer `idb` for client caching and offline usage

Testing:
- Jest + React Testing Library
- Tests under `__test__/`
- Update snapshots with `npm run update-snapshot`

PWA:
- See `doc/PWA.md` for service worker and icons
- Icons generation script: `scripts/generate-icons.mjs`
