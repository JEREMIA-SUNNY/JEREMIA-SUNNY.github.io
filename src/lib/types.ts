export type SkillCategory = {
  name: string;
  skills: { name: string; icon: string }[];
};

export type CaseStudy = {
  problem: string;
  constraints: string;
  architecture: string;
  results: string[];
};

export type Project = {
  slug: string;
  title: string;
  outcome: string;
  description: string;
  tags: string[];
  image?: string;
  githubUrl?: string;
  demoUrl?: string;
  demoNote?: string;
  starCount?: number;
  caseStudy?: CaseStudy;
};

export type ExperienceItem = {
  role: string;
  org: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  tech: string[];
};

export type EducationItem = {
  credential: string;
  school: string;
  period: string;
  grade: string;
};

export type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  url?: string;
};

export type Capability = {
  /** Key into `iconMap` in `src/components/ui/icon-map.ts`. */
  icon: string;
  title: string;
  summary: string;
  /** One concrete piece of evidence — shipped work, or this page itself. */
  proof: string;
  tools: string[];
};
