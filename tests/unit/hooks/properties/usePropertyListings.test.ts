import { describe, expect, it } from "vitest";
import { filterProperties, parsePropertyFilters } from "@/hooks/properties/usePropertyListings";
import type { PropertyRow } from "@/server/properties/types";

function createRow(overrides: Partial<PropertyRow>): PropertyRow {
    return {
        id: "row",
        title: "Row",
        propertyType: "house",
        status: "available",
        cluster: "Celebes Park",
        price: "Rp 1",
        priceValue: 1,
        bedrooms: 2,
        bathrooms: 1,
        floors: 1,
        buildingArea: 45,
        landArea: 90,
        description: "",
        features: [],
        imageUrl: null,
        isFeatured: false,
        listedAt: "2026-01-01T00:00:00.000Z",
        ...overrides,
    };
}

const rows = [
    createRow({
        id: "starter",
        priceValue: 785_000_000,
        listedAt: "2026-07-01T00:00:00.000Z",
    }),
    createRow({
        id: "townhouse",
        propertyType: "townhouse",
        priceValue: 1_145_000_000,
        listedAt: "2026-09-01T00:00:00.000Z",
    }),
    createRow({
        id: "villa",
        propertyType: "villa",
        priceValue: 3_950_000_000,
        listedAt: "2026-10-01T00:00:00.000Z",
    }),
    createRow({
        id: "family",
        priceValue: 2_000_000_000,
        listedAt: "2026-08-01T00:00:00.000Z",
    }),
];

describe("parsePropertyFilters", () => {
    it("reads known values from the URL", () => {
        const filters = parsePropertyFilters(
            new URLSearchParams("type=villa&price=above-3b&sort=price-asc")
        );

        expect(filters).toEqual({
            propertyType: "villa",
            priceRange: "above-3b",
            sort: "price-asc",
        });
    });

    it("ignores unknown values and falls back to the newest-first sort", () => {
        const filters = parsePropertyFilters(new URLSearchParams("type=castle&price=&sort=random"));

        expect(filters).toEqual({ propertyType: undefined, priceRange: undefined, sort: "newest" });
    });
});

describe("filterProperties", () => {
    it("returns every listing newest first when no filters are set", () => {
        const result = filterProperties(rows, { sort: "newest" });

        expect(result.map((row) => row.id)).toEqual(["villa", "townhouse", "family", "starter"]);
    });

    it("filters by property type", () => {
        const result = filterProperties(rows, { propertyType: "house", sort: "newest" });

        expect(result.map((row) => row.id)).toEqual(["family", "starter"]);
    });

    it("includes the lower bound and excludes the upper bound of a price range", () => {
        const result = filterProperties(rows, { priceRange: "2b-3b", sort: "newest" });

        expect(result.map((row) => row.id)).toEqual(["family"]);
    });

    it("sorts by price in both directions", () => {
        expect(filterProperties(rows, { sort: "price-asc" }).map((row) => row.id)).toEqual([
            "starter",
            "townhouse",
            "family",
            "villa",
        ]);
        expect(filterProperties(rows, { sort: "price-desc" }).map((row) => row.id)).toEqual([
            "villa",
            "family",
            "townhouse",
            "starter",
        ]);
    });

    it("does not reorder the array it receives", () => {
        const original = rows.map((row) => row.id);

        filterProperties(rows, { sort: "price-asc" });

        expect(rows.map((row) => row.id)).toEqual(original);
    });
});
