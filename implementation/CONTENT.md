# Content Draft (from resume + docx)

Review/edit this before it gets wired into `src/data/*.ts`. Anything marked `[ADD]`/`[METRIC]` is a real gap in the source material — I didn't invent a value for it.

## Identity

- **Name:** Jeremia Sunny
- **Email:** jeremiasunnylap@gmail.com
- **Location:** Bengaluru, Karnataka, India
- **GitHub:** https://github.com/JEREMIA-SUNNY
- **LinkedIn:** https://www.linkedin.com/in/jeremia-sunny
- **Photo:** `public/jeremia.png` (already in repo)
- **Resume:** `details/Resume-Jeremia Sunny.pdf` → will be copied to `public/resume-jeremia-sunny.pdf`
- Phone number exists on the resume but is **not** published on the site (see PLAN.md A1).

## Hero

- Heading: "Hi, I'm Jeremia Sunny"
- Typing roles: `Full-Stack Developer` / `React & Next.js Engineer` / `NestJS Backend Engineer`
- Intro paragraph (draft): "I'm a full-stack engineer with 4+ years building scalable web applications — from SaaS platforms to internal tools — using React, Next.js, NestJS, and PostgreSQL. I care about performance, clean API design, and shipping things that actually hold up in production."
- CTAs: "View Projects" (scrolls/links to Projects section) · "Download Resume" (links to the PDF)
- Terminal decoration: a `TerminalWindow` component showing a short fake `$ whoami` style snippet, e.g.:
  ```
  $ whoami
  jeremia-sunny — full-stack engineer
  $ stack --primary
  react · next.js · nestjs · postgresql
  ```

## About

- Currently working at: **Deedbee Social Ventures Private Limited**, Bengaluru — Full-Stack Developer, July 2022–Present
- Years of experience: **4+**
- Summary (from resume, lightly trimmed): "Full-stack engineer experienced in building scalable web applications using React, Next.js, Node.js, NestJS, Python, and PostgreSQL. Skilled in developing SaaS platforms, optimizing API performance, and implementing CI/CD pipelines on AWS. Focused on translating business requirements into technical solutions that prioritize performance, usability, and maintainability."
- Education (compact aside, per PLAN.md A4):
  - Diploma — MPTC Vadakara, Kerala (2016–2019), 8.51/10.0
  - Matriculation (Class X) — GVHSS Kattikulam (2015–2017), 80.0%
- Fun fact / personal touch: **[ADD]** — nothing personal in the resume to draw from; give me a line (hobby, interest, anything) or I'll leave this element out entirely.

## Skills (icon grid, grouped)

**Languages:** JavaScript/TypeScript, Python, SQL
**Frontend:** React, Next.js, Vite, Redux, Tailwind CSS
**Backend:** Node.js, NestJS, Express.js, REST APIs, GraphQL
**Database:** PostgreSQL, MySQL, MongoDB, Drizzle ORM
**Cloud / DevOps:** AWS (EC2, RDS, S3, CloudFront), Docker, GitHub Actions
**Tools:** Postman, Figma, Jira, VS Code
**Practices:** Unit Testing, CI/CD, Authentication, Caching, Security Best Practices
**AI:** OpenAI API, Generative AI integration

