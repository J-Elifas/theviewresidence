export const themes = ["light", "dark"] as const;

export type Theme = (typeof themes)[number];

export const themeStorageKey = "theme";

export const darkSchemeQuery = "(prefers-color-scheme: dark)";

export function parseTheme(value: string | null | undefined): Theme | null {
    return themes.find((theme) => theme === value) ?? null;
}

// A saved choice wins; without one, follow the device setting.
export function resolveTheme(savedTheme: string | null, prefersDark: boolean): Theme {
    return parseTheme(savedTheme) ?? (prefersDark ? "dark" : "light");
}

// Runs in <head> while the HTML is parsed, so the page paints in the right theme from the first
// frame. Same rule as resolveTheme. Storage can be blocked (private browsing), hence the try.
export const themeScript = `(function(){var t;try{t=localStorage.getItem("${themeStorageKey}")}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia("${darkSchemeQuery}").matches?"dark":"light";document.documentElement.dataset.theme=t})()`;
