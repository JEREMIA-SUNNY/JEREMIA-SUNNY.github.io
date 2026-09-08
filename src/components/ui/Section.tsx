import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * Standard page section: consistent vertical rhythm plus the shared container.
 *
 * Every home-page section goes through here so section spacing is defined once
 * rather than re-typed per component.
 */
export function Section({
  id,
  labelledBy,
  className,
  children,
}: {
  id: string;
  /** id of the heading that names this section, for `aria-labelledby`. */
  labelledBy: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative py-20 sm:py-28", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
