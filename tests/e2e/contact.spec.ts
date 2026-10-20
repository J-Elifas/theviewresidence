import { expect, test } from "@playwright/test";

test.describe("contact form", () => {
    test("shows field errors and focuses the first invalid field", async ({ page }) => {
        await page.goto("/contact");

        await page.getByRole("button", { name: "Send message" }).click();

        await expect(page.getByText("Enter your full name.")).toBeVisible();
        await expect(page.getByText("Enter a valid email address.")).toBeVisible();
        await expect(page.getByLabel("Full name")).toBeFocused();
        await expect(page).toHaveURL(/\/contact$/);
    });

    test("focused fields show a dark border without a glow ring", async ({ page }) => {
        await page.goto("/contact");

        const email = page.getByLabel("Email");
        await email.focus();
        const control = email.locator("..");

        await expect(control).toHaveCSS("border-top-color", "rgb(29, 29, 31)");
        const boxShadow = await control.evaluate((element) => getComputedStyle(element).boxShadow);
        expect(boxShadow).not.toContain("0px 0px 0px 4px");
    });

    test("preselects the home passed in the URL", async ({ page }) => {
        await page.goto("/contact?property=lokon-type-90");

        await expect(page.getByRole("combobox", { name: "Home you're interested in" })).toHaveText(
            "Lokon Type 90"
        );
    });

    test("sends a valid enquiry and confirms it", async ({ page }) => {
        await page.goto("/contact");

        await page.getByLabel("Full name").fill("Test Buyer");
        await page.getByLabel("Email").fill("test.buyer@example.com");
        await page
            .getByRole("textbox", { name: /^Message/ })
            .fill("Test enquiry: please send the price list.");
        await page.getByRole("button", { name: "Send message" }).click();

        await expect(page.getByRole("status").filter({ hasText: "Message sent" })).toBeVisible();
        await expect(page.getByLabel("Full name")).toHaveValue("");
    });
});
