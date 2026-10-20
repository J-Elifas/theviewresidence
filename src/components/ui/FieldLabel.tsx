import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldLabelProps {
    children: ReactNode;
    htmlFor: string;
    isRequired?: boolean;
    className?: string;
}

export default function FieldLabel({
    children,
    className,
    htmlFor,
    isRequired = false,
}: FieldLabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className={cn("block scroll-mt-6 text-caption font-medium text-ink", className)}
        >
            {children}
            {isRequired ? (
                <>
                    <span className="sr-only"> required</span>
                    <span className="ml-1 text-danger" aria-hidden="true">
                        *
                    </span>
                </>
            ) : null}
        </label>
    );
}
