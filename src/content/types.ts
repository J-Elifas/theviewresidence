import type { LucideIcon } from "lucide-react";

export interface NavLink {
    label: string;
    href: "/" | "/lists" | "/about" | "/contact";
}

export interface SocialLink {
    label: string;
    href: string;
    platform: "instagram" | "facebook" | "youtube";
}

export interface ContactChannel {
    label: string;
    value: string;
    href: string | null;
    icon: LucideIcon;
}

export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
}

export interface GalleryImage {
    src: string;
    alt: string;
}

export interface Highlight {
    title: string;
    description: string;
    icon: LucideIcon;
}

export interface EstateStat {
    value: string;
    label: string;
}
