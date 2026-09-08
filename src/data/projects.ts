import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "nkegroup",
    title: "NKRF Costing, Pricing & Quotation Platform",
    outcome:
      "Replaced spreadsheet-driven costing and quoting with one multi-tenant platform spanning compliance, costing, pricing, and quotations for an ISRO/DRDO/HAL-qualified aerospace cable-assembly manufacturer.",
    description:
      "A T3-stack internal platform (Next.js, tRPC, Drizzle, PostgreSQL) covering the full quote-to-production lifecycle for NKRF — roughly 115 tables, a permission-gated pricing engine with a dedicated boundary that keeps vendor cost data out of customer-facing quotes, and three parallel PDF-rendering pipelines for specs, quotations, and compliance documents.",
    tags: ["Next.js 14", "TypeScript", "tRPC", "Drizzle ORM", "PostgreSQL", "NextAuth", "Tailwind CSS", "AWS"],
    image: "/projects/nkegroup/cover.png",
    demoUrl: "https://nkegroup.com/",
    demoNote: "Internal platform — not publicly browsable; this links to NKRF's public site.",
    caseStudy: {
      problem:
        "NKRF is an ISRO/DRDO/HAL-qualified manufacturer of RF and microwave cable assemblies for aerospace and defense. Engineering documentation, costing, sales quoting, production planning, purchasing, and quality tracking were spread across spreadsheets with no shared source of truth, no audit trail on who approved a price or a spec, and no reliable way to keep vendor cost data out of a customer-facing quotation.",
      constraints:
        "Multi-tenant data isolation had to be provable at the query level, not just the UI: every business table carries a tenant foreign key, and tenant/user IDs are always derived from the authenticated session server-side rather than trusted from client input. Pricing mutations are gated by a second, more granular layer on top of authentication — a role → sub-module → permission resolver — since being logged in only proves you're some authenticated user, not that you're allowed to edit a specific price. A dedicated sanitization boundary strips vendor-internal cost and part data before any quote payload reaches a client-facing response, so a customer-facing PDF or API response can never leak what the company paid a vendor.",
      architecture:
        "Built on a T3-style stack — Next.js 14 App Router, tRPC v11 as the only API surface (no REST layer), Drizzle ORM over PostgreSQL, NextAuth for session-based auth — with a schema covering roughly 115 tables across connector/cable/adaptor specs, compliance, costing, pricing, quotations, work orders, and packing lists. As a full-stack developer on the platform, I worked across the tRPC routers, the Drizzle schema, and the pricing/quotation domain, plus the PDF pipeline: the app runs three separate PDF rendering paths side by side — a shared, cached-Puppeteer/EJS pipeline for the bulk of domain PDFs, a Python/WeasyPrint microservice that compliance documents are mid-migration to for better print-CSS fidelity, and a standalone per-request route for compliance previews. Two scheduled background jobs (quote-status recomputation and a costing-master refresh) run under Postgres advisory locks to stay safe against overlapping executions, and the app deploys through two GitHub Actions pipelines (staging/production) onto PM2-managed EC2 instances behind Nginx.",
      results: [
        "Consolidated engineering documentation, costing, pricing, quotation, production, and quality tracking — previously scattered across spreadsheets — into one relational system with ~115 tables and a full audit trail.",
        "Diagnosed and fixed a production incident where Puppeteer browser instances weren't being closed on certain error/retry paths, leaking Chromium temp profiles until a server's disk filled up — closed the gap on every discard path.",
        "[METRIC: quote turnaround time or spreadsheet-hours saved, if there's a real number worth citing]",
      ],
    },
  },
  {
    slug: "nirnaitech",
    title: "Nirnai — Legal & Property Due-Diligence Platform",
    outcome:
      "Full-stack across a multi-tenant platform automating property title verification, legal vetting, and encumbrance tracking for bank and NBFC loan origination.",
    description:
      "A NestJS/AWS Lambda backend, Redis/Bull automation bots pulling encumbrance certificates from state land-record portals, an OCR + AI pipeline reading multilingual property documents, a Puppeteer/React PDF pipeline generating bank-branded reports, and a Next.js/tRPC ops dashboard. I built the invoice generator, the 'Nirnai Sentinel' risk-monitoring pipeline, the MOTD mortgage-document engine, and led the migration of the report system from EJS to React.",
    tags: ["NestJS", "TypeScript", "AWS Lambda", "PostgreSQL", "Drizzle ORM", "Redis/Bull", "Next.js", "tRPC"],
    image: "/projects/nirnaitech/cover.png",
    demoUrl: "https://www.nirnaitech.ai/",
    demoNote: "Internal platform — not publicly browsable; this links to Nirnai's public site.",
    caseStudy: {
      problem:
        "Banks and NBFCs originating property-backed loans in India route title verification through slow, largely manual legal review — checking encumbrance history across state Sub-Registrar Offices, reading property documents that are frequently in regional languages, drafting legal opinions, and generating the mortgage paperwork (MOTD) a loan needs before it can disburse. Nirnai replaces that with a platform banks integrate into their loan origination system, but a platform is only as fast as its slowest manual step — encumbrance certificate retrieval and document reading were the two biggest bottlenecks.",
      constraints:
        "Encumbrance certificates have to be pulled from state-specific government land-record portals that offer no API, behave inconsistently across states, and can't be hit with unlimited concurrent requests without breaking — so retrieval needed queuing, per-advocate concurrency limits, and retry/backoff rather than naive parallel scraping. Property and legal documents arrive as scanned images in Tamil, Telugu, Kannada, Malayalam, and other regional languages, which ruled out a single OCR pass — the pipeline needed OCR, then reconstruction/cleanup, then translation, chained together, before any of it could feed the AI-assisted review step. And because the backend serves multiple lender tenants concurrently, the same tenant-isolation and locking discipline used in request handlers had to extend into background jobs too.",
      architecture:
        "Full-stack across the platform: a NestJS/TypeScript backend on AWS Lambda (PostgreSQL + Drizzle ORM, ~1,100 TypeScript files, 100+ tables across tenancy, RBAC, policy, valuation, vetting, and encumbrance domains), a Redis/Bull job-queue service running the EC-retrieval bots and an OCR pipeline (Google Cloud Vision + Translate, OpenAI for document reconstruction and summarization), a separate PDF-generation service that server-renders React report templates through Puppeteer, and a Next.js/tRPC frontend dashboard. Systems I built directly: a dynamic DOCX engine generating bank-specific MOTD mortgage agreements (TruHome, Vridhi, Nivara templates) from relational property/mortgage data; 'Nirnai Sentinel,' a batch pipeline that aggregates post-disbursement encumbrance checks across a lender's portfolio, classifies risk, and emails PDF reports; a rule-based case auto-assignment engine routing cases through an initiator → paralegal → lawyer workflow that factors in staff leave and workload; the invoice-generation feature end to end; the initial React-based report-template system that replaced untyped EJS templates with a typed, componentized architecture (a shared PARA/LIST/TABLE/IMAGE section dispatcher reused across every bank-branded template), plus several of those templates and a new multi-page EC risk report and a property valuation report; and, on the frontend, the role-based dashboard home page, MIS analytics views (Highcharts), and the points-allocation system.",
      results: [
        "Shipped three new report products from data model through rendering: an invoice generator, the multi-page 'Nirnai Sentinel' EC risk report, and a property valuation report.",
        "Led the EJS → React migration and its shared section-rendering framework, cutting new-template implementation time and eliminating a class of untyped-data bugs across 20+ existing bank/NBFC report templates — documented the conversion rules in an architecture README for the team.",
        "Traced and fixed a race condition causing duplicate batch-completion emails under concurrent case submissions, using PostgreSQL advisory transaction locks (pg_advisory_xact_lock).",
        "Fixed a data-integrity bug where filter-dropdown counts didn't match grid results, rewriting the underlying queries with CTEs and COUNT(DISTINCT …) to guarantee 1:1 consistency between the two views.",
      ],
    },
  },
];

