import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Cards in the first row of the widest grid, on screen as the Lists page opens. Their photos load
// eagerly, since the browser counts one of them as the page's main image (LCP).
export const firstRowCardCount = 3;

interface PropertyGridProps {
    children: ReactNode;
    className?: string;
}

export default function PropertyGrid({ children, className }: PropertyGridProps) {
    return (
        <div className={cn("grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3", className)}>
            {children}
        </div>
    );
}
