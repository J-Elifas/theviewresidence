import { Search } from "lucide-react";
import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import SelectField from "@/components/ui/SelectField";
import { priceRangeFilterOptions, propertyTypeFilterOptions } from "@/server/properties/options";

interface HeroSearchFormProps {
    propertyType: string;
    priceRange: string;
    onPropertyTypeChange: (value: string) => void;
    onPriceRangeChange: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function HeroSearchForm({
    onPriceRangeChange,
    onPropertyTypeChange,
    onSubmit,
    priceRange,
    propertyType,
}: HeroSearchFormProps) {
    return (
        <form
            role="search"
            aria-label="Search homes"
            onSubmit={onSubmit}
            className="flex flex-col gap-4 rounded-3xl bg-canvas/95 p-5 shadow-[0_24px_60px_-28px_rgba(29,29,31,0.35)] ring-1 ring-line-soft backdrop-blur-xl sm:flex-row sm:items-center sm:gap-0 sm:rounded-bar sm:py-2.5 sm:pr-2.5 sm:pl-7"
        >
            <SelectField
                id="hero-property-type"
                label="Property type"
                variant="bare"
                options={propertyTypeFilterOptions}
                value={propertyType}
                onValueChange={onPropertyTypeChange}
                wrapperClassName="sm:flex-1 sm:pr-5"
            />
            <div aria-hidden="true" className="h-px bg-line-soft sm:h-9 sm:w-px" />
            <SelectField
                id="hero-price-range"
                label="Price range"
                variant="bare"
                options={priceRangeFilterOptions}
                value={priceRange}
                onValueChange={onPriceRangeChange}
                wrapperClassName="sm:flex-1 sm:px-5"
            />
            <Button
                type="submit"
                size="lg"
                className="mt-1 sm:mt-0 sm:px-7"
                leftIcon={<Search aria-hidden="true" className="size-4" />}
            >
                Search
            </Button>
        </form>
    );
}
