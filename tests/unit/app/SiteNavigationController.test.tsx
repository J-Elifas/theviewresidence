import { act, fireEvent, render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SiteNavigationController from "@/app/SiteNavigationController";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next/link", () => ({
    default: ({
        children,
        href,
        ...props
    }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }) => (
        <a href={href} {...props}>
            {children}
        </a>
    ),
}));

function getDrawer() {
    return document.getElementById("mobile-navigation");
}

function openMenu() {
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    act(() => {
        vi.advanceTimersByTime(50);
    });
}

describe("SiteNavigationController", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        vi.useRealTimers();
    });

    it("keeps the mobile menu closed and unfocusable at first", () => {
        render(<SiteNavigationController />);

        expect(getDrawer()?.hasAttribute("inert")).toBe(true);
        expect(
            screen.getByRole("button", { name: "Open menu" }).getAttribute("aria-expanded")
        ).toBe("false");
    });

    it("opens the menu, moves focus into it and locks page scroll", () => {
        render(<SiteNavigationController />);

        openMenu();

        expect(getDrawer()?.hasAttribute("inert")).toBe(false);
        expect(document.documentElement.style.overflow).toBe("hidden");
        // Locking <body> too would un-stick the header (see SiteNavigationController).
        expect(document.body.style.overflow).toBe("");
        expect(document.activeElement?.getAttribute("aria-label")).toBe("Close menu");
    });

    it("closes on Escape and returns focus to the menu button", () => {
        render(<SiteNavigationController />);
        openMenu();

        fireEvent.keyDown(window, { key: "Escape" });
        act(() => {
            vi.advanceTimersByTime(50);
        });

        const menuButton = screen.getByRole("button", { name: "Open menu" });
        expect(getDrawer()?.hasAttribute("inert")).toBe(true);
        expect(document.documentElement.style.overflow).toBe("");
        expect(document.activeElement).toBe(menuButton);
    });

    it("closes when a link in the menu is chosen", () => {
        render(<SiteNavigationController />);
        openMenu();

        const drawer = getDrawer();
        const listsLink = drawer?.querySelector<HTMLAnchorElement>('a[href="/lists"]');
        fireEvent.click(listsLink!);

        expect(drawer?.hasAttribute("inert")).toBe(true);
    });
});
