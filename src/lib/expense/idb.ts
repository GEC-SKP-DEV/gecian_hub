import { openDB } from "idb";

const DB_NAME = "ExpenseDB";
const STORE_NAME = "expenses";

export async function getDB() {
  return openDB(DB_NAME, 2, {
    // add index for fast date queries
    upgrade(db, oldVersion, _newVersion, transaction) {
      // use 'any' here to avoid DOM IDB vs idb wrapper type mismatch
      let store: any;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      } else {
        // access existing store via the upgrade transaction
        store = transaction.objectStore(STORE_NAME);
      }

      if (oldVersion < 2) {
        const names: string[] = Array.from(store.indexNames as DOMStringList as unknown as string[]);
        if (!names.includes("by-date")) {
          store.createIndex("by-date", "date", { unique: false });
        }
      }
    },
  });
}

export async function getAllExpenses(): Promise<Expense[]> {
  const db = await getDB();
  return (await db.getAll(STORE_NAME)) as Expense[];
}

export async function getExpensesByDate(date: string): Promise<Expense[]> {
  const db = await getDB();
  // relies on "by-date" index
  return (await db.getAllFromIndex(STORE_NAME, "by-date", date)) as Expense[];
}

export async function getExpensesInMonth(year: number, month: number): Promise<Expense[]> {
  const db = await getDB();
  const m = String(month).padStart(2, "0");
  const start = `${year}-${m}-01`;
  const end = `${year}-${m}-31`;
  const range = IDBKeyRange.bound(start, end);
  return (await db.getAllFromIndex(STORE_NAME, "by-date", range)) as Expense[];
}

export async function addExpense(expense: Expense): Promise<void> {
  const db = await getDB();
  // ensure date is YYYY-MM-DD string
  const toSave = { ...expense, date: (expense.date || new Date().toISOString().split("T")[0]) };
  await db.add(STORE_NAME, toSave);
}
export async function updateExpense(
  id: number,
  updatedData: Partial<Expense>
): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  const existing = await store.get(id);

  if (!existing) throw new Error(`Expense with id ${id} not found`);

  await store.put({ ...existing, ...updatedData, id });
  await tx.done;
}

export async function deleteExpense(id: number): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.objectStore(STORE_NAME).delete(id);
  await tx.done;
}

export type Expense = {
  id?: number;
  title: string;
  category: string;
  description: string;
  amount: number;
  date: string; // must be string
};
