import { useId } from "react";
import type { SvgIconProps } from "./types";

type LogoMarkSurface = "dark" | "light";
type FacetGradient = [top: string, bottom: string];

interface LogoMarkProps extends SvgIconProps {
    /** The background behind the mark. Light backgrounds get a deeper gold so the pale facet shows. */
    surface?: LogoMarkSurface;
}

const facetGradients: Record<LogoMarkSurface, Record<"light" | "mid" | "dark", FacetGradient>> = {
    dark: {
        light: ["#f8e7ae", "#c9a24a"],
        mid: ["#ecd189", "#a47c2c"],
        dark: ["#c99a3b", "#6f5220"],
    },
    light: {
        light: ["#e6c56e", "#b38a34"],
        mid: ["#d6ad52", "#94702a"],
        dark: ["#ad8536", "#5b4318"],
    },
};

// The gold "V" from The View Residence emblem, drawn as three facets.
export default function LogoMark({ surface = "dark", title, ...props }: LogoMarkProps) {
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
                {Object.entries(gradients).map(([facet, [top, bottom]]) => (
                    <linearGradient key={facet} id={`${id}-${facet}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor={top} />
                        <stop offset="1" stopColor={bottom} />
                    </linearGradient>
                ))}
            </defs>
            <polygon points="14,38 27,38 50,78 50,95" fill={`url(#${id}-light)`} />
            <polygon points="50,78 72,4 83,4 50,95" fill={`url(#${id}-mid)`} />
            <polygon points="83,4 94,4 50,95" fill={`url(#${id}-dark)`} />
        </svg>
    );
}
