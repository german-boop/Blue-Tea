import { z } from "zod";

export const contactValidationSchema = z.object({
    name: z
        .string()
        .regex(/^[a-zA-Z\u0600-\u06FF\s]{3,40}$/, "Invalid name"),
    phone: z
        .string()
        .regex(/^(\+98|0)?9\d{9}$/, "Invalid phone number"),
    email: z
        .string()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
    company: z
        .string()
        .min(5, "Long description must be at least 200 characters")
        .max(20, "Long description must be at least 200 characters"),

    body: z
        .string()
        .min(5, "Long description must be at least 200 characters"),

});
