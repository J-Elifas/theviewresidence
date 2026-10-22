import { propertyStatusLabels } from "@/server/properties/options";
import type { PropertyStatus } from "@/server/properties/types";
import { cn } from "@/lib/utils";

interface PropertyStatusBadgeProps {
    status: PropertyStatus;
    className?: string;
}

const statusClasses: Record<PropertyStatus, string> = {
    available: "bg-canvas/90 text-ink",
    reserved: "bg-canvas/90 text-ink",
    sold: "bg-ink text-canvas",
};

const dotClasses: Record<PropertyStatus, string> = {
    available: "bg-success",
    reserved: "bg-warning",
    sold: "bg-canvas/70",
};

export default function PropertyStatusBadge({ className, status }: PropertyStatusBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-micro font-medium backdrop-blur",
                statusClasses[status],
                className
            )}
        >
            <span aria-hidden="true" className={cn("size-1.5 rounded-full", dotClasses[status])} />
            {propertyStatusLabels[status]}
        </span>
    );
}
