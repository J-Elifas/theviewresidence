import { ArrowUpRight, MapPin } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { nearbyPlaces } from "@/content/about";
import { contactLinks } from "@/content/site";

export default function LocationSection() {
    return (
        <section aria-labelledby="location-title" className="py-20 sm:py-24 lg:py-28">
            <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
                <div>
                    <SectionHeading
                        id="location-title"
                        eyebrow="Location"
                        title="Minutes from what matters."
                        description="A quiet hillside setting with quick access to the airport, the city centre and Manado's waterfront."
                    />
                    <ul className="mt-10 divide-y divide-line-soft border-y border-line-soft">
                        {nearbyPlaces.map((place) => (
                            <li key={place.title} className="flex items-center gap-4 py-4">
                                <place.icon
                                    aria-hidden="true"
                                    className="size-5 text-ink-muted"
                                    strokeWidth={1.75}
                                />
                                <span className="flex-1 font-medium">{place.title}</span>
                                <span className="text-caption text-ink-muted">
                                    {place.description}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col justify-between gap-12 rounded-[2rem] bg-aqua p-8 sm:p-10">
                    <span className="grid size-14 place-items-center rounded-full bg-canvas">
                        <MapPin aria-hidden="true" className="size-6" strokeWidth={1.75} />
                    </span>
                    <div>
                        <h3 className="text-subtitle sm:text-title">Visit the show unit</h3>
                        <p className="mt-3 text-pretty text-ink-muted">
                            Walk through a finished home, see the view for yourself and meet our
                            team. Open daily from 09.00 to 17.00 WITA.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <ButtonLink href="/contact" size="lg">
                            Book a visit
                        </ButtonLink>
                        <a
                            href={contactLinks.directions}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center gap-2 rounded-xl bg-canvas px-6 text-[0.9375rem] font-medium text-ink transition-all duration-200 ease-out hover:bg-canvas/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
                        >
                            Get directions
                            <ArrowUpRight aria-hidden="true" className="size-4" />
                            <span className="sr-only">(opens Google Maps in a new tab)</span>
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}
