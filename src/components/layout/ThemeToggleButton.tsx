import Button from "@/components/ui/Button";
import ThemeIcon from "./ThemeIcon";

interface ThemeToggleButtonProps {
    isDark: boolean;
    /** Receives the button, so the new theme can spread out from it. */
    onToggle: (trigger: HTMLElement) => void;
    className?: string;
}

// Header toggle. A fixed name with aria-pressed reads as "Dark mode, pressed" or "not pressed".
export default function ThemeToggleButton({ className, isDark, onToggle }: ThemeToggleButtonProps) {
    return (
        <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Dark mode"
            aria-pressed={isDark}
            onClick={(event) => onToggle(event.currentTarget)}
            className={className}
        >
            <ThemeIcon />
        </Button>
    );
}
