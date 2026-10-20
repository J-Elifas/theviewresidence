import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingAlign = "left" | "center";

interface SectionHeadingProps {
    id?: string;
    eyebrow?: string;
    title: string;
    description?: string;
    align?: SectionHeadingAlign;
    /** Shown beside a left-aligned heading on wide screens, for example a "View all" link. */
    action?: ReactNode;
    className?: string;
}

const alignClasses: Record<SectionHeadingAlign, string> = {
    left: "text-left",
    center: "mx-auto text-center",
};

export default function SectionHeading({
    action,
    align = "left",
    className,
    description,
    eyebrow,
    id,
    title,
}: SectionHeadingProps) {
    return (
        <div
            className={cn(
                "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
                align === "center" && "md:justify-center",
                className
            )}
        >
            <div className={cn("max-w-3xl", alignClasses[align])}>
                {eyebrow ? (
                    <p className="text-caption font-semibold text-ink-muted">{eyebrow}</p>
                ) : null}
                <h2
                    id={id}
                    className="mt-2 text-headline-sm text-balance text-ink md:text-headline-md lg:text-headline"
                >
                    {title}
                </h2>
                {description ? (
                    <p className="mt-4 text-body text-pretty text-ink-muted md:text-intro">
                        {description}
                    </p>
                ) : null}
            </div>
            {action ? <div className="shrink-0">{action}</div> : null}
        </div>
    );
}
