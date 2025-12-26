// schemas/reservationSchema.ts
import { z } from "zod";

// Helper: Check if date is in future
const futureDate = z.string().refine((val) => {
  const d = new Date(val);
  const now = new Date();
  return d >= now;
}, "Date must be in the future");

// Helper: Check time between 08:00 - 23:00
const validTime = z.string().refine((val) => {
  const [h, m] = val.split(":").map(Number);
  if (h < 8 || h > 23) return false;
  return true;
}, "Time must be between 08:00 and 23:00");

// Phone regex: ایران/اروپا
const phoneRegex = /^(\+?\d{8,15})$/;

export const reservationValidationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(40, "Name is too long"),

  email: z.string().email("Invalid email format"),

  phone: z
    .string()
    .regex(phoneRegex, "Phone number is not valid"),

  date: futureDate,

  time: validTime,

  guests: z
    .number()
    .int()
    .min(1, "At least 1 guest is required")
    .max(20, "Maximum 20 guests allowed"),

  message: z
    .string()
    .max(300, "Message cannot exceed 300 characters")
    .optional()
});

