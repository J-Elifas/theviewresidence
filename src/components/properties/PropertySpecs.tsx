import { Bath, BedDouble, RulerDimensionLine } from "lucide-react";
import type { PropertyRow } from "@/server/properties/types";
import { cn } from "@/lib/utils";

interface PropertySpecsProps {
    property: Pick<PropertyRow, "bedrooms" | "bathrooms" | "buildingArea">;
    className?: string;
}

function pluralize(count: number, noun: string) {
    return `${count} ${count === 1 ? noun : `${noun}s`}`;
}

export default function PropertySpecs({ className, property }: PropertySpecsProps) {
    const specs = [
        { icon: BedDouble, label: pluralize(property.bedrooms, "bed") },
        { icon: Bath, label: pluralize(property.bathrooms, "bath") },
        { icon: RulerDimensionLine, label: `${property.buildingArea} m²` },
    ];

    return (
        <ul
            className={cn(
                "flex flex-wrap gap-x-4 gap-y-1.5 text-caption text-ink-muted",
                className
            )}
        >
            {specs.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-1.5">
                    <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                    {label}
                </li>
            ))}
        </ul>
    );
}
