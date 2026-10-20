import { expect, test } from "@playwright/test";

test.describe("site navigation", () => {
    test("desktop header links reach every page", async ({ isMobile, page }) => {
        test.skip(isMobile, "The desktop navigation is hidden on phones.");

        await page.goto("/");
        const nav = page.getByRole("navigation", { name: "Main" });

        await nav.getByRole("link", { name: "Lists" }).click();
        await expect(page).toHaveURL(/\/lists$/);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(
            "Find the home that fits your life."
        );

        await nav.getByRole("link", { name: "About" }).click();
        await expect(page).toHaveURL(/\/about$/);

        await nav.getByRole("link", { name: "Contact" }).click();
        await expect(page).toHaveURL(/\/contact$/);
        await expect(nav.getByRole("link", { name: "Contact" })).toHaveAttribute(
            "aria-current",
            "page"
        );
    });

    test("mobile menu opens, navigates and closes", async ({ isMobile, page }) => {
        test.skip(!isMobile, "The menu button only shows on phones.");

        await page.goto("/");
        await page.getByRole("button", { name: "Open menu" }).click();

        const menu = page.getByRole("dialog", { name: "Menu" });
        await expect(menu).toBeVisible();
        await expect(menu.getByRole("button", { name: "Close menu" })).toBeFocused();

        await menu.getByRole("link", { name: "About" }).click();

        await expect(page).toHaveURL(/\/about$/);
        await expect(menu).toBeHidden();
        await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute(
            "aria-expanded",
            "false"
        );
    });

    test("mobile menu closes on Escape and returns focus", async ({ isMobile, page }) => {
        test.skip(!isMobile, "The menu button only shows on phones.");

        await page.goto("/");
        const menuButton = page.getByRole("button", { name: "Open menu" });
        await menuButton.click();
        await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();

        await page.keyboard.press("Escape");

        await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
        await expect(menuButton).toBeFocused();
    });

    test("the header stays on screen when the menu opens halfway down a page", async ({
        isMobile,
        page,
    }) => {
        test.skip(!isMobile, "The menu button only shows on phones.");

        await page.goto("/");
        await page.evaluate(() => window.scrollTo({ top: 2500, behavior: "instant" }));
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(2000);

        await page.getByRole("button", { name: "Open menu" }).click();
        await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();

        const headerTop = await page.locator("header").evaluate((header) => {
            return header.getBoundingClientRect().top;
        });
        expect(headerTop).toBe(0);
        expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(2000);

        await page.keyboard.press("Escape");
        await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
        expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(2000);
    });

    test("pages fit the screen without horizontal scrolling", async ({ page }) => {
        for (const path of ["/", "/lists", "/about", "/contact"]) {
            await page.goto(path);
            const hasOverflow = await page.evaluate(
                () => document.documentElement.scrollWidth > window.innerWidth
            );
            expect(hasOverflow, `${path} scrolls horizontally`).toBe(false);
        }
    });
});
