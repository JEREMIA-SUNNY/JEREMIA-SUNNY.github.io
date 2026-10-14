import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects
    .filter((p) => p.caseStudy)
    .map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      lastModified: new Date(),
    }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...projectRoutes,
  ];
}
