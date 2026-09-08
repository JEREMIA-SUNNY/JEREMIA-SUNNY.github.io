import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { iconMap } from "@/components/ui/icon-map";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { capabilities } from "@/data/capabilities";

/**
 * Bento layout: the first two cards take half the row each, the remaining
 * three split the row below — a deliberate hierarchy rather than a flat grid.
 */
const SPAN = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export function Capabilities() {
  return (
    <Section id="capabilities" labelledBy="capabilities-heading">
      <SectionHeading
        id="capabilities-heading"
        eyebrow="Capabilities"
        title="What I bring to a product"
        description="Five areas, each with something on this page or in production you can check it against."
      />

      <Reveal stagger className="grid gap-5 lg:grid-cols-6">
        {capabilities.map((capability, i) => {
          const Icon = iconMap[capability.icon];
          return (
            <TiltCard key={capability.title} className={SPAN[i]}>
              <article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent/40">
                {/* Sheen that fades in on hover — decorative, so it is hidden
                    from assistive tech and never affects layout. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-accent-2/8 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    {Icon && <Icon size={18} />}
                  </span>
                  <h3 className="text-lg font-semibold">{capability.title}</h3>
                </div>

                <p className="relative text-sm leading-relaxed text-muted-foreground">
                  {capability.summary}
                </p>

                <p className="relative flex gap-2 border-l-2 border-accent/40 pl-3 text-sm text-foreground/80">
                  <span className="sr-only">Evidence:</span>
                  {capability.proof}
                </p>

                <ul className="relative mt-auto flex flex-wrap gap-2 pt-2">
                  {capability.tools.map((tool) => (
                    <li key={tool}>
                      <Tag>{tool}</Tag>
                    </li>
                  ))}
                </ul>
              </article>
            </TiltCard>
          );
        })}
      </Reveal>
    </Section>
  );
}
