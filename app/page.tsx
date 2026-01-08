import { EventForm } from "@/components/EventForm";
import { EventList } from "@/components/EventList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        
        {/* Header */}
        <header className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Event & Attendee Dashboard
          </h1>
          <p className="text-lg text-slate-600">
            Create events and manage registrations in real time
          </p>
        </header>

        {/* Create Event */}
        <EventForm />

        {/* Events */}
        <EventList />
      </div>
    </main>
  );
}
