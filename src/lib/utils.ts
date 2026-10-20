import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the custom tokens from globals.css. Without this it reads `text-headline`
// as a color (and drops it next to `text-ink`) and can't let `max-w-7xl` override `max-w-page`.
const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            container: ["page"],
            radius: ["bar"],
            text: [
                "hero",
                "hero-md",
                "headline",
                "headline-md",
                "headline-sm",
                "title",
                "subtitle",
                "intro",
                "body",
                "caption",
                "micro",
            ],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const rupiahFormatter = new Intl.NumberFormat("en-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
});

export function formatPrice(value: number) {
    return rupiahFormatter.format(value);
}

export function isActivePath(currentPath: string, href: string) {
    return href === "/" ? currentPath === "/" : currentPath.startsWith(href);
}
