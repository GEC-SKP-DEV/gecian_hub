import { notFound } from "next/navigation";
import { eventsData } from "@/data/events";
import EventDetail from "@/components/events/EventDetail";

export default function Page({ params }: { params: { slug: string } }) {
  const event = eventsData.find((e) => e.slug === params.slug);
  if (!event) return notFound();
  return <EventDetail event={event} />;
}
