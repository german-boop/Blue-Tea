import { z } from "zod";

export const commentValidationSchema = z.object({
    username: z
        .string()
        .regex(/^[a-zA-Z\u0600-\u06FF\s]{3,40}$/, "Invalid name"),

    email: z
        .string()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
    score: z
        .number()
        .min(0, "Score cannot be less than 0")
        .max(5, "Maximum score is 5"),

    body: z
        .string()
        .min(5, "Long description must be at least 200 characters"),

});
