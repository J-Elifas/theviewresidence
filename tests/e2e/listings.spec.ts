import { expect, test } from "@playwright/test";

test.describe("listings", () => {
    test("hero search opens the Lists page with the chosen filters", async ({ page }) => {
        await page.goto("/");

        await page.getByRole("combobox", { name: "Property type" }).click();
        await page.getByRole("option", { name: "Villa" }).click();
        await page.getByRole("button", { name: "Search" }).click();

        await expect(page).toHaveURL(/\/lists\?type=villa$/);
        await expect(page.getByRole("status").filter({ hasText: "found" })).toHaveText(
            "2 homes found"
        );
        await expect(page.getByRole("article")).toHaveCount(2);
    });

    test("the hero price list shows every option below the search card", async ({
        isMobile,
        page,
    }) => {
        // Short screens put the search card at the bottom of the hero: a small phone here, and
        // the 1280 x 720 desktop viewport.
        if (isMobile) {
            await page.setViewportSize({ width: 375, height: 667 });
        }
        await page.goto("/");

        const priceRange = page.getByRole("combobox", { name: "Price range" });
        await priceRange.click();
        await expect(priceRange).toHaveAttribute("aria-expanded", "true");
        const lastOption = page.getByRole("option", { name: "Above Rp 3 billion" });

        // Scroll the page like a finger would (scrollIntoView would also scroll a clipping
        // ancestor), then check the option is really on top at its own position.
        const isOnTop = await lastOption.evaluate(async (option) => {
            const { top } = option.getBoundingClientRect();
            window.scrollBy({ top: top - window.innerHeight / 2, behavior: "instant" });
            await new Promise(requestAnimationFrame);

            const box = option.getBoundingClientRect();
            const hit = document.elementFromPoint(
                box.left + box.width / 2,
                box.top + box.height / 2
            );
            return option.contains(hit);
        });
        expect(isOnTop).toBe(true);

        await lastOption.click();
        await page.getByRole("button", { name: "Search" }).click();
        await expect(page).toHaveURL(/\/lists\?price=above-3b$/);
    });

    test("filters update the results and the URL", async ({ page }) => {
        await page.goto("/lists");

        await page.getByRole("combobox", { name: "Price range" }).click();
        await page.getByRole("option", { name: "Under Rp 1 billion" }).click();

        await expect(page).toHaveURL(/price=under-1b/);
        await expect(page.getByRole("article")).toHaveCount(3);

        await page.getByRole("button", { name: "Clear filters" }).click();

        await expect(page.getByRole("article")).toHaveCount(10);
        await expect(page).not.toHaveURL(/price=/);
    });

    test("a home page listing opens its details without leaving the page", async ({ page }) => {
        await page.goto("/");

        await page.getByRole("link", { name: "Klabat Type 70" }).click();

        const modal = page.getByRole("dialog", { name: "Klabat Type 70" });
        await expect(modal).toBeVisible();
        await expect(page).toHaveURL(/\/$/);

        await page.keyboard.press("Escape");

        await expect(modal).toBeHidden();
        await expect(page).toHaveURL(/\/$/);
    });

    test("returning home after enquiring shows the page without the modal", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("link", { name: "Klabat Type 70" }).click();
        await page.getByRole("link", { name: "Enquire about this home" }).click();
        await expect(page).toHaveURL(/\/contact\?property=klabat-type-70$/);
        await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("");

        await page.goBack();
        await expect(page).toHaveURL(/\/$/);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await expect(page.getByRole("dialog", { name: "Klabat Type 70" })).toBeHidden();
        await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("");

        await page.getByRole("link", { name: "Klabat Type 70" }).click();
        await page.getByRole("link", { name: "Enquire about this home" }).click();
        await expect(page).toHaveURL(/\/contact/);
        await page.getByRole("link", { name: "The View Residence Manado, home" }).click();
        await expect(page).toHaveURL(/\/$/);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await expect(page.getByRole("dialog", { name: "Klabat Type 70" })).toBeHidden();
    });

    test("returning to Lists after enquiring shows the list without the modal", async ({
        page,
    }) => {
        await page.goto("/lists");
        await page.getByRole("link", { name: "Klabat Type 70" }).click();
        await expect(page).toHaveURL(/property=klabat-type-70/);
        await page.getByRole("link", { name: "Enquire about this home" }).click();
        await expect(page).toHaveURL(/\/contact\?property=klabat-type-70$/);

        await page.goBack();
        await expect(page).toHaveURL(/\/lists$/);
        await expect(page.getByRole("article").first()).toBeVisible();
        await expect(page.getByRole("dialog", { name: "Klabat Type 70" })).toBeHidden();
    });

    test("a listing opens its details in a modal", async ({ page }) => {
        await page.goto("/lists");

        await page.getByRole("link", { name: "Klabat Type 70" }).click();

        const modal = page.getByRole("dialog", { name: "Klabat Type 70" });
        await expect(modal).toBeVisible();
        await expect(page).toHaveURL(/property=klabat-type-70/);
        await expect(modal.getByText("Rp 1.250.000.000")).toBeVisible();
        await expect(modal.getByRole("link", { name: "Enquire about this home" })).toHaveAttribute(
            "href",
            "/contact?property=klabat-type-70"
        );

        await page.keyboard.press("Escape");

        await expect(modal).toBeHidden();
        await expect(page).not.toHaveURL(/property=/);
    });
});
