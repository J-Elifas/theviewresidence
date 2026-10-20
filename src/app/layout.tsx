import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/content/site";
import SiteNavigationController from "./SiteNavigationController";
import "./globals.css";

// Serif used only for the logo wordmark. Everything else uses Apple's system font stack.
const cormorant = Cormorant_Garamond({
    variable: "--font-cormorant",
    subsets: ["latin"],
    weight: ["500", "600"],
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: `${siteConfig.name} Manado | ${siteConfig.tagline}`,
        template: `%s | ${siteConfig.name} Manado`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.svg",
        apple: "/favicon.svg",
    },
    openGraph: {
        type: "website",
        locale: "en_ID",
        siteName: `${siteConfig.name} Manado`,
    },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            data-scroll-behavior="smooth"
            className={`${cormorant.variable} h-full scroll-pt-16 antialiased md:scroll-pt-20 motion-safe:scroll-smooth`}
        >
            <body className="flex min-h-full flex-col">
                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-caption focus:text-white"
                >
                    Skip to content
                </a>
                <SiteNavigationController />
                <main id="main" className="flex-1">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
