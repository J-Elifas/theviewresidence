import { describe, expect, it } from "vitest";
import { enquiryFormSchema } from "@/server/enquiries/schemas";

const validEnquiry = {
    name: "  Maria Lumentut ",
    email: " Maria@Example.com ",
    phone: "+62 812-3456-7890",
    propertyId: "klabat-type-70",
    message: "I would like to visit the show unit this weekend.",
};

function getInvalidFields(result: { error?: { issues: { path: PropertyKey[] }[] } }) {
    return (result.error?.issues ?? []).map((issue) => String(issue.path[0])).sort();
}

describe("enquiryFormSchema", () => {
    it("trims text and lowercases the email", () => {
        const result = enquiryFormSchema.parse(validEnquiry);

        expect(result.name).toBe("Maria Lumentut");
        expect(result.email).toBe("maria@example.com");
    });

    it("accepts empty optional fields", () => {
        const result = enquiryFormSchema.safeParse({
            ...validEnquiry,
            phone: "",
            propertyId: "",
        });

        expect(result.success).toBe(true);
    });

    it("reports every required field on an empty form", () => {
        const result = enquiryFormSchema.safeParse({
            name: "",
            email: "",
            phone: "",
            propertyId: "",
            message: "",
        });

        expect(getInvalidFields(result)).toEqual(["email", "message", "name"]);
    });

    it("rejects an invalid email, phone and short message", () => {
        const result = enquiryFormSchema.safeParse({
            ...validEnquiry,
            email: "maria@",
            phone: "12",
            message: "Hi",
        });

        expect(getInvalidFields(result)).toEqual(["email", "message", "phone"]);
    });
});
