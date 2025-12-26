import { z } from "zod";

export const userValidationSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z\u0600-\u06FF\s]{3,40}$/, "Invalid name"),

  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),

  phone: z
    .string()
    .regex(/^(\+98|0)?9\d{9}$/, "Invalid phone number"),

  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*\-]).{8,}$/,
      "Weak password"
    ),
});
