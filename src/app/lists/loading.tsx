import PropertyGrid from "@/components/properties/PropertyGrid";
import Container from "@/components/ui/Container";

const skeletonCards = Array.from({ length: 6 }, (_, index) => index);

export default function ListsLoading() {
    return (
        <Container className="pt-12 pb-24 sm:pt-16 lg:pt-20">
            <p role="status" className="sr-only">
                Loading homes…
            </p>
            <div aria-hidden="true" className="animate-pulse">
                <div className="h-4 w-12 rounded-full bg-surface-strong" />
                <div className="mt-4 h-12 max-w-xl rounded-2xl bg-surface-strong" />
                <div className="mt-5 h-5 max-w-2xl rounded-full bg-surface" />
                <div className="mt-14 h-20 rounded-3xl bg-surface lg:h-16 lg:rounded-bar" />
                <PropertyGrid className="mt-12">
                    {skeletonCards.map((card) => (
                        <div key={card}>
                            <div className="aspect-[4/3] rounded-3xl bg-surface" />
                            <div className="mt-5 h-4 w-1/3 rounded-full bg-surface" />
                            <div className="mt-3 h-5 w-2/3 rounded-full bg-surface-strong" />
                            <div className="mt-6 h-5 w-1/2 rounded-full bg-surface" />
                        </div>
                    ))}
                </PropertyGrid>
            </div>
        </Container>
    );
}
