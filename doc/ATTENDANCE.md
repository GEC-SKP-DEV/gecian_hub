# Attendance

- Overview: Track attendance and timetable, with calendar view and IndexedDB persistence.

- Routes:
  - Page: `src/app/attendance/page.tsx`
  - Calendar: `src/app/attendance/calendar/page.tsx`

- Key components/files:
  - UI: `src/components/attendance/page.tsx`
  - Storage: `src/lib/idb.ts`
  - Types: `src/types/types.ts`

- Data & storage:
  - Client-side in IndexedDB via `idb`. Keys include per-day attendance states and timetable data.

- Usage:
  - Open Attendance from bottom nav. Toggle present/absent per subject/day.
  - Use Calendar for monthly view and quick navigation.

- Notes:
  - Ensure browser allows IndexedDB. Clearing site data resets local attendance.