export const clientWork: Project[] = [
  {
    slug: "sfjbs",
    title: "SFJ Business Solutions",
    outcome: "Marketing site for an enterprise workforce-training company reaching 500+ corporate clients.",
    description:
      "Public site for SFJ Business Solutions, presenting their corporate, institutional, and government skilling programs alongside their LMS/Talent OS software products.",
    tags: ["Static Site", "Workforce Training"],
    image: "/projects/sfjbs/cover.png",
    demoUrl: "https://www.sfjbs.com/",
  },
  {
    slug: "trueandfair",
    title: "True and Fair Professionals Network",
    outcome: "Marketing and resource site for a financial-auditing standards & training network.",
    description:
      "Public site for True and Fair Professionals Network, covering their ADAT/ADOC audit-quality frameworks, training programs, resource library, and community discussions for financial auditing and compliance professionals.",
    tags: ["Static Site", "Financial Compliance"],
    image: "/projects/trueandfair/cover.png",
    demoUrl: "https://www.trueandfair.pro/",
  },
  {
    slug: "madhurpharma",
    title: "Madhur Pharma & Research Laboratories",
    outcome: "Corporate site for a half-century-old Ayurvedic pharma and cosmetics manufacturer.",
    description:
      "Public site for Madhur Pharma & Research Laboratories, covering their contract/turnkey manufacturing services, product lines, facilities, and client base across pharma, cosmetics, and herbal products.",
    tags: ["Website", "Pharma & Cosmetics"],
    image: "/projects/madhurpharma/cover.jpeg",
    demoUrl: "https://www.madhurpharma.in/",
  },
  {
    slug: "bskilling",
    title: "bSkilling",
    outcome: "Course marketplace for technical certification and corporate training programs.",
    description:
      "Public platform for bSkilling, letting learners browse and filter certification courses (SAP, AWS, Google Cloud, cybersecurity, and more) by vendor and topic, alongside dedicated corporate and government training tracks.",
    tags: ["Frontend", "EdTech Platform"],
    image: "/projects/bskilling/cover.png",
    demoUrl: "https://www.bskilling.com/",
  },
  {
    slug: "neosan",
    title: "Neo San",
    outcome: "Product site for an on-site industrial waste-incineration device.",
    description:
      "Public site for Neo San's Neo-X on-site waste-destruction hardware — positioning the technology's emissions and performance transparency to corporate, institutional, and government buyers.",
    tags: ["Frontend", "CleanTech / Hardware"],
    image: "/projects/neosan/cover.png",
    demoUrl: "https://neosan.in/",
  },
  {
    slug: "winfomi",
    title: "Winfomi",
    outcome: "Consultancy site for a Salesforce/CRM implementation and digital engineering firm.",
    description:
      "Public site for Winfomi, detailing their Salesforce consulting, development, and integration services, CRM work across Zoho and HubSpot, and digital engineering and AI/automation offerings.",
    tags: ["Website", "CRM Consulting"],
    image: "/projects/winfomi/cover.png",
    demoUrl: "https://www.winfomi.com/",
  },
  {
    slug: "alttechconsortium",
    title: "AltTech Consortium",
    outcome: "Consultancy site for sustainable building and energy-efficiency solutions.",
    description:
      "Public site for AltTech Consortium, presenting their energy, water, and waste optimization consulting for commercial property portfolios.",
    tags: ["Frontend", "Sustainability Consulting"],
    image: "/projects/alttechconsortium/cover.png",
    demoUrl: "https://www.alttechconsortium.in/",
  },
  {
    slug: "guvenindia",
    title: "GuvenIndia",
    outcome: "Premium fashion and lifestyle e-commerce storefront.",
    description:
      "A curated e-commerce storefront for GuvenIndia, with product catalog, categories, deals, and account/wishlist features for a boutique fashion and lifestyle brand.",
    tags: ["Personal Project", "E-Commerce"],
    image: "/projects/guvenindia/cover.png",
    demoUrl: "https://www.guvenindia.com/",
  },
  {
    slug: "ai-case-review-analyzer",
    title: "AI Case Review Analyzer",
    outcome:
      "Cuts manual case-review effort by generating structured, rule-based and AI-assisted suggestions instead of free-form notes.",
    description:
      "An API-driven AI workflow that reviews cases and produces structured, auditable suggestions. Combines rule-based logic with AI-assisted generation, deliberately avoiding an overengineered ML pipeline where a simpler system does the job.",
    tags: ["NestJS", "PostgreSQL", "Docker", "AWS", "Python", "OpenAI API"],
    demoUrl: "https://casereview-theta.vercel.app/",
    demoNote: "Live demo — sign in with admin@example.com / password123.",
  },
  {
    slug: "my-bill-app",
    title: "My Bill App",
    outcome:
      "A mobile-friendly personal expense tracker with secure, per-user data isolation and at-a-glance spending analytics.",
    description:
      "A personal expense tracking app built with Next.js 15, TypeScript, and Tailwind CSS. Handles auth and data access through Supabase Auth and PostgreSQL with Row-Level Security, with expense CRUD, dynamic categories, weekly/monthly analytics, and profile management.",
    tags: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL (RLS)",
      "Framer Motion",
      "Recharts",
    ],
    demoUrl: "https://my-bill-gamma.vercel.app",
    demoNote: "Live demo is behind a login screen (Google sign-in or email/password).",
  },
];
