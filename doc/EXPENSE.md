# Expense

- Overview: Track daily and monthly expenses with charts.

- Routes:
  - Dashboard: `src/app/expense/page.tsx`
  - Monthly: `src/app/expense/montly/page.tsx`

- Key components/files:
  - Form: `src/components/expense/expenseForm.tsx`
  - Card: `src/components/expense/ExpenseCard.tsx`
  - Chart: `src/components/expense/montlySpendChart.tsx`
  - Storage: `src/lib/expense/idb.ts`
  - Types: `src/lib/expense/types.ts`

- Data & storage:
  - Client-side IndexedDB via `idb`. Consider remote sync for multi-device support.

- Notes:
  - Chart.js and react-chartjs-2 power visualizations.
