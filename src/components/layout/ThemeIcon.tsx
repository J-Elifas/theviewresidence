import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeIconProps {
    /** Sets the icon size, for example "size-4". */
    className?: string;
}

// Sun in light mode, moon in dark. The swap is pure CSS (`dark:`), so the right icon shows before
// React loads; on a switch one turns and shrinks away as the other turns into place.
// `data-theme-motion` keeps this animation running while a theme switch holds all others off.
export default function ThemeIcon({ className }: ThemeIconProps) {
    return (
        <span
            aria-hidden="true"
            data-theme-motion=""
            className={cn("relative block size-[1.125rem]", className)}
        >
            <Sun
                strokeWidth={1.75}
                className="absolute inset-0 size-full scale-100 rotate-0 opacity-100 transition-all duration-500 ease-out motion-reduce:transition-none dark:scale-50 dark:-rotate-90 dark:opacity-0"
            />
            <Moon
                strokeWidth={1.75}
                className="absolute inset-0 size-full scale-50 rotate-90 opacity-0 transition-all duration-500 ease-out motion-reduce:transition-none dark:scale-100 dark:rotate-0 dark:opacity-100"
            />
        </span>
    );
}
