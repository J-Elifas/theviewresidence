import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyGrid from "@/components/properties/PropertyGrid";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { listingSearchParams } from "@/server/properties/options";
import type { PropertyRow } from "@/server/properties/types";

interface LatestListingsSectionProps {
    properties: PropertyRow[];
    onOpenDetails?: (propertyId: string) => void;
}

export default function LatestListingsSection({
    onOpenDetails,
    properties,
}: LatestListingsSectionProps) {
    return (
        <section aria-labelledby="latest-title" className="py-20 sm:py-24 lg:py-28">
            <Container>
                <SectionHeading
                    id="latest-title"
                    title="Explore our latest listings"
                    description="The newest homes released at The View Residence. Open any listing to see the floor area, highlights and price."
                    action={
                        <Link
                            href="/lists"
                            className="group inline-flex items-center gap-2 rounded-full text-caption font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                        >
                            View all homes
                            <ArrowRight
                                aria-hidden="true"
                                className="size-4 transition-all duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
                            />
                        </Link>
                    }
                />
                <PropertyGrid className="mt-12">
                    {properties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            detailsHref={`/lists?${listingSearchParams.property}=${property.id}`}
                            onOpenDetails={onOpenDetails}
                        />
                    ))}
                </PropertyGrid>
            </Container>
        </section>
    );
}
