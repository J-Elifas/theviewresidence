import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Modal from "@/components/ui/Modal";

interface RenderModalOptions {
    isOpen?: boolean;
    onClose?: () => void;
    onAfterClose?: () => void;
}

function modalElement({ isOpen = true, onAfterClose, onClose = vi.fn() }: RenderModalOptions = {}) {
    return (
        <Modal isOpen={isOpen} title="Klabat Type 70" onClose={onClose} onAfterClose={onAfterClose}>
            <button type="button">Enquire</button>
        </Modal>
    );
}

function flushFrames() {
    act(() => {
        vi.advanceTimersByTime(50);
    });
}

describe("Modal", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        document.body.style.overflow = "";
        vi.useRealTimers();
    });

    it("opens a labelled dialog and locks page scroll", () => {
        render(modalElement());
        flushFrames();

        expect(screen.getByRole("dialog", { name: "Klabat Type 70" })).not.toBeNull();
        expect(document.body.style.overflow).toBe("hidden");
    });

    it("calls onClose when Escape is pressed", () => {
        const onClose = vi.fn();
        render(modalElement({ onClose }));
        flushFrames();

        fireEvent.keyDown(document, { key: "Escape" });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("stays mounted until the exit animation ends, then restores scroll", () => {
        const onAfterClose = vi.fn();
        const { rerender } = render(modalElement({ onAfterClose }));
        flushFrames();

        rerender(modalElement({ isOpen: false, onAfterClose }));

        expect(screen.queryByRole("dialog")).not.toBeNull();
        expect(onAfterClose).not.toHaveBeenCalled();

        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(screen.queryByRole("dialog")).toBeNull();
        expect(onAfterClose).toHaveBeenCalledTimes(1);
        expect(document.body.style.overflow).toBe("");
    });

    it("returns focus to the element that opened it", () => {
        const trigger = document.createElement("button");
        document.body.append(trigger);
        trigger.focus();

        const { rerender } = render(modalElement());
        flushFrames();
        rerender(modalElement({ isOpen: false }));
        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(document.activeElement).toBe(trigger);
        trigger.remove();
    });
});
