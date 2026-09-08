import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Star } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { GithubIcon } from "@/components/ui/icons";
import { TiltCard } from "@/components/motion/TiltCard";
import { ProjectMockup } from "@/components/project/ProjectMockup";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const hasCaseStudy = Boolean(project.caseStudy);

  return (
    <TiltCard className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[var(--shadow-lift)]">
        <div className="relative aspect-video overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              fill
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
            />
          ) : (
            <ProjectMockup title={project.title} />
          )}
          {/* Bottom scrim so the card face reads as one surface rather than a
              screenshot with a caption bolted underneath. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold transition-colors duration-200 group-hover:text-accent">
                {project.title}
              </h3>
              {typeof project.starCount === "number" && (
                <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                  <Star size={14} /> {project.starCount}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-accent">{project.outcome}</p>
          </div>

          <p className="text-sm text-muted-foreground">{project.description}</p>

          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-4 pt-2 text-sm">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubIcon size={16} /> Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
            {hasCaseStudy && (
              <Link
                href={`/projects/${project.slug}`}
                className="ml-auto inline-flex items-center gap-1 font-medium text-accent"
              >
                Case study
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>
          {project.demoNote && (
            <p className="text-xs text-muted-foreground">{project.demoNote}</p>
          )}
        </div>
      </article>
    </TiltCard>
  );
}
