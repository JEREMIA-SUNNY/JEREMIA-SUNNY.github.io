"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  /** Optional: a decorative layer can carry its visuals on `className` alone. */
  children?: ReactNode;
  className?: string;
  /**
   * Fraction of the element's own height to travel across the full scroll
   * pass. Positive lags behind the page (feels further away), negative leads
   * it (feels closer).
   */
  speed?: number;
};

/**
 * Scroll-linked vertical offset, used to build depth between layers.
 *
 * `scrub` ties progress directly to scroll position rather than playing a
 * timeline, and `yPercent` stays on the compositor — no layout work per frame.
 */
export function Parallax({ children, className, speed = 0.12 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: ref, dependencies: [speed] }
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
