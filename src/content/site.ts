import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ContactChannel, NavLink, SocialLink } from "./types";

export const siteConfig = {
    name: "The View Residence",
    city: "Manado",
    tagline: "Quality Living",
    description:
        "Modern homes, townhouses and villas in a secure, green community in Manado, North Sulawesi.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Lists", href: "/lists" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

// Placeholder contact details and social accounts. Replace with the client's real ones before launch.
export const contactLinks = {
    phone: "tel:+624310000000",
    whatsApp: "https://wa.me/6281100000000",
    email: "mailto:hello@theviewresidence.co.id",
    directions: "https://www.google.com/maps/search/?api=1&query=Manado%2C%20North%20Sulawesi",
};

export const contactChannels: ContactChannel[] = [
    {
        label: "Marketing gallery",
        value: "The View Residence, Manado, North Sulawesi",
        href: contactLinks.directions,
        icon: MapPin,
    },
    { label: "Phone", value: "+62 431 000 0000", href: contactLinks.phone, icon: Phone },
    {
        label: "WhatsApp",
        value: "+62 811 0000 0000",
        href: contactLinks.whatsApp,
        icon: MessageCircle,
    },
    { label: "Email", value: "hello@theviewresidence.co.id", href: contactLinks.email, icon: Mail },
    { label: "Opening hours", value: "Daily, 09.00 – 17.00 WITA", href: null, icon: Clock },
];

export const socialLinks: SocialLink[] = [
    { label: "Instagram", href: "https://www.instagram.com/", platform: "instagram" },
    { label: "Facebook", href: "https://www.facebook.com/", platform: "facebook" },
    { label: "YouTube", href: "https://www.youtube.com/", platform: "youtube" },
];
