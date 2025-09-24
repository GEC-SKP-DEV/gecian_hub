// app/events/[id]/page.tsx
import { notFound } from "next/navigation";
import db from "@/lib/db";

interface EventItem {
  id: string;
  slug?: string | null;
  title: string;
  description: string;
  venue: string;
  date: string | Date;
  time: string;
  image_data?: Buffer | null; // match your DB column
  image_mime_type?: string | null;
  image?: string | null; // base64 string
}

// Convert binary image to base64
function processEventImage(event: EventItem): EventItem {
  if (!event.image_data) return { ...event, image: null };
  const base64 = Buffer.from(event.image_data).toString("base64");
  return {
    ...event,
    image: `data:${event.image_mime_type || "image/jpeg"};base64,${base64}`,
  };
}

async function getEvent(id: string): Promise<EventItem | null> {
  const client = await db.connect();
  try {
    const result = await client.query("SELECT * FROM events WHERE id = $1", [id]);
    if (result.rows.length === 0) return null;

    const event = result.rows[0];
    return processEventImage(event);
  } finally {
    client.release();
  }
}

export default async function EventPage({ params }: { params: { id: string } }) {
  const { id } = params; // No need to `await params` anymore
  const event = await getEvent(id);
  if (!event) return notFound();

  const eventDate = new Date(event.date).toLocaleDateString();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-600">{event.description}</p>
      <p>{event.venue}</p>
      <p>{eventDate} at {event.time}</p>
      {event.image && (
        <img src={event.image} alt={event.title} className="mt-4 max-w-lg rounded" />
      )}
    </div>
  );
}
