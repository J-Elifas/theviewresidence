import Button from "@/components/ui/Button";
import SelectField from "@/components/ui/SelectField";
import {
    priceRangeFilterOptions,
    propertySorts,
    propertyTypeFilterOptions,
} from "@/server/properties/options";
import type { PropertyFilters } from "@/server/properties/types";
import { cn } from "@/lib/utils";

interface PropertyFilterBarProps {
    filters: PropertyFilters;
    resultCount: number;
    hasActiveFilters: boolean;
    onFilterChange?: (name: keyof PropertyFilters, value: string) => void;
    onClearFilters?: () => void;
    className?: string;
}

export default function PropertyFilterBar({
    className,
    filters,
    hasActiveFilters,
    onClearFilters,
    onFilterChange,
    resultCount,
}: PropertyFilterBarProps) {
    // Without a handler (the server-rendered placeholder) the selects render disabled and
    // receive no functions, which Server Components can't pass to client components.
    function getChangeHandler(name: keyof PropertyFilters) {
        if (!onFilterChange) return undefined;
        return (value: string) => onFilterChange(name, value);
    }

    return (
        <div
            className={cn(
                // Phones and tablets: one card with the count inside.
                // Desktop: the selects in a rounded bar, with the count below it.
                "relative z-10 flex flex-col gap-4 rounded-3xl border border-line-soft bg-canvas p-5 shadow-[0_18px_50px_-30px_rgba(29,29,31,0.25)] lg:gap-5 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none",
                className
            )}
        >
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-line-soft lg:rounded-bar lg:border lg:border-line-soft lg:bg-canvas lg:px-8 lg:py-3 lg:shadow-[0_18px_50px_-30px_rgba(29,29,31,0.25)]">
                <SelectField
                    id="filter-type"
                    label="Property type"
                    variant="bare"
                    options={propertyTypeFilterOptions}
                    value={filters.propertyType ?? ""}
                    disabled={!onFilterChange}
                    onValueChange={getChangeHandler("propertyType")}
                    wrapperClassName="sm:pr-5"
                />
                <SelectField
                    id="filter-price"
                    label="Price range"
                    variant="bare"
                    options={priceRangeFilterOptions}
                    value={filters.priceRange ?? ""}
                    disabled={!onFilterChange}
                    onValueChange={getChangeHandler("priceRange")}
                    wrapperClassName="sm:px-5"
                />
                <SelectField
                    id="filter-sort"
                    label="Sort by"
                    variant="bare"
                    options={propertySorts}
                    value={filters.sort}
                    disabled={!onFilterChange}
                    onValueChange={getChangeHandler("sort")}
                    wrapperClassName="sm:pl-5"
                />
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line-soft pt-4 lg:border-t-0 lg:px-8 lg:pt-0">
                <p
                    role="status"
                    className="text-caption whitespace-nowrap text-ink-muted lg:text-body lg:font-semibold lg:text-ink"
                >
                    <span className="font-semibold text-ink">{resultCount}</span>{" "}
                    {resultCount === 1 ? "home" : "homes"} found
                </p>
                {hasActiveFilters ? (
                    <Button variant="secondary" size="sm" onClick={onClearFilters}>
                        Clear filters
                    </Button>
                ) : null}
            </div>
        </div>
    );
}
