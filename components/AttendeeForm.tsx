"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AttendeeSchema } from "@/lib/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AttendeeForm({ eventId }: { eventId: string }) {
  const qc = useQueryClient();

  const form = useForm({
    resolver: zodResolver(AttendeeSchema),
    defaultValues: { eventId },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/attendees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Successfully registered");
      qc.invalidateQueries({ queryKey: ["events"] });
      form.reset({ name: "", email: "", eventId });
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <form
      onSubmit={form.handleSubmit((d) => mutation.mutate(d))}
      className="mt-6 flex flex-col sm:flex-row gap-3"
    >
      <Input
        {...form.register("name")}
        placeholder="Name"
        className="h-11 text-base flex-1"
      />

      <Input
        {...form.register("email")}
        placeholder="Email"
        className="h-11 text-base flex-1"
      />

      <Button
        className="h-11 px-6 text-base font-medium"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "..." : "Register"}
      </Button>
    </form>
  );
}
