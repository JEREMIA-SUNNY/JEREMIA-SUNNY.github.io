# Portfolio Implementation Plan

Status: **Draft — awaiting approval.** Nothing in `src/` changes until this is approved.

## 0. Decisions locked in from Q&A

- **Projects:** 2 real case studies (AI Case Review Analyzer, My Bill App) + 2 "coming soon" placeholder cards to fill the 4-card grid.
- **Case study metrics:** no invented numbers. Real outcomes written in plain language; anywhere a hard metric would normally go, a `[METRIC: ...]` placeholder marks it for you to fill in later.
- **Optional sections:** Blog/Writing section included with placeholder "coming soon" cards. Twitter/X link and GitHub contribution-graph embed are **skipped** (no handle exists; graph wasn't selected).
- **Next.js upgrade:** proceed — Next 15.4.2 → 16.3.1, React 19.1.0 → 19.2.8, Tailwind 4 → 4.3.3 (latest as of today, verified via `npm view`).
- **Theme:** dark default, toggle to light. Respect the theme toggle, not just OS preference.

## 1. Assumptions & judgment calls (flagging these — override any you don't like)

| # | Decision | Reasoning |
|---|---|---|
| A1 | Phone number (`+91 7012338472`) is **not** displayed publicly. Email + LinkedIn + GitHub are the contact surface. | Standard anti-spam practice for public portfolios; easy to add back if you want it. |
| A2 | The dedicated "Open Source" section (contribution graph + notable contributions list) is **dropped for v1**, replaced by a simple "View GitHub Profile" link in the nav/footer and Hero socials. | You opted out of the contribution graph, and the resume lists no notable OSS contributions to populate a list with — a half-empty section looks worse than no section. Easy to reintroduce once you have real contributions to show. |
| A3 | Hero typing-role list uses **"Full-Stack Developer", "React & Next.js Engineer", "NestJS Backend Engineer"** instead of the prompt's example roles ("Open Source Contributor", "Tech Writer"). | Nothing in your resume backs "Open Source Contributor" or "Tech Writer" yet (blog is a placeholder). Roles are drawn from your actual skill set instead of the generic template. |
| A4 | Education (Diploma, Matriculation) is shown as a compact aside inside **About**, not a top-level nav section. | Real data worth keeping, but not one of the 10 requested top-level sections. |
| A5 | Project screenshots don't exist yet. Cards use a CSS "browser-chrome" mockup frame (project name + tech tags on a gradient) instead of a fake screenshot. | Won't fabricate a UI screenshot that doesn't exist. Swap in real screenshots later — the `ProjectCard` component takes an optional `image` prop and falls back to the mockup frame when absent. |
| A6 | Contact form sends via a Next.js Route Handler using **Resend**, gated behind an env var (`RESEND_API_KEY`). If unset, the form falls back to a `mailto:` link so it still works with zero setup. | Keeps the form genuinely functional in production without me inventing credentials. You add the API key in Vercel when ready; until then it degrades gracefully. |
| A7 | The My Bill App case study notes that the live demo sits behind a login screen. | The only demo link found (`.../login`) requires auth — flagging so visitors aren't confused by a login wall. |
| A8 | AI Case Review Analyzer case study has **no GitHub/demo link** — resume didn't include one. | Marked as `[ADD LINK]` in `CONTENT.md`. Card ships without a GitHub badge until you provide one (or confirm it's private, in which case we just omit it permanently). |

## 2. Tech stack

- **Framework:** Next.js 16 (App Router), TypeScript, React 19.2
- **Styling:** Tailwind CSS v4 (CSS-first config, already in place) — extends the existing `globals.css` token setup
- **Theme toggle:** `next-themes` (`attribute="class"`, `defaultTheme="dark"`, `enableSystem` off by default since you want an explicit toggle, not just OS-driven)
  - Tailwind v4 gotcha: v4's `dark:` variant defaults to `prefers-color-scheme`. Class-based toggling needs `@custom-variant dark (&:where(.dark, .dark *));` added to `globals.css`.
