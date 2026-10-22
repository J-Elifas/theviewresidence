import { cn } from "@/lib/utils";
import ThemeIcon from "./ThemeIcon";

interface ThemeSwitchProps {
    isDark: boolean;
    /** Receives the switch, so the new theme can spread out from it. */
    onToggle: (trigger: HTMLElement) => void;
    className?: string;
}

// The mobile menu's switch. Like the icons, the knob's position comes from CSS (`dark:`), so it
// sits on the right side before React loads. The knob is `canvas`: white, then black.
export default function ThemeSwitch({ className, isDark, onToggle }: ThemeSwitchProps) {
    return (
        <div className={cn("flex items-center justify-between gap-4", className)}>
            <button
                type="button"
                role="switch"
                aria-label="Dark mode"
                aria-checked={isDark}
                onClick={(event) => onToggle(event.currentTarget)}
                className="relative h-8 w-14 shrink-0 cursor-pointer rounded-full bg-surface-strong transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
            >
                <span
                    data-theme-motion=""
                    className="absolute top-0.5 left-0.5 grid size-7 place-items-center rounded-full bg-canvas text-ink shadow-[0_2px_6px_-1px_rgba(11,11,12,0.3)] transition-all duration-300 ease-out motion-reduce:transition-none dark:translate-x-6"
                >
                    <ThemeIcon className="size-4" />
                </span>
            </button>
        </div>
    );
}
