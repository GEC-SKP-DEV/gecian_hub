import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const result = await pool.query(
      `SELECT id, slug, title, description, venue, date, time, image
       FROM events
       WHERE slug = $1
       LIMIT 1`,
      [params.slug]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching event:", err);
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}
