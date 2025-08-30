import Link from "next/link";
import type { EventItem } from "@/data/events";

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <Link href={`/events/${event.slug}`}>
      <div className="bg-white rounded-3xl border-2 border-black hover:bg-gray-200 transition h-[220px] flex flex-col">
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-2xl text-black font-semibold line-clamp-1">{event.title}</h2>
          <div className="mt-2 text-gray-700 text-sm">
            <div className="line-clamp-1"><span className="font-medium">Venue:</span> {event.venue}</div>
            <div className="line-clamp-1"><span className="font-medium">Date:</span> {event.date}</div>
          </div>
          <p className="text-gray-600 text-sm mt-3 line-clamp-2">{event.description}</p>
        </div>
      </div>
    </Link>
  );
}
