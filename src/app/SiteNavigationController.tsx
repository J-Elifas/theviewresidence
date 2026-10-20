"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/layout/Header";
import MobileMenuButton from "@/components/layout/MobileMenuButton";
import MobileNavigation from "@/components/layout/MobileNavigation";

const mobileNavigationId = "mobile-navigation";
const desktopQuery = "(min-width: 768px)";

export default function SiteNavigationController() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement | null>(null);

    // Closing from the drawer (Escape, backdrop, close button) hands focus back to the menu button.
    const handleMobileClose = useCallback(() => {
        setIsMobileOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus({ preventScroll: true }));
    }, []);

    useEffect(() => {
        if (!isMobileOpen) {
            return;
        }

        const originalDocumentOverflow = document.documentElement.style.overflow;
        const desktopMediaQuery =
            typeof window.matchMedia === "function" ? window.matchMedia(desktopQuery) : null;

        // Lock scrolling on <html> only. Also hiding <body> overflow turns the body into its own
        // scroll container, which un-sticks the header and scrolls it out of view.
        document.documentElement.style.overflow = "hidden";

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                handleMobileClose();
            }
        }

        // The drawer is hidden from tablet width up, so close it if the viewport grows.
        function handleViewportChange(event: MediaQueryListEvent) {
            if (event.matches) {
                setIsMobileOpen(false);
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        desktopMediaQuery?.addEventListener("change", handleViewportChange);

        return () => {
            document.documentElement.style.overflow = originalDocumentOverflow;
            window.removeEventListener("keydown", handleKeyDown);
            desktopMediaQuery?.removeEventListener("change", handleViewportChange);
        };
    }, [handleMobileClose, isMobileOpen]);

    return (
        <>
            <Header
                currentPath={pathname}
                mobileMenuButton={
                    <MobileMenuButton
                        ref={menuButtonRef}
                        isExpanded={isMobileOpen}
                        controlsId={mobileNavigationId}
                        onClick={() => setIsMobileOpen((isOpen) => !isOpen)}
                    />
                }
            />
            <MobileNavigation
                id={mobileNavigationId}
                isOpen={isMobileOpen}
                currentPath={pathname}
                onClose={handleMobileClose}
                onNavigate={() => setIsMobileOpen(false)}
            />
        </>
    );
}
