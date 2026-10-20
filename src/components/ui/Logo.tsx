import LogoBadge from "@/components/svg/LogoBadge";
import { cn } from "@/lib/utils";

interface LogoProps {
    /** Sets the emblem size, for example "size-12 md:size-16". */
    className?: string;
}

// The circular emblem, used in the header and footer. Wrapping links carry the accessible name.
export default function Logo({ className }: LogoProps) {
    return <LogoBadge aria-hidden="true" className={cn("block shrink-0", className)} />;
}
