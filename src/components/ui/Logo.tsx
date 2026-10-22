import LogoMark from "@/components/svg/LogoMark";
import { cn } from "@/lib/utils";

interface LogoProps {
    /** Sets the mark size, for example "size-9 md:size-11". */
    className?: string;
}

// The gold V on its own, in the gold that suits the current theme. The viewBox crops the empty
// space around the V, so the size class is the size of the mark and it lines up with the page
// edge. Wrapping links carry the accessible name.
export default function Logo({ className }: LogoProps) {
    return (
        <LogoMark surface="page" viewBox="7 2 94 94" className={cn("block shrink-0", className)} />
    );
}
