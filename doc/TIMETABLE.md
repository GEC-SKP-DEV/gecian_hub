# Timetable – Internal Documentation

This document explains how the timetable feature works, how data is stored, and how to modify behavior.

## Components
- `src/components/home/TimeTable.tsx` (export: default `TimeTableBlock`)
  - Current, user-facing timetable block shown on the dashboard (`ResponsiveDashboard.tsx`).
- `src/components/home/TimeTableSlider.tsx` and `src/components/home/TimeTableDay.tsx`
  - Alternative/legacy slider-based view that renders structured day/period data (not used in the dashboard by default).

## Behavior (TimeTableBlock)
- Accepts user uploads: images (PNG/JPG/etc.) or a PDF
- Persists the uploaded file in `localStorage` as a base64 Data URL
- Falls back to a default asset in `public/` if present
- Provides a fullscreen preview modal on click
- Allows removal of the saved timetable

### Storage Keys
- `timetableType`: one of `image` or `pdf`
- `timetableImage`: base64 Data URL for the uploaded image
- `timetablePDF`: base64 Data URL for the uploaded PDF

These are read on mount and used to reconstruct a `File` in memory via `dataURLtoFile()`.

### Default Asset Detection
On mount, the component searches the following URLs (HEAD requests) and uses the first that exists:
- `/table table.jpg`
- `/table table.jpeg`
- `/table table.png`
- `/table table.pdf`

Place your default file in `public/` with exactly one of the above names for an immediate fallback without upload.

### Rendering Rules
- If an uploaded image exists: show `<img>` using `URL.createObjectURL(uploadedFile)`
- If an uploaded PDF exists: show `<embed type="application/pdf">` with `URL.createObjectURL(uploadedFile)`
- If nothing uploaded but default is a PDF: `<embed src={defaultSrc} type="application/pdf">`
- If nothing uploaded but default is an image: `<img src={defaultSrc}>`
- If neither uploaded nor default available: prompt text to upload

### Fullscreen Preview
- Clicking the timetable area when a source is present toggles `isExpanded`
- Fullscreen overlay (`fixed inset-0 bg-black/90`) displays the same content (image or PDF)
- Close with the "×" button or by clicking the backdrop

### Upload Flow
- Accepts `image/*,application/pdf`
- Reads the file with `FileReader.readAsDataURL`
- Sets `timetableType` and corresponding base64 key in `localStorage`
- Restores the file next time by converting base64 back to a `File`

### Remove Flow
- Clears `uploadedFile` state
- Removes `timetableImage`, `timetablePDF`, and `timetableType` from `localStorage`

## How to Modify
- Change default candidates: edit the `candidates` array in `TimeTable.tsx`
- Change persistence strategy: update `localStorage` keys or replace with another storage method
- Change rendering (e.g., viewer controls for PDF): modify the `<embed>` or swap to a dedicated PDF viewer lib
- Disable fullscreen: remove the modal logic guarded by `isExpanded`

## Alternative Slider View (Optional)
- `TimeTableSlider.tsx` renders a single `DayData` at a time with prev/next controls and pagination dots
- Uses `TimeTableDay.tsx` to render a day’s periods (subject + time)
- Expects a `timetableData` array from `./TimeTableData` (not currently used in `ResponsiveDashboard.tsx`)

To use the slider view on the dashboard, swap `TimeTableBlock` with a composed slider, or add a toggle between modes.

## Notes & Limitations
- Base64 in `localStorage` is limited by browser quota; very large PDFs may not persist.
- `embed` support varies by browser. For better PDF UX, consider a viewer library or opening in a new tab.
- Default file names are strict; adjust if you want a different naming scheme.

## QA Checklist
- Upload image → persists after reload? (check `localStorage`)
- Upload PDF → renders and persists?
- Default asset present → shown when nothing uploaded?
- Fullscreen modal opens/closes as expected?
- Remove clears state and storage?
