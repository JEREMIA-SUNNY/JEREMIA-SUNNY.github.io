import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/project/ProjectCard";
import { projects, clientWork } from "@/data/projects";

export function ProjectsGrid() {
  return (
    <Section id="projects" labelledBy="projects-heading">
      <SectionHeading
        id="projects-heading"
        eyebrow="Projects"
        title="Featured work"
        description="Professional and self-directed work, with a deeper case study behind each one."
      />

      <Reveal stagger className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Reveal>

      <div className="mt-20">
        <Reveal>
          <h3 className="text-xl font-semibold">More work</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Client, agency, and personal projects — most are internal or marketing sites without a
            public repo, so these link straight to the live site.
          </p>
        </Reveal>

        <Reveal stagger className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clientWork.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
