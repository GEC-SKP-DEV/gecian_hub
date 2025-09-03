"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import type { EventItem } from "@/types/event";

export default function EventDetail({ event }: { event: EventItem }) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen text-black bg-white">
      <div className="relative w-full h-48 md:h-72 lg:h-96 border-b">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <button
          onClick={() => router.push("/events")}
          className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 bg-white"
          aria-label="Back to events"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <div className="text-gray-700 space-y-1">
          <div><span className="font-medium">Venue:</span> {event.venue}</div>
          <div><span className="font-medium">Date:</span> {event.date}</div>
          {event.time && <div><span className="font-medium">Time:</span> {event.time}</div>}
        </div>
        <p className="text-base text-black leading-relaxed">{event.description}</p>
      </div>
    </div>
  );
}
