import type { SkillCategory } from "@/lib/types";

export const skills: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "JavaScript / TypeScript", icon: "Braces" },
      { name: "Python", icon: "Terminal" },
      { name: "SQL", icon: "Database" },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", icon: "Atom" },
      { name: "Next.js", icon: "Layers" },
      { name: "Vite", icon: "Zap" },
      { name: "Redux", icon: "Boxes" },
      { name: "Tailwind CSS", icon: "Palette" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", icon: "Server" },
      { name: "NestJS", icon: "Component" },
      { name: "Express.js", icon: "Route" },
      { name: "REST APIs", icon: "Share2" },
      { name: "GraphQL", icon: "Network" },
    ],
  },
  {
    name: "Database",
    skills: [
      { name: "PostgreSQL", icon: "Database" },
      { name: "MySQL", icon: "HardDrive" },
      { name: "MongoDB", icon: "Leaf" },
      { name: "Drizzle ORM", icon: "Droplet" },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS (EC2, RDS, S3, CloudFront)", icon: "Cloud" },
      { name: "Docker", icon: "Container" },
      { name: "GitHub Actions", icon: "Workflow" },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Postman", icon: "Send" },
      { name: "Figma", icon: "PenTool" },
      { name: "Jira", icon: "Kanban" },
      { name: "VS Code", icon: "Code" },
    ],
  },
  {
    name: "Practices",
    skills: [
      { name: "Unit Testing", icon: "TestTube" },
      { name: "CI/CD", icon: "RefreshCw" },
      { name: "Authentication", icon: "Lock" },
      { name: "Caching", icon: "Gauge" },
      { name: "Security Best Practices", icon: "ShieldCheck" },
    ],
  },
  {
    name: "AI",
    skills: [
      { name: "OpenAI API", icon: "Sparkles" },
      { name: "Generative AI Integration", icon: "Cpu" },
    ],
  },
];
