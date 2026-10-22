"use client";

import { themeScript } from "@/lib/theme";

// Server-rendered as a script that runs while the HTML is parsed, before the first paint. In the
// browser React renders it as text/plain, since it can't run scripts it renders and warns if
// asked to; suppressHydrationWarning accepts the different type.
export default function ThemeScript() {
    return (
        <script
            type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: themeScript }}
        />
    );
}
