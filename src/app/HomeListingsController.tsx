"use client";

import { useLayoutEffect, useState } from "react";
import FeaturedPropertiesSection from "@/components/home/FeaturedPropertiesSection";
import LatestListingsSection from "@/components/home/LatestListingsSection";
import PropertyDetailsModal from "@/components/properties/PropertyDetailsModal";
import type { PropertyRow } from "@/server/properties/types";

interface HomeListingsControllerProps {
    latestProperties: PropertyRow[];
    featuredProperties: PropertyRow[];
}

// Opens listing details in a modal on the home page instead of navigating to /lists.
export default function HomeListingsController({
    featuredProperties,
    latestProperties,
}: HomeListingsControllerProps) {
    const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

    // Next.js keeps visited pages alive (React Activity) and restores their state on return.
    // Close the modal when this page is hidden so coming back never shows it still open.
    useLayoutEffect(() => {
        return () => setSelectedPropertyId(null);
    }, []);

    const selectedProperty =
        [...latestProperties, ...featuredProperties].find(
            (property) => property.id === selectedPropertyId
        ) ?? null;

    return (
        <>
            <LatestListingsSection
                properties={latestProperties}
                onOpenDetails={setSelectedPropertyId}
            />
            <FeaturedPropertiesSection
                properties={featuredProperties}
                onOpenDetails={setSelectedPropertyId}
            />
            <PropertyDetailsModal
                property={selectedProperty}
                onClose={() => setSelectedPropertyId(null)}
            />
        </>
    );
}
