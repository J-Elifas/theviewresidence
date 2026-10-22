import { useCallback, useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import {
    darkSchemeQuery,
    parseTheme,
    resolveTheme,
    themeStorageKey,
    type Theme,
} from "@/lib/theme";

const revealDurationMs = 500;
const revealEasing = "cubic-bezier(0.4, 0, 0.2, 1)";

function matchesMedia(query: string) {
    return typeof window.matchMedia === "function" && window.matchMedia(query).matches;
}

function readSavedTheme() {
    try {
        return localStorage.getItem(themeStorageKey);
    } catch {
        // Storage can be blocked (private browsing). The device setting decides instead.
        return null;
    }
}

function saveTheme(theme: Theme) {
    try {
        localStorage.setItem(themeStorageKey, theme);
    } catch {
        // Without storage the switch still works; it just isn't remembered on the next visit.
    }
}

// The only place the theme changes. Every other transition is off for that moment (globals.css),
// so the page lands in its final colours in one frame; only the sun, moon and switch knob animate.
function swapTheme(theme: Theme) {
    const root = document.documentElement;
    root.dataset.themeSwapping = "";
    root.dataset.theme = theme;
    // Reading a style applies the new colours while transitions are still off.
    void getComputedStyle(root).color;
    delete root.dataset.themeSwapping;
}

// Desktop only. On phones the menu covers the page while the switch is used, and View
// Transitions snapshots dropped the backdrop blur on iPhone and shifted the sticky header on
// Android.
function canRevealTheme() {
    return (
        typeof document.startViewTransition === "function" &&
        matchesMedia("(hover: hover) and (pointer: fine)") &&
        !matchesMedia("(prefers-reduced-motion: reduce)")
    );
}

// Uncovers the new theme with a circle growing from the pressed button, so every pixel changes
// once instead of fading through grey.
function revealTheme(theme: Theme, origin: HTMLElement) {
    const { left, top, width, height } = origin.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => swapTheme(theme));
    transition.ready
        .then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${radius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: revealDurationMs,
                    easing: revealEasing,
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        })
        .catch(() => {
            // The browser skipped the transition (another switch started, or the tab is hidden).
            // The theme is still applied by swapTheme; there is just nothing to animate.
        });
}

// `<html data-theme>` is the one source of truth: the inline script in the root layout sets it
// before the first paint, and every component reads it from there.
function subscribe(onChange: () => void) {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
}

function getSnapshot(): Theme {
    return parseTheme(document.documentElement.dataset.theme) ?? "light";
}

// The static HTML is rendered light; the inline script corrects it before anything paints.
function getServerSnapshot(): Theme {
    return "light";
}

export default function useTheme() {
    const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    // React's development remount resets the attributes on <html>, dropping the one the inline
    // script set; in production the inline script has normally set the same theme already.
    useLayoutEffect(() => {
        const preferredTheme = resolveTheme(readSavedTheme(), matchesMedia(darkSchemeQuery));
        if (document.documentElement.dataset.theme !== preferredTheme) {
            swapTheme(preferredTheme);
        }
    }, []);

    // Until the visitor picks a theme, follow the device as it switches between light and dark.
    useEffect(() => {
        if (typeof window.matchMedia !== "function") {
            return;
        }

        const mediaQuery = window.matchMedia(darkSchemeQuery);

        function handleSchemeChange() {
            if (!parseTheme(readSavedTheme())) {
                swapTheme(mediaQuery.matches ? "dark" : "light");
            }
        }

        mediaQuery.addEventListener("change", handleSchemeChange);
        return () => mediaQuery.removeEventListener("change", handleSchemeChange);
    }, []);

    // `origin` is the button that was pressed; on desktop the new theme spreads out from it.
    const handleToggleTheme = useCallback((origin?: HTMLElement) => {
        const nextTheme: Theme = getSnapshot() === "dark" ? "light" : "dark";
        saveTheme(nextTheme);

        if (origin && canRevealTheme()) {
            revealTheme(nextTheme, origin);
            return;
        }

        swapTheme(nextTheme);
    }, []);

    return { isDark: theme === "dark", handleToggleTheme };
}
