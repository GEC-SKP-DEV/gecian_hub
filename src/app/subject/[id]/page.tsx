"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  isFuture,
  parseISO,
  addMonths,
  subMonths,
} from "date-fns";
import {
  getAttendanceStatus,
  setAttendanceStatus,
  getSubjects,
} from "@/lib/sc";
import toast from "react-hot-toast";
export const runtime = "edge";

export default function SubjectCalendarPage() {
  const { id: subjectId } = useParams();
  const router = useRouter();
  const [subject, setSubject] = useState<{
    id: string;
    name: string;
    createdAt: string;
  } | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDayStatus, setSelectedDayStatus] = useState<
    "present" | "absent" | "duty" | "loading" | null
  >(null);

  useEffect(() => {
    const loadSubject = async () => {
      const subs = await getSubjects();
      const found = subs.find((s) => s.id === subjectId);
      // Ensure found has createdAt property
      if (found && "createdAt" in found) {
        setSubject(found as { id: string; name: string; createdAt: string });
      } else {
        setSubject(null);
      }
    };
    if (subjectId) loadSubject();
  }, [subjectId]);

  if (!subject) {
    return <div className="p-8 text-center">Loading Subject...</div>;
  }

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Calculate how many empty cells to add before the first day
  const firstDayOfWeek = startOfMonth(currentMonth).getDay(); // 0=Sunday, 6=Saturday

  const handleDayClick = async (day: Date) => {
    if (isFuture(day)) return;
    const dateStr = format(day, "yyyy-MM-dd");
    setSelectedDate(dateStr);
    setSelectedDayStatus("loading");
    const status = await getAttendanceStatus(subject.id, dateStr);
    setSelectedDayStatus(status as "present" | "absent" | "duty");
  };

  const setStatus = async (status: "present" | "absent" | "duty") => {
    if (!selectedDate) return;
    await setAttendanceStatus(subject.id, selectedDate, status);
    toast.success(
      status === "present"
        ? "Marked present!"
        : status === "duty"
        ? "Marked duty leave!"
        : "Marked absent!"
    );
    setSelectedDayStatus(status);
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    setSelectedDate(null);
    setSelectedDayStatus(null);
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setSelectedDate(null);
    setSelectedDayStatus(null);
  };

  // Get day status
  const DayButton = ({ day }: { day: Date }) => {
    const [status, setStatusState] = useState<
      "present" | "absent" | "duty" | "future"
    >("absent");
    const [loading, setLoading] = useState(true);
    const dateStr = format(day, "yyyy-MM-dd");

    useEffect(() => {
      const fetchStatus = async () => {
        setLoading(true);
        if (isFuture(day)) {
          setStatusState("future");
          setLoading(false);
          return;
        }
        const result = await getAttendanceStatus(subject.id, dateStr);
        setStatusState(
          (result as any) === "duty"
            ? "duty"
            : result === "present"
            ? "present"
            : "absent"
        );
        setLoading(false);
      };
      fetchStatus();

      // eslint-disable-next-line
    }, [currentMonth, subject.id]); // month view changes will re-render

    const isSelected = selectedDate === dateStr;

    let bg = "";
    if (status === "present")
      bg = isSelected
        ? "bg-green-500 text-white"
        : "bg-green-100 border-green-400";
    else if (status === "absent")
      bg = isSelected ? "bg-red-500 text-white" : "bg-red-100 border-red-300";
    else if (status === "duty")
      bg = isSelected
        ? "bg-yellow-500 text-white"
        : "bg-yellow-100 border-yellow-300";
    else if (status === "future")
      bg = "bg-gray-100 text-gray-400 cursor-not-allowed";
    else bg = "bg-white border-gray-300";

    return (
      <button
        onClick={() => handleDayClick(day)}
        disabled={isFuture(day)}
        aria-pressed={isSelected}
        title={format(day, "eeee, MMMM do yyyy")}
        className={`aspect-square flex items-center justify-center rounded-full border  transition font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 ${bg}`}
        style={{ minWidth: 36, minHeight: 36, transition: "all 0.15s" }}
      >
        {loading ? "..." : day.getDate()}
      </button>
    );
  };

  return (
    <main className="p-4 max-w-md mx-auto mb-28">
      <span
        className="mb-3 block text-sm text-blue-500 hover:underline cursor-pointer"
        onClick={() => router.back()}
      >
        ← Back
      </span>
      <h2 className="text-2xl font-bold text-center mb-3">{subject.name}</h2>
      <section className="rounded-xl bg-white shadow-lg p-5">
        <header className="flex justify-between items-center mb-4">
          <button
            onClick={prevMonth}
            className="text-blue-600 hover:underline px-2 py-1"
          >
            Prev
          </button>
          <h3 className="text-xl font-semibold text-gray-800">
            {format(currentMonth, "MMMM yyyy")}
          </h3>
          <button
            onClick={nextMonth}
            className="text-blue-600 hover:underline px-2 py-1"
          >
            Next
          </button>
        </header>
        <div className="grid grid-cols-7 gap-2 text-xs font-bold mb-1 select-none">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d} className="uppercase text-center">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {/* Add empty divs for offset */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {days.map((day) => (
            <DayButton key={format(day, "yyyy-MM-dd")} day={day} />
          ))}
        </div>

        {selectedDate && (
          <div className="mt-6 rounded-lg bg-gray-50 p-4 border flex flex-col items-center animate-fadeIn">
            <div className="font-medium">
              <span className="text-blue-700">
                {format(parseISO(selectedDate), "PPP")}
              </span>
            </div>
            {selectedDayStatus === "loading" ? (
              <div className="mt-2 text-sm text-gray-600">
                Checking attendance...
              </div>
            ) : (
              <div className="mt-3 flex gap-3 items-center">
                <button
                  className={`px-4 py-2 rounded font-semibold transition ${
                    selectedDayStatus === "present"
                      ? "bg-green-500 text-white"
                      : "bg-gray-700 text-white hover:bg-green-500"
                  }`}
                  onClick={() => setStatus("present")}
                >
                  Present
                </button>
                <button
                  className={`px-4 py-2 rounded font-semibold transition ${
                    selectedDayStatus === "absent"
                      ? "bg-red-500 text-white"
                      : "bg-gray-700 text-white hover:bg-red-500"
                  }`}
                  onClick={() => setStatus("absent")}
                >
                  Absent
                </button>
                <button
                  className={`px-4 py-2 rounded font-semibold transition ${
                    selectedDayStatus === "duty"
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-700 text-white hover:bg-yellow-500"
                  }`}
                  onClick={() => setStatus("duty")}
                >
                  Duty
                </button>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-wrap gap-3 mt-8 justify-center text-xs font-medium text-gray-700 select-none">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-100 rounded-full border border-green-400" />{" "}
            Present
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-100 rounded-full border border-red-400" />{" "}
            Absent
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-yellow-100 rounded-full border border-yellow-400" />{" "}
            Duty
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-100 rounded-full border border-gray-400" />{" "}
            Future
          </div>
        </div>
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-in;
          }
        `}</style>
      </section>
    </main>
  );
}
