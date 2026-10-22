import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import useTheme from "@/hooks/useTheme";
import { themeStorageKey } from "@/lib/theme";

// jsdom has no matchMedia. `isDesktop` answers the hover and fine-pointer query.
function stubMatchMedia(isDesktop: boolean) {
    vi.stubGlobal("matchMedia", (query: string) => ({
        matches: isDesktop && query.includes("pointer: fine"),
        addEventListener: () => {},
        removeEventListener: () => {},
    }));
}

// jsdom has no View Transitions either. The stub runs the update at once, like a browser does.
function stubViewTransitions() {
    const startViewTransition = vi.fn((update: () => void) => {
        update();
        return { ready: Promise.resolve() };
    });
    const animate = vi.fn();
    Object.defineProperty(document, "startViewTransition", {
        value: startViewTransition,
        configurable: true,
    });
    Object.defineProperty(document.documentElement, "animate", {
        value: animate,
        configurable: true,
    });
    return { animate, startViewTransition };
}

function pressedButton() {
    const button = document.createElement("button");
    button.getBoundingClientRect = () => ({ left: 100, top: 20, width: 40, height: 40 }) as DOMRect;
    return button;
}

describe("useTheme", () => {
    afterEach(() => {
        localStorage.clear();
        delete document.documentElement.dataset.theme;
        Reflect.deleteProperty(document, "startViewTransition");
        Reflect.deleteProperty(document.documentElement, "animate");
        vi.unstubAllGlobals();
    });

    it("reads the theme the inline script applied", async () => {
        localStorage.setItem(themeStorageKey, "dark");
        document.documentElement.dataset.theme = "dark";

        const { result } = renderHook(() => useTheme());

        await waitFor(() => expect(result.current.isDark).toBe(true));
    });

    it("switches in one frame and remembers the choice", async () => {
        const { result } = renderHook(() => useTheme());

        expect(result.current.isDark).toBe(false);

        act(() => result.current.handleToggleTheme());

        expect(document.documentElement.dataset.theme).toBe("dark");
        expect(document.documentElement.dataset.themeSwapping).toBeUndefined();
        expect(localStorage.getItem(themeStorageKey)).toBe("dark");
        await waitFor(() => expect(result.current.isDark).toBe(true));

        act(() => result.current.handleToggleTheme());

        expect(document.documentElement.dataset.theme).toBe("light");
        expect(localStorage.getItem(themeStorageKey)).toBe("light");
        await waitFor(() => expect(result.current.isDark).toBe(false));
    });

    it("reveals the new theme from the pressed button on desktop", async () => {
        stubMatchMedia(true);
        const { animate, startViewTransition } = stubViewTransitions();
        const { result } = renderHook(() => useTheme());

        act(() => result.current.handleToggleTheme(pressedButton()));

        expect(startViewTransition).toHaveBeenCalledTimes(1);
        expect(document.documentElement.dataset.theme).toBe("dark");
        await waitFor(() => expect(animate).toHaveBeenCalledTimes(1));

        const [keyframes, options] = animate.mock.calls[0];
        expect(keyframes.clipPath[0]).toBe("circle(0px at 120px 40px)");
        expect(options.pseudoElement).toBe("::view-transition-new(root)");
    });

    it("switches at once on phones, even where View Transitions exist", () => {
        stubMatchMedia(false);
        const { startViewTransition } = stubViewTransitions();
        const { result } = renderHook(() => useTheme());

        act(() => result.current.handleToggleTheme(pressedButton()));

        expect(startViewTransition).not.toHaveBeenCalled();
        expect(document.documentElement.dataset.theme).toBe("dark");
    });
});
