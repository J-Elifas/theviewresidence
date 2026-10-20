import { cn } from "@/lib/utils";

// Focus is shown by the border turning dark, without a glow ring.
export function fieldControlClasses(isInvalid = false) {
    return cn(
        "w-full rounded-xl border bg-canvas text-body text-ink shadow-[0_1px_0_rgba(29,29,31,0.03)] outline-none transition-all duration-200 ease-out hover:border-ink/30 disabled:cursor-not-allowed disabled:bg-surface disabled:text-ink-muted disabled:hover:border-line motion-reduce:transition-none",
        isInvalid
            ? "border-danger/60 focus-visible:border-danger focus-within:border-danger"
            : "border-line focus-visible:border-ink focus-within:border-ink"
    );
}

export const fieldInputClasses =
    "min-w-0 flex-1 border-0 bg-transparent text-body text-ink outline-none placeholder:text-ink-muted/70 disabled:cursor-not-allowed";

export const fieldIconClasses =
    "shrink-0 text-ink-muted transition-all duration-200 ease-out group-focus-within:text-ink motion-reduce:transition-none";

export const fieldDividerClasses =
    "h-5 w-px shrink-0 bg-line-soft transition-all duration-200 ease-out group-focus-within:bg-ink/20 motion-reduce:transition-none";

export const fieldErrorClasses = "text-caption font-medium text-danger";
