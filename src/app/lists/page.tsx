import type { Metadata } from "next";
import { Suspense } from "react";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyFilterBar from "@/components/properties/PropertyFilterBar";
import PropertyGrid, { firstRowCardCount } from "@/components/properties/PropertyGrid";
import Container from "@/components/ui/Container";
import { listingSearchParams } from "@/server/properties/options";
import { listProperties } from "@/server/properties/queries";
import ListingsPageController from "./ListingsPageController";

export const metadata: Metadata = {
    title: "Homes for sale",
    description:
        "Browse houses, townhouses, villas and shophouses for sale at The View Residence Manado. Filter by property type and price.",
};

export default async function ListsPage() {
    const properties = await listProperties();

    return (
        <>
            <Container className="pt-12 pb-10 sm:pt-16 lg:pt-20 lg:pb-14">
                <p className="text-caption font-semibold text-ink-muted">Lists</p>
                <h1 className="mt-3 max-w-3xl text-headline text-balance sm:text-hero-md">
                    Find the home that fits your life.
                </h1>
                <p className="mt-5 max-w-2xl text-body text-pretty text-ink-muted sm:text-intro">
                    Every home at The View Residence, from starter houses to bay-view villas. Filter
                    by type and budget, then open any listing for the full details.
                </p>
            </Container>

            <Container className="pb-24 lg:pb-32">
                {/* Filters live in the URL, so the controller renders on the client. The
                    placeholder keeps every listing in the server-rendered HTML. */}
                <Suspense
                    fallback={
                        <>
                            <PropertyFilterBar
                                filters={{ sort: "newest" }}
                                resultCount={properties.length}
                                hasActiveFilters={false}
                            />
                            <PropertyGrid className="mt-12">
                                {properties.map((property, index) => (
                                    <PropertyCard
                                        key={property.id}
                                        property={property}
                                        detailsHref={`/lists?${listingSearchParams.property}=${property.id}`}
                                        imageLoading={index < firstRowCardCount ? "eager" : "lazy"}
                                    />
                                ))}
                            </PropertyGrid>
                        </>
                    }
                >
                    <ListingsPageController properties={properties} />
                </Suspense>
            </Container>
        </>
    );
}
