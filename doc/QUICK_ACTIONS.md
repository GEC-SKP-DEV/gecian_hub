# Quick Actions Data Flow

This document explains how Quick Actions are defined and consumed in the app, and how to add or modify them.

## Files
- Data source: `src/data/home/quickActions.ts`
- UI component: `src/components/home/QuickActions.tsx`
- Button component: `src/components/QuickActionButton.tsx`

## Data Shape
Quick actions are defined as a discriminated union type for clarity and safety:

```ts
// src/data/home/quickActions.ts
export type QuickAction =
  | { text: string; type: "external"; url: string }
  | { text: string; type: "route"; path: string }
  | { text: string; type: "alert"; message: string };

export const quickActions: QuickAction[] = [
  { text: "College Login", type: "external", url: "https://gecskp.etlab.in/user/login" },
  { text: "Bus Time", type: "route", path: "/bus" },
  { text: "Lost & Found", type: "route", path: "/lost" },
  // ... more items
];
```

- `external`: navigates to an external URL.
- `route`: navigates to an internal app path.
- `alert`: shows a simple alert message.

## How the data is consumed
The component `src/components/home/QuickActions.tsx` imports `quickActions` and maps each item to a renderable config for `QuickActionButton`.

```tsx
import { quickActions } from "@/data/home/quickActions";

export const QuickActions = () => {
  const quickActionItems = quickActions.map((qa) => {
    if (qa.type === "external") {
      // Open in the SAME tab
      return { text: qa.text, onClick: () => (window.location.href = qa.url) };
    }
    if (qa.type === "route") {
      // Internal navigation in the SAME tab
      return { text: qa.text, onClick: () => (window.location.href = qa.path) };
    }
    // Alert
    return { text: qa.text, onClick: () => alert(qa.message) };
  });

  // quickActionItems is then sliced into rows and rendered as QuickActionButton components
};
```

Important: All actions open in the same tab (we intentionally use `window.location.href`).

## How to add a new Quick Action
Edit `src/data/home/quickActions.ts` and append a new object to `quickActions` using one of the three types.

Examples:

```ts
// External link
{ text: "Department Site", type: "external", url: "https://example.edu/department" }

// Internal route
{ text: "Events", type: "route", path: "/events" }

// Simple alert
{ text: "Coming Soon", type: "alert", message: "Feature under construction" }
```

No additional changes are needed; the UI will automatically render the new item in the grid layout.

## Ordering and Layout
The grid layout slices the array into rows:
- First row: first 2 items
- Second row: next 3 items
- Third row: next 2 items
- Fourth row: next 3 items
- Fifth row: next 2 items

To change the order, reorder entries in `quickActions`. To change row distribution, update the slicing logic in `src/components/home/QuickActions.tsx`.

## Best Practices
- Keep `text` short (1–2 words) for better layout.
- Prefer internal routes for app pages and external for third-party sites.
- Verify URLs and paths are correct.
- Maintain consistency (same-tab navigation is enforced by the component).
