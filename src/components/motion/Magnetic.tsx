"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Only precise pointers that also want motion get the magnetic pull. */
const MEDIA = "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)";

/**
 * Nudges its child toward the cursor while hovered, then springs back.
 *
 * Purely additive: the wrapper is a plain inline-block, so the child keeps its
 * own focus, click and keyboard behaviour untouched.
 */
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(MEDIA, () => {
        // quickTo reuses one tween instead of allocating a new one per
        // pointermove — the difference is visible on a 120Hz trackpad.
        const moveX = gsap.quickTo(el, "x", { duration: 0.5, ease: EASE.soft });
        const moveY = gsap.quickTo(el, "y", { duration: 0.5, ease: EASE.soft });

        const onMove = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          moveX((event.clientX - (rect.left + rect.width / 2)) * strength);
          moveY((event.clientY - (rect.top + rect.height / 2)) * strength);
        };
        const onLeave = () => {
          moveX(0);
          moveY(0);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope: ref, dependencies: [strength] }
  );

  // Two spans, not one: the outer stays untransformed so an enclosing <Reveal>
  // can animate it without fighting the magnetic tween on the inner one.
  return (
    <span className={cn("inline-block", className)}>
      <span ref={ref} className="inline-block will-change-transform">
        {children}
      </span>
    </span>
  );
}
