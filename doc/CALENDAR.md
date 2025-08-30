# Calendar

- Overview: Monthly calendar focused on attendance events.

- Route:
  - `src/app/attendance/calendar/page.tsx`
  - Standalone route: `src/app/calender/page.tsx`

- Key components/files:
  - Attendance page integrates calendar link: `src/app/attendance/page.tsx`
  - UI: `src/components/attendance/page.tsx`

- Data & storage:
  - Uses same attendance state from IndexedDB via `src/lib/idb.ts`.

- Notes:
  - This feature is under the attendance module, not a standalone route.
