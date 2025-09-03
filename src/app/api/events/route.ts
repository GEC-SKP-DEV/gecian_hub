import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT id, slug, title, description, venue, date, time, image
      FROM events
    `);
    return NextResponse.json(result.rows);
  } catch (err: any) {
    console.error("Error fetching events:", err);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
