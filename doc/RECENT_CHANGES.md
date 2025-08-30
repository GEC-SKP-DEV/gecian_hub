# Recent Changes Summary

This document summarizes the main updates made to the app.

## PWA & Icons
- Updated `src/app/manifest.ts` to include a complete set of icons:
  - Any: 192, 256, 384, 512
  - Maskable: 192, 512
- Updated `src/app/layout.tsx` metadata to use generated favicons and Apple touch icon:
  - Favicons: `/favicon-16x16.png`, `/favicon-32x32.png`, `/favicon-48x48.png`
  - Apple: `/apple-touch-icon.png`
- Extended icon generator `scripts/generate-icons.mjs` to produce all required assets from a single source image.

## Timetable
- Reworked `src/components/home/TimeTable.tsx` to focus on image/PDF timetables:
  - Upload button accepts image/PDF and persists selection via `localStorage`.
  - Clicking the timetable opens a fullscreen overlay with a close (×) button.
  - Supports a default asset located in `public/` named exactly `table table.(jpg|jpeg|png|pdf)`.
  - Removed CSV support and the old period-box/slider fallback.

## Quick Actions
- Centralized config in `src/data/home/quickActions.ts` to simplify edits.
- Refactored `src/components/home/QuickActions.tsx` to load items from the data file.
- Ensured all actions (external and internal) open in the same tab using `window.location.href`.

## Build Notes
- If build shows warnings about `themeColor` in metadata for certain routes, move it to `generateViewport()` as per Next.js 15 guidance.

## How to Contribute
- Quick Actions: Edit `src/data/home/quickActions.ts`.
- Timetable default: Place `table table.jpg|jpeg|png|pdf` under `public/`.
- Icons: Run `node scripts/generate-icons.mjs public/codecompass.png` after updating the source image.
