import Image from "next/image";
import { Briefcase, GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { site } from "@/data/site";
import { education } from "@/data/experience";

export function About() {
  return (
    <Section id="about" labelledBy="about-heading">
      <SectionHeading id="about-heading" eyebrow="About" title="A bit about how I work" />

      <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            {/* The offset accent frame drifts against the portrait on scroll,
                which is what gives the pair a sense of depth. */}
            <div className="relative">
              <Parallax
                speed={0.18}
                className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-accent/30"
              />
              <Image
                src="/jeremia.png"
                alt={`Portrait of ${site.name}`}
                width={240}
                height={240}
                className="relative h-48 w-48 rounded-2xl object-cover object-[center_12%] sm:h-60 sm:w-60"
                priority
              />
            </div>
          </Reveal>

          <Reveal stagger selector="div" delay={0.1}>
            <dl className="grid w-full grid-cols-2 gap-4 sm:max-w-xs">
              <div className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40">
                <dt className="text-xs text-muted-foreground">Experience</dt>
                <dd className="mt-1 text-2xl font-semibold">{site.yearsExperience}</dd>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40">
                <dt className="text-xs text-muted-foreground">Based in</dt>
                <dd className="mt-1 text-sm font-medium">Bengaluru, IN</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="space-y-8">
          <Reveal>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {site.summary}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
              <Briefcase size={20} className="mt-0.5 shrink-0 text-accent" />
              <p className="text-sm">
                Currently building at{" "}
                <span className="font-medium text-foreground">{site.currentCompany}</span> as a
                Full Stack Engineer.
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <GraduationCap size={16} /> Education
              </h3>
            </Reveal>

            <Reveal stagger selector="li" delay={0.08} className="mt-3">
              <ul className="space-y-2">
                {education.map((item) => (
                  <li
                    key={item.credential}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border py-2 text-sm last:border-0"
                  >
                    <span>
                      <span className="font-medium">{item.credential}</span>
                      <span className="text-muted-foreground"> — {item.school}</span>
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.period} · {item.grade}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
