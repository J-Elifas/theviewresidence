import type { Metadata } from "next";
import { Suspense } from "react";
import ContactDetails from "@/components/contact/ContactDetails";
import Container from "@/components/ui/Container";
import { listPropertyOptions } from "@/server/properties/queries";
import ContactFormController from "./ContactFormController";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Book a visit to the show unit or ask our property advisors about homes, prices and payment plans at The View Residence Manado.",
};

export default async function ContactPage() {
    const propertyOptions = [
        { value: "", label: "Not sure yet" },
        ...(await listPropertyOptions()),
    ];

    return (
        <Container className="pt-12 pb-24 sm:pt-16 lg:pt-20 lg:pb-32">
            <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
                <div>
                    <p className="text-caption font-semibold text-ink-muted">Contact</p>
                    <h1 className="mt-3 text-headline text-balance sm:text-hero-md">
                        Let&apos;s find your home at The View.
                    </h1>
                    <p className="mt-5 max-w-md text-body text-pretty text-ink-muted sm:text-intro">
                        Book a visit to the show unit, ask about payment plans or request a price
                        list. Our advisors are happy to help.
                    </p>
                    <ContactDetails className="mt-10" />
                </div>

                {/* The form reads ?property= to preselect a home, so it renders on the client. */}
                <Suspense
                    fallback={
                        <div className="min-h-[42rem] animate-pulse rounded-[2rem] bg-surface" />
                    }
                >
                    <ContactFormController propertyOptions={propertyOptions} />
                </Suspense>
            </div>
        </Container>
    );
}
