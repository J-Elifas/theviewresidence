import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { teamMembers } from "@/content/team";
import { cn } from "@/lib/utils";

interface TeamSectionProps {
    className?: string;
}

export default function TeamSection({ className }: TeamSectionProps) {
    return (
        <section aria-labelledby="team-title" className={cn("py-20 sm:py-24 lg:py-28", className)}>
            <Container>
                <SectionHeading
                    id="team-title"
                    align="center"
                    title="Meet our property advisors"
                    description="Local experts who will walk you through every step, from your first visit to the day you receive your keys."
                />
                <ul className="mx-auto mt-14 grid max-w-6xl gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {teamMembers.map((member) => (
                        <li key={member.name}>
                            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface-strong">
                                <Image
                                    src={member.imageUrl}
                                    alt={`Portrait of ${member.name}`}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="mt-5 px-1">
                                <h3 className="text-subtitle text-ink">{member.name}</h3>
                                <p className="text-caption text-ink-muted">{member.role}</p>
                                <p className="mt-3 text-caption text-pretty text-ink-muted">
                                    {member.bio}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
