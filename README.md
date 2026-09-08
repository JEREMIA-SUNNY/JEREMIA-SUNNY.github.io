# Jeremia Sunny — Portfolio

Personal portfolio site. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4,
GSAP for scroll-driven motion, and three.js for the interactive hero.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Environment

All optional — copy `.env.example` to `.env.local` and fill in what you need.
Without `RESEND_API_KEY` the contact form falls back to a `mailto:` link rather
than failing.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Enables contact-form email delivery via Resend |
| `CONTACT_TO_EMAIL` | Inbox for contact-form messages |
| `NEXT_PUBLIC_SITE_URL` | Absolute URLs for metadata, `sitemap.xml`, `robots.txt` |

## Editing content

Content is data-driven — components never hardcode copy. Edit the typed arrays in
`src/data/` (`site.ts`, `skills.ts`, `capabilities.ts`, `experience.ts`,
`projects.ts`, `blog.ts`), not the components.

Adding a project: append to `projects` (with a `caseStudy` field, which generates
a `/projects/<slug>` route) or to `clientWork` (card only). Screenshots go in
`public/projects/<slug>/`.

## Architecture

See `CLAUDE.md` for the full architecture notes — the motion system, the
capability-gated 3D hero, theming tokens, and the client/server split.

## Accessibility

Everything animated is built inside a `prefers-reduced-motion` guard, and the 3D
hero is replaced by a static fallback when motion is reduced, WebGL is missing, or
the device is low-powered. The hero is operable by keyboard (arrow keys rotate it).
