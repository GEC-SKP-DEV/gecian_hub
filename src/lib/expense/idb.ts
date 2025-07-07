import { openDB } from 'idb';
import { Expense } from './types';

const DB_NAME = 'ExpenseDB';
const STORE_NAME = 'expenses';

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    }
  });
}

export async function getAllExpenses(): Promise<Expense[]> {
  const db = await getDB();
  return (await db.getAll(STORE_NAME)) as Expense[];
}

export async function addExpense(expense: Expense): Promise<void> {
  const db = await getDB();
  await db.add(STORE_NAME, expense);
}
