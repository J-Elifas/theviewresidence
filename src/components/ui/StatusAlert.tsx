"use client";

import { CircleAlert, CircleCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export type StatusAlertTone = "success" | "error";

interface StatusAlertProps {
    tone: StatusAlertTone;
    title: string;
    message: string;
    onDismiss?: () => void;
    className?: string;
}

const toneStyles = {
    success: { Icon: CircleCheck, icon: "bg-aqua text-success" },
    error: { Icon: CircleAlert, icon: "bg-danger/10 text-danger" },
} satisfies Record<StatusAlertTone, { Icon: typeof CircleCheck; icon: string }>;

export default function StatusAlert({
    className,
    message,
    onDismiss,
    title,
    tone,
}: StatusAlertProps) {
    const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
    const { Icon, icon } = toneStyles[tone];

    // Portals need the document, which only exists after mount.
    useEffect(() => {
        const timeoutId = window.setTimeout(() => setPortalRoot(document.body), 0);
        return () => window.clearTimeout(timeoutId);
    }, []);

    if (!portalRoot) {
        return null;
    }

    return createPortal(
        <aside
            role={tone === "error" ? "alert" : "status"}
            aria-live={tone === "error" ? "assertive" : "polite"}
            className={cn(
                "fixed top-20 right-4 left-4 md:top-24 z-[100] flex items-start gap-3 rounded-2xl border border-line-soft bg-canvas/95 p-4 shadow-[0_24px_60px_-30px_rgba(29,29,31,0.6)] backdrop-blur-xl sm:right-6 sm:left-auto sm:w-full sm:max-w-sm",
                className
            )}
        >
            <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl", icon)}>
                <Icon className="size-5" strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block text-caption font-semibold text-ink">{title}</span>
                <span className="mt-0.5 block text-caption text-ink-muted">{message}</span>
            </span>
            {onDismiss ? (
                <button
                    type="button"
                    aria-label="Dismiss notification"
                    onClick={onDismiss}
                    className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-ink-muted transition-all duration-200 ease-out hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
                >
                    <X className="size-4" strokeWidth={2} aria-hidden="true" />
                </button>
            ) : null}
        </aside>,
        portalRoot
    );
}
