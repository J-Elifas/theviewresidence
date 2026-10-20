import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        agentFeedback: true,
    },
    cacheComponents: true,
    partialPrefetching: true,
    // Lets phones and tablets on the local network load dev assets (http://192.168.x.x:3000).
    allowedDevOrigins: ["192.168.*.*"],
    images: {
        // Placeholder photography. Add the Firebase Storage host here when listings move to Firebase.
        remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
    },
};

export default nextConfig;
