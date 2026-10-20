import { useId } from "react";
import LogoMark from "./LogoMark";
import type { SvgIconProps } from "./types";

const sheenBands = [
    "M-60 330 L330 -60 L352 -60 L-38 330 Z",
    "M-10 380 L380 -10 L420 -10 L30 380 Z",
    "M60 440 L450 50 L466 50 L76 440 Z",
    "M-120 280 L270 -110 L300 -110 L-90 280 Z",
];

// Full circular emblem: "THE VIEW RESIDENCE — MANADO — Quality Living".
export default function LogoBadge({
    title = "The View Residence Manado, Quality Living",
    ...props
}: SvgIconProps) {
    const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");

    return (
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" {...props}>
            <title>{title}</title>
            <defs>
                <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f6dc8f" />
                    <stop offset="0.35" stopColor="#c9962f" />
                    <stop offset="0.65" stopColor="#e9b24c" />
                    <stop offset="1" stopColor="#8a6a2b" />
                </linearGradient>
                <radialGradient id={`${id}-face`} cx="0.5" cy="0.35" r="0.7">
                    <stop offset="0" stopColor="#2a2a2e" />
                    <stop offset="1" stopColor="#050506" />
                </radialGradient>
                <clipPath id={`${id}-clip`}>
                    <circle cx="200" cy="200" r="188" />
                </clipPath>
            </defs>

            <circle cx="200" cy="200" r="196" fill={`url(#${id}-ring)`} />
            <circle cx="200" cy="200" r="188" fill={`url(#${id}-face)`} />
            <g clipPath={`url(#${id}-clip)`} fill="#ffffff" fillOpacity="0.045">
                {sheenBands.map((band) => (
                    <path key={band} d={band} />
                ))}
            </g>

            <LogoMark x="148" y="46" width="104" height="104" />

            <g fill="#f4f1ea" textAnchor="middle" className="font-serif">
                <text x="200" y="212" fontSize="46" fontWeight="600" letterSpacing="2">
                    THE VIEW
                </text>
                <text x="200" y="262" fontSize="46" fontWeight="600" letterSpacing="2">
                    RESIDENCE
                </text>
                <text x="200" y="298" fontSize="17" fontWeight="600" letterSpacing="5">
                    MANADO
                </text>
                <text
                    x="200"
                    y="344"
                    fontSize="28"
                    fontStyle="italic"
                    fontWeight="500"
                    fill="#ecd189"
                >
                    Quality Living
                </text>
            </g>
            <g stroke="#f4f1ea" strokeWidth="1.5">
                <line x1="104" y1="292" x2="146" y2="292" />
                <line x1="254" y1="292" x2="296" y2="292" />
            </g>
        </svg>
    );
}
