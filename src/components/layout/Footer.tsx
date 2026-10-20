import { cacheLife } from "next/cache";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { contactChannels, navLinks, siteConfig } from "@/content/site";
import SocialLinks from "./SocialLinks";

async function CurrentYear() {
    "use cache";
    cacheLife("days");

    return new Date().getFullYear();
}

const footerLinkClasses =
    "rounded-sm text-micro text-ink-muted transition-all duration-200 ease-out hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none";

export default function Footer() {
    return (
        <footer className="border-t border-line-soft bg-surface">
            <Container className="grid gap-12 py-14 lg:grid-cols-[1.3fr_1fr_1.6fr] lg:gap-16 lg:py-16">
                <div className="max-w-sm">
                    <h2 className="text-micro font-semibold text-ink">
                        {siteConfig.name} {siteConfig.city}
                    </h2>
                    <p className="mt-3 text-micro text-ink-muted">{siteConfig.description}</p>
                    <SocialLinks className="mt-5" />
                </div>

                <nav aria-labelledby="footer-explore">
                    <h2 id="footer-explore" className="text-micro font-semibold text-ink">
                        Explore
                    </h2>
                    <ul className="mt-3 flex flex-col gap-2.5 text-micro">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className={footerLinkClasses}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    <h2 className="text-micro font-semibold text-ink">Get in touch</h2>
                    <dl className="mt-3 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                        {contactChannels.map((channel) => (
                            <div key={channel.label}>
                                <dt className="text-micro text-ink-muted">{channel.label}</dt>
                                <dd className="mt-0.5 text-micro text-ink">
                                    {channel.href ? (
                                        <a href={channel.href} className={footerLinkClasses}>
                                            {channel.value}
                                        </a>
                                    ) : (
                                        channel.value
                                    )}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </Container>

            <Container>
                <div className="flex flex-col items-center gap-2 border-t border-line py-5 text-center text-micro text-ink-muted sm:flex-row sm:justify-between sm:text-left">
                    <p>
                        Copyright © <CurrentYear /> {siteConfig.name} {siteConfig.city}. All rights
                        reserved.
                    </p>
                    <p>Manado, North Sulawesi, Indonesia</p>
                </div>
            </Container>
        </footer>
    );
}
