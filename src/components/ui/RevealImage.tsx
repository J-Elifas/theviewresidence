"use client";

import { ImageOff } from "lucide-react";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ImageStatus = "loading" | "loaded" | "error";

interface RevealImageProps extends Omit<ImageProps, "src" | "fill" | "onLoad" | "onError"> {
    src: string;
}

// Only opacity, scale and blur change, so the browser animates them without layout or repaints.
// The photo starts slightly zoomed in to hide the blur's soft edges.
const imageClasses: Record<ImageStatus, string> = {
    loading: "scale-[1.06] opacity-0 blur-lg",
    loaded: "scale-100 opacity-100 blur-none",
    error: "opacity-0",
};

// The shimmer pauses rather than stops, so it fades out where it is instead of jumping back.
const placeholderClasses: Record<ImageStatus, string> = {
    loading: "opacity-100",
    loaded: "opacity-0 after:[animation-play-state:paused]",
    error: "opacity-0 after:[animation-play-state:paused]",
};

// Fills its positioned parent, which sets the background colour behind the shimmer. The photo
// sharpens in from a blur once it loads. Lazy by default, like `next/image`.
export default function RevealImage({ alt, className, src, ...props }: RevealImageProps) {
    // Keyed by URL, so a new `src` (the details modal switching homes) starts loading again.
    const [settled, setSettled] = useState<{ src: string; status: ImageStatus } | null>(null);
    const status = settled?.src === src ? settled.status : "loading";

    return (
        <>
            <span
                aria-hidden="true"
                data-reveal="placeholder"
                className={cn(
                    "pointer-events-none absolute inset-0 overflow-hidden transition-all duration-500 ease-out after:absolute after:inset-0 after:animate-shimmer after:bg-linear-to-r after:from-transparent after:via-canvas/70 after:to-transparent motion-reduce:transition-none motion-reduce:after:animate-none",
                    placeholderClasses[status]
                )}
            />
            {status === "error" ? (
                <span
                    data-reveal="error"
                    className="absolute inset-0 grid place-items-center text-ink-muted"
                >
                    <ImageOff aria-hidden="true" className="size-8" strokeWidth={1.25} />
                </span>
            ) : null}
            <Image
                {...props}
                src={src}
                alt={alt}
                fill
                data-reveal="image"
                onLoad={() => setSettled({ src, status: "loaded" })}
                onError={() => setSettled({ src, status: "error" })}
                className={cn(
                    "object-cover transition-all duration-500 ease-out motion-reduce:transition-none",
                    imageClasses[status],
                    className
                )}
            />
        </>
    );
}
