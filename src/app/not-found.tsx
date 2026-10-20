import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";

export default function NotFound() {
    return (
        <Container className="flex flex-col items-center py-28 text-center sm:py-36">
            <p className="font-serif text-7xl font-semibold text-surface-strong sm:text-8xl">404</p>
            <h1 className="mt-6 text-headline-sm sm:text-headline-md">
                We couldn&apos;t find that page.
            </h1>
            <p className="mt-4 max-w-md text-ink-muted">
                The page may have moved, or the listing is no longer available. Try one of these
                instead.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/" size="lg">
                    Back to home
                </ButtonLink>
                <ButtonLink href="/lists" variant="secondary" size="lg">
                    Browse homes
                </ButtonLink>
            </div>
        </Container>
    );
}
