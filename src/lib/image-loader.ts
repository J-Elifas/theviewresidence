interface ImageLoaderParams {
    src: string;
    width: number;
    quality?: number;
}

const resizableHosts = new Set(["images.unsplash.com"]);

// `next/image` loader for the static export (Next.js requires a default export here).
// Unsplash resizes on request; other images are served as they are.
export default function imageLoader({ quality, src, width }: ImageLoaderParams) {
    if (!URL.canParse(src)) {
        return src;
    }

    const url = new URL(src);

    if (!resizableHosts.has(url.hostname)) {
        return src;
    }

    url.searchParams.set("auto", "format");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));

    return url.toString();
}
