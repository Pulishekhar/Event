"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema } from "@/lib/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EventForm() {
  const qc = useQueryClient();

  const form = useForm({
    resolver: zodResolver(EventSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Event created successfully");
      qc.invalidateQueries({ queryKey: ["events"] });
      form.reset();
    },
    onError: () => toast.error("Failed to create event"),
  });

  return (
<Card className="bg-white border border-slate-200 shadow-md">
  <CardHeader className="space-y-6">
    <CardTitle className="text-4xl font-bold text-slate-800">
      Create New Event
    </CardTitle>
    <p className="text-xl text-slate-600">
      Fill in the details to create an event and manage registrations.
    </p>
  </CardHeader>

  <CardContent className="pt-10">
    <form
      onSubmit={form.handleSubmit((d) => mutation.mutate(d))}
      className="space-y-12"
    >
      <div className="space-y-6">
        <Label className="text-lg font-semibold text-slate-700">
          Title
        </Label>
        <Input
          {...form.register("title")}
          placeholder="Event title"
          className="h-14 text-xl"
        />
      </div>

      <div className="space-y-6">
        <Label className="text-lg font-semibold text-slate-700">
          Description
        </Label>
        <Input
          {...form.register("description")}
          placeholder="Short description"
          className="h-14 text-xl"
        />
      </div>

      <div className="space-y-6">
        <Label className="text-lg font-semibold text-slate-700">
          Date
        </Label>
        <Input
          type="date"
          {...form.register("date")}
          className="h-14 text-xl"
        />
      </div>

      <div className="space-y-6">
        <Label className="text-lg font-semibold text-slate-700">
          Capacity
        </Label>
        <Input
          type="number"
          {...form.register("capacity")}
          placeholder="Maximum attendees"
          className="h-14 text-xl"
        />
      </div>

      <div className="pt-8">
        <Button
          type="submit"
          className="w-full h-16 text-xl font-semibold"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create Event"}
        </Button>
      </div>
    </form>
  </CardContent>
</Card>


 );
}
