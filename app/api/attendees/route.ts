import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, eventId } = await req.json();

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { attendees: true },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (event.attendees.length >= event.capacity) {
      return NextResponse.json(
        { error: "Event capacity full" },
        { status: 400 }
      );
    }

    const attendee = await prisma.attendee.create({
      data: { name, email, eventId },
    });

    return NextResponse.json(attendee, { status: 201 });

  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "User already registered for this event" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to register attendee" },
      { status: 500 }
    );
  }
}
