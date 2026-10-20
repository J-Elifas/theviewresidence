import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { amenities } from "@/content/about";

export default function AmenitiesSection() {
    return (
        <section aria-labelledby="amenities-title" className="bg-surface py-20 sm:py-24 lg:py-28">
            <Container>
                <SectionHeading
                    id="amenities-title"
                    align="center"
                    title="Everything your family needs, inside the gate"
                    description="Facilities planned for everyday life, so the best parts of your week are a short walk from home."
                />
                <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {amenities.map((amenity) => (
                        <li key={amenity.title} className="rounded-3xl bg-canvas p-7 sm:p-8">
                            <span className="grid size-12 place-items-center rounded-2xl bg-aqua">
                                <amenity.icon
                                    aria-hidden="true"
                                    className="size-5"
                                    strokeWidth={1.75}
                                />
                            </span>
                            <h3 className="mt-6 text-subtitle">{amenity.title}</h3>
                            <p className="mt-2 text-caption text-ink-muted">
                                {amenity.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
