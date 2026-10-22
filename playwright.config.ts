import { defineConfig, devices } from "@playwright/test";

// Serves the static export in `out/` (clean URLs, like Firebase Hosting) on port 3100, clear of
// a `next dev` server on 3000.
const PORT = 3100;
const HOST = "127.0.0.1";
const baseURL = `http://${HOST}:${PORT}`;

export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: 1,
    reporter: [["list"], ["html", { open: "never" }]],
    timeout: 30_000,
    use: {
        baseURL,
        trace: "off",
        screenshot: "only-on-failure",
        video: "off",
    },
    webServer: {
        command: `npx serve out --listen tcp://${HOST}:${PORT} --no-clipboard`,
        url: baseURL,
        reuseExistingServer: false,
        timeout: 60_000,
        env: {
            NEXT_TELEMETRY_DISABLED: "1",
        },
    },
    projects: [
        {
            name: "desktop",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "mobile",
            use: { ...devices["Pixel 7"] },
        },
    ],
});
