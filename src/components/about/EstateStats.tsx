import Container from "@/components/ui/Container";
import { estateStats } from "@/content/about";

export default function EstateStats() {
    return (
        <section aria-label="The estate in numbers">
            <Container>
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line-soft bg-line-soft lg:grid-cols-4">
                    {estateStats.map((stat) => (
                        <div
                            key={stat.label}
                            className="flex flex-col-reverse bg-canvas p-6 sm:p-8"
                        >
                            <dt className="mt-2 text-caption text-ink-muted">{stat.label}</dt>
                            <dd className="text-headline-sm sm:text-headline-md">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </Container>
        </section>
    );
}
