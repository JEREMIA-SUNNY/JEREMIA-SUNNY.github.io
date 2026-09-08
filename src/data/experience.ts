import type { EducationItem, ExperienceItem } from "@/lib/types";

export const experience: ExperienceItem[] = [
  {
    role: "Full-Stack Developer",
    org: "Deedbee Social Ventures Private Limited",
    location: "Bengaluru, Karnataka, India",
    start: "Jul 2022",
    end: "Present",
    bullets: [
      "Full-stack developer on Nirnai, a multi-tenant legal/property due-diligence platform for bank and NBFC loan origination — built the MOTD mortgage-document generation engine, the 'Nirnai Sentinel' batch encumbrance risk-monitoring pipeline, and led the migration of 25+ PDF report templates from untyped EJS to a typed, componentized React architecture",
      "Built Redis/Bull-backed automation bots retrieving encumbrance certificates from state government land-record portals, and an OCR + AI document pipeline (Google Cloud Vision, OpenAI) reading and translating multilingual property documents into structured case data",
      "Full-stack developer on NKRF's internal costing, pricing, and quotation platform (Next.js, tRPC, Drizzle ORM, PostgreSQL) — contributed to a ~115-table multi-tenant schema, a permission-gated pricing engine, and a PDF generation pipeline covering specs, quotations, and compliance documents",
      "Diagnosed and fixed production issues including a race condition in concurrent batch-completion emails (resolved with Postgres advisory transaction locks) and a leaking-Chromium-process disk-fill incident in a PDF-generation service",
      "Built role-based dashboards and MIS analytics (Highcharts) for internal ops teams to monitor case status and progress across tenants",
      "Deployed and maintained services on AWS (Lambda, EC2, RDS, S3) with CI/CD via GitHub Actions",
    ],
    tech: ["NestJS", "Next.js", "TypeScript", "tRPC", "PostgreSQL", "Drizzle ORM", "Redis/Bull", "AWS Lambda", "Docker"],
  },
  {
    role: "Full-Stack Web Development (Internship)",
    org: "Newton School",
    location: "Bangalore, India",
    start: "Nov 2021",
    end: "Nov 2021",
    bullets: [
      "Full-stack fundamentals and problem solving through applied projects",
      "Built small apps: movie booking, MCQ quiz, resume builder, stopwatch, Whack-a-Mole",
      "Participated in coding contests organized by the platform",
    ],
    tech: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    role: "Industrial Training — HTML & PHP",
    org: "Riss Technology",
    location: "Ernakulam, India",
    start: "Dec 2018",
    end: "Dec 2018",
    bullets: [
      "Learned the principles of building an effective web page",
      "Practiced with one small hands-on project",
    ],
    tech: ["HTML", "PHP"],
  },
];

export const education: EducationItem[] = [
  {
    credential: "Diploma",
    school: "MPTC Vadakara, Kerala",
    period: "2016–2019",
    grade: "8.51/10.0",
  },
  {
    credential: "Matriculation (Class X)",
    school: "GVHSS Kattikulam",
    period: "2015–2017",
    grade: "80.0%",
  },
];
