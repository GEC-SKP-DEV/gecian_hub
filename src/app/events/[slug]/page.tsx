import { notFound } from "next/navigation";
import { eventsData } from "@/data/events";
import EventDetail from "@/components/events/EventDetail";
import type { Metadata } from "next";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug);
  if (!event) return notFound();
  return <EventDetail event={event} />;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug);
  if (!event) return {};

  const base = new URL("https://gecian-hub.pages.dev");
  const title = `${event.title} — Event @ Gecian Hub`;
  const description = `${event.description.slice(0, 140)}...`;
  const ogImage = `/api/og?title=${encodeURIComponent(event.title)}`;

  return {
    title,
    description,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title,
      description,
      url: new URL(`/events/${event.slug}`, base).toString(),
      images: [ogImage],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
