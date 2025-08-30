# Bus

- Overview: View bus list and drill down by bus number.

- Routes:
  - List: `src/app/bus/page.tsx`
  - Details: `src/app/bus/busNumber/page.tsx`

- Key components/files:
  - UI: `src/components/Bus/busButton.tsx`
  - Data: `src/data/home/quickActions.ts` (entry point link)

- Usage:
  - From Home quick actions or nav, open Bus. Select a bus number to view details.

- Notes:
  - Add new buses by extending data source in the list page.