(Dropped "Go" and "Kubernetes" from the original prompt's template list — not on your resume. Add them back if you actually use them.)

## Projects

### 1. AI Case Review Analyzer — Jan 2026 *(real, featured)*
- One-line outcome: "Cuts manual case-review effort by generating structured, rule-based and AI-assisted suggestions instead of free-form notes."
- Description: API-driven AI workflow built with NestJS, PostgreSQL, Docker, and AWS. Structured JSON schemas define AI input/output so suggestions stay consistent and auditable. Combines rule-based logic with AI-assisted suggestion generation — deliberately avoids overengineering with unnecessarily complex models.
- Tech tags: NestJS, PostgreSQL, Docker, AWS, Python, OpenAI API
- GitHub: **[ADD LINK]** — none found; confirm if public
- Live demo: **[ADD LINK]** — none found
- Case study sections:
  - Problem/context: **[ADD]** a sentence or two on who reviews cases and why the manual process was slow — resume doesn't say
  - Constraints/tradeoffs: rule-based + AI-assisted hybrid chosen over a full ML model — write-up can lean on the resume's own framing ("practical AI integration without overengineering")
  - Results: `[METRIC: reduction in review time / cases processed / accuracy rate]`

### 2. My Bill App — Nov 2025 *(real, featured)*
- One-line outcome: "A mobile-friendly personal expense tracker with secure, per-user data isolation and at-a-glance spending analytics."
- Description: Built with Next.js 15, TypeScript, and Tailwind CSS. Auth and data access via Supabase Auth + PostgreSQL with Row-Level Security. Expense CRUD, dynamic categories, weekly/monthly analytics charts (Recharts), profile management, and Framer Motion animations throughout.
- Tech tags: Next.js 15, TypeScript, Tailwind CSS, Supabase, PostgreSQL (RLS), Framer Motion, Recharts
- GitHub: **[ADD LINK]** if the repo is public
- Live demo: https://my-bill-git-main-jeremiasunnys-projects.vercel.app/login — note: sits behind a login screen (see PLAN.md A7); consider whether to provide a demo/guest account
- Case study sections:
  - Problem/context: personal expense tracking with real per-user data isolation (not just a shared demo dataset)
  - Constraints/tradeoffs: Supabase RLS chosen for auth+data isolation in one system rather than hand-rolling auth
  - Results: `[METRIC: e.g. weekly active use, categories tracked, whatever's real]`

### 3–4. Placeholder cards *(per your "coming soon" choice)*
- Card 3: "New case study — coming soon" (no link, `aria-disabled`)
- Card 4: "New case study — coming soon" (no link, `aria-disabled`)
- Swap these for real projects (e.g. something from the Newton School work, or a new build) whenever ready.

## Experience Timeline

1. **Full-Stack Developer** — Deedbee Social Ventures Private Limited, Bengaluru — *July 2022–Present*
   - Designed and implemented responsive UI components using React and Tailwind CSS
   - Built scalable backend APIs using NestJS and PostgreSQL with Drizzle ORM
   - Deployed applications on AWS (EC2 + RDS + S3) with environment-based configuration
   - Integrated authentication, logging, and monitoring for performance visibility
   - Collaborated with QA and DevOps on CI/CD setup and release management
   - Tech: React, Next.js, NestJS, PostgreSQL, Drizzle ORM, AWS, Docker

2. **Full-Stack Web Development (Internship)** — Newton School, Bangalore — *Nov 2021*
   - Full-stack fundamentals + problem solving; built small apps (movie booking, MCQ app, resume builder, stopwatch, "Whack-a-Mole")
   - Tech: HTML, CSS, JavaScript, React

3. **Industrial Training — HTML & PHP** — Riss Technology, Ernakulam — *Dec 2018*
   - Fundamentals of building an effective web page; one small project
   - Tech: HTML, PHP

## Blog / Writing

No published articles/links found (no dev.to, Medium, or personal blog in the resume). Section ships with "coming soon" placeholder cards per your answer — swap in real posts (title, excerpt, date, read time, link) once you're writing.

## Contact

- Headline: "Interested in working together?"
- Email (prominent): jeremiasunnylap@gmail.com
- Form fields: name, email, message → posts to `/api/contact`
- Response-time expectation: **[ADD]** — e.g. "I usually reply within 1–2 business days." Give me a real number or I'll use a conservative default.
- Availability copy (freelance / full-time / consulting): **[ADD]** — resume doesn't state current availability; tell me which of these actually apply right now so the CTA doesn't over-promise.

## Certifications (not a top-level section — mention inline in About or Experience if desired)

- SoloLearn — JavaScript fundamentals, Jan 2022

## Open items summary (everything marked `[ADD]` / `[METRIC]` above)

1. Fun fact / personal touch for About
2. GitHub link for AI Case Review Analyzer (or confirm private)
3. Problem/context detail for AI Case Review Analyzer case study
4. Real metric for AI Case Review Analyzer results
5. GitHub link for My Bill App (if public)
6. Real metric for My Bill App results
7. Contact response-time expectation
8. Freelance/full-time/consulting availability statement
