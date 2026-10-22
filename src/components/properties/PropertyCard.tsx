import { MapPin } from "lucide-react";
import Link from "next/link";
import type { MouseEvent } from "react";
import { propertyTypeLabels } from "@/server/properties/options";
import type { PropertyRow } from "@/server/properties/types";
import { cn } from "@/lib/utils";
import PropertyImage from "./PropertyImage";
import PropertySpecs from "./PropertySpecs";
import PropertyStatusBadge from "./PropertyStatusBadge";

interface PropertyCardProps {
    property: PropertyRow;
    detailsHref: string;
    /** When set, a plain click opens the details in place instead of following the link. */
    onOpenDetails?: (propertyId: string) => void;
    /** "eager" for cards on screen as the page opens. */
    imageLoading?: "eager" | "lazy";
    className?: string;
}

export default function PropertyCard({
    className,
    detailsHref,
    imageLoading = "lazy",
    onOpenDetails,
    property,
}: PropertyCardProps) {
    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
        const isModifiedClick =
            event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
        if (!onOpenDetails || isModifiedClick) return;

        event.preventDefault();
        onOpenDetails(property.id);
    }

    return (
        <article
            className={cn(
                "group relative flex flex-col rounded-3xl has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-ink",
                className
            )}
        >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface">
                <PropertyImage
                    src={property.imageUrl}
                    alt={property.title}
                    sizes="(min-width: 1920px) 600px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    loading={imageLoading}
                    className="group-hover:scale-[1.04]"
                />
                <span className="absolute top-4 left-4 rounded-full bg-canvas/90 px-3 py-1 text-micro font-medium text-ink backdrop-blur">
                    {propertyTypeLabels[property.propertyType]}
                </span>
                <PropertyStatusBadge status={property.status} className="absolute top-4 right-4" />
            </div>

            <div className="flex flex-1 flex-col px-1 pt-5">
                <p className="flex items-center gap-1.5 text-caption text-ink-muted">
                    <MapPin aria-hidden="true" className="size-4" strokeWidth={1.75} />
                    {property.cluster}
                </p>
                <h3 className="mt-1.5 text-subtitle text-ink">
                    <Link
                        href={detailsHref}
                        onClick={onOpenDetails ? handleClick : undefined}
                        className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none"
                    >
                        {property.title}
                    </Link>
                </h3>
                <PropertySpecs property={property} className="mt-3" />

                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <p className="text-body font-semibold text-ink">
                        <span className="sr-only">Price: </span>
                        {property.price}
                    </p>
                    <span
                        aria-hidden="true"
                        className="inline-flex h-10 items-center rounded-xl border border-line bg-canvas px-5 text-caption font-medium text-ink transition-all duration-200 ease-out group-hover:border-ink group-hover:bg-ink group-hover:text-white motion-reduce:transition-none"
                    >
                        Details
                    </span>
                </div>
            </div>
        </article>
    );
}
