import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudy } from "@/lib/types";

function CaseStudySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border py-8 first:border-0 first:pt-0">
      <Reveal>
        <h2 className="font-mono text-sm text-accent">{title}</h2>
        {children}
      </Reveal>
    </section>
  );
}

export function CaseStudyBody({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="mt-10">
      <CaseStudySection title="Problem & context">
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {caseStudy.problem}
        </p>
      </CaseStudySection>

      <CaseStudySection title="Constraints & tradeoffs">
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {caseStudy.constraints}
        </p>
      </CaseStudySection>

      <CaseStudySection title="Architecture">
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {caseStudy.architecture}
        </p>
      </CaseStudySection>

      <CaseStudySection title="Results & lessons">
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-muted-foreground marker:text-accent">
          {caseStudy.results.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      </CaseStudySection>
    </div>
  );
}
