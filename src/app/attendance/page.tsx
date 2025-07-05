"use client";

import { useEffect, useState } from "react";
import {
  addSubject,
  getSubjects,
  markAttendance,
  getAttendanceStatus,
  getAttendanceStats,
  deleteSubject,
} from "@/lib/idb";
import CommonCalendar from "@/components/attendance/page";
import toast from "react-hot-toast";

export default function Home() {
  type Subject = {
    id: string;
    name: string;
  };

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const fetchSubjects = async () => {
    const list = await getSubjects();
    setSubjects(list);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAdd = async () => {
    if (newSubject.trim() === "") return;
    await addSubject(newSubject.trim());
    setNewSubject("");
    setModalOpen(false);
    toast.success("Subject added!");
    fetchSubjects();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteSubject(deleteTarget.id);
    toast.success(`Deleted ${deleteTarget.name}`);
    setDeleteTarget(null);
    fetchSubjects();
  };

  const requestDelete = (subject: { id: string; name: string }) => {
    setDeleteTarget(subject);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto min-h-screen relative pb-28">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Attendance Tracker
        
      </h1>

      <ul className="space-y-4">
        {subjects.map((subj) => (
          <SubjectCard
            key={subj.id}
            subject={subj}
            onRequestDelete={requestDelete}
          />
        ))}
      </ul>

      {subjects.length > 0 && (
        <div className="mt-10">
          <CommonCalendar />
        </div>
      )}

      <button
        className="fixed bottom-24 z-50 right-6 bg-blue-600 text-white text-3xl w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-30 "
        onClick={() => setModalOpen(true)}
        aria-label="Add Subject"
      >
        +
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Add New Subject
            </h2>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter subject name"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-[90%] shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Confirm Delete
            </h3>
            <p className="mb-6 text-center">
              Are you sure you want to delete{" "}
              <strong>{deleteTarget.name}</strong> and all its attendance?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function SubjectCard({
  subject,
  onRequestDelete,
}: {
  subject: { id: string; name: string };
  onRequestDelete: (subject: { id: string; name: string }) => void;
}) {
  const [todayStatus, setTodayStatus] = useState<"present" | "absent" | "loading">("loading");
  const [stats, setStats] = useState({ present: 0, total: 0, percent: 0 });

  useEffect(() => {
    fetchTodayStatus();
    fetchStats();
  }, []);

  const fetchTodayStatus = async () => {
    try {
      const today = new Date();
      const dateStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
      const status = await getAttendanceStatus(subject.id, dateStr);
      setTodayStatus(status==="present" ? "present" : "absent");
    } catch {
      setTodayStatus("absent");
    }
  };

  const fetchStats = async () => {
    const s = await getAttendanceStats(subject.id);
    setStats(s);
  };

  const handleMark = async () => {
    try {
      const today = new Date();
      const dateStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
      await markAttendance(subject.id, dateStr);
      setTodayStatus("present");
      fetchStats();
      toast.success(`Marked attendance for ${subject.name}`);
    } catch (error) {
      let errorMessage = "Failed to mark attendance";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
  }
};

  const handleDeleteRequest = () => {
    onRequestDelete(subject);
  };

  return (
    <li className="border border-gray-300 p-5 rounded-xl shadow-sm bg-white flex justify-between items-start flex-col md:flex-row md:items-center gap-3 hover:shadow-md transition-shadow">
      <div className="flex-1">
        <div className="text-xl font-semibold text-gray-800">
          {subject.name}
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Today:{" "}
          <span className={`font-medium ${
            todayStatus === "present" ? "text-green-600" : "text-red-600"
          }`}>
            {todayStatus === "present" ? "Present" : "Absent"}
          </span>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Overall:{" "}
          <span className="text-green-600 font-medium">{stats.present}</span>/
          <span className="text-gray-700">{stats.total}</span> (
          <span className="font-semibold text-blue-600">{stats.percent}%</span>)
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleMark}
          disabled={todayStatus === "present"}
          className={`px-4 py-1 rounded transition ${
            todayStatus === "present"
              ? "bg-green-500 text-white cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          {todayStatus === "present" ? "Marked" : "Mark Today"}
        </button>
        <button
          onClick={handleDeleteRequest}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
}