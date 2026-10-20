import type { MetadataRoute } from "next";
import { navLinks, siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
    return navLinks.map((link) => ({
        url: new URL(link.href, siteConfig.url).toString(),
        changeFrequency: link.href === "/lists" ? "weekly" : "monthly",
        priority: link.href === "/" ? 1 : 0.8,
    }));
}
