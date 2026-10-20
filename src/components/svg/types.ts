import type { SVGProps } from "react";

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
    /** Accessible name. Omit for decorative use; the SVG is then hidden from assistive tech. */
    title?: string;
}
