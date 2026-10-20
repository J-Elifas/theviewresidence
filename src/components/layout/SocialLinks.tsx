import FacebookIcon from "@/components/svg/FacebookIcon";
import InstagramIcon from "@/components/svg/InstagramIcon";
import YoutubeIcon from "@/components/svg/YoutubeIcon";
import { socialLinks } from "@/content/site";
import type { SocialLink } from "@/content/types";
import { cn } from "@/lib/utils";

const platformIcons: Record<SocialLink["platform"], typeof InstagramIcon> = {
    instagram: InstagramIcon,
    facebook: FacebookIcon,
    youtube: YoutubeIcon,
};

interface SocialLinksProps {
    className?: string;
}

export default function SocialLinks({ className }: SocialLinksProps) {
    return (
        <ul className={cn("flex items-center gap-2", className)}>
            {socialLinks.map((link) => {
                const Icon = platformIcons[link.platform];

                return (
                    <li key={link.platform}>
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${link.label} (opens in a new tab)`}
                            className="grid size-10 place-items-center rounded-full border border-line-soft bg-canvas text-ink transition-all duration-200 ease-out hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
                        >
                            <Icon className="size-[1.125rem]" />
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
