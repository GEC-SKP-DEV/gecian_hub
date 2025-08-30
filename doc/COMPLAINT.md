# Complaint

- Overview: Submit and track complaints.

- Routes:
  - List: `src/app/complaint/page.tsx`
  - New: `src/app/complaint/new/page.tsx`
  - API: `src/app/api/complaints/route.ts`

- Key components/files:
  - List card: `src/components/complaint/Complaintcard.tsx`
  - Form: `src/components/complaint/ComplaintForm.tsx`
  - Sample dataset: `/complaints.json`

- Data & storage:
  - API route backs list and create flows. Replace with DB/KV as needed.

- Notes:
  - Validate inputs on both client and server.
  - Consider rate limiting and auth before production.
