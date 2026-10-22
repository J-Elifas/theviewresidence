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

    test("opens the email app with the enquiry ready to send", async ({ page }) => {
        // Record the mailto hand-off instead of launching a real email app.
        await page.addInitScript(() => {
            const originalClick = HTMLAnchorElement.prototype.click;
            HTMLAnchorElement.prototype.click = function (this: HTMLAnchorElement) {
                if (this.href.startsWith("mailto:")) {
                    document.documentElement.dataset.openedMailto = this.href;
                    return;
                }
                originalClick.call(this);
            };
        });
        await page.goto("/contact?property=klabat-type-70");

        await page.getByLabel("Full name").fill("Test Buyer");
        await page.getByLabel("Email").fill("test.buyer@example.com");
        await page
            .getByRole("textbox", { name: /^Message/ })
            .fill("Test enquiry: please send the price list.");
        await page.getByRole("button", { name: "Send message" }).click();

        await expect(
            page.getByRole("status").filter({ hasText: "Opening your email app" })
        ).toBeVisible();
        const href = await page.evaluate(() => document.documentElement.dataset.openedMailto);
        const mailto = new URL(href ?? "");
        expect(mailto.pathname).toBe("hello@theviewresidence.co.id");
        expect(mailto.searchParams.get("subject")).toBe("Enquiry: Klabat Type 70");
        expect(mailto.searchParams.get("body")).toContain("Name: Test Buyer");
        expect(mailto.searchParams.get("body")).toContain(
            "Test enquiry: please send the price list."
        );
        // The form keeps the text in case no email app opens.
        await expect(page.getByLabel("Full name")).toHaveValue("Test Buyer");
    });
});
