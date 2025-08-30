# Subject

- Overview: Subject-specific view used by attendance and materials.

- Route:
  - Dynamic: `src/app/subject/[id]/page.tsx`

- Data & storage:
  - Integrates with attendance state via `src/lib/idb.ts`.

- Notes:
  - Use stable subject IDs for deep links.
