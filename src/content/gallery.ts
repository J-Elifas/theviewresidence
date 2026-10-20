import type { GalleryImage } from "./types";

// Placeholder lifestyle photography for the home page collage.
export const heroImage: GalleryImage = {
    src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=80",
    alt: "A white two-storey villa with a swimming pool under a clear sky",
};

export const discoverGallery = {
    left: {
        src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
        alt: "Modern white villa with terraces beside a pool",
    },
    leftStack: [
        {
            src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
            alt: "Bright living room with a grey sofa and timber feature wall",
        },
        {
            src: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=900&q=80",
            alt: "White kitchen with an island and pendant lights",
        },
    ],
    center: {
        src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
        alt: "Glass-walled living area opening onto a pool terrace",
    },
    rightStack: [
        {
            src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80",
            alt: "Modern bathroom with a freestanding bathtub",
        },
        {
            src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
            alt: "Sunny living room with ocean-facing windows",
        },
    ],
    right: {
        src: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=900&q=80",
        alt: "Villa courtyard with a pool at sunset",
    },
} satisfies Record<string, GalleryImage | GalleryImage[]>;
