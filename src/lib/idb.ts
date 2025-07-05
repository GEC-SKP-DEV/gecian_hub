import { openDB, IDBPDatabase, DBSchema } from "idb";

interface AttendanceDB extends DBSchema {
  subjects: {
    key: string;
    value: { id: string; name: string };
  };
  attendance: {
    key: string;
    value: { id: string; subjectId: string; date: string; status: string };
  };
}

let dbPromise: Promise<IDBPDatabase<AttendanceDB>> | null = null;

function getTodayDateString(): string {
  const today = new Date();
  return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
}


function getDB() {
  if (typeof window === "undefined") {
    // Prevent IndexedDB usage on the server
    throw new Error("IndexedDB is not available on the server");
  }

  if (!dbPromise) {
    dbPromise = openDB<AttendanceDB>("attendance-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("subjects")) {
          db.createObjectStore("subjects", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("attendance")) {
          db.createObjectStore("attendance", { keyPath: "id" });
        }
      },
    });
  }

  return dbPromise;
}

export const addSubject = async (name: string) => {
  const db = await getDB();
  await db.add("subjects", { id: crypto.randomUUID(), name });
};

export const getSubjects = async () => {
  const db = await getDB();
  return db.getAll("subjects");
};

export const markAttendance = async (subjectId: string, date?: string) => {
  const today = getTodayDateString();
  const targetDate = date || today;
  
  // Only allow marking for today
  if (targetDate !== today) {
    throw new Error("Attendance can only be marked for today");
  }
  
  const id = `${subjectId}_${targetDate}`;
  const db = await getDB();
  
  await db.put("attendance", {
    id,
    subjectId,
    date: targetDate,
    status: "present",
  });
};


export const isMarked = async (subjectId: string) => {
  const db = await getDB();
  const id = `${subjectId}_${new Date().toISOString().substring(0, 10)}`; // Format YYYY-MM-DD
  return (await db.get("attendance", id)) != null;
};

export const deleteSubject = async (subjectId: string) => {
  const db = await getDB();
  await db.delete("subjects", subjectId);

  const all = await db.getAll("attendance");
  const related = all.filter((a) => a.subjectId === subjectId);
  for (const record of related) {
    await db.delete("attendance", record.id);
  }
};

export const getAttendanceStats = async (subjectId: string) => {
  const db = await getDB();
  const all = await db.getAll("attendance");
  const records = all.filter((a) => a.subjectId === subjectId);
  const totalDays = new Set(records.map((r) => r.date)).size;
  const presentDays = records.length;

  return {
    present: presentDays,
    total: totalDays,
    percent: totalDays === 0 ? 0 : Math.round((presentDays / totalDays) * 100),
  };
};

export const getAttendanceBySubject = async (subjectId: string) => {
  const db = await getDB();
  const all = await db.getAll("attendance");
  return all.filter((a) => a.subjectId === subjectId);
};

export const getAttendanceByDate = async (date: string) => {
  const db = await getDB();
  const all = await db.getAll("attendance");
  return all.filter((a) => a.date === date);
};

export const getAllSubjects = async () => {
  const db = await getDB();
  return db.getAll("subjects");
};

export const getAttendanceStatus = async (subjectId: string, date: string) => {
  const db = await getDB();
  const id = `${subjectId}_${date}`;
  const record = await db.get("attendance", id);
  return record ? record.status : "absent";
};