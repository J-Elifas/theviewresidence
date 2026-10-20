import type { z } from "zod";
import type { createEnquirySchema } from "./schemas";

export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;

export interface EnquiryFormValues {
    name: string;
    email: string;
    phone: string;
    propertyId: string;
    message: string;
}

export interface EnquiryMutationResult {
    ok: boolean;
    message: string;
}
