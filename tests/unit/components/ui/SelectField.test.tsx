import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SelectField from "@/components/ui/SelectField";

const options = [
    { value: "", label: "All types" },
    { value: "house", label: "House" },
    { value: "villa", label: "Villa" },
];

function renderSelect(props: Partial<Parameters<typeof SelectField>[0]> = {}) {
    const onValueChange = vi.fn();

    render(
        <SelectField
            id="property-type"
            label="Property type"
            options={options}
            value=""
            onValueChange={onValueChange}
            {...props}
        />
    );

    return { onValueChange, trigger: screen.getByRole("combobox", { name: "Property type" }) };
}

function flushFrames() {
    act(() => {
        vi.advanceTimersByTime(50);
    });
}

describe("SelectField", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("shows the selected option's label", () => {
        const { trigger } = renderSelect({ value: "villa" });

        expect(trigger.textContent).toContain("Villa");
    });

    it("opens the list on click and selects an option", () => {
        const { onValueChange, trigger } = renderSelect();

        fireEvent.click(trigger);
        flushFrames();

        expect(trigger.getAttribute("aria-expanded")).toBe("true");

        fireEvent.click(screen.getByRole("option", { name: "Villa" }));

        expect(onValueChange).toHaveBeenCalledWith("villa");
        expect(trigger.getAttribute("aria-expanded")).toBe("false");
    });

    it("supports choosing an option with the keyboard", () => {
        const { onValueChange, trigger } = renderSelect();

        fireEvent.keyDown(trigger, { key: "ArrowDown" });
        flushFrames();
        fireEvent.keyDown(trigger, { key: "ArrowDown" });
        fireEvent.keyDown(trigger, { key: "Enter" });

        expect(onValueChange).toHaveBeenCalledWith("house");
    });

    it("closes on Escape without changing the value", () => {
        const { onValueChange, trigger } = renderSelect();

        fireEvent.click(trigger);
        flushFrames();
        fireEvent.keyDown(trigger, { key: "Escape" });

        expect(trigger.getAttribute("aria-expanded")).toBe("false");
        expect(onValueChange).not.toHaveBeenCalled();
    });

    it("stays closed when disabled", () => {
        const { trigger } = renderSelect({ disabled: true });

        fireEvent.click(trigger);
        flushFrames();

        expect(trigger.getAttribute("aria-expanded")).toBe("false");
        expect(screen.queryByRole("listbox")).toBeNull();
    });
});
