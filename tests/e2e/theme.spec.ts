import { expect, test } from "@playwright/test";

test.describe("dark mode", () => {
    test("the menu switch changes theme without moving the links", async ({ isMobile, page }) => {
        test.skip(!isMobile, "The theme switch is in the mobile menu.");

        // Reduced motion opens the drawer at once, so positions can be compared straight away.
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto("/");
        await page.getByRole("button", { name: "Open menu" }).click();

        const menu = page.getByRole("dialog", { name: "Menu" });
        const themeSwitch = menu.getByRole("switch", { name: "Dark mode" });
        const linkPositions = () =>
            menu
                .getByRole("link")
                .evaluateAll((links) => links.map((link) => link.getBoundingClientRect().left));

        const lightPositions = await linkPositions();
        await themeSwitch.click();

        await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
        await expect(themeSwitch).toHaveAttribute("aria-checked", "true");
        expect(await linkPositions()).toEqual(lightPositions);
    });

    test("the header toggle remembers the choice", async ({ isMobile, page }) => {
        test.skip(isMobile, "The header toggle shows from tablet width up.");

        await page.goto("/");
        const toggle = page.getByRole("button", { name: "Dark mode" });
        await expect(toggle).toHaveAttribute("aria-pressed", "false");

        await toggle.click();
        await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

        await page.goto("/lists");
        await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
        await expect(page.getByRole("button", { name: "Dark mode" })).toHaveAttribute(
            "aria-pressed",
            "true"
        );
    });
});
