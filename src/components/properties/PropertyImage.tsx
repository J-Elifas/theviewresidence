import { House } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PropertyImageProps {
    src: string | null;
    alt: string;
    sizes: string;
    className?: string;
}

// Fills its positioned parent. Listings without photos get a branded placeholder.
export default function PropertyImage({ alt, className, sizes, src }: PropertyImageProps) {
    if (!src) {
        return (
            <div
                className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-br from-aqua via-surface to-surface-strong text-ink-muted",
                    className
                )}
            >
                <House aria-hidden="true" className="size-8" strokeWidth={1.25} />
                <span className="text-micro font-medium">Photos coming soon</span>
            </div>
        );
    }

    return (
        <Image src={src} alt={alt} fill sizes={sizes} className={cn("object-cover", className)} />
    );
}
