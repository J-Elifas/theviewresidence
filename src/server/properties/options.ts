export const propertyTypes = ["house", "townhouse", "villa", "shophouse"] as const;

export const propertyTypeLabels: Record<(typeof propertyTypes)[number], string> = {
    house: "House",
    townhouse: "Townhouse",
    villa: "Villa",
    shophouse: "Shophouse",
};

// Select options for the hero search and the Lists filters. An empty value means "any".
export const propertyTypeFilterOptions = [
    { value: "", label: "All types" },
    ...propertyTypes.map((type) => ({ value: type, label: propertyTypeLabels[type] })),
];

export const propertyStatuses = ["available", "reserved", "sold"] as const;

export const propertyStatusLabels: Record<(typeof propertyStatuses)[number], string> = {
    available: "Available",
    reserved: "Reserved",
    sold: "Sold",
};

export const priceRanges = [
    { value: "under-1b", label: "Under Rp 1 billion", min: 0, max: 1_000_000_000 },
    { value: "1b-2b", label: "Rp 1 – 2 billion", min: 1_000_000_000, max: 2_000_000_000 },
    { value: "2b-3b", label: "Rp 2 – 3 billion", min: 2_000_000_000, max: 3_000_000_000 },
    { value: "above-3b", label: "Above Rp 3 billion", min: 3_000_000_000, max: Infinity },
] as const;

export const priceRangeFilterOptions = [
    { value: "", label: "Any price" },
    ...priceRanges.map(({ label, value }) => ({ value, label })),
];

export const propertySorts = [
    { value: "newest", label: "Newest first" },
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
] as const;

// URL search params shared by the hero search, the Lists page and the Contact page.
export const listingSearchParams = {
    propertyType: "type",
    priceRange: "price",
    sort: "sort",
    property: "property",
} as const;
