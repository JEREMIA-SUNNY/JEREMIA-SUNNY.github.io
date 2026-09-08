# NirnAI

**URL:** https://www.nirnaitech.ai/
**Role on this project:** full-stack
**Engagement:** [ADD: confirm whether this was via Wysbrix, Deedbee, or another engagement — not specified]

## What it is
NirnAI operates in legal tech and financial services, targeting the mortgage and lending industry in India. It digitizes and automates legal processes around loan assessment and property verification for lenders and financial institutions — offering title search, legal opinions, MoTD (Memorandum of Title Deposit) automation, and vetting/valuation services. The company positions its platform around AI-powered document verification, customizable workflows, system integrations, and real-time compliance analytics, with report accuracy, turnaround time, data security, and customer support as its core value propositions.

## Site sections / key features observed
- Home, About, Services, Technology, Resources, FAQs, Opportunities, Contact navigation
- "Request a Demo" primary call-to-action
- Four-pillar technology section (AI document verification, customizable workflows, integrations, real-time analytics)
- Customer testimonial blog posts on AI's impact on digital lending

## My contribution

This public marketing site is separate from the actual project: **Nirnai's platform** — a NestJS/TypeScript backend on AWS Lambda, a Redis/Bull job-queue service running EC-retrieval bots and an OCR+AI document pipeline, a separate Puppeteer/React PDF-generation service, and a Next.js/tRPC ops dashboard. This is the system now featured as a top case study on the portfolio (slug `nirnaitech` in `src/data/projects.ts`), not the public site linked above.

Full-stack across the platform, with these systems built directly: the dynamic DOCX engine generating bank-specific MOTD mortgage agreements (TruHome, Vridhi, Nivara templates); "Nirnai Sentinel," a batch pipeline aggregating post-disbursement encumbrance checks across a lender's portfolio and classifying risk; a rule-based case auto-assignment engine (initiator → paralegal → lawyer); the invoice-generation feature end to end; the initial React-based report-template system replacing untyped EJS templates (shared PARA/LIST/TABLE/IMAGE section dispatcher, reused across 25+ bank-branded templates) plus several of those templates, a new multi-page EC risk report, and a property valuation report; and on the frontend, the role-based dashboard home page, MIS analytics (Highcharts), and the points-allocation system. Also fixed a race condition in concurrent batch-completion emails (Postgres advisory transaction locks) and a filter-count/grid data-integrity bug (CTEs + COUNT(DISTINCT …)).

See the full case study in `src/data/projects.ts` (slug `nirnaitech`) for the write-up used on the site.

## Screenshots
Drop images for this project into `public/projects/nirnaitech/` — they'll get wired into the site once available.
