import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = ComponentProps<"div">;

// Page width caps at 1920px (`max-w-page`).
export default function Container({ className, ...props }: ContainerProps) {
    return (
        <div
            className={cn("mx-auto w-full max-w-page px-4 sm:px-6 lg:px-10 2xl:px-16", className)}
            {...props}
        />
    );
}