- **Icons:** `lucide-react` (tree-shakeable, matches Tailwind-based stacks)
- **Motion:** plain CSS transitions only (`hover:-translate-y-1`, etc.) — see §11, "Changes made during implementation" for why `framer-motion` was dropped.
- **Typing effect:** hand-rolled `useTypewriter` hook (~30 lines) rather than a dependency — trivial enough not to justify a package.
- **Contact email:** `resend` (Node SDK), called from a Route Handler. No client-side email dependency.
- **Fonts:** keep existing Geist Sans / Geist Mono (already wired in `layout.tsx`) — Mono reinforces the terminal aesthetic.
- **Deployment:** Vercel (matches your existing demo links, zero-config for Next.js App Router + Route Handlers).

## 3. Folder structure

```
src/
  app/
    layout.tsx                 # root layout, fonts, ThemeProvider, Navbar/Footer, metadata
    page.tsx                   # home: composes section components in order
    globals.css                # theme tokens (light + dark), @custom-variant dark
    sitemap.ts                 # Next.js sitemap convention
    robots.ts                  # Next.js robots convention
    projects/
      [slug]/
        page.tsx                # case-study page, generateStaticParams + generateMetadata
    api/
      contact/
        route.ts               # POST handler → Resend, falls back gracefully if no key
  components/
    layout/
      Navbar.tsx                # sticky nav, hamburger on mobile, keyboard-operable
      MobileMenu.tsx             # focus-trapped, Escape-to-close
      Footer.tsx
      ThemeToggle.tsx
      SkipLink.tsx               # "skip to content" a11y link
    sections/
      Hero.tsx
      About.tsx
      Skills.tsx
      ProjectsGrid.tsx
      Experience.tsx
      Blog.tsx
      ContactCTA.tsx
    project/
      ProjectCard.tsx
      ProjectCardPlaceholder.tsx
      CaseStudyHeader.tsx
      CaseStudyBody.tsx
    ui/
      Button.tsx
      Tag.tsx
      Container.tsx
      SectionHeading.tsx
      TerminalWindow.tsx         # decorative code-snippet block for Hero
  data/
    site.ts                     # name, summary, contact email, resume file path
    links.ts                    # github/linkedin URLs
    skills.ts                   # categorized skill arrays
    experience.ts               # timeline entries
    projects.ts                 # project + case-study content (typed)
    blog.ts                     # placeholder posts
  lib/
    types.ts                    # Project, ExperienceItem, SkillCategory, BlogPost
public/
  jeremia.png                   # already present
  resume-jeremia-sunny.pdf      # copied from details/
```

Data lives in typed arrays under `src/data/`, so every section component just maps over data — no hardcoded content inside components, per the prompt's "placeholder data / easy to customize" requirement.

## 4. Component contracts (high level)

- `ProjectCard({ project: Project })` — image (or mockup fallback), title, one-line outcome, tech tags, GitHub/demo links (optional), links to `/projects/[slug]` only if `project.caseStudy` exists; otherwise renders as a non-interactive "coming soon" card (`aria-disabled`, no href).
- `CaseStudyHeader` / `CaseStudyBody` — shared layout consumed by `app/projects/[slug]/page.tsx`: problem/context, constraints & tradeoffs, architecture area (diagram placeholder or real image), screenshots, links, results/lessons (with `[METRIC]` markers where applicable).
- `SkillsGrid` — renders `SkillCategory[]` as an icon grid (lucide icon + label), **not** progress bars, per spec.
- `ExperienceTimeline` — vertical timeline, reverse-chronological, from `experience.ts`.
- `ContactCTA` — email displayed as visible text + `mailto:` link, form (name/email/message) posting to `/api/contact`, inline validation, response-time note, and copy calling out freelance/full-time/consulting availability (needs your input — see `CONTENT.md`).

