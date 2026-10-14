import type { EducationItem, ExperienceItem } from "@/lib/types";

export const experience: ExperienceItem[] = [
  {
    role: "Full Stack Engineer — Product",
    org: "Wysbryx Technologies Pvt. Ltd. (formerly Deedbee Social Ventures)",
    location: "Bengaluru, India",
    start: "Jul 2022",
    end: "Present",
    bullets: [
      "NKE Wire Assembly ERP (Jan 2026 – present): primary contributor to the admin, user, engineering, pricing and work order modules of a multi-tenant T3-stack manufacturing ERP (Next.js 14, tRPC v11, Drizzle, NextAuth) spanning specs, compliance, costing, quotations and packing lists across ~115 PostgreSQL tables",
      "Built a user → role → sub-module → permission matrix (view, create, edit, approve, delete, download) and consolidated five ad hoc admin checks into one exact-match resolver shared by server procedures and client hooks; hardened auth so a deactivated user's issued JWT is rejected immediately",
      "Built traded-goods and cable-assembly pricing with FX normalisation to INR, MOQ-based cost selection, margin handling and stale-pricing detection, behind a boundary that strips vendor-internal cost data; covered by contract, golden-snapshot and numeric-guard Vitest suites plus Playwright",
      "Built work order, contract, packing list and address sheet generation over a cached Puppeteer pipeline and a WeasyPrint microservice, and fixed a Word-export font defect that corrected all eight document types at once",
      "Enforced multi-tenant isolation by deriving tenant and user identity from the session, and closed an S3 access gap by gating signed-URL and download procedures on rows the caller's tenant owns",
      "Nirnai (Jul 2022 – Jan 2026): contributed across all five services of a legal due-diligence platform for banks and NBFCs — NestJS Lambda backend, scheduler, PDF microservice, lender integration API and a Next.js 14 / tRPC web app",
      "Built the MOTD mortgage-agreement DOCX engine, the Nirnai Sentinel batch encumbrance risk-monitoring pipeline, and led the migration of 25+ PDF report templates from untyped EJS to a typed React SSR + Puppeteer architecture",
      "Built Redis/Bull bots retrieving Encumbrance Certificates from four state land-record portals, a config-driven scheduler running 20+ jobs, a rule-based case auto-assignment engine, and a Google Vision OCR + OpenAI pipeline translating Tamil, Telugu, Kannada and Malayalam documents into structured English case data",
      "Fixed a duplicate-email race condition with PostgreSQL advisory transaction locks and filter-count/grid mismatches with CTEs and COUNT(DISTINCT); built role-based dashboards and Highcharts MIS analytics",
    ],
    tech: ["Next.js", "TypeScript", "NestJS", "tRPC", "PostgreSQL", "Drizzle ORM", "Redis/Bull", "AWS", "Puppeteer"],
  },
  {
    role: "Full Stack Web Development (Training)",
    org: "Newton School",
    location: "Bengaluru, India",
    start: "2021",
    end: "2022",
    bullets: [
      "Full-stack fundamentals and problem solving through applied projects in HTML, CSS, JavaScript and React",
      "Built small apps: movie booking, MCQ quiz, resume builder, stopwatch, Whack-a-Mole",
    ],
    tech: ["HTML", "CSS", "JavaScript", "React"],
  },
];

export const education: EducationItem[] = [
  {
    credential: "Diploma in Computer Engineering",
    school: "Model Polytechnic College, Vadakara",
    period: "2016–2019",
    grade: "8.51/10.0",
  },
];
