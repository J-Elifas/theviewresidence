import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyGrid from "@/components/properties/PropertyGrid";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import SectionHeading from "@/components/ui/SectionHeading";
import { salesHighlight } from "@/content/about";
import { listingSearchParams } from "@/server/properties/options";
import type { PropertyRow } from "@/server/properties/types";

interface FeaturedPropertiesSectionProps {
    properties: PropertyRow[];
    onOpenDetails?: (propertyId: string) => void;
}

export default function FeaturedPropertiesSection({
    onOpenDetails,
    properties,
}: FeaturedPropertiesSectionProps) {
    const [firstProperty, ...otherProperties] = properties;

    function renderCard(property: PropertyRow) {
        return (
            <PropertyCard
                key={property.id}
                property={property}
                detailsHref={`/lists?${listingSearchParams.property}=${property.id}`}
                onOpenDetails={onOpenDetails}
            />
        );
    }

    return (
        <section aria-labelledby="featured-title" className="bg-surface py-20 sm:py-24 lg:py-28">
            <Container>
                <SectionHeading
                    id="featured-title"
                    align="center"
                    title="Handpicked featured homes"
                    description="A curated selection our team loves, from easy first homes to signature villas with a view of the bay."
                />
                <PropertyGrid className="mt-14">
                    {firstProperty ? renderCard(firstProperty) : null}
                    <div className="flex min-h-80 flex-col justify-between gap-10 rounded-3xl bg-aqua p-8">
                        <Logo className="size-10" />
                        <div>
                            <p className="text-headline text-ink">{salesHighlight.value}</p>
                            <p className="mt-3 max-w-xs text-ink-muted">{salesHighlight.label}</p>
                        </div>
                        <Link
                            href="/about"
                            className="group inline-flex w-fit items-center gap-2 rounded-full text-caption font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                        >
                            Our story
                            <ArrowUpRight
                                aria-hidden="true"
                                className="size-4 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                            />
                        </Link>
                    </div>
                    {otherProperties.map(renderCard)}
                </PropertyGrid>
            </Container>
        </section>
    );
}
