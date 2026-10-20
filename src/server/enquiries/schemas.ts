import { z } from "zod";

const phonePattern = /^\+?[0-9\s-]{8,20}$/;
const phoneErrorMessage = "Enter a valid phone or WhatsApp number.";

const enquiryFields = {
    name: z
        .string()
        .trim()
        .min(2, { error: "Enter your full name." })
        .max(80, { error: "Keep your name under 80 characters." }),
    email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.email({ error: "Enter a valid email address." })),
    message: z
        .string()
        .trim()
        .min(10, { error: "Tell us a little more (at least 10 characters)." })
        .max(1000, { error: "Keep your message under 1000 characters." }),
};

// What the contact form holds: every field is a string, and optional ones may be empty.
export const enquiryFormSchema = z.object({
    ...enquiryFields,
    phone: z
        .string()
        .trim()
        .refine((value) => !value || phonePattern.test(value), { error: phoneErrorMessage }),
    propertyId: z.string(),
});

// What POST /api/enquiries accepts.
export const createEnquirySchema = z.object({
    ...enquiryFields,
    phone: z.string().trim().regex(phonePattern, { error: phoneErrorMessage }).optional(),
    propertyId: z.string().trim().min(1).max(100).optional(),
});
