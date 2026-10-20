"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
    listingSearchParams,
    priceRanges,
    propertySorts,
    propertyTypes,
} from "@/server/properties/options";
import type { PropertyFilters, PropertyRow, PropertySort } from "@/server/properties/types";

const defaultSort: PropertySort = "newest";
const priceRangeValues = priceRanges.map((range) => range.value);
const sortValues = propertySorts.map((sort) => sort.value);

const sortComparators: Record<PropertySort, (a: PropertyRow, b: PropertyRow) => number> = {
    newest: (a, b) => Date.parse(b.listedAt) - Date.parse(a.listedAt),
    "price-asc": (a, b) => a.priceValue - b.priceValue,
    "price-desc": (a, b) => b.priceValue - a.priceValue,
};

function isOneOf<TValue extends string>(
    values: readonly TValue[],
    value: string | null
): value is TValue {
    return value !== null && (values as readonly string[]).includes(value);
}

export function parsePropertyFilters(searchParams: Pick<URLSearchParams, "get">): PropertyFilters {
    const propertyType = searchParams.get(listingSearchParams.propertyType);
    const priceRange = searchParams.get(listingSearchParams.priceRange);
    const sort = searchParams.get(listingSearchParams.sort);

    return {
        propertyType: isOneOf(propertyTypes, propertyType) ? propertyType : undefined,
        priceRange: isOneOf(priceRangeValues, priceRange) ? priceRange : undefined,
        sort: isOneOf(sortValues, sort) ? sort : defaultSort,
    };
}

export function filterProperties(properties: PropertyRow[], filters: PropertyFilters) {
    const range = priceRanges.find((priceRange) => priceRange.value === filters.priceRange);

    return properties
        .filter(
            (property) => !filters.propertyType || property.propertyType === filters.propertyType
        )
        .filter(
            (property) =>
                !range || (property.priceValue >= range.min && property.priceValue < range.max)
        )
        .sort(sortComparators[filters.sort]);
}

// Updates the URL without a server round trip; Next.js keeps useSearchParams in sync.
function replaceSearchParams(searchParams: URLSearchParams) {
    const query = searchParams.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
}

export default function usePropertyListings(properties: PropertyRow[]) {
    const searchParams = useSearchParams();
    const filters = useMemo(() => parsePropertyFilters(searchParams), [searchParams]);
    const results = useMemo(() => filterProperties(properties, filters), [properties, filters]);

    const selectedId = searchParams.get(listingSearchParams.property);
    const selectedProperty = properties.find((property) => property.id === selectedId) ?? null;
    const hasActiveFilters = Boolean(filters.propertyType || filters.priceRange);

    function updateSearchParam(name: string, value: string | null) {
        const nextParams = new URLSearchParams(searchParams.toString());

        if (value) {
            nextParams.set(name, value);
        } else {
            nextParams.delete(name);
        }

        replaceSearchParams(nextParams);
    }

    function handleFilterChange(name: keyof PropertyFilters, value: string) {
        const isDefaultValue = value === "" || (name === "sort" && value === defaultSort);
        updateSearchParam(listingSearchParams[name], isDefaultValue ? null : value);
    }

    function handleClearFilters() {
        const nextParams = new URLSearchParams(searchParams.toString());
        nextParams.delete(listingSearchParams.propertyType);
        nextParams.delete(listingSearchParams.priceRange);
        replaceSearchParams(nextParams);
    }

    function handleOpenDetails(propertyId: string) {
        updateSearchParam(listingSearchParams.property, propertyId);
    }

    function handleCloseDetails() {
        updateSearchParam(listingSearchParams.property, null);
    }

    return {
        filters,
        results,
        selectedProperty,
        hasActiveFilters,
        handleFilterChange,
        handleClearFilters,
        handleOpenDetails,
        handleCloseDetails,
    };
}
