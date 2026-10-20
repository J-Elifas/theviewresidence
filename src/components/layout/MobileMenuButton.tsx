import { Menu, X } from "lucide-react";
import type { Ref } from "react";
import Button from "@/components/ui/Button";

interface MobileMenuButtonProps {
    ref?: Ref<HTMLButtonElement>;
    isExpanded: boolean;
    controlsId: string;
    onClick: () => void;
}

export default function MobileMenuButton({
    controlsId,
    isExpanded,
    onClick,
    ref,
}: MobileMenuButtonProps) {
    return (
        <Button
            ref={ref}
            variant="ghost"
            size="icon-md"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            aria-expanded={isExpanded}
            aria-controls={controlsId}
            onClick={onClick}
            className="md:hidden"
        >
            {isExpanded ? (
                <X className="size-5" strokeWidth={1.75} aria-hidden="true" />
            ) : (
                <Menu className="size-5" strokeWidth={1.75} aria-hidden="true" />
            )}
        </Button>
    );
}
