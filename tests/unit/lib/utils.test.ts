import { describe, expect, it } from "vitest";
import { cn, formatPrice } from "@/lib/utils";

// Intl separates the symbol with a non-breaking space so prices never wrap.
describe("formatPrice", () => {
    it("formats rupiah with Indonesian digit grouping and no decimals", () => {
        expect(formatPrice(1_250_000_000)).toBe("Rp 1.250.000.000");
    });

    it("rounds fractional rupiah", () => {
        expect(formatPrice(525_000_000.6)).toBe("Rp 525.000.001");
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
