import type { SkillCategory } from "@/lib/types";

export const skills: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "TypeScript / JavaScript (ES6+)", icon: "Braces" },
      { name: "SQL", icon: "Database" },
      { name: "Python", icon: "Terminal" },
      { name: "HTML5 / CSS3", icon: "Code" },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", icon: "Atom" },
      { name: "Next.js 14 (App Router, SSR / RSC)", icon: "Layers" },
      { name: "tRPC", icon: "Share2" },
      { name: "Tailwind CSS", icon: "Palette" },
      { name: "React Query", icon: "RefreshCw" },
      { name: "React Hook Form + Zod", icon: "ShieldCheck" },
      { name: "Highcharts / Recharts", icon: "Gauge" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", icon: "Server" },
      { name: "NestJS", icon: "Component" },
      { name: "Express", icon: "Route" },
      { name: "REST APIs & API design", icon: "Share2" },
      { name: "Drizzle ORM", icon: "Droplet" },
      { name: "Redis + Bull queues", icon: "Workflow" },
      { name: "node-cron / pg_cron", icon: "RefreshCw" },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "PostgreSQL (100+ table schemas, recursive CTEs, advisory locks)", icon: "Database" },
      { name: "MySQL", icon: "HardDrive" },
      { name: "MongoDB", icon: "Leaf" },
      { name: "Supabase", icon: "Database" },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS (Lambda, EC2, RDS, S3, SES)", icon: "Cloud" },
      { name: "Google Cloud (Vision, Translate, Storage)", icon: "Cloud" },
      { name: "Serverless", icon: "Zap" },
      { name: "Docker", icon: "Container" },
      { name: "PM2 / Nginx", icon: "Server" },
    ],
  },
  {
    name: "Tooling & CI",
    skills: [
      { name: "Git / GitHub / GitHub Actions", icon: "Workflow" },
      { name: "Vitest / Playwright", icon: "TestTube" },
      { name: "ESLint / TypeScript strict mode", icon: "ShieldCheck" },
      { name: "Postman", icon: "Send" },
      { name: "Figma", icon: "PenTool" },
    ],
  },
  {
    name: "AI & Documents",
    skills: [
      { name: "OpenAI API", icon: "Sparkles" },
      { name: "Google Vision OCR", icon: "Cpu" },
      { name: "Puppeteer / React SSR to PDF", icon: "Layers" },
      { name: "WeasyPrint", icon: "Layers" },
      { name: "DOCX generation / ExcelJS / EJS", icon: "Code" },
    ],
  },
  {
    name: "Architecture",
    skills: [
      { name: "Multi-tenant isolation", icon: "Boxes" },
      { name: "RBAC matrices", icon: "Lock" },
      { name: "JWT / NextAuth SSO", icon: "Lock" },
      { name: "Audit trails", icon: "ShieldCheck" },
      { name: "Job queues & third-party integration", icon: "Network" },
    ],
  },
];
