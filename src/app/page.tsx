import DiscoverSection from "@/components/home/DiscoverSection";
import HeroSection from "@/components/home/HeroSection";
import TeamSection from "@/components/team/TeamSection";
import { getHomePageData } from "@/server/properties/queries";
import HeroSearchController from "./HeroSearchController";
import HomeListingsController from "./HomeListingsController";

export default async function HomePage() {
    const { latestProperties, featuredProperties } = await getHomePageData();

    return (
        <>
            <HeroSection searchForm={<HeroSearchController />} />
            <HomeListingsController
                latestProperties={latestProperties}
                featuredProperties={featuredProperties}
            />
            <DiscoverSection />
            <TeamSection className="bg-surface" />
        </>
    );
}
