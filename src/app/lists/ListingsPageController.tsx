"use client";

import { SearchX } from "lucide-react";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyDetailsModal from "@/components/properties/PropertyDetailsModal";
import PropertyFilterBar from "@/components/properties/PropertyFilterBar";
import PropertyGrid from "@/components/properties/PropertyGrid";
import Button from "@/components/ui/Button";
import usePropertyListings from "@/hooks/properties/usePropertyListings";
import { listingSearchParams } from "@/server/properties/options";
import type { PropertyRow } from "@/server/properties/types";

interface ListingsPageControllerProps {
    properties: PropertyRow[];
}

export default function ListingsPageController({ properties }: ListingsPageControllerProps) {
    const {
        filters,
        results,
        selectedProperty,
        hasActiveFilters,
        handleFilterChange,
        handleClearFilters,
        handleOpenDetails,
        handleCloseDetails,
    } = usePropertyListings(properties);

    return (
        <>
            <PropertyFilterBar
                filters={filters}
                resultCount={results.length}
                hasActiveFilters={hasActiveFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
            />

            {results.length > 0 ? (
                <PropertyGrid className="mt-12">
                    {results.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            detailsHref={`/lists?${listingSearchParams.property}=${property.id}`}
                            onOpenDetails={handleOpenDetails}
                        />
                    ))}
                </PropertyGrid>
            ) : (
                <div className="mt-12 flex flex-col items-center rounded-3xl bg-surface px-6 py-20 text-center">
                    <span className="grid size-14 place-items-center rounded-full bg-canvas">
                        <SearchX aria-hidden="true" className="size-6 text-ink-muted" />
                    </span>
                    <h2 className="mt-5 text-subtitle">No homes match these filters</h2>
                    <p className="mt-2 max-w-sm text-ink-muted">
                        Try another property type or price range, or clear the filters to see every
                        available home.
                    </p>
                    <Button className="mt-6" onClick={handleClearFilters}>
                        Clear filters
                    </Button>
                </div>
            )}

            <PropertyDetailsModal property={selectedProperty} onClose={handleCloseDetails} />
        </>
    );
}
