import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        agentFeedback: true,
    },
    // Static site: `next build` writes plain HTML, CSS and JS to `out/`, served by Firebase Hosting.
    // Cache Components and Partial Prefetching need a Next.js server, so they stay off here.
    output: "export",
    // Lets phones and tablets on the local network load dev assets (http://192.168.x.x:3000).
    allowedDevOrigins: ["192.168.*.*"],
    images: {
        // There is no image server in a static export, so the loader asks the image host to resize.
        loader: "custom",
        loaderFile: "./src/lib/image-loader.ts",
        // The default list ends at 3840px, which a 2x screen picks for the hero at 1920px wide.
        // 2048px looks the same there at a fraction of the download.
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    },
};

export default nextConfig;
