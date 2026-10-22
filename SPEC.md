# The View Residence Product Spec

## Overview

The marketing and listings website for **The View Residence**, a gated housing estate in Manado, North Sulawesi, Indonesia. Tagline: **Quality Living**.

The site is built with Next.js App Router, TypeScript, npm and Tailwind CSS v4, and ships as a **static export** on Firebase Hosting (project `theviewresidence`, https://theviewresidence.web.app). Listings are read through `src/server/properties/queries.ts` at build time, as if from a real database. Today they come from ten seed records shaped like Firestore documents; later they come from Firestore. Pages, components and URLs must not change when the data source does.

Non-goals for now: user accounts, an admin dashboard, payments, multiple languages and dark mode.

## Routing

```txt
src/
  app/
    layout.tsx                    # html, fonts, metadata, header, footer
    page.tsx                      # "/"
    HeroSearchController.tsx
    SiteNavigationController.tsx  # header + mobile navigation state
    globals.css
    not-found.tsx
    error.tsx
    sitemap.ts
    robots.ts
    lists/
      page.tsx                    # "/lists"
      loading.tsx
      ListingsPageController.tsx
    about/
      page.tsx                    # "/about"
    contact/
      page.tsx                    # "/contact"
      ContactFormController.tsx   # validates, then opens the email app (mailto)

  components/
    ui/          # Button, ButtonLink, FieldLabel, InputField, TextInputField, EmailInputField,
                 # PhoneInputField, TextareaField, SelectField, Modal, StatusAlert, Logo,
                 # Container, SectionHeading, button-styles.ts, field-styles.ts
    layout/      # Header, Footer, MobileNavigation, MobileMenuButton, SocialLinks
    svg/         # LogoMark, LogoBadge, social icons, types.ts
    properties/  # PropertyCard, PropertyGrid, PropertyImage, PropertySpecs,
                 # PropertyStatusBadge, PropertyFilterBar, PropertyDetailsModal
    home/        # HeroSection, HeroSearchForm, LatestListingsSection,
                 # FeaturedPropertiesSection, DiscoverSection
    about/       # AboutHero, EstateStats, StorySection, AmenitiesSection, LocationSection
    contact/     # ContactDetails, ContactForm
    team/        # TeamSection

  hooks/
    useOutsidePointerDown.ts
    useStatusAlert.ts
    properties/usePropertyListings.ts

  lib/
    utils.ts                      # cn(), formatPrice(), isActivePath(), buildMailtoHref()
    field-error-scroll.ts
    image-loader.ts               # next/image loader for the static export

  content/                        # static copy: site.ts, team.ts, about.ts, gallery.ts, types.ts

  server/
    properties/                   # queries.ts, seed-data.ts, types.ts, options.ts
    enquiries/                    # schemas.ts, types.ts
```

There are exactly four pages:

- `/` Home: hero with search, latest listings (6), handpicked featured homes (5 plus a stat card), the "Connect, explore, and discover" collage, the team and the footer.
- `/lists` Lists: every listing with filters for property type and price range, a sort order, a bold result count (below the filter bar on desktop, inside the filter card on phones and tablets), an empty state, and a details modal opened with `?property=<id>`.
- `/about` About: the SVG logo badge, estate figures, story and values, amenities, location and the team.
- `/contact` Contact: contact channels and an enquiry form that opens the visitor's email app with the enquiry addressed to `contactEmail` and ready to send. `?property=<id>` preselects a home and fills the email subject.

Listing details open in a modal on `/lists`; there is no fifth page. The estate is only in Manado, so search and filters never ask for a location.

URL parameters shared across pages (names in `listingSearchParams`): `type`, `price`, `sort`, `property`.

## Visual Direction

Clean, modern and calm, in the spirit of apple.com:

- White and `#f5f5f7` surfaces, near-black text and generous whitespace.
- Buttons have 12px corners (`rounded-xl`), not pill shapes: solid near-black for primary actions (Book a visit, Search), white with a light border for secondary ones (Details). Badges on photos (property type, status) stay fully rounded. The hero search bar and the Lists filter bar use `rounded-bar` (22px: the button corner plus the bar padding) so their corners follow the button.
- Large rounded photos. Property and gallery photos zoom in slightly on hover (`scale-[1.04]`, 500ms).
- The home hero on desktop puts the photo in a rounded frame (32px corners) on the right 58% of the page container; its first 30% fades into the white page behind the text, and the "Show unit open daily" card sits inside the frame's bottom-right corner. On phones and tablets the photo fills the whole hero behind the text under a light white wash, and fades into white at the bottom.
- Page content is at most 1920px wide (`max-w-page`). The hero is at most about 1000px tall.
- The header is sticky and translucent: 64px on phones, 80px from tablet width up. Changing pages always opens the new page at the top. On phones the menu opens as a drawer from the right with large links; it closes on Escape, on the backdrop, on swipe right and after choosing a link.
- The footer follows Apple's footer: grey background, 12px links, copyright row (centred on phones). No logo, no watermark text and no tagline.
- Sections removed from the original reference on purpose: the location carousel, the "Building dreams" band, the category carousel, testimonials and the bottom contact banner.

## Typography

- Font stack: `"SF Pro Display", "SF Pro Icons", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif`. SF Pro can't be self-hosted, so Apple devices get it through `-apple-system`; other systems fall back to Helvetica or Arial.
- Cormorant Garamond is used only for the logo wordmark.
- Sizes follow apple.com and are theme tokens in `globals.css`:

| Token                           | Size           | Use                              |
| ------------------------------- | -------------- | -------------------------------- |
| `text-hero` / `text-hero-md`    | 80 / 64px      | Home hero headline               |
| `text-headline` / `-md` / `-sm` | 48 / 40 / 32px | Page and section headings        |
| `text-title`                    | 28px           | Modal titles, mobile menu links  |
| `text-subtitle`                 | 21px           | Card titles                      |
| `text-intro`                    | 21px           | Lead paragraphs                  |
| `text-body`                     | 17px           | Body text, inputs, large buttons |
| `text-caption`                  | 14px           | Labels, small text               |
| `text-micro`                    | 12px           | Header navigation, footer        |

## Brand

The logo is SVG: `LogoBadge` is the full circular emblem (gold ring, faceted gold "V", "THE VIEW RESIDENCE", "MANADO", "Quality Living"), `LogoMark` is the gold V alone. `Logo` shows `LogoBadge` in the header (48px on phones, 64px from tablet width up). The footer has no logo. The About page shows `LogoBadge` on its own, without a background card. The favicon is `public/favicon.svg`.

## Color Palette

| Role               | Token           | Hex                  |
| ------------------ | --------------- | -------------------- |
| Text               | `ink`           | `#1D1D1F`            |
| Secondary text     | `ink-muted`     | `#6E6E73`            |
| Page               | `canvas`        | `#FFFFFF`            |
| Section background | `surface`       | `#F5F5F7`            |
| Borders            | `line`          | `#D2D2D7`            |
| Accent             | `aqua`          | `#DDF0F2`            |
| Text selection     | `aqua-strong`   | `#B7E0E5`            |
| Logo only          | `gold`, `night` | `#C9A24A`, `#0B0B0C` |

Derived tints (`/80`, `/70`) are allowed for overlays, hover states and focus rings.

## Components

Form controls follow the webluma component set:

- A `FieldLabel` above every control, with a red asterisk for required fields.
- Focused fields show a dark border with no coloured glow ring. Autofilled fields stay white.
- `InputField` (wrapped by `TextInputField`, `EmailInputField`, `PhoneInputField`) shows an optional leading icon and divider. Email and phone fields get an icon by default.
- `SelectField` is a custom listbox: keyboard support (arrows, Home, End, Enter, Escape), a check mark on the selected option, an animated panel and a `bare` variant for the hero search and the Lists filter bar.
- `Modal` renders in a portal with enter and exit animation, focus trap, Escape to close, scroll lock and focus return.
- `StatusAlert` shows a toast after a form submission (on Contact: "Opening your email app").
- Forms use react-hook-form with `zodResolver`; the controller owns the form, the component renders `Controller` fields.

## Data, Hosting And Firebase

- Build: `output: "export"` in `next.config.ts`. `next build` prerenders every page, `robots.txt` and `sitemap.xml` into `out/`; there is no server at runtime. Cache Components and Partial Prefetching are off because they need one.
- Hosting: Firebase Hosting, project `theviewresidence` (`.firebaserc`). `firebase.json` builds before every deploy, serves `out/` with clean URLs and caches `/_next/static/**` for a year. Deploy with `npm run deploy`. `NEXT_PUBLIC_SITE_URL` in `.env.production` is the canonical URL.
- Images: `next/image` uses `src/lib/image-loader.ts`, which asks Unsplash for each size through URL parameters, since a static site has no image optimizer.
- Listings: `PropertyRecord` mirrors the planned Firestore `properties` document. Queries return `PropertyRow` with a display `price` (`Rp 1.250.000.000`) and a raw `priceValue`. They run at build time, so a listing change needs a rebuild and redeploy.
- Enquiries: validated with zod in the browser, then handed to the visitor's email app as a `mailto:` link to `contactEmail` with the subject and details filled in. Nothing is stored and the site can't confirm delivery.
- Roadmap to dynamic: move to Firebase App Hosting (Next.js server rendering) and remove `output: "export"`; add `firebase-admin` and `src/server/db/firestore.ts`; replace `readPropertyRecords()` in `queries.ts` with a Firestore read; seed Firestore from `seed-data.ts` with a script; add `createEnquiry()` writing to an `enquiries` collection behind a Route Handler or Server Action; move photos to Firebase Storage and teach the image loader its host; then turn Cache Components back on and revalidate a `properties` tag after listing changes.

## Placeholders To Replace Before Launch

- Unsplash photos in `src/server/properties/seed-data.ts` and `src/content/`.
- Contact details, social links, team members, estate figures and the sales figure in `src/content/`.
- Enquiry storage or server-side email delivery (today the visitor's email app sends it), and the real `contactEmail` in `src/content/site.ts`.

## Line Endings

Use LF line endings. Keep `.gitattributes` configured with:

```txt
* text=auto eol=lf
```

## Acceptance Criteria

- The app uses `src/app`, `src/components`, `src/hooks`, `src/lib`, `src/content` and `src/server` as described above.
- `/`, `/lists`, `/about` and `/contact` build and route correctly; unknown URLs show the not-found page.
- The hero search has only property type and price range and opens `/lists` with those filters.
- Filters, sort and the details modal on `/lists` are reflected in the URL.
- The mobile menu opens, closes and navigates on phones.
- The contact form validates, shows field errors, opens the email app with the enquiry filled in and shows a toast.
- Layouts work at 375px, 768px, 1280px and 1920px without horizontal scrolling.
- `npm run lint`, `npx tsc --noEmit`, `npm run test:run`, `npm run e2e` and `npm run build` pass, and the build output lists every route as static.
