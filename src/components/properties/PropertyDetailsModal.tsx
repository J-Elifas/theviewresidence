"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import Modal from "@/components/ui/Modal";
import { listingSearchParams, propertyTypeLabels } from "@/server/properties/options";
import type { PropertyRow } from "@/server/properties/types";
import PropertyImage from "./PropertyImage";
import PropertyStatusBadge from "./PropertyStatusBadge";

interface PropertyDetailsModalProps {
    property: PropertyRow | null;
    onClose: () => void;
}

export default function PropertyDetailsModal({ onClose, property }: PropertyDetailsModalProps) {
    // Keep showing the last listing while the modal animates out.
    const [displayedProperty, setDisplayedProperty] = useState(property);

    if (property && property !== displayedProperty) {
        setDisplayedProperty(property);
    }

    if (!displayedProperty) {
        return null;
    }

    const facts = [
        { label: "Bedrooms", value: displayedProperty.bedrooms },
        { label: "Bathrooms", value: displayedProperty.bathrooms },
        { label: "Floors", value: displayedProperty.floors },
        { label: "LB (Building)", value: `${displayedProperty.buildingArea} m²` },
        { label: "LT (Land)", value: `${displayedProperty.landArea} m²` },
    ];
    const amenities = [
        { label: "Kitchen", isAvailable: displayedProperty.hasKitchen },
        { label: "Carport", isAvailable: displayedProperty.hasCarport },
        { label: "Rear Garden", isAvailable: displayedProperty.hasBackGarden },
    ];

    return (
        <Modal
            isOpen={Boolean(property)}
            title={displayedProperty.title}
            description={`${displayedProperty.cluster}, The View Residence`}
            size="xl"
            onClose={onClose}
            onAfterClose={() => setDisplayedProperty(null)}
        >
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-surface">
                <PropertyImage
                    src={displayedProperty.imageUrl}
                    alt={displayedProperty.title}
                    sizes="(min-width: 896px) 832px, 100vw"
                    loading="eager"
                />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-surface px-3 py-1 text-micro font-medium text-ink">
                        {propertyTypeLabels[displayedProperty.propertyType]}
                    </span>
                    <PropertyStatusBadge
                        status={displayedProperty.status}
                        className="border border-line-soft"
                    />
                </div>
                <p className="text-subtitle text-ink sm:text-title">
                    <span className="sr-only">Price: </span>
                    {displayedProperty.price}
                </p>
            </div>

            <dl aria-label="Specifications" className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {facts.map((fact) => (
                    <div key={fact.label} className="rounded-2xl bg-surface px-4 py-3">
                        <dt className="text-micro text-ink-muted">{fact.label}</dt>
                        <dd className="mt-1 text-body font-semibold text-ink">{fact.value}</dd>
                    </div>
                ))}
                {amenities.map(({ isAvailable, label }) => (
                    <div key={label} className="rounded-2xl bg-surface px-4 py-3">
                        <dt className="text-micro text-ink-muted">{label}</dt>
                        <dd className="mt-1 flex h-6 items-center text-body font-semibold text-ink">
                            {isAvailable ? (
                                <Check aria-hidden="true" className="size-5" strokeWidth={2.5} />
                            ) : (
                                <span aria-hidden="true" className="text-ink-muted">
                                    —
                                </span>
                            )}
                            <span className="sr-only">
                                {isAvailable === null
                                    ? "Not specified"
                                    : isAvailable
                                        ? "Available"
                                        : "Not available"}
                            </span>
                        </dd>
                    </div>
                ))}
            </dl>

            <p className="mt-6 text-body text-pretty text-ink-muted">
                {displayedProperty.description}
            </p>

            <h3 className="mt-6 text-caption font-semibold text-ink">Highlights</h3>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {displayedProperty.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-caption text-ink">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-aqua">
                            <Check aria-hidden="true" className="size-3" strokeWidth={2.5} />
                        </span>
                        {feature}
                    </li>
                ))}
            </ul>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line-soft pt-5 sm:flex-row sm:justify-end">
                <Button variant="secondary" size="lg" onClick={onClose}>
                    Back to listings
                </Button>
                {/* Close as the page changes, so going back returns to the page, not the modal. */}
                <ButtonLink
                    href={`/contact?${listingSearchParams.property}=${displayedProperty.id}`}
                    size="lg"
                    onNavigate={() => onClose()}
                >
                    {displayedProperty.status === "sold"
                        ? "Ask about the next release"
                        : "Enquire about this home"}
                </ButtonLink>
            </div>
        </Modal>
    );
}
