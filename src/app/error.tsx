"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";

interface ErrorPageProps {
    error: unknown;
    retry: () => void;
}

export default function ErrorPage({ error, retry }: ErrorPageProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <Container className="flex flex-col items-center py-28 text-center sm:py-36">
            <h1 className="text-headline-sm sm:text-headline-md">Something went wrong.</h1>
            <p className="mt-4 max-w-md text-ink-muted">
                We couldn&apos;t load this page. Please try again in a moment.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button size="lg" onClick={() => retry()}>
                    Try again
                </Button>
                <ButtonLink href="/" variant="secondary" size="lg">
                    Back to home
                </ButtonLink>
            </div>
        </Container>
    );
}
