"use client";

import { useQuery } from "@tanstack/react-query";
import { AttendeeForm } from "./AttendeeForm";

export function EventList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: () => fetch("/api/events").then((r) => r.json()),
  });

  if (isLoading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events</p>;
  if (!data || data.length === 0) return <p>No events yet</p>;

  return (
    <div>
      {data.map((event: any) => (
        <div key={event.id} style={{ border: "1px solid #ccc", padding: 12, marginBottom: 12 }}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>
            {event.attendees.length} / {event.capacity} registered
          </p>

          {/* ⭐ Phase 3.4: Attendee Registration */}
          <AttendeeForm eventId={event.id} />
        </div>
      ))}
    </div>
  );
}
