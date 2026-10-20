import "server-only";

import type { CreateEnquiryInput, EnquiryMutationResult } from "./types";

// Stand-in until Firestore is connected: enquiries are logged on the server, not stored.
// Replace the body with a write to the "enquiries" collection (plus a notification email).
export async function createEnquiry(input: CreateEnquiryInput): Promise<EnquiryMutationResult> {
    try {
        console.info("[enquiries] New enquiry received", {
            propertyId: input.propertyId ?? null,
            receivedAt: new Date().toISOString(),
        });

        return {
            ok: true,
            message: "Thank you. Our team will contact you within one working day.",
        };
    } catch (error) {
        console.error("[enquiries] Failed to save enquiry", error);
        return { ok: false, message: "Unable to send your message. Please try again." };
    }
}
