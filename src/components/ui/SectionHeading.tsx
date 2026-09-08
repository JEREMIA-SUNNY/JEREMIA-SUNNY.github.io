import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { cn } from "@/lib/utils";

/**
 * Section header with its entrance built in.
 *
 * Sections stay server components; the motion lives inside the two client
 * primitives this composes.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 max-w-2xl sm:mb-16", className)}>
      <Reveal>
        <p className="flex items-center gap-3 font-mono text-sm text-accent">
          <span aria-hidden="true" className="h-px w-8 bg-accent/50" />
          {eyebrow}
        </p>
      </Reveal>

      <SplitReveal
        as="h2"
        id={id}
        text={title}
        delay={0.08}
        className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
      />

      {description && (
        <Reveal delay={0.2} className="mt-4">
          <p className="text-muted-foreground">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
