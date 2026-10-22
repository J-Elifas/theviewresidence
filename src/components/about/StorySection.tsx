import Container from "@/components/ui/Container";
import RevealImage from "@/components/ui/RevealImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutImage, values } from "@/content/about";

export default function StorySection() {
    return (
        <section aria-labelledby="story-title" className="py-20 sm:py-24 lg:py-28">
            <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-surface lg:aspect-[4/5]">
                    {/* At 1920px: (1920 - 2 × 64px padding - 80px gap) / 2 = 856px. */}
                    <RevealImage
                        src={aboutImage.src}
                        alt={aboutImage.alt}
                        sizes="(min-width: 1920px) 856px, (min-width: 1024px) 50vw, 100vw"
                    />
                </div>

                <div>
                    <SectionHeading
                        id="story-title"
                        eyebrow="Our story"
                        title="Homes made for the way Manado families live."
                        description="We started with a simple idea: a home should feel calm the moment you arrive. So we planned wide streets, generous gardens and homes that stay cool in the tropical heat, all inside one secure gate."
                    />
                    <ul className="mt-10 flex flex-col gap-6">
                        {values.map((value) => (
                            <li key={value.title} className="flex gap-4">
                                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-aqua">
                                    <value.icon
                                        aria-hidden="true"
                                        className="size-5"
                                        strokeWidth={1.75}
                                    />
                                </span>
                                <div>
                                    <h3 className="font-semibold tracking-tight">{value.title}</h3>
                                    <p className="mt-1 text-caption text-ink-muted">
                                        {value.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </section>
    );
}
