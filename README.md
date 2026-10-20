# The View Residence Manado

Marketing and listings website for **The View Residence**, a gated housing estate in Manado, North Sulawesi. _Quality Living._

Four pages: **Home**, **Lists** (filterable listings with a details modal), **About** and **Contact** (enquiry form).

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript and Tailwind CSS v4. Listings are read on the server from ten dummy records shaped like Firestore documents, ready to switch to Firebase.

- Product spec (pages, design, typography, data plan): [SPEC.md](SPEC.md)
- Code conventions for developers and AI agents: [AGENTS.md](AGENTS.md)

## Getting Started

Requires Node.js 20.9 or newer (developed on Node 24).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To test on a phone, open `http://<your-computer's-LAN-IP>:3000` (for example `http://192.168.0.165:3000`) on the same Wi-Fi network.

## Scripts

| Command                | What it does                                                     |
| ---------------------- | ---------------------------------------------------------------- |
| `npm run dev`          | Start the development server                                     |
| `npm run build`        | Create a production build                                        |
| `npm run start`        | Serve the production build                                       |
| `npm run lint`         | Lint with ESLint                                                 |
| `npm run format`       | Format every file with Prettier                                  |
| `npm run format:check` | Check formatting without writing                                 |
| `npm run test`         | Run unit tests in watch mode                                     |
| `npm run test:run`     | Run unit tests once                                              |
| `npm run e2e`          | Build, then run Playwright end-to-end tests (desktop and mobile) |
| `npm run e2e:report`   | Open the last Playwright report                                  |
| `npx tsc --noEmit`     | Type-check                                                       |

Before the first end-to-end run, install the Playwright browser once:

```bash
npx playwright install chromium
```

## Environment Variables

| Variable               | Required | Description                                                                                        |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No       | Public site URL for metadata, `sitemap.xml` and `robots.txt`. Defaults to `http://localhost:3000`. |

## Project Structure

```txt
src/
  app/          routes, route controllers, the enquiries API route
  components/   ui primitives, layout (header, footer, mobile menu), svg logo, page sections
  hooks/        client hooks (listing filters, status alerts, outside clicks)
  lib/          small helpers (cn, price formatting, scroll to first form error)
  content/      static copy: contact details, team, estate facts, gallery
  server/       listing queries and seed data, enquiry schema and mutation, API helpers
public/         favicon
tests/unit/     Vitest unit and component tests
tests/e2e/      Playwright end-to-end tests
```

## Data And Firebase

- Listings: `src/server/properties/queries.ts` reads `src/server/properties/seed-data.ts` (10 listings) behind a cached, async function. Replacing that read with Firestore is the only change pages need.
- Enquiries: the contact form posts to `/api/enquiries`, which validates the input and logs it. **Enquiries are not stored yet.**
- Plan: Firebase App Hosting for hosting, Firestore for listings and enquiries, Firebase Storage for photos. The roadmap is in [SPEC.md](SPEC.md#data-and-firebase).

## Fonts

The site uses Apple's font stack (`SF Pro Display`, `-apple-system`, `Helvetica Neue`, `Helvetica`, `Arial`). Apple's license doesn't allow hosting SF Pro on a website, so Apple devices show SF Pro natively and Windows or Android show Helvetica or Arial. The logo wordmark uses Cormorant Garamond from Google Fonts.

## Before Launch

Replace the placeholders:

- Photos (Unsplash) in `src/server/properties/seed-data.ts` and `src/content/`.
- Phone, WhatsApp, email, address and social links in `src/content/site.ts`.
- Team members in `src/content/team.ts`, estate figures in `src/content/about.ts`.
- Connect enquiries to Firestore or email so messages are delivered.
