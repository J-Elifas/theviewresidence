import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));

import { getHomePageData, listProperties, listPropertyOptions } from "@/server/properties/queries";

async function resolveWithTimers<TResult>(promise: Promise<TResult>) {
    await vi.runAllTimersAsync();
    return promise;
}

describe("properties queries", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("lists all ten listings newest first with display and raw prices", async () => {
        const properties = await resolveWithTimers(listProperties());

        expect(properties).toHaveLength(10);
        expect(properties[0]).toMatchObject({
            id: "siladen-bay-view-villa",
            price: "Rp 3.950.000.000",
            priceValue: 3_950_000_000,
        });

        const listedTimes = properties.map((property) => Date.parse(property.listedAt));
        expect(listedTimes).toEqual([...listedTimes].sort((a, b) => b - a));
    });

    it("returns the six latest listings and only featured ones for the home page", async () => {
        const { latestProperties, featuredProperties } = await resolveWithTimers(getHomePageData());

        expect(latestProperties).toHaveLength(6);
        expect(featuredProperties.length).toBeGreaterThan(0);
        expect(featuredProperties.length).toBeLessThanOrEqual(5);
        expect(featuredProperties.every((property) => property.isFeatured)).toBe(true);
    });

    it("maps listings to select options", async () => {
        const options = await resolveWithTimers(listPropertyOptions());

        expect(options[0]).toEqual({
            value: "siladen-bay-view-villa",
            label: "Siladen Bay-View Villa",
        });
    });
});
