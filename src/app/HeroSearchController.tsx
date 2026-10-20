"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import HeroSearchForm from "@/components/home/HeroSearchForm";
import { listingSearchParams } from "@/server/properties/options";

export default function HeroSearchController() {
    const router = useRouter();
    const [propertyType, setPropertyType] = useState("");
    const [priceRange, setPriceRange] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const params = new URLSearchParams();
        if (propertyType) params.set(listingSearchParams.propertyType, propertyType);
        if (priceRange) params.set(listingSearchParams.priceRange, priceRange);

        const query = params.toString();
        router.push(query ? `/lists?${query}` : "/lists");
    }

    return (
        <HeroSearchForm
            propertyType={propertyType}
            priceRange={priceRange}
            onPropertyTypeChange={setPropertyType}
            onPriceRangeChange={setPriceRange}
            onSubmit={handleSubmit}
        />
    );
}
