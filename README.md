# The View Residence Manado

Marketing and listings website for **The View Residence**, a gated housing estate in Manado, North Sulawesi. _Quality Living._

Four pages: **Home**, **Lists** (filterable listings with a details modal), **About** and **Contact** (enquiry form).

Live at **https://theviewresidence.web.app** (Firebase Hosting, project `theviewresidence`).

Built with Next.js 16 (App Router, static export), React 19, TypeScript and Tailwind CSS v4. `npm run build` turns the whole site into plain HTML, CSS and JS in `out/`. Listings are read at build time from ten dummy records shaped like Firestore documents, ready to switch to Firebase.

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
| `npm run build`        | Build the static site into `out/`                                |
| `npm run start`        | Serve `out/` locally (after a build)                             |
| `npm run deploy`       | Build, then deploy `out/` to Firebase Hosting                    |
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

`.env.production` (committed, public values only) sets `NEXT_PUBLIC_SITE_URL=https://theviewresidence.web.app` for builds. Change it when a custom domain goes live.

## Deploying

The site is hosted on Firebase Hosting. Install the Firebase CLI and sign in once with an account that can access the `theviewresidence` project:

```bash
npm install -g firebase-tools
```

```bash
firebase login
```

Then deploy:

```bash
npm run deploy
```

`firebase.json` runs `npm run build` before every deploy, uploads `out/`, serves clean URLs (`/lists` rather than `/lists.html`) and caches hashed files in `/_next/static/` for a year. `.firebaserc` points the CLI at the `theviewresidence` project.

## Project Structure

```txt
src/
  app/          routes, route controllers, robots.txt and sitemap.xml
  components/   ui primitives, layout (header, footer, mobile menu), svg logo, page sections
  hooks/        client hooks (listing filters, status alerts, outside clicks)
  lib/          small helpers (cn, price formatting, mailto links, image loader, scroll to first form error)
  content/      static copy: contact details, team, estate facts, gallery
  server/       listing queries and seed data (read at build time), enquiry form schema
public/         favicon
tests/unit/     Vitest unit and component tests
tests/e2e/      Playwright end-to-end tests
```

## Data And Firebase

- Listings: `src/server/properties/queries.ts` reads `src/server/properties/seed-data.ts` (10 listings) through an async function at build time. Changing a listing means rebuilding and redeploying.
- Enquiries: the contact form validates the input, then opens the visitor's email app with a message to `contactEmail` (in `src/content/site.ts`) ready to send. **Nothing is stored on a server.**
- Images: a static site has no image optimizer, so `src/lib/image-loader.ts` asks Unsplash for each size through URL parameters.
- Plan: move to Firebase App Hosting when the site needs a server, then Firestore for listings and enquiries and Firebase Storage for photos. The roadmap is in [SPEC.md](SPEC.md#data-hosting-and-firebase).

## Fonts

The site uses Apple's font stack (`SF Pro Display`, `-apple-system`, `Helvetica Neue`, `Helvetica`, `Arial`). Apple's license doesn't allow hosting SF Pro on a website, so Apple devices show SF Pro natively and Windows or Android show Helvetica or Arial. The logo wordmark uses Cormorant Garamond from Google Fonts.

## Before Launch

Replace the placeholders:

- Photos (Unsplash) in `src/server/properties/seed-data.ts` and `src/content/`.
- Phone, WhatsApp, email (`contactEmail` receives every enquiry), address and social links in `src/content/site.ts`.
- Team members in `src/content/team.ts`, estate figures in `src/content/about.ts`.
- Optionally, store enquiries in Firestore or send them by server email (needs a server; see the roadmap).
