import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PropertySpecs from "@/components/properties/PropertySpecs";

const property = { bedrooms: 4, bathrooms: 1, buildingArea: 215, landArea: 320 };

describe("PropertySpecs", () => {
    it("shows the building area as LB and the land area as LT", () => {
        render(<PropertySpecs property={property} />);

        const building = screen.getByText("Building area").closest("li");
        const land = screen.getByText("Land area").closest("li");

        expect(building?.textContent).toBe("LBBuilding area215 m²");
        expect(land?.textContent).toBe("LTLand area320 m²");
    });

    it("hides the LB and LT abbreviations from screen readers", () => {
        render(<PropertySpecs property={property} />);

        for (const abbreviation of ["LB", "LT"]) {
            expect(screen.getByText(abbreviation).getAttribute("aria-hidden")).toBe("true");
        }
    });

    it("lists beds and baths before the areas", () => {
        render(<PropertySpecs property={property} />);

        const items = screen.getAllByRole("listitem").map((item) => item.textContent);

        expect(items).toEqual(["4 beds", "1 bath", "LBBuilding area215 m²", "LTLand area320 m²"]);
    });
});
