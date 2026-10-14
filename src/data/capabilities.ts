import type { Capability } from "@/lib/types";

/**
 * The five capability areas the portfolio is built to demonstrate.
 *
 * Each `proof` line points at something a visitor can verify — a shipped
 * project, or a behaviour of this page itself. Keep it that way: a claim
 * without evidence belongs in `skills.ts`, not here.
 */
export const capabilities: Capability[] = [
  {
    icon: "Atom",
    title: "Frontend engineering",
    summary:
      "Component architecture in React and Next.js, typed end to end, with a deliberate line between server and client work.",
    proof:
      "Sections here render on the server; only the genuinely interactive pieces ship JavaScript.",
    tools: ["React", "Next.js", "TypeScript", "Redux", "Vite"],
  },
  {
    icon: "Server",
    title: "Backend & APIs",
    summary:
      "NestJS and Node services behind REST and tRPC surfaces, with schema design, auth and caching handled up front.",
    proof:
      "Multi-tenant B2B platforms in production on PostgreSQL — tenant isolation, RBAC matrices and audit trails across Nirnai and NKE Wire Assembly ERP.",
    tools: ["NestJS", "Node.js", "PostgreSQL", "tRPC", "Drizzle ORM"],
  },
  {
    icon: "Sparkles",
    title: "Motion & interaction",
    summary:
      "Scroll-driven storytelling and micro-interactions built on GSAP, tied to a smooth-scroll engine so the two stay in sync.",
    proof:
      "Every reveal, parallax layer and magnetic control on this page — each one switched off entirely under reduced-motion.",
    tools: ["GSAP", "ScrollTrigger", "Lenis", "CSS transitions"],
  },
  {
    icon: "Boxes",
    title: "3D & immersive",
    summary:
      "Real-time WebGL scenes composed in React, with interaction that belongs to the layout instead of sitting in a widget.",
    proof:
      "The hero is a 360° three.js scene, code-split out of the initial bundle and swapped for a static fallback on low-power devices.",
    tools: ["three.js", "React Three Fiber", "WebGL"],
  },
  {
    icon: "Gauge",
    title: "Performance & delivery",
    summary:
      "Shipping work that stays fast after launch: measured budgets, optimised assets, and pipelines that deploy without ceremony.",
    proof:
      "Capability-gated 3D, lazy-loaded imagery and a paused render loop off-screen; AWS (Lambda, EC2, RDS, S3, SES) and GitHub Actions on the day job.",
    tools: ["AWS", "Docker", "GitHub Actions", "PM2 / Nginx"],
  },
];
