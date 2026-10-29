import type { priceRanges, propertySorts, propertyStatuses, propertyTypes } from "./options";

export type PropertyType = (typeof propertyTypes)[number];
export type PropertyStatus = (typeof propertyStatuses)[number];
export type PriceRange = (typeof priceRanges)[number]["value"];
export type PropertySort = (typeof propertySorts)[number]["value"];

// One document in the "properties" collection. Mirrors the planned Firestore schema.
export interface PropertyRecord {
    id: string;
    title: string;
    propertyType: PropertyType;
    status: PropertyStatus;
    cluster: string;
    /** Price in Indonesian rupiah (IDR). */
    price: number;
    bedrooms: number;
    bathrooms: number;
    floors: number;
    /** Null means availability has not been specified. */
    hasKitchen: boolean | null;
    hasCarport: boolean | null;
    hasBackGarden: boolean | null;
    /** Building area in square metres. */
    buildingArea: number;
    /** Land area in square metres. */
    landArea: number;
    description: string;
    features: string[];
    imageUrl: string | null;
    isFeatured: boolean;
    /** ISO 8601 timestamp. Convert Firestore Timestamps to this format when reading. */
    listedAt: string;
}

export interface PropertyRow extends Omit<PropertyRecord, "price"> {
    /** Formatted for display, for example "Rp 1.250.000.000". */
    price: string;
    priceValue: number;
}

export interface PropertyFilters {
    propertyType?: PropertyType;
    priceRange?: PriceRange;
    sort: PropertySort;
}

export interface HomePageData {
    latestProperties: PropertyRow[];
    featuredProperties: PropertyRow[];
}
