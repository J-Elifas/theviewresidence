import { describe, expect, it } from "vitest";
import imageLoader from "@/lib/image-loader";

describe("imageLoader", () => {
    it("asks Unsplash for the requested width and quality", () => {
        const url = new URL(
            imageLoader({
                src: "https://images.unsplash.com/photo-1?auto=format&fit=crop&w=1200&q=80",
                width: 640,
                quality: 60,
            })
        );

        expect(url.searchParams.get("w")).toBe("640");
        expect(url.searchParams.get("q")).toBe("60");
        expect(url.searchParams.get("fit")).toBe("crop");
    });

    it("defaults to quality 75", () => {
        const url = new URL(
            imageLoader({ src: "https://images.unsplash.com/photo-1?w=1200", width: 384 })
        );

        expect(url.searchParams.get("q")).toBe("75");
    });

    it("leaves other hosts and local paths unchanged", () => {
        const src = "https://firebasestorage.googleapis.com/v0/b/demo/o/house.jpg?alt=media";

        expect(imageLoader({ src, width: 640 })).toBe(src);
        expect(imageLoader({ src: "/images/hero.webp", width: 640 })).toBe("/images/hero.webp");
    });
});
