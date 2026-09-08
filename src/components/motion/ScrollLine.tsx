"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Vertical line that draws itself as the section scrolls past.
 *
 * Positions itself against the nearest positioned ancestor, which is also the
 * ScrollTrigger. Under reduced motion the tween is never built, so the line
 * simply renders fully drawn — the visual stays intact, only the drawing goes.
 */
export function ScrollLine({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const trigger = el?.parentElement;
      if (!el || !trigger) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top 75%",
              end: "bottom 85%",
              scrub: 0.4,
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent to-accent-2",
        className
      )}
    />
  );
}
