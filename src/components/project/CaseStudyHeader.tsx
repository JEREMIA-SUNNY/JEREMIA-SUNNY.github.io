import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { GithubIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import type { Project } from "@/lib/types";

export function CaseStudyHeader({ project }: { project: Project }) {
  return (
    <header>
      <Reveal>
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          Back to projects
        </Link>
      </Reveal>

      <SplitReveal
        as="h1"
        text={project.title}
        delay={0.08}
        className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl"
      />

      <Reveal delay={0.2}>
        <p className="mt-2 text-lg text-accent">{project.outcome}</p>
      </Reveal>

      <Reveal stagger selector="li" delay={0.26} className="mt-5">
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:underline"
          >
            <GithubIcon size={16} /> View repository
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:underline"
          >
            <ExternalLink size={16} /> Live demo
          </a>
        )}
      </div>
      {project.demoNote && (
        <p className="mt-2 text-sm text-muted-foreground">{project.demoNote}</p>
      )}
    </header>
  );
}
