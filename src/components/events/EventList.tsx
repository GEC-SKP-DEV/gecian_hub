"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, Filter } from "lucide-react";
import EventCard from "./EventCard";
import type { EventItem } from "@/data/events"; // you can redefine EventItem interface if needed

function isUpcoming(event: EventItem, nowISO: string) {
  return new Date(event.date).getTime() >= new Date(nowISO).setHours(0, 0, 0, 0);
}

export default function EventList() {
  const router = useRouter();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "upcoming">("all");
  const [events, setEvents] = useState<EventItem[]>([]);

  const nowISO = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    if (filter === "upcoming") return events.filter((e) => isUpcoming(e, nowISO));
    return events;
  }, [filter, nowISO, events]);

  return (
    <div className="p-4 min-h-screen text-white">
      <div className="flex justify-between items-center mb-2">
        <button
          className="border text-black border-gray-400 rounded-full p-2"
          onClick={() => router.push("/home")}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>

        <div className="relative flex-shrink-0 w-fit mx-auto mb-6">
          <h1 className="text-4xl text-black font-bold text-center relative">Events</h1>
          <img
            className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[50%] h-70 w-auto z-0"
            src="/wave-line.svg"
            alt="wave underline"
          />
        </div>

        <div className="relative">
          <button
            className="border text-black border-gray-400 rounded-full p-2"
            onClick={() => setFilterOpen((p) => !p)}
            aria-haspopup="menu"
            aria-expanded={filterOpen}
            aria-label="Filter events"
          >
            <Filter className="w-5 h-5" />
          </button>

          {filterOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-md shadow-lg z-10">
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${
                  filter === "all" ? "font-semibold bg-gray-100" : ""
                }`}
                onClick={() => {
                  setFilter("all");
                  setFilterOpen(false);
                }}
              >
                All Events
              </button>
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${
                  filter === "upcoming" ? "font-semibold bg-gray-100" : ""
                }`}
                onClick={() => {
                  setFilter("upcoming");
                  setFilterOpen(false);
                }}
              >
                Upcoming
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </div>
  );
}
