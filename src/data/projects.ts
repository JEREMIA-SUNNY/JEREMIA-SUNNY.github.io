import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "nkegroup",
    title: "NKE Wire Assembly ERP",
    outcome:
      "Replaced spreadsheet lookup and quoting with one multi-tenant manufacturing ERP spanning engineering specs, compliance, costing, pricing, work orders and administration for a cable, connector and adaptor manufacturer.",
    description:
      "A multi-tenant T3-stack ERP (Next.js 14, tRPC v11, Drizzle, NextAuth) covering cable, connector and adaptor specs, compliance certification, costing, pricing, quotations, work orders and packing lists across ~115 PostgreSQL tables. I am the primary contributor to the admin, user, engineering, pricing and work order modules.",
    tags: ["Next.js 14", "TypeScript", "tRPC", "Drizzle ORM", "PostgreSQL", "NextAuth", "Vitest", "Playwright"],
    image: "/projects/nkegroup/cover.png",
    demoUrl: "https://nkegroup.com/",
    demoNote: "Internal platform — not publicly browsable; this links to the company's public site.",
    caseStudy: {
      problem:
        "Cable and connector specifications, compliance certification, costing, quoting, work orders and packing lists lived in spreadsheets, with part numbers scattered across customer, manufacturer, internal and vendor naming schemes. There was no shared source of truth, no audit trail on who changed a mapping or a price, and no reliable way to resolve which components were drop-in replacements for each other when a Build-to-Print BOM arrived.",
      constraints:
        "Multi-tenant data isolation had to be provable at the query level, not just the UI: tenant and user identity are always derived from the authenticated session rather than trusted from client input. Being logged in only proves you're some authenticated user, so actions are gated by a second layer — a role → sub-module → permission matrix resolving view, create, edit, approve, delete and download rights. Upload keys carried no tenant namespacing, so every signed-URL request had to be validated against rows the caller's tenant actually owns. Pricing had to be numerically trustworthy across currencies and rounding, which meant isolating pure calculation helpers from the tRPC orchestration so they could be tested exhaustively.",
      architecture:
        "A T3-stack system — Next.js 14 App Router, tRPC v11, Drizzle ORM over PostgreSQL (~115 tables), NextAuth sessions, Tailwind. Traded-goods and cable-assembly pricing engines normalise FX to INR, select costs by MOQ and apply configurable margins. A universal cross-reference catalog unifies customer, manufacturer and internal part numbers and vendor SKUs into one searchable model, backed by a bi-directional equivalency graph: transitive link detection runs over recursive SQL CTEs with depth guards and UNION DISTINCT to prevent cyclic recursion, and each link carries a form-fit-function classification separating drop-in replacements from functional alternates. A bulk BOM import wizard ingests customer CSV and XLSX files with column mapping, auto-registers cross-references against existing part numbers and surfaces unmapped rows for review. Component, mapping and link tables use soft deletes and audit trails recording user, timestamp, action and old and new values, with unlink and delete restricted to lead engineer and admin roles.",
      results: [
        "Replaced spreadsheet lookup for Build-to-Print BOMs with a single searchable cross-reference model spanning four part-number schemes.",
        "Closed an S3 access gap by validating every signed-URL request against tenant-owned rows.",
        "Covered pricing boundaries, output shape and floating-point rounding with contract, golden-snapshot and numeric-guard Vitest suites, plus Playwright end-to-end coverage.",
        "[METRIC: quote turnaround time or spreadsheet-hours saved, if there's a real number worth citing]",
      ],
    },
  },
  {
    slug: "nirnaitech",
    title: "Nirnai — Legal Due-Diligence Platform",
    outcome:
      "Full-stack across all five services of a multi-tenant platform automating property title verification, legal vetting, valuation and encumbrance tracking for bank, NBFC and legal-firm tenants.",
    description:
      "A serverless NestJS backend on AWS Lambda, a Redis/Bull scheduler and automation-bot service, an OCR + AI pipeline reading multilingual property documents, a React SSR + Puppeteer PDF microservice generating lender-branded reports, a lender integration API, and a Next.js 14 / tRPC web app. I built the MOTD mortgage-document engine, the 'Nirnai Sentinel' risk-monitoring pipeline, and led the migration of the report system from EJS to React.",
    tags: ["NestJS", "TypeScript", "AWS Lambda", "PostgreSQL", "Redis/Bull", "Puppeteer", "Next.js 14", "tRPC"],
    image: "/projects/nirnaitech/cover.png",
    demoUrl: "https://www.nirnaitech.ai/",
    demoNote: "Internal platform — not publicly browsable; this links to Nirnai's public site.",
    caseStudy: {
      problem:
        "Banks and NBFCs originating property-backed loans in India route title verification through slow, largely manual legal review — checking encumbrance history across state Sub-Registrar Offices, reading property documents that are frequently in regional languages, drafting legal opinions, and generating the mortgage paperwork (MOTD) a loan needs before it can disburse. Nirnai replaces that with a platform banks integrate into their loan origination system, but a platform is only as fast as its slowest manual step — encumbrance certificate retrieval and document reading were the two biggest bottlenecks.",
      constraints:
        "Encumbrance certificates have to be pulled from state-specific government land-record portals that offer no API, behave inconsistently across states, and can't be hit with unlimited concurrent requests without breaking — so retrieval needed queuing, per-advocate concurrency limits, and retry/backoff rather than naive parallel scraping. Property and legal documents arrive as scanned images in Tamil, Telugu, Kannada, Malayalam, and other regional languages, which ruled out a single OCR pass — the pipeline needed OCR, then reconstruction/cleanup, then translation, chained together, before any of it could feed the AI-assisted review step. And because the backend serves multiple lender tenants concurrently, the same tenant-isolation and locking discipline used in request handlers had to extend into background jobs too.",
      architecture:
        "Five services: a NestJS serverless backend on AWS Lambda (~1,100 TypeScript files, 100+ PostgreSQL tables across tenancy, RBAC, policy, valuation, vetting and encumbrance domains); a scheduler service running a config-driven cron abstraction (20+ jobs, reconfigurable via JSON without a redeploy) and a Redis/Bull queue for the EC-retrieval bots and the OCR pipeline (Google Cloud Vision, OpenAI); a Node.js PDF microservice that server-renders typed React report templates through Puppeteer; a NestJS lender integration API with multi-tenant JWT auth, Swagger docs and Google Cloud Storage; and a Next.js 14 / tRPC web app with per-tenant branding, SSO and RBAC. Systems I built directly: a dynamic DOCX engine generating bank-specific MOTD mortgage agreements (TruHome, Vridhi, Nivara templates) from relational property data; 'Nirnai Sentinel,' a batch pipeline that aggregates post-disbursement encumbrance checks across a loan portfolio, classifies risk as low, moderate or high, generates PDF reports and notifies stakeholders via AWS SES; a rule-based auto-assignment engine routing cases initiator → paralegal → lawyer against staff leave calendars and workload; the typed React report system — a shared PARA/LIST/TABLE/IMAGE section dispatcher reused across 25+ lender templates — plus a multi-page encumbrance risk report and a property valuation report; and, on the frontend, role-based dashboards, Highcharts MIS analytics and the points-allocation system.",
      results: [
        "Shipped the multi-page Nirnai Sentinel encumbrance risk report and a property valuation report from data model through rendering.",
        "Led the EJS → React migration and its shared section-rendering framework, eliminating a class of untyped-data bugs across 25+ lender report templates — documented the conversion rules in an architecture README for the team.",
        "Traced and fixed a race condition causing duplicate batch-completion emails under concurrent case submissions, using PostgreSQL advisory transaction locks.",
        "Fixed a data-integrity bug where filter-dropdown counts didn't match grid results, rewriting the queries with CTEs and COUNT(DISTINCT …) to guarantee consistency between the two views.",
        "Automated Encumbrance Certificate retrieval across Andhra Pradesh, Telangana, Tamil Nadu and Karnataka portals with per-advocate concurrency locking and retry logic.",
      ],
    },
  },
];

