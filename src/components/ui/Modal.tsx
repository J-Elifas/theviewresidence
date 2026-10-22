"use client";

import { X } from "lucide-react";
import {
    useEffect,
    useEffectEvent,
    useId,
    useLayoutEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import Button from "./Button";

type ModalRole = "dialog" | "alertdialog";
type ModalSize = "sm" | "md" | "lg" | "xl";

interface ModalProps {
    isOpen: boolean;
    title: string;
    description?: string;
    children: ReactNode;
    role?: ModalRole;
    size?: ModalSize;
    showCloseButton?: boolean;
    onClose: () => void;
    onAfterClose?: () => void;
}

const sizeClasses: Record<ModalSize, string> = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
};

const modalExitTransitionMs = 150;
const focusableSelector =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getExitDelay() {
    if (typeof window.matchMedia !== "function") {
        return modalExitTransitionMs;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? 0
        : modalExitTransitionMs;
}

export default function Modal({
    children,
    description,
    isOpen,
    onAfterClose,
    onClose,
    role = "dialog",
    showCloseButton = true,
    size = "md",
    title,
}: ModalProps) {
    const titleId = useId();
    const descriptionId = useId();
    const dialogRef = useRef<HTMLElement | null>(null);
    const returnFocusRef = useRef<HTMLElement | null>(null);
    // Starts unmounted even when open so nothing touches `document` during server rendering.
    const [isPresent, setIsPresent] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // When Next.js hides the page (React Activity), drop the open state so returning to the
    // page never shows a modal that was open when the visitor left.
    useLayoutEffect(() => {
        return () => {
            setIsPresent(false);
            setIsVisible(false);
            returnFocusRef.current = null;
        };
    }, []);

    const handleAfterClose = useEffectEvent(() => {
        returnFocusRef.current?.focus({ preventScroll: true });
        returnFocusRef.current = null;
        onAfterClose?.();
    });

    const handleDocumentKeyDown = useEffectEvent((event: KeyboardEvent) => {
        if (!isOpen) {
            return;
        }

        if (event.key === "Escape") {
            onClose();
            return;
        }

        if (event.key !== "Tab" || !dialogRef.current) {
            return;
        }

        const focusableElements = Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)
        );

        if (focusableElements.length === 0) {
            event.preventDefault();
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    });

    useEffect(() => {
        if (isOpen) {
            if (!isPresent) {
                if (document.activeElement instanceof HTMLElement) {
                    returnFocusRef.current = document.activeElement;
                }

                const frameId = window.requestAnimationFrame(() => setIsPresent(true));
                return () => window.cancelAnimationFrame(frameId);
            }

            const frameId = window.requestAnimationFrame(() => setIsVisible(true));
            return () => window.cancelAnimationFrame(frameId);
        }

        if (!isPresent) {
            return;
        }

        let timeoutId: number | undefined;
        const frameId = window.requestAnimationFrame(() => {
            setIsVisible(false);
            timeoutId = window.setTimeout(() => {
                setIsPresent(false);
                handleAfterClose();
            }, getExitDelay());
        });

        return () => {
            window.cancelAnimationFrame(frameId);

            if (timeoutId !== undefined) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [isOpen, isPresent]);

    useEffect(() => {
        if (!isPresent) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleDocumentKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleDocumentKeyDown);
        };
    }, [isPresent]);

    if (!isPresent) {
        return null;
    }

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
            <div
                aria-hidden="true"
                onMouseDown={isOpen ? onClose : undefined}
                className={cn(
                    "absolute inset-0 bg-night/45 backdrop-blur-sm transition-all motion-reduce:transition-none",
                    isVisible
                        ? "opacity-100 duration-200 ease-out"
                        : "opacity-0 duration-150 ease-in"
                )}
            />
            <section
                ref={dialogRef}
                role={role}
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={description ? descriptionId : undefined}
                inert={!isOpen ? true : undefined}
                className={cn(
                    "relative z-10 flex max-h-[calc(100dvh-1rem)] w-full flex-col overflow-hidden rounded-t-[1.75rem] bg-canvas shadow-[0_30px_80px_-34px_rgba(11,11,12,0.6)] dark:ring-1 dark:ring-line-soft transition-all motion-reduce:transition-none sm:max-h-[calc(100dvh-3rem)] sm:rounded-[1.75rem]",
                    sizeClasses[size],
                    !isOpen && "pointer-events-none",
                    isVisible
                        ? "translate-y-0 scale-100 opacity-100 duration-200 ease-out"
                        : "translate-y-6 scale-[0.98] opacity-0 duration-150 ease-in"
                )}
            >
                <header className="flex shrink-0 items-start justify-between gap-4 border-b border-line-soft px-5 py-4 sm:px-8 sm:py-5">
                    <div className="min-w-0">
                        <h2 id={titleId} className="text-subtitle text-ink sm:text-title">
                            {title}
                        </h2>
                        {description ? (
                            <p id={descriptionId} className="mt-1 text-caption text-ink-muted">
                                {description}
                            </p>
                        ) : null}
                    </div>
                    {showCloseButton ? (
                        <Button
                            variant="secondary"
                            size="icon-md"
                            aria-label="Close"
                            autoFocus
                            onClick={onClose}
                        >
                            <X className="size-4" aria-hidden="true" />
                        </Button>
                    ) : null}
                </header>
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8 sm:py-7">
                    {children}
                </div>
            </section>
        </div>,
        document.body
    );
}
