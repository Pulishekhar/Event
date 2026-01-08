import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ✅ GET EVENTS
export async function GET() {
  const events = await prisma.event.findMany({
    include: { attendees: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(events);
}

// ✅ CREATE EVENT
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("EVENT BODY:", body);

    const { title, description, date, capacity } = body;

    if (!title || !description || !date || capacity == null) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        capacity: Number(capacity),
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (err) {
    console.error("EVENT CREATE ERROR:", err);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
