import { afterEach, describe, expect, it, vi } from "vitest";
import { parseTheme, resolveTheme, themeScript, themeStorageKey } from "@/lib/theme";

function runThemeScript({ prefersDark = false, saved }: { prefersDark?: boolean; saved?: string }) {
    if (saved) {
        localStorage.setItem(themeStorageKey, saved);
    }
    vi.stubGlobal("matchMedia", (query: string) => ({
        matches: prefersDark && query === "(prefers-color-scheme: dark)",
    }));

    new Function(themeScript)();

    return document.documentElement.dataset.theme;
}

describe("parseTheme", () => {
    it("accepts only light and dark", () => {
        expect(parseTheme("dark")).toBe("dark");
        expect(parseTheme("light")).toBe("light");
        expect(parseTheme("sepia")).toBeNull();
        expect(parseTheme(null)).toBeNull();
    });
});

describe("resolveTheme", () => {
    it("prefers a saved choice over the device setting", () => {
        expect(resolveTheme("light", true)).toBe("light");
        expect(resolveTheme("dark", false)).toBe("dark");
    });

    it("follows the device without a valid saved choice", () => {
        expect(resolveTheme(null, true)).toBe("dark");
        expect(resolveTheme("sepia", false)).toBe("light");
    });
});

describe("themeScript", () => {
    afterEach(() => {
        localStorage.clear();
        delete document.documentElement.dataset.theme;
        vi.unstubAllGlobals();
    });

    it("applies the saved theme before React loads", () => {
        expect(runThemeScript({ saved: "dark" })).toBe("dark");
    });

    it("falls back to the device setting, like resolveTheme", () => {
        expect(runThemeScript({ prefersDark: true })).toBe("dark");
        expect(runThemeScript({ prefersDark: false, saved: "sepia" })).toBe("light");
    });
});
