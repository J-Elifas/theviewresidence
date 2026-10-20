import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AmenitiesSection from "@/components/about/AmenitiesSection";
import EstateStats from "@/components/about/EstateStats";
import LocationSection from "@/components/about/LocationSection";
import StorySection from "@/components/about/StorySection";
import TeamSection from "@/components/team/TeamSection";

export const metadata: Metadata = {
    title: "About",
    description:
        "The story behind The View Residence Manado: a gated community of modern homes designed around light, greenery and the view.",
};

export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <EstateStats />
            <StorySection />
            <AmenitiesSection />
            <LocationSection />
            <TeamSection className="bg-surface" />
        </>
    );
}
