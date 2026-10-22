import { Bath, BedDouble } from "lucide-react";
import type { PropertyRow } from "@/server/properties/types";
import { cn } from "@/lib/utils";

interface PropertySpecsProps {
    property: Pick<PropertyRow, "bedrooms" | "bathrooms" | "buildingArea" | "landArea">;
    className?: string;
}

function pluralize(count: number, noun: string) {
    return `${count} ${count === 1 ? noun : `${noun}s`}`;
}

export default function PropertySpecs({ className, property }: PropertySpecsProps) {
    const roomSpecs = [
        { icon: BedDouble, label: pluralize(property.bedrooms, "bed") },
        { icon: Bath, label: pluralize(property.bathrooms, "bath") },
    ];
    // Indonesian listings label areas LB (luas bangunan) and LT (luas tanah).
    const areaSpecs = [
        { abbreviation: "LB", name: "Building area", area: property.buildingArea },
        { abbreviation: "LT", name: "Land area", area: property.landArea },
    ];

    return (
        <ul
            className={cn(
                "flex flex-wrap gap-x-4 gap-y-1.5 text-caption text-ink-muted",
                className
            )}
        >
            {roomSpecs.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-1.5">
                    <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                    {label}
                </li>
            ))}
            {areaSpecs.map(({ abbreviation, area, name }) => (
                <li key={abbreviation} className="flex items-center gap-1.5">
                    <span aria-hidden="true" className="text-ink-muted">
                        {abbreviation}
                    </span>
                    <span className="sr-only">{name}</span>
                    {area} m²
                </li>
            ))}
        </ul>
    );
}
