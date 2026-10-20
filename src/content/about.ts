import {
    Baby,
    Footprints,
    GraduationCap,
    Hospital,
    Plane,
    ShieldCheck,
    ShoppingBag,
    Store,
    Trees,
    Waves,
} from "lucide-react";
import type { EstateStat, GalleryImage, Highlight } from "./types";

// Placeholder estate facts. Confirm every figure with the client before launch.
export const estateStats: EstateStat[] = [
    { value: "12 ha", label: "Master-planned estate" },
    { value: "450", label: "Homes across five clusters" },
    { value: "24/7", label: "Gated, staffed security" },
    { value: "15 min", label: "To Manado city centre" },
];

export const salesHighlight: EstateStat = {
    value: "Rp 85B+",
    label: "in homes handed over to Manado families since our first release.",
};

export const aboutImage: GalleryImage = {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    alt: "Sunlit living room with soft sofas, plants and a gallery wall",
};

export const values: Highlight[] = [
    {
        title: "Designed for the tropics",
        description:
            "High ceilings, deep eaves and cross ventilation keep homes cool and bright all year.",
        icon: Trees,
    },
    {
        title: "Built to last",
        description:
            "Quality materials, careful supervision and a structural warranty on every home.",
        icon: ShieldCheck,
    },
    {
        title: "A real community",
        description:
            "Parks, a clubhouse and safe streets where children can play and neighbours meet.",
        icon: Baby,
    },
];

export const amenities: Highlight[] = [
    {
        title: "24/7 gated security",
        description: "One main gate, CCTV and patrols around the clock.",
        icon: ShieldCheck,
    },
    {
        title: "Clubhouse and pool",
        description: "A residents' clubhouse with a family pool and lounge.",
        icon: Waves,
    },
    {
        title: "Jogging track",
        description: "A shaded loop through the estate's green spine.",
        icon: Footprints,
    },
    {
        title: "Children's playground",
        description: "Safe play areas within walking distance of every cluster.",
        icon: Baby,
    },
    {
        title: "Green open spaces",
        description: "Pocket parks and tree-lined streets in every cluster.",
        icon: Trees,
    },
    {
        title: "Boulevard shops",
        description: "Cafés, a minimarket and daily needs on the main boulevard.",
        icon: Store,
    },
];

export const nearbyPlaces: Highlight[] = [
    { title: "Sam Ratulangi Airport", description: "20 minutes", icon: Plane },
    { title: "Manado city centre", description: "15 minutes", icon: ShoppingBag },
    { title: "Hospitals and clinics", description: "10 minutes", icon: Hospital },
    { title: "Schools and universities", description: "10 minutes", icon: GraduationCap },
];
