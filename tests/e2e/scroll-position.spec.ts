import { expect, test, type Page } from "@playwright/test";

function getScrollY(page: Page) {
    return page.evaluate(() => window.scrollY);
}

test.describe("scroll position after changing pages", () => {
    test.skip(({ isMobile }) => isMobile, "Uses the desktop header and footer links.");

    for (const [from, to, startScroll] of [
        ["/", "Lists", 0],
        ["/", "About", 0],
        ["/about", "Home", 0],
        ["/lists", "Contact", 40],
        ["/contact", "About", 900],
    ] as const) {
        test(`${from} → ${to} (scrolled ${startScroll}px) opens at the top`, async ({ page }) => {
            await page.goto(from);
            await page.evaluate(
                (top) => window.scrollTo({ top, behavior: "instant" }),
                startScroll
            );

            const nav = page.getByRole("navigation", { name: "Main" });
            await nav.getByRole("link", { name: to }).click();
            await expect(nav.getByRole("link", { name: to })).toHaveAttribute(
                "aria-current",
                "page"
            );

            await page.waitForTimeout(500);
            expect(await getScrollY(page)).toBe(0);
        });
    }

    test("footer links open the page at the top", async ({ page }) => {
        await page.goto("/");
        await page.keyboard.press("End");
        await expect.poll(() => getScrollY(page)).toBeGreaterThan(1000);

        await page
            .getByRole("navigation", { name: "Explore" })
            .getByRole("link", { name: "About" })
            .click();
        await expect(page).toHaveURL(/\/about$/);

        await page.waitForTimeout(500);
        expect(await getScrollY(page)).toBe(0);
    });
});
