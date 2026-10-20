import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
