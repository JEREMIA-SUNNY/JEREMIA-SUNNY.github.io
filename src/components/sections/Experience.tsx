import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollLine } from "@/components/motion/ScrollLine";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-heading">
      <SectionHeading id="experience-heading" eyebrow="Experience" title="Where I've worked" />

      {/* The timeline rail is two stacked lines: a static track, and a gradient
          that draws down it as the section scrolls. */}
      <ol className="relative space-y-12 pl-8">
        <span aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-border" />
        <ScrollLine />

        {experience.map((item) => (
          <li key={`${item.org}-${item.start}`} className="relative">
            <Reveal>
              <span
                aria-hidden="true"
                className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold">{item.role}</h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {item.start} – {item.end}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {item.org} · {item.location}
              </p>

              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground marker:text-accent">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              <ul className="mt-4 flex flex-wrap gap-2">
                {item.tech.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
