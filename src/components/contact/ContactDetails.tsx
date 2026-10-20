import { contactChannels } from "@/content/site";
import { cn } from "@/lib/utils";

interface ContactDetailsProps {
    className?: string;
}

export default function ContactDetails({ className }: ContactDetailsProps) {
    return (
        <ul
            className={cn(
                "flex flex-col divide-y divide-line-soft border-y border-line-soft",
                className
            )}
        >
            {contactChannels.map((channel) => {
                const isExternal = channel.href?.startsWith("http") ?? false;
                const content = (
                    <>
                        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-surface">
                            <channel.icon
                                aria-hidden="true"
                                className="size-5"
                                strokeWidth={1.75}
                            />
                        </span>
                        <span className="min-w-0">
                            <span className="block text-caption text-ink-muted">
                                {channel.label}
                            </span>
                            <span className="mt-0.5 block font-medium break-words text-ink">
                                {channel.value}
                            </span>
                        </span>
                    </>
                );

                return (
                    <li key={channel.label}>
                        {channel.href ? (
                            <a
                                href={channel.href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className="flex items-center gap-4 rounded-2xl py-5 transition-all duration-200 ease-out hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
                            >
                                {content}
                            </a>
                        ) : (
                            <div className="flex items-center gap-4 py-5">{content}</div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
