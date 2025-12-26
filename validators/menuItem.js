import { z } from "zod";

export const menuSchema = z.object({
    name: z
        .string()
        .min(3, "Product name must be at least 3 characters")
        .max(100, "Product name cannot exceed 100 characters"),

    price: z
        .number()
        .min(1, "Price must be greater than 0")
        .refine((v) => Number.isFinite(v), "Invalid price value"),

    description: z
        .string()
        .min(5, "Short description must be at least 5 characters"),

    category: z
        .string()
        .min(1, "Subcategory is not valid"),

});