export const clientWork: Project[] = [
  {
    slug: "sfjbs",
    title: "SFJ Business Solutions",
    outcome: "Enterprise upskilling and certification portal with course catalogue and enquiry flows.",
    description:
      "Public site for SFJ Business Solutions, presenting their corporate, institutional, and government skilling programs alongside their LMS/Talent OS software products.",
    tags: ["Static Site", "Workforce Training"],
    image: "/projects/sfjbs/cover.png",
    demoUrl: "https://www.sfjbs.com/",
  },
  {
    slug: "trueandfair",
    title: "True and Fair Professionals Network",
    outcome: "Professional advisory and compliance services site.",
    description:
      "Public site for True and Fair Professionals Network, covering their ADAT/ADOC audit-quality frameworks, training programs, resource library, and community discussions for financial auditing and compliance professionals.",
    tags: ["Static Site", "Financial Compliance"],
    image: "/projects/trueandfair/cover.png",
    demoUrl: "https://www.trueandfair.pro/",
  },
  {
    slug: "madhurpharma",
    title: "Madhur Pharma & Research Laboratories",
    outcome: "Site for a contract manufacturer of pharmaceuticals, cosmetics and nutraceuticals.",
    description:
      "Public site for Madhur Pharma & Research Laboratories, covering their contract/turnkey manufacturing services, product lines, facilities, and client base across pharma, cosmetics, and herbal products.",
    tags: ["Website", "Pharma & Cosmetics"],
    image: "/projects/madhurpharma/cover.jpeg",
    demoUrl: "https://www.madhurpharma.in/",
  },
  {
    slug: "bskilling",
    title: "bSkilling",
    outcome: "Edtech LMS for corporate and government training programmes — full front-end build.",
    description:
      "Public platform for bSkilling, letting learners browse and filter certification courses (SAP, AWS, Google Cloud, cybersecurity, and more) by vendor and topic, alongside dedicated corporate and government training tracks.",
    tags: ["Frontend", "EdTech Platform"],
    image: "/projects/bskilling/cover.png",
    demoUrl: "https://www.bskilling.com/",
  },
  {
    slug: "neosan",
    title: "Neo San",
    outcome: "Front-end for a WEF-backed cleantech sanitation and waste-management platform.",
    description:
      "Public site for Neo San's Neo-X on-site waste-destruction hardware — positioning the technology's emissions and performance transparency to corporate, institutional, and government buyers.",
    tags: ["Frontend", "CleanTech / Hardware"],
    image: "/projects/neosan/cover.png",
    demoUrl: "https://neosan.in/",
  },
  {
    slug: "winfomi",
    title: "Winfomi",
    outcome: "Salesforce consulting partner site with service and case-study sections.",
    description:
      "Public site for Winfomi, detailing their Salesforce consulting, development, and integration services, CRM work across Zoho and HubSpot, and digital engineering and AI/automation offerings.",
    tags: ["Website", "CRM Consulting"],
    image: "/projects/winfomi/cover.png",
    demoUrl: "https://www.winfomi.com/",
  },
  {
    slug: "alttechconsortium",
    title: "AltTech Consortium",
    outcome: "Alternative-technology industry consortium site with a member directory.",
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
      "API-driven AI review workflows in NestJS that use structured JSON schemas for model input and output, with rule-based logic handling the deterministic cases. Containerised with Docker and deployed on AWS.",
    tags: ["NestJS", "TypeScript", "Docker", "AWS", "Structured JSON schemas"],
    demoUrl: "https://casereview-theta.vercel.app/",
    demoNote: "Live demo — sign in with admin@example.com / password123.",
  },
  {
    slug: "my-bill-app",
    title: "My Bill App",
    outcome:
      "A mobile-friendly personal expense tracker with secure, per-user data isolation and at-a-glance spending analytics.",
    description:
      "A mobile-first expense tracker in Next.js 15, TypeScript and Tailwind CSS, built end to end. Supabase Auth with PostgreSQL Row Level Security enforces per-user isolation at the database layer, alongside expense CRUD, dynamic categories, Recharts analytics and an animated UI with Framer Motion.",
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
