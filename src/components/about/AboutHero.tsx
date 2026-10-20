import LogoBadge from "@/components/svg/LogoBadge";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";

export default function AboutHero() {
    return (
        <section aria-labelledby="about-title">
            <Container className="grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-2 lg:gap-20 lg:pt-20 lg:pb-24">
                <div>
                    <p className="text-caption font-semibold text-ink-muted">About us</p>
                    <h1
                        id="about-title"
                        className="mt-3 text-headline text-balance sm:text-hero-md"
                    >
                        Quality living, designed around the view.
                    </h1>
                    <p className="mt-6 text-body text-pretty text-ink-muted sm:text-intro">
                        The View Residence is a gated community in Manado, planned from the ground
                        up for families who want room to breathe. Every street, park and floor plan
                        is shaped around light, greenery and the view across the bay.
                    </p>
                    <p className="mt-4 text-body text-pretty text-ink-muted sm:text-intro">
                        From compact starter homes to signature villas, we build with care, hand
                        over on time and stay close to our residents long after they move in.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-3">
                        <ButtonLink href="/lists" size="lg">
                            Explore homes
                        </ButtonLink>
                        <ButtonLink href="/contact" variant="secondary" size="lg">
                            Book a visit
                        </ButtonLink>
                    </div>
                </div>

                <div className="grid place-items-center">
                    <LogoBadge className="w-full max-w-72 drop-shadow-2xl sm:max-w-sm md:max-w-md" />
                </div>
            </Container>
        </section>
    );
}
