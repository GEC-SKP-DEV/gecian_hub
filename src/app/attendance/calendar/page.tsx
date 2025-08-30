"use client";

import { useEffect, useMemo, useState } from "react";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  isFuture,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import {
  getSubjects,
  getAttendanceStatus,
  setAttendanceStatus,
} from "@/lib/idb";
import toast from "react-hot-toast";

export const runtime = "edge";

type Status = "present" | "absent" | "duty";

export default function AttendanceCalendarAllSubjects() {
  const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [query, setQuery] = useState("");
  const [dayLoading, setDayLoading] = useState(false);
  const [perSubjectStatus, setPerSubjectStatus] = useState<Record<string, Status>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [monthSummaries, setMonthSummaries] = useState<Record<string, Status | "none">>({});
  const [calendarFilter, setCalendarFilter] = useState<"all" | Status>("all");

  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
      }),
    [currentMonth]
  );

  useEffect(() => {
    (async () => {
      const s = await getSubjects();
      setSubjects(s);
    })();
  }, []);

  const computeSummaryFromStatuses = (statuses: Status[]): Status | "none" => {
    if (statuses.length === 0) return "none";
    if (statuses.includes("absent")) return "absent";
    if (statuses.includes("duty")) return "duty";
    return "present";
  };

  // Compute month summaries for all visible days
  useEffect(() => {
    const compute = async () => {
      if (subjects.length === 0) {
        setMonthSummaries({});
        return;
      }
      const result: Record<string, Status | "none"> = {};
      for (const day of days) {
        const dateStr = format(day, "yyyy-MM-dd");
        if (isFuture(day)) {
          result[dateStr] = "none";
          continue;
        }
        const entries = await Promise.all(
          subjects.map(async (s) => {
            const st = await getAttendanceStatus(s.id, dateStr);
            const mapped: Status = (st as any) === "duty" ? "duty" : st === "present" ? "present" : "absent";
            return mapped;
          })
        );
        result[dateStr] = computeSummaryFromStatuses(entries);
      }
      setMonthSummaries(result);
    };
    compute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjects, currentMonth]);

  const loadStatusesForSelectedDate = async (dateStr: string) => {
    setDayLoading(true);
    const entries = await Promise.all(
      subjects.map(async (s) => {
        const st = await getAttendanceStatus(s.id, dateStr);
        const mapped: Status = (st as any) === "duty" ? "duty" : st === "present" ? "present" : "absent";
        return [s.id, mapped] as const;
      })
    );
    const rec: Record<string, Status> = {};
    for (const [id, st] of entries) rec[id] = st;
    setPerSubjectStatus(rec);
    setDayLoading(false);
  };

  useEffect(() => {
    loadStatusesForSelectedDate(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjects, selectedDate]);

  const summarizeDay = (dateStr: string): Status | "none" => {
    // Use precomputed month summaries
    return monthSummaries[dateStr] ?? "none";
  };

  const handleDayClick = async (day: Date) => {
    if (isFuture(day)) return;
    const dateStr = format(day, "yyyy-MM-dd");
    setSelectedDate(dateStr);
    setModalOpen(true);
  };

  const setStatusForSubject = async (
    subjectId: string,
    status: Status,
    dateStr: string
  ) => {
    await setAttendanceStatus(subjectId, dateStr, status);
    setPerSubjectStatus((prev) => ({ ...prev, [subjectId]: status }));
    // Update the month summary for this date based on updated perSubjectStatus
    setMonthSummaries((prev) => {
      const nextStatuses = { ...perSubjectStatus, [subjectId]: status };
      const list = Object.values(nextStatuses);
      const summary = computeSummaryFromStatuses(list as Status[]);
      return { ...prev, [dateStr]: summary };
    });
    toast.success(
      status === "present"
        ? "Marked present"
        : status === "duty"
        ? "Marked duty"
        : "Marked absent"
    );
  };

  return (
    <main className="p-4 max-w-2xl mx-auto pb-28">
      <h1 className="text-2xl font-bold text-center mb-4">Attendance</h1>

      <section className="rounded-xl bg-white shadow p-4 mb-5">
        <header className="flex justify-between items-center mb-3">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="text-blue-600 hover:underline px-2 py-1"
          >
            Prev
          </button>
          <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Show</label>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={calendarFilter}
              onChange={(e) => setCalendarFilter(e.target.value as any)}
              aria-label="Filter calendar by status"
            >
              <option value="all">All</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="duty">Duty</option>
            </select>
          </div>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
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

        {(() => {
          const firstDayOfWeek = startOfMonth(currentMonth).getDay();
          return (
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {days.map((day) => {
                const dateStr = format(day, "yyyy-MM-dd");
                const summary = summarizeDay(dateStr);
                const isSelected = selectedDate === dateStr;
                let bg = "bg-white border-gray-300";
                if (summary === "present")
                  bg = isSelected ? "bg-green-500 text-white" : "bg-green-100 border-green-400";
                else if (summary === "absent")
                  bg = isSelected ? "bg-red-500 text-white" : "bg-red-100 border-red-300";
                else if (summary === "duty")
                  bg = isSelected ? "bg-yellow-500 text-white" : "bg-yellow-100 border-yellow-300";
                else if (isFuture(day))
                  bg = "bg-gray-100 text-gray-400 cursor-not-allowed";

                const filteredOut =
                  calendarFilter !== "all" && summary !== calendarFilter && !isFuture(day);

                return (
                  <button
                    key={dateStr}
                    onClick={() => handleDayClick(day)}
                    disabled={isFuture(day)}
                    aria-pressed={isSelected}
                    title={format(day, "eeee, MMMM do yyyy")}
                    className={`aspect-square flex items-center justify-center rounded-full border transition font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 ${bg} ${filteredOut ? "opacity-30" : ""}`}
                    style={{ minWidth: 36, minHeight: 36, transition: "all 0.15s" }}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          );
        })()}

        <div className="flex flex-wrap gap-3 mt-4 justify-center text-xs font-medium text-gray-700 select-none">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-100 rounded-full border border-green-400" /> Present
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-100 rounded-full border border-red-400" /> Absent
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-yellow-100 rounded-full border border-yellow-400" /> Duty
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-100 rounded-full border border-gray-400" /> Future
          </div>
        </div>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
          <div className="bg-white w-full sm:max-w-xl sm:rounded-lg sm:shadow-xl p-4 max-h-[85vh] overflow-auto">
            <header className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {format(parseISO(selectedDate), "PPP")} {dayLoading && " • loading..."}
                </span>
                <select
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  aria-label="Filter by status"
                >
                  <option value="all">All</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="duty">Duty</option>
                </select>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search subjects"
                  className="min-w-[140px] border border-gray-300 rounded px-2 py-1 text-sm"
                  aria-label="Search subjects"
                />
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                aria-label="Close"
              >Close</button>
            </header>

            <ul className="divide-y">
              {subjects
                .filter((s) => (statusFilter === "all" ? true : perSubjectStatus[s.id] === statusFilter))
                .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
                .map((s) => {
                  const st = perSubjectStatus[s.id];
                  return (
                    <li key={s.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-base font-medium">{s.name}</span>
                        {st && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded border ${
                              st === "present"
                                ? "bg-green-50 text-green-700 border-green-300"
                                : st === "absent"
                                ? "bg-red-50 text-red-700 border-red-300"
                                : "bg-yellow-50 text-yellow-700 border-yellow-300"
                            }`}
                          >
                            {st}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setStatusForSubject(s.id, "present", selectedDate)}
                          className={`px-3 py-1 rounded transition ${
                            st === "present" ? "bg-green-500 text-white" : "bg-gray-800 text-white hover:bg-gray-700"
                          }`}
                          disabled={st === "present"}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => setStatusForSubject(s.id, "absent", selectedDate)}
                          className={`px-3 py-1 rounded transition ${
                            st === "absent" ? "bg-red-500 text-white" : "bg-gray-800 text-white hover:bg-gray-700"
                          }`}
                          disabled={st === "absent"}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => setStatusForSubject(s.id, "duty", selectedDate)}
                          className={`px-3 py-1 rounded transition ${
                            st === "duty" ? "bg-yellow-500 text-white" : "bg-gray-800 text-white hover:bg-gray-700"
                          }`}
                          disabled={st === "duty"}
                        >
                          Duty
                        </button>
                      </div>
                    </li>
                  );
                })}
              {subjects.length === 0 && (
                <li className="py-6 text-center text-gray-500">No subjects yet.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
