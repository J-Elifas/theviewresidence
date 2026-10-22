import Link from "next/link";
import type { ReactNode } from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { navLinks } from "@/content/site";
import { cn, isActivePath } from "@/lib/utils";

interface HeaderProps {
    currentPath: string;
    mobileMenuButton: ReactNode;
}

export default function Header({ currentPath, mobileMenuButton }: HeaderProps) {
    return (
        <header className="sticky top-0 z-40 border-b border-line-soft/80 bg-canvas/80 backdrop-blur-xl backdrop-saturate-150">
            <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
                <Link
                    href="/"
                    aria-label="The View Residence Manado, home"
                    className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                    <Logo className="size-6 md:size-6" />
                </Link>

                <nav aria-label="Main" className="hidden md:block">
                    <ul className="flex items-center gap-8 lg:gap-10">
                        {navLinks.map((link) => {
                            const isActive = isActivePath(currentPath, link.href);

                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        aria-current={isActive ? "page" : undefined}
                                        className={cn(
                                            "rounded-sm text-micro transition-all duration-200 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink motion-reduce:transition-none font-semibold",
                                            isActive ? "text-ink" : "text-ink/70"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="flex items-center gap-2">
                    <ButtonLink href="/contact" size="sm" className="hidden px-7 md:inline-flex">
                        Book a visit
                    </ButtonLink>
                    {mobileMenuButton}
                </div>
            </Container>
        </header>
    );
}
