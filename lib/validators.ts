import { z } from "zod";

export const EventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  date: z.string(),
  capacity: z.coerce.number().min(1),
});

export const AttendeeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  eventId: z.string(),
});
