import SocialLinks from "@/components/layout/SocialLinks";
import Container from "@/components/ui/Container";
import RevealImage from "@/components/ui/RevealImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { discoverGallery } from "@/content/gallery";
import type { GalleryImage } from "@/content/types";
import { cn } from "@/lib/utils";

interface GalleryTileProps {
    image: GalleryImage;
    sizes: string;
    className?: string;
}

// Same hover zoom as the property card photos.
function GalleryTile({ className, image, sizes }: GalleryTileProps) {
    return (
        <div className={cn("group relative overflow-hidden rounded-3xl bg-surface", className)}>
            <RevealImage
                src={image.src}
                alt={image.alt}
                sizes={sizes}
                className="group-hover:scale-[1.04]"
            />
        </div>
    );
}

const tileSizes =
    "(min-width: 1920px) 384px, (min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw";

export default function DiscoverSection() {
    const { center, left, leftStack, right, rightStack } = discoverGallery;

    return (
        <section aria-labelledby="discover-title" className="py-20 sm:py-24 lg:py-28">
            <Container>
                <SectionHeading
                    id="discover-title"
                    title="Connect, explore, and discover with us"
                    description="New releases, construction updates and everyday moments from our community. Follow along and see life at The View."
                    action={
                        <div className="flex flex-col gap-3 md:items-end">
                            <p className="text-caption font-medium text-ink-muted">Follow us</p>
                            <SocialLinks />
                        </div>
                    }
                />

                {/* Five columns on desktop, the centre three on tablets, two on phones. */}
                <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:items-center">
                    <GalleryTile
                        image={left}
                        sizes={tileSizes}
                        className="hidden aspect-[4/5] lg:block"
                    />
                    <div className="hidden flex-col gap-3 sm:flex sm:gap-4">
                        {leftStack.map((image) => (
                            <GalleryTile
                                key={image.src}
                                image={image}
                                sizes={tileSizes}
                                className="aspect-square"
                            />
                        ))}
                    </div>
                    <GalleryTile
                        image={center}
                        sizes={tileSizes}
                        className="min-h-64 lg:aspect-[3/5] lg:min-h-0"
                    />
                    <div className="flex flex-col gap-3 sm:gap-4">
                        {rightStack.map((image) => (
                            <GalleryTile
                                key={image.src}
                                image={image}
                                sizes={tileSizes}
                                className="aspect-square"
                            />
                        ))}
                    </div>
                    <GalleryTile
                        image={right}
                        sizes={tileSizes}
                        className="hidden aspect-[4/5] lg:block"
                    />
                </div>
            </Container>
        </section>
    );
}
