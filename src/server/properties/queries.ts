import "server-only";

import { formatPrice } from "@/lib/utils";
import { propertySeedData } from "./seed-data";
import type { HomePageData, PropertyRecord, PropertyRow } from "./types";

const latestListingsCount = 6;
const featuredListingsCount = 5;

// Stand-in for the Firestore "properties" collection. Replace the body with a Firestore read
// (map each document to PropertyRecord) when Firebase is connected; callers stay the same.
async function readPropertyRecords(): Promise<PropertyRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return propertySeedData;
}

function toPropertyRow(record: PropertyRecord): PropertyRow {
    return { ...record, price: formatPrice(record.price), priceValue: record.price };
}

export async function listProperties(): Promise<PropertyRow[]> {
    const records = await readPropertyRecords();
    return records
        .map(toPropertyRow)
        .sort((a, b) => Date.parse(b.listedAt) - Date.parse(a.listedAt));
}

export async function getHomePageData(): Promise<HomePageData> {
    const properties = await listProperties();

    return {
        latestProperties: properties.slice(0, latestListingsCount),
        featuredProperties: properties
            .filter((property) => property.isFeatured)
            .slice(0, featuredListingsCount),
    };
}

export async function listPropertyOptions() {
    const properties = await listProperties();
    return properties.map((property) => ({ value: property.id, label: property.title }));
}
