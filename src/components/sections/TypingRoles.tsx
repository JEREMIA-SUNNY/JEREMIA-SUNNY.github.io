"use client";

import { useTypewriter } from "@/hooks/useTypewriter";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function TypingRoles({ roles }: { roles: readonly string[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const typed = useTypewriter(roles);

  return (
    <p className="h-7 font-mono text-lg text-accent sm:text-xl" aria-live="off">
      <span aria-hidden={reducedMotion ? undefined : "true"}>
        {reducedMotion ? roles[0] : typed}
      </span>
      {!reducedMotion && (
        <span className="ml-0.5 inline-block w-[1px] animate-pulse border-r-2 border-accent" />
      )}
      <span className="sr-only">{roles.join(", ")}</span>
    </p>
  );
}
