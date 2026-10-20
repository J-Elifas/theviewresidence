import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon-sm" | "icon-md" | "icon-lg";

export interface ButtonStyleOptions {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isFullWidth?: boolean;
    className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-ink text-white shadow-[0_14px_30px_-18px_rgba(29,29,31,0.85)] hover:bg-ink/85 active:bg-ink disabled:bg-ink/40 disabled:shadow-none",
    secondary:
        "border border-line bg-canvas text-ink shadow-[0_1px_0_rgba(29,29,31,0.03)] hover:border-ink/30 hover:bg-surface disabled:text-ink-muted",
    ghost: "text-ink hover:bg-surface disabled:text-ink-muted",
};

const sizeClasses: Record<ButtonSize, string> = {
    xs: "h-7 px-3 text-micro",
    sm: "h-9 px-4 text-caption",
    md: "h-11 px-5 text-body",
    lg: "h-12 px-6 text-body",
    "icon-sm": "size-9 p-0",
    "icon-md": "size-10 p-0",
    "icon-lg": "size-11 p-0",
};

// Shared by Button and ButtonLink so a link and a button look identical.
export function buttonClasses({
    variant = "primary",
    size = "md",
    isFullWidth = false,
    className,
}: ButtonStyleOptions = {}) {
    return cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed motion-reduce:transition-none",
        variantClasses[variant],
        sizeClasses[size],
        isFullWidth && "w-full",
        className
    );
}
