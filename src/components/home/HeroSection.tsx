import { Clock } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import { heroImage } from "@/content/gallery";

interface HeroSectionProps {
    searchForm: ReactNode;
}

export default function HeroSection({ searchForm }: HeroSectionProps) {
    return (
        <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
            {/* Phones and tablets: the photo fills the whole hero behind the text.
                Desktop: the photo sits in a rounded frame on the right of the page container,
                its first 30% fading into the page behind the text. */}
            <div className="absolute inset-0 -z-20 lg:mx-auto lg:max-w-page lg:px-10 lg:pt-4 lg:pb-10 2xl:px-16">
                <div className="relative size-full overflow-hidden lg:ml-auto lg:w-[58%] lg:rounded-[2rem]">
                    {/* The photo itself fades out (a mask, not a white overlay) so no edge of
                        the rounded frame shows through on the left. */}
                    <Image
                        src={heroImage.src}
                        alt={heroImage.alt}
                        fill
                        loading="eager"
                        fetchPriority="high"
                        sizes="(min-width: 1920px) 1040px, (min-width: 1024px) 58vw, 100vw"
                        className="object-cover object-[70%_center] lg:object-center lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]"
                    />
                    <div className="absolute right-6 bottom-6 hidden items-center gap-3 rounded-2xl bg-canvas/85 p-3 pr-5 shadow-lg backdrop-blur-xl lg:flex">
                        <span className="grid size-10 place-items-center rounded-xl bg-aqua">
                            <Clock aria-hidden="true" className="size-5" strokeWidth={1.75} />
                        </span>
                        <div>
                            <p className="text-caption font-semibold text-ink">
                                Show unit open daily
                            </p>
                            <p className="text-micro text-ink-muted">09.00 – 17.00 WITA</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phones and tablets: a light wash keeps the dark text readable over the photo. */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-linear-to-b from-canvas/80 via-canvas/55 via-50% to-canvas/15 lg:hidden"
            />
            <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-canvas to-canvas/0 lg:hidden"
            />

            <Container className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-12 sm:py-14 md:min-h-[calc(100svh-5rem)] lg:min-h-[min(calc(100svh-5rem),62rem)] lg:py-20">
                <div className="max-w-2xl">
                    <h1
                        id="hero-title"
                        className="mt-6 text-headline text-balance text-ink sm:text-hero-md xl:text-hero"
                    >
                        Your dream home, with a view to match.
                    </h1>
                    {/* Near-black over the photo on phones and tablets; grey on the white desktop layout. */}
                    <p className="mt-6 max-w-xl text-body text-pretty text-ink sm:text-intro lg:text-ink-muted">
                        Modern houses, townhouses and villas in a secure, green community, minutes
                        from the city and the sea.
                    </p>
                    <div className="mt-10 max-w-xl">{searchForm}</div>
                </div>
            </Container>
        </section>
    );
}
