<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository Guidelines

## Scope

- This file is repo-wide guidance for every agent session: how code is structured, named, styled, tested and verified.
- `SPEC.md` is the source of truth for the product: goals, pages, routes, visual direction, typography, palette, components, data plan and acceptance criteria. Validate product-facing changes against it and update it when routes or requirements change.
- `README.md` holds setup steps for humans. Update it when commands or environment variables change.

## Product Direction

- The View Residence Manado: a four-page marketing and listings site (Home, Lists, About, Contact) with an apple.com look and feel. See `SPEC.md`.
- The site is a static export (`output: "export"`) on Firebase Hosting, project `theviewresidence` (https://theviewresidence.web.app). Listings are read from seed data in `src/server/` at build time; the contact form opens the visitor's email app. Firestore (and a server host such as Firebase App Hosting) come later, so keep pages and components independent of the data source.
- Don't add pages, routes, auth, an admin area or new services unless `SPEC.md` is updated first.

## Before Writing Code

1. Read `package.json` and `SPEC.md`.
2. Read the guide in `node_modules/next/dist/docs/` for any Next.js API you touch. This project runs Next.js 16 as a static export, so check each guide's "static exports" notes too. Examples of differences from older versions: `error.tsx` receives `retry()`, `next/image` uses `loading="eager"` / `fetchPriority` instead of `priority`, and `params` / `searchParams` are Promises.
3. Find an existing file of the same kind (page, controller, component, hook, server module, test) and match its structure, naming and style.
4. Build only what the task needs.

## Project Structure

Next.js App Router, React 19, TypeScript (`strict`), Tailwind CSS v4 through PostCSS (`postcss.config.mjs`). Path alias `@/*` maps to `./src/*`; import across folders with `@/` and use `./` only inside the same folder.

- `src/app/`: routes, layouts, loading and error UI, route controllers (`<Purpose>Controller.tsx`) and metadata routes (`robots.ts`, `sitemap.ts`).
- `src/components/`: presentational components grouped by purpose: `ui/` (primitives), `layout/` (Header, Footer, mobile navigation), `svg/` (logo and icons), and feature folders (`properties/`, `home/`, `about/`, `contact/`, `team/`).
- `src/hooks/`: client hooks. Shared hooks at the top level, feature hooks in `src/hooks/<feature>/`.
- `src/lib/`: framework-light helpers (`utils.ts`, `field-error-scroll.ts`, `image-loader.ts`).
- `src/content/`: typed static copy and placeholder media.
- `src/server/`: server-only code and client-safe contracts, one folder per feature, plus `db/` once a database client exists.
- `public/`: static files served from `/` (`favicon.svg`).
- `tests/unit/` (Vitest, mirrors `src/`) and `tests/e2e/` (Playwright, one spec per user flow).
- Root config: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `.prettierrc`, `vitest.config.mts`, `playwright.config.ts`, `firebase.json`, `.firebaserc`, `.env.production`.

Create a folder when its first file needs it, not in advance.

## Layer Rules

- **Pages and layouts** stay Server Components. They load data from `src/server/<feature>/queries.ts` at build time and pass serializable props down.
- **Controllers** (`"use client"`, beside their route) own state, effects, handlers, forms, validation wiring, `fetch` calls, router actions and status alerts. They render components and pass data and callbacks as props.
- **`src/components/`** is presentational only: props in, markup out. UI-only state and effects are fine (menu or listbox open state, animation presence, focus management, swipe gestures). No data fetching, routing decisions, form submission or validation rules.
- **Hooks** never import queries, mutations or database modules. Keep pure work (filtering, sorting, parsing) in exported functions above the hook so it can be unit tested.
- **`src/lib/`**: no React components, no hooks, no server-only imports, no side effects at import time.
- **`src/server/<feature>/`**: `queries.ts` (reads, and `mutations.ts` for writes once the site has a server) start with `import "server-only";`. `types.ts`, `options.ts` and `schemas.ts` are the feature's client-safe contract and never import the database, environment variables or `server-only`.
- A Server Component may render a client component only with serializable props. When a shared component can render on the server, pass event handlers only when they exist (see `PropertyFilterBar`).

| File                                         | May import                                                                          | Must not import                                |
| -------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- |
| `app/**/page.tsx`, `layout.tsx`, `robots.ts` | `server/*`, `components/*`, `lib/*`, `content/*`                                    | hooks                                          |
| `app/**/*Controller.tsx`                     | `components/*`, `hooks/*`, `lib/*`, `server/<feature>/types`, `options`, `schemas`  | `server/*/queries`, `mutations`, `db/*`        |
| `components/*`                               | `components/*`, `lib/*`, `content/*`, UI hooks, `server/<feature>/types`, `options` | feature hooks, `server/*/queries`, `mutations` |
| `hooks/*`                                    | `hooks/*`, `lib/*`, `server/<feature>/types`, `options`, `schemas`                  | `server/*/queries`, `mutations`, `db/*`        |
| `lib/*`                                      | `lib/*`                                                                             | `app/*`, `components/*`, `hooks/*`, `server/*` |
| `server/*`                                   | `server/*`, `lib/*`                                                                 | `app/*`, `components/*`, `hooks/*`             |

## Static Export And Data

- `next build` writes the whole site to `out/` as HTML, CSS and JS. Every route must prerender (`○` in the build output). There is no server at runtime, so don't add Server Actions, POST Route Handlers, `cookies()` / `headers()`, `connection()`, middleware, rewrites or redirects in `next.config.ts`, or `dynamicParams`.
- Cache Components and Partial Prefetching stay off: both need a server. Don't use `"use cache"`, `cacheLife()`, `cacheTag()` or `revalidate*()`.
- Metadata routes (`robots.ts`, `sitemap.ts`) need `export const dynamic = "force-static";`.
- Server-side values such as `new Date()` in `Footer.tsx` are fixed at build time. Redeploy to refresh them.
- `next/image` uses the custom loader in `src/lib/image-loader.ts`, which asks the image host to resize (Unsplash URL parameters). A new remote image host needs a branch there; local images in `public/` are served as is.
- Client components that call `useSearchParams()` render inside `<Suspense>`. On `/lists` the fallback is the full prerendered grid so listings stay in the HTML.
- Filter and modal state on `/lists` lives in the URL. Use the names in `listingSearchParams` and update them with `window.history.replaceState`, which keeps `useSearchParams` in sync without a server round trip.
- Queries return plain serializable objects shaped for the UI. Pair display and raw values: `price` and `priceValue`. Format on the server.
- Enquiries: `ContactFormController` validates with `enquiryFormSchema`, then opens a `mailto:` link to `contactEmail` (from `src/content/site.ts`) built by `buildMailtoHref()`. Don't show a "sent" message: the visitor still sends it from their email app.
- Going dynamic later: move hosting to a Next.js server (Firebase App Hosting), drop `output: "export"`, then add Firestore reads in `queries.ts`, writes in `mutations.ts` behind a Route Handler or Server Action, and database clients in `src/server/db/` (created once, cached on `globalThis` in development, throwing a clear error when a credential is missing). Update `SPEC.md` first.

## Coding Standards

- Simple, readable code. No abstractions, wrappers or constants for one-off values. Early returns over nested conditionals.
- TypeScript everywhere. No `any`; narrow `unknown`. `interface` for props and object shapes, `type` for unions. Derive types from option lists (`(typeof propertyTypes)[number]`). Use `import type` for type-only imports.
- React 19: pass `ref` as a prop; don't add `forwardRef`.
- Handle errors at boundaries with `try` / `catch` and show a generic message. Never swallow an error silently.
- Use platform APIs (`Intl.NumberFormat`, `URL`, `URLSearchParams`) and create formatters once at module level.
- Comments explain why, not what. Delete dead code.

## Naming Conventions

| Item                      | Convention                                                       | Example                                                                   |
| ------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Component file and export | PascalCase; file name equals the default export                  | `PropertyCard.tsx` exports `PropertyCard`                                 |
| Feature modal             | `<Purpose>Modal.tsx` wrapping `ui/Modal`                         | `PropertyDetailsModal.tsx`                                                |
| Route controller          | `<Purpose>Controller.tsx` beside its route                       | `ListingsPageController.tsx`, `SiteNavigationController.tsx`              |
| Page and layout functions | `<Name>Page`, `<Name>Layout`                                     | `ListsPage`, `RootLayout`                                                 |
| URL segment folders       | kebab-case                                                       | `lists/`, `contact/`                                                      |
| Hook file and export      | `use<Purpose>`, `.ts` unless it renders JSX                      | `useStatusAlert.ts`, `hooks/properties/usePropertyListings.ts`            |
| Server feature modules    | Fixed names                                                      | `queries.ts`, `mutations.ts`, `types.ts`, `options.ts`, `schemas.ts`      |
| Other non-component files | kebab-case file, camelCase exports                               | `lib/field-error-scroll.ts`, `ui/field-styles.ts`                         |
| Types                     | PascalCase with a role suffix, no `I`/`T` prefix                 | `PropertyRow`, `EnquiryFormValues`, `SelectFieldProps`                    |
| Constants                 | camelCase, `as const` for fixed lists                            | `propertyTypes`, `listingSearchParams`                                    |
| Booleans                  | `is`, `has`, `can`, `should`, `show`                             | `isFeatured`, `hasActiveFilters`                                          |
| Event props and handlers  | prop `on<Event>`, implementation `handle<Event>`                 | `onOpenDetails={handleOpenDetails}`                                       |
| Queries / mutations       | `get`, `list`, `find` + noun / verb + noun                       | `listProperties`, `getHomePageData`, later `createEnquiry`                |
| Theme tokens              | kebab-case CSS variable mapped in `@theme`                       | `--color-ink-muted` becomes `text-ink-muted`                              |
| HTML `id`                 | kebab-case, unique on the page                                   | `enquiry-email`, `enquiry-email-error`                                    |
| Tests                     | `<SourceFile>.test.ts(x)` mirroring `src/`; e2e `<flow>.spec.ts` | `tests/unit/components/ui/Modal.test.tsx`, `tests/e2e/navigation.spec.ts` |

- Default exports for components, hooks and Next.js route files; named exports for everything else.
- No barrel files. Import from the file that defines the thing.

## Components And Styling

- Server Components by default. Add `"use client"` only where state, effects, refs or browser APIs are needed, and push it as low as possible.
- Declare `<Component>Props` above the component, destructure props with defaults in the signature, and merge an optional `className` last with `cn()`.
- Map variants and sizes with typed records (`Record<ButtonVariant, string>`). Render conditionally with `condition ? <Thing /> : null`.
- Reuse `components/ui/` before creating anything new:
    - Buttons: `Button` and `ButtonLink` share `button-styles.ts` (variants `primary`, `secondary`, `ghost`; sizes `xs` to `lg` plus `icon-*`; `leftIcon` / `rightIcon`). Buttons use 12px corners (`rounded-xl`); keep `rounded-full` for badges, icon circles and social links only. A link or span styled as a button (the card "Details", "Get directions") follows the same corners. Bars that hold buttons or selects (hero search, Lists filters) use `rounded-bar`; register any new radius token in `cn()` like the type scale.
    - Fields: `FieldLabel`, `InputField` (and `TextInputField`, `EmailInputField`, `PhoneInputField`), `TextareaField` and `SelectField` share `field-styles.ts`. Never use a native `<select>`; use `SelectField` (`variant="bare"` inside search and filter bars). Focus shows as a dark border only: don't add glow rings (`ring-*`) to fields.
    - Overlays and feedback: `Modal`, `StatusAlert` with `useStatusAlert`.
- Use theme tokens (`bg-surface`, `text-ink-muted`, `bg-aqua`), never raw hex in class names.
- Typography uses the Apple scale tokens from `globals.css` (`text-hero`, `text-headline`, `text-title`, `text-subtitle`, `text-intro`, `text-body`, `text-caption`, `text-micro`), not Tailwind's default `text-sm` / `text-lg`. A new size token must also be added to `extendTailwindMerge` in `src/lib/utils.ts`, or `cn()` will drop it next to a color class.
- Wrap page content in `Container` (max 1920px). The home hero uses the same width, so its text, photo frame and "Show unit" card line up with the header and the listing cards.
- Write complete, static class strings. Never build class names at runtime.
- Mobile first. Check every layout at 375px, 768px, 1280px and 1920px with no horizontal scroll.
- **Every CSS transition uses `transition-all`** with a duration and easing (`transition-all duration-200 ease-out`) plus `motion-reduce:transition-none`. Animate opacity, translate, scale, color and shadow, not width, height or position. Photos zoom with `group-hover:scale-[1.04]` over 500ms.
- Fixed overlays (drawers, modals, toasts) render outside the sticky header or in a portal: an ancestor with `backdrop-filter` turns `position: fixed` into positioning relative to that ancestor.
- `scroll-padding-top` on `<html>` must equal the sticky header height (`scroll-pt-16 md:scroll-pt-20` for a 64px / 80px header). If it is larger, Next.js treats the top of the new page as off-screen after navigation and scrolls partway down it. Give scroll targets extra room with `scroll-mt-*` instead (see `FieldLabel`), and update both values together if the header height changes.
- Photos use `ui/RevealImage` (`next/image` with `fill`, a shimmer placeholder and a blur-in reveal) with accurate `sizes` and meaningful `alt`. The home hero is a plain `next/image` with `loading="eager"` and `fetchPriority="high"`, so the page's main image (LCP) isn't held back by the reveal. Everything else is lazy, except photos on screen as they appear: the first row on `/lists` and the details modal use `loading="eager"`.
- Icons come from lucide-react or `components/svg/`. Decorative icons get `aria-hidden="true"`; icon-only buttons get an `aria-label`.

## Forms

- The controller owns the form with react-hook-form: `useForm` with `zodResolver(schema)`, default values and submit handlers. The form component renders `Controller` fields and receives `control`, `errors`, `isSubmitting` and `onSubmit`.
- Keep schemas in `src/server/<feature>/schemas.ts`: a form schema (all strings, empty optional fields allowed). Add an API schema beside it when a server endpoint exists.
- On an invalid submit, call `scrollToFirstFieldError()` with the field order and ids. Report the result with `StatusAlert`. The contact form keeps its values after opening the email app, in case no app opens.
- Every field has a visible label, a unique kebab-case `id`, a `name`, the right `type`, `autoComplete` and `inputMode`. Errors are short and actionable; request errors stay generic.

## UI/UX Standards

- Match the existing visual language in `SPEC.md` before introducing new patterns.
- Semantic HTML: one `<h1>` per page; `header`, `nav`, `main` and `footer` landmarks; `<button>` for actions; `<Link>` for navigation.
- Keyboard: every control is reachable, focus is always visible, overlays trap focus, close on Escape and return focus to their trigger. Never use a positive `tabIndex`.
- Handle loading, empty, error, disabled, hover, focus and active states.
- Keep copy concise and in sentence case.

## Commands

| Script                    | Runs                                        |
| ------------------------- | ------------------------------------------- |
| `dev`                     | `next dev`                                  |
| `build` / `start`         | `next build` (writes `out/`) / `serve out`  |
| `lint`                    | `eslint`                                    |
| `format` / `format:check` | `prettier --write .` / `prettier --check .` |
| `test` / `test:run`       | `vitest` / `vitest run`                     |
| `e2e`                     | `npm run build && playwright test`          |
| `deploy`                  | `firebase deploy --only hosting`            |

Type-check with `npx tsc --noEmit`. Use npm (the repo has `package-lock.json`). Playwright serves `out/` with `serve` on port 3100 (clean URLs, like Firebase Hosting), so it doesn't clash with `next dev` on 3000. `allowedDevOrigins` in `next.config.ts` lets phones on the local network (`192.168.x.x`) use the dev server.

Deploying needs the Firebase CLI signed in to an account with access to `theviewresidence`. `firebase.json` runs `npm run build` before every deploy, uploads `out/`, serves clean URLs (`/lists`, not `/lists.html`) and caches `/_next/static/**` for a year. `NEXT_PUBLIC_SITE_URL` in `.env.production` sets the canonical URL for metadata, `robots.txt` and `sitemap.xml`; change it when a custom domain goes live.

## Verification Workflow

- After any change, run `npm run lint`, `npx tsc --noEmit`, `npm run test:run` and `npm run format:check`.
- Run `npm run build` when routes, config, metadata or server/client boundaries change, and `npm run e2e` when a user flow changes. A build that fails the static export means the change needs a server: rethink it rather than turning the export off.
- For UI changes, check 375px, 768px, 1280px and 1920px in the browser.
- Report results as they are. If a check can't run, say so.

## Security

- Never commit secrets, `.env` files or credentials. `.env.production` is the exception: it holds only public `NEXT_PUBLIC_` values, and every `NEXT_PUBLIC_` value ends up in the browser.
- Validate input at every boundary (forms, `searchParams`) and keep user-facing errors generic.
- Never put personal data in page URLs. The `mailto:` hand-off is the only place enquiry details go into a link, and it never leaves the visitor's device until they send it.

## Commit And Pull Request Guidance

- Work on a feature branch and merge through a pull request. One logical change per commit with a short, verb-first subject.
- Never commit build output (`.next/`, `out/`, `.firebase/`), test reports (`playwright-report/`, `test-results/`) or caches.
- PR notes cover what changed and why, the related `SPEC.md` sections, screenshots for visual changes and the checks you ran.
