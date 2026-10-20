import { handleJsonRequest } from "@/server/api/json-request-handler";
import { createEnquiry } from "@/server/enquiries/mutations";
import { createEnquirySchema } from "@/server/enquiries/schemas";
import type { CreateEnquiryInput } from "@/server/enquiries/types";

function parseCreateEnquiryInput(body: unknown): CreateEnquiryInput | null {
    const parsed = createEnquirySchema.safeParse(body);
    return parsed.success ? parsed.data : null;
}

export async function POST(request: Request) {
    return handleJsonRequest({
        request,
        parseInput: parseCreateEnquiryInput,
        mutate: createEnquiry,
        successStatus: 201,
    });
}
