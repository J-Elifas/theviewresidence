import { useId } from "react";
import type { SvgIconProps } from "./types";

type LogoMarkSurface = "badge" | "page";
type FacetGradient = [top: string, bottom: string];

interface LogoMarkProps extends SvgIconProps {
    /**
     * "badge": the fixed gold made for LogoBadge's black disc. "page": the page background, with a
     * deeper gold on white and the badge's brighter gold in dark mode (CSS variables in globals.css).
     */
    surface?: LogoMarkSurface;
}

const facetGradients: Record<LogoMarkSurface, Record<"light" | "mid" | "dark", FacetGradient>> = {
    badge: {
        light: ["#f8e7ae", "#c9a24a"],
        mid: ["#ecd189", "#a47c2c"],
        dark: ["#c99a3b", "#6f5220"],
    },
    page: {
        light: ["var(--logo-light-top)", "var(--logo-light-bottom)"],
        mid: ["var(--logo-mid-top)", "var(--logo-mid-bottom)"],
        dark: ["var(--logo-dark-top)", "var(--logo-dark-bottom)"],
    },
};

// The gold "V" from The View Residence emblem, drawn as three facets.
export default function LogoMark({ surface = "badge", title, ...props }: LogoMarkProps) {
    const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
    const gradients = facetGradients[surface];

    return (
        <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            role={title ? "img" : undefined}
            aria-hidden={title ? undefined : true}
            {...props}
        >
            {title ? <title>{title}</title> : null}
            <defs>
                {/* Colours go in `style`: CSS variables don't work in SVG presentation attributes. */}
                {Object.entries(gradients).map(([facet, [top, bottom]]) => (
                    <linearGradient key={facet} id={`${id}-${facet}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" style={{ stopColor: top }} />
                        <stop offset="1" style={{ stopColor: bottom }} />
                    </linearGradient>
                ))}
            </defs>
            <polygon points="14,38 27,38 50,78 50,95" fill={`url(#${id}-light)`} />
            <polygon points="50,78 72,4 83,4 50,95" fill={`url(#${id}-mid)`} />
            <polygon points="83,4 94,4 50,95" fill={`url(#${id}-dark)`} />
        </svg>
    );
}
