import { useId } from "react";
import type { SvgIconProps } from "./types";

// The gold "V" from The View Residence emblem, drawn as three facets.
export default function LogoMark({ title, ...props }: SvgIconProps) {
    const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");

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
                <linearGradient id={`${id}-light`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f8e7ae" />
                    <stop offset="1" stopColor="#c9a24a" />
                </linearGradient>
                <linearGradient id={`${id}-mid`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ecd189" />
                    <stop offset="1" stopColor="#a47c2c" />
                </linearGradient>
                <linearGradient id={`${id}-dark`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#c99a3b" />
                    <stop offset="1" stopColor="#6f5220" />
                </linearGradient>
            </defs>
            <polygon points="14,38 27,38 50,78 50,95" fill={`url(#${id}-light)`} />
            <polygon points="50,78 72,4 83,4 50,95" fill={`url(#${id}-mid)`} />
            <polygon points="83,4 94,4 50,95" fill={`url(#${id}-dark)`} />
        </svg>
    );
}
