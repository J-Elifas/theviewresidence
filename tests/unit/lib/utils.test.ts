import { describe, expect, it } from "vitest";
import { buildMailtoHref, cn, formatPrice } from "@/lib/utils";

// Intl separates the symbol with a non-breaking space so prices never wrap.
describe("formatPrice", () => {
    it("formats rupiah with Indonesian digit grouping and no decimals", () => {
        expect(formatPrice(1_250_000_000)).toBe("Rp\u00a01.250.000.000");
    });

    it("rounds fractional rupiah", () => {
        expect(formatPrice(525_000_000.6)).toBe("Rp\u00a0525.000.001");
    });
});

describe("cn", () => {
    it("keeps a custom font size next to a text color", () => {
        expect(cn("text-headline", "text-ink")).toBe("text-headline text-ink");
    });

    it("lets a later font size override an earlier one", () => {
        expect(cn("text-body", "text-caption")).toBe("text-caption");
    });
});

describe("buildMailtoHref", () => {
    it("encodes spaces and line breaks so mail apps show them as typed", () => {
        const href = buildMailtoHref("hello@example.com", {
            subject: "Enquiry: Klabat",
            body: "Hi\nThere",
        });

        expect(href).toBe("mailto:hello@example.com?subject=Enquiry%3A%20Klabat&body=Hi%0AThere");
    });
});
