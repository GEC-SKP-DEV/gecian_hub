import { notFound } from "next/navigation";
import EventDetail from "@/components/events/EventDetail";
import type { Metadata } from "next";
import type { EventItem } from "@/types/event";

async function getEvent(slug: string): Promise<EventItem | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const res = await fetch(`${baseUrl}/api/events/${slug}`, { cache: "no-store" });

  if (!res.ok) return null;
  return res.json();
}

// Await params before using
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) return notFound();
  return <EventDetail event={event} />;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
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