## 5. Accessibility & responsiveness

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<footer>`.
- Skip-to-content link as the first focusable element.
- Mobile hamburger menu: `button[aria-expanded]`, focus trap while open, `Escape` closes and returns focus to the toggle button.
- All interactive elements reachable and operable by keyboard alone; visible `:focus-visible` rings (theme-aware).
- `next/image` for the profile photo and any real project screenshots (explicit `sizes`, `priority` only on the Hero image).
- Mobile-first Tailwind breakpoints throughout (`sm`/`md`/`lg`), 1-column → 2-column → 3/4-column grids for skills/projects.
- Contact form errors surfaced via `aria-live="polite"`; every input has a real `<label>`.

## 6. SEO / metadata

- Root `generateMetadata`/`metadata` export: title template (`"%s · Jeremia Sunny"`), description built from the real professional summary, Open Graph + Twitter card images (for link-preview cards — independent of not having a personal Twitter profile link).
- Per-case-study `generateMetadata` using the project title/summary.
- `app/sitemap.ts` and `app/robots.ts` using Next.js conventions.
- JSON-LD `Person` schema on the home page (`name`, `jobTitle`, `worksFor`, `sameAs: [github, linkedin]`) — real structured data about you, not fabricated.
- Target queries from the brief ("developer portfolio", "full-stack developer portfolio") addressed via title/description copy, not keyword stuffing.

## 7. Deployment notes

- Host on Vercel (no repo remote is currently configured — you'll need to create a GitHub repo and push, or deploy straight from the folder via the Vercel CLI/dashboard).
- Env vars needed in Vercel project settings:
  - `RESEND_API_KEY` — optional; contact form falls back to `mailto:` if absent.
  - `CONTACT_TO_EMAIL` — defaults to `jeremiasunnylap@gmail.com` if unset.
- `next build` runs on Node 20+ (Next 16 requirement) — confirm your deployment target matches.

## 8. Upgrade plan (do first, in isolation)

1. `npm install next@latest react@latest react-dom@latest`
2. `npm install tailwindcss@latest @tailwindcss/postcss@latest`
3. Re-run `npm run build` to confirm the current placeholder page still compiles before adding new code — isolates upgrade breakage from feature work.

## 9. Build order

1. Upgrade dependencies (§8), verify clean build.
2. Add new dependencies (`next-themes`, `lucide-react`, `resend`).
3. Theme tokens + `ThemeToggle` + `next-themes` wiring (foundation everything else visually depends on).
4. `ui/` primitives (Button, Tag, Container, SectionHeading, TerminalWindow).
5. `data/` + `lib/types.ts` (content from `CONTENT.md`, typed).
6. Layout shell: Navbar, MobileMenu, Footer, SkipLink.
7. Home sections in order: Hero → About → Skills → ProjectsGrid → Experience → Blog → ContactCTA.
8. Case-study route (`/projects/[slug]`) + `ProjectCard` linking.
9. Contact route handler + Resend wiring (env-gated).
10. Metadata, sitemap, robots, JSON-LD.
11. Accessibility pass (keyboard-only walkthrough, contrast check both themes).
12. `npm run build` + `npm run lint` clean; manual dev-server walkthrough (desktop + mobile viewport).

## 10. Explicitly out of scope for v1

- Real project screenshots (mockup frame placeholder until you supply images).
- GitHub contribution graph, Twitter/X link (per your answers).
- Real blog content (placeholder cards only).
- Freelance/consulting availability copy — need your input, tracked in `CONTENT.md`.

## 11. Changes made during implementation

- **`next lint` doesn't exist in Next 16** — the subcommand was removed. `package.json`'s `lint` script now runs `eslint .` directly, and `eslint.config.mjs` imports `eslint-config-next`'s flat config array directly rather than through the legacy `FlatCompat` shim (which crashed under ESLint 9 with a circular-JSON error on this version combo).
- **Dropped `framer-motion`.** It was only used for the Experience timeline's scroll-reveal (`whileInView`, opacity 0 → 1 on intersection). A Playwright full-page screenshot during verification showed the entire timeline rendering blank — the IntersectionObserver-gated opacity never resolved in that capture path, which is exactly the kind of failure mode that can also hit crawlers or slow first paints for real users. Removed the dependency; the timeline now renders as always-visible static content, which is more robust and was never a hard requirement.
- **Mount-detection and `prefers-reduced-motion` checks use `useSyncExternalStore`**, not `useState` + `useEffect`. `eslint-plugin-react-hooks`'s `set-state-in-effect` rule (new in the v7 line shipped with Next 16's `eslint-config-next`) flags synchronous `setState` calls in effect bodies; `useSyncExternalStore` is the idiomatic replacement for "read some external/browser state on mount" and satisfied the rule without disabling it.
