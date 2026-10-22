"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, type KeyboardEvent, type TouchEvent } from "react";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import { navLinks } from "@/content/site";
import { cn, isActivePath } from "@/lib/utils";
import SocialLinks from "./SocialLinks";
import ThemeSwitch from "./ThemeSwitch";

interface MobileNavigationProps {
    id: string;
    isOpen: boolean;
    currentPath: string;
    isDarkTheme: boolean;
    onClose: () => void;
    onNavigate: () => void;
    onToggleTheme: (trigger: HTMLElement) => void;
}

const swipeCloseDistance = 70;

export default function MobileNavigation({
    currentPath,
    id,
    isDarkTheme,
    isOpen,
    onClose,
    onNavigate,
    onToggleTheme,
}: MobileNavigationProps) {
    const panelRef = useRef<HTMLDivElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

    // Move focus into the drawer when it opens.
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const frameId = window.requestAnimationFrame(() => {
            closeButtonRef.current?.focus({ preventScroll: true });
        });

        return () => window.cancelAnimationFrame(frameId);
    }, [isOpen]);

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key !== "Tab" || !panelRef.current) {
            return;
        }

        const focusableElements = Array.from(
            panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
        }
    }

    function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
        const touch = event.changedTouches[0];
        touchStartRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
    }

    function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
        const start = touchStartRef.current;
        const touch = event.changedTouches[0];
        touchStartRef.current = null;

        if (!start || !touch) {
            return;
        }

        const isSwipeRight =
            touch.clientX - start.x > swipeCloseDistance && Math.abs(touch.clientY - start.y) < 80;

        if (isSwipeRight) {
            onClose();
        }
    }

    return (
        <div
            id={id}
            aria-hidden={!isOpen}
            inert={!isOpen ? true : undefined}
            className={cn(
                "fixed inset-0 z-[60] md:hidden",
                isOpen ? "pointer-events-auto" : "pointer-events-none"
            )}
        >
            <button
                type="button"
                aria-label="Close menu"
                tabIndex={-1}
                onClick={onClose}
                className={cn(
                    "absolute inset-0 cursor-default bg-night/40 backdrop-blur-[2px] transition-all duration-300 ease-out motion-reduce:transition-none",
                    isOpen ? "opacity-100" : "opacity-0"
                )}
            />
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                onKeyDown={handleKeyDown}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className={cn(
                    // The left border is there in both themes (transparent in light), so showing
                    // it in dark mode doesn't move the links by a pixel.
                    "absolute inset-y-0 right-0 flex w-[min(22rem,calc(100vw-2.5rem))] flex-col border-l border-transparent bg-canvas shadow-[0_0_60px_-20px_rgba(11,11,12,0.5)] transition-all duration-300 ease-out motion-reduce:transition-none dark:border-line-soft",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-line-soft px-6">
                    <p className="text-caption font-semibold text-ink-muted">Menu</p>
                    <Button
                        ref={closeButtonRef}
                        variant="ghost"
                        size="icon-md"
                        aria-label="Close menu"
                        onClick={onClose}
                        className="-mr-2"
                    >
                        <X className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </Button>
                </div>

                <nav aria-label="Mobile" className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
                    <ul className="space-y-1">
                        {navLinks.map((link) => {
                            const isActive = isActivePath(currentPath, link.href);

                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        aria-current={isActive ? "page" : undefined}
                                        onClick={onNavigate}
                                        className={cn(
                                            "block rounded-lg py-2 text-title transition-all duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none",
                                            isActive ? "text-ink" : "text-ink/55"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <ThemeSwitch
                    isDark={isDarkTheme}
                    onToggle={onToggleTheme}
                    className="shrink-0 px-6 pb-5"
                />

                <div className="shrink-0 space-y-5 border-t border-line-soft px-6 py-6">
                    <ButtonLink href="/contact" size="lg" isFullWidth onClick={onNavigate}>
                        Book a visit
                    </ButtonLink>
                    <p className="text-caption text-ink-muted">
                        Show unit open daily, 09.00 – 17.00 WITA
                    </p>
                    <SocialLinks />
                </div>
            </div>
        </div>
    );
}
