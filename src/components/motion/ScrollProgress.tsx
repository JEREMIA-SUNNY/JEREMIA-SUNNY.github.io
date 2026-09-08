"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Reading-progress bar pinned under the navbar.
 *
 * This one deliberately runs regardless of `prefers-reduced-motion`: it is an
 * indicator tied 1:1 to scroll position, not decorative movement, and hiding it
 * would remove information rather than motion.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
      }
    );
  }, { scope: ref });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px">
      <div
        ref={ref}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2"
      />
    </div>
  );
}
