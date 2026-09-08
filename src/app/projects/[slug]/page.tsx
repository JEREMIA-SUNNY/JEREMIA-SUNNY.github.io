import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CaseStudyHeader } from "@/components/project/CaseStudyHeader";
import { CaseStudyBody } from "@/components/project/CaseStudyBody";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

function getProject(slug: string) {
  return projects.find((p) => p.slug === slug && p.caseStudy);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.outcome,
    openGraph: {
      title: project.title,
      description: project.outcome,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || !project.caseStudy) notFound();

  return (
    <article className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <CaseStudyHeader project={project} />
        <CaseStudyBody caseStudy={project.caseStudy} />
      </Container>
    </article>
  );
}
