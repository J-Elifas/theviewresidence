import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RevealImage from "@/components/ui/RevealImage";

function renderImage(props: Partial<Parameters<typeof RevealImage>[0]> = {}) {
    render(
        <div className="relative">
            <RevealImage
                src="https://images.unsplash.com/photo-1?w=1200"
                alt="Klabat Type 70"
                sizes="100vw"
                {...props}
            />
        </div>
    );

    return screen.getByRole("img", { name: "Klabat Type 70" });
}

describe("RevealImage", () => {
    it("hides the photo behind a blur while it loads", () => {
        const image = renderImage();

        expect(image.className).toContain("opacity-0");
        expect(image.className).toContain("blur-lg");
    });

    it("sharpens the photo once it loads", async () => {
        const image = renderImage();

        fireEvent.load(image);

        await waitFor(() => expect(image.className).toContain("blur-none"));
        expect(image.className).toContain("opacity-100");
    });

    it("keeps the placeholder when the photo fails to load", () => {
        const image = renderImage();

        fireEvent.error(image);

        expect(image.className).toContain("opacity-0");
        expect(document.querySelector("[data-reveal=error]")).not.toBeNull();
    });

    it("loads lazily by default", () => {
        expect(renderImage().getAttribute("loading")).toBe("lazy");
    });

    it("loads eagerly when the photo is on screen from the start", () => {
        expect(renderImage({ loading: "eager" }).getAttribute("loading")).toBe("eager");
    });
});
