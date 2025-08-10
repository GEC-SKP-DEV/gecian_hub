import { NextResponse } from "next/server";
export const runtime = "edge";

// In-memory storage for complaints (not persistent, resets on redeploy)
let complaints: any[] = [];

export async function GET() {
  return NextResponse.json(complaints);
}

export async function POST(req: Request) {
  try {
    const { title, description, place, imageUrl } = await req.json();
    if (!title || !description || !place) {
      return NextResponse.json(
        { error: "Title, description, and place are required" },
        { status: 400 }
      );
    }
    const newId = complaints.length
      ? complaints[complaints.length - 1].id + 1
      : 1;
    const complaint = {
      id: newId,
      title,
      description,
      place,
      date: new Date()
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-"),
      solved: false,
      imageUrl: imageUrl || null,
      comments: [],
    };
    complaints.push(complaint);
    return NextResponse.json({
      message: "Complaint added successfully",
      complaint,
    });
  } catch (err) {
    console.error("Error saving complaint:", err);
    return NextResponse.json(
      { error: "Failed to save complaint" },
      { status: 500 }
    );
  }
}
