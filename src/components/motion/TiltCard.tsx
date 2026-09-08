"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const MEDIA = "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)";

/**
 * Perspective tilt that follows the cursor across a card.
 *
 * The outer element owns the perspective and the inner one rotates, so the
 * card's own shadow and border stay square to the page while its face turns.
 */
export function TiltCard({
  children,
  className,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  /** Peak rotation at the card's corners, in degrees. */
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const inner = el?.firstElementChild;
      if (!el || !inner) return;

      const mm = gsap.matchMedia();
      mm.add(MEDIA, () => {
        const rotX = gsap.quickTo(inner, "rotationX", { duration: 0.6, ease: EASE.soft });
        const rotY = gsap.quickTo(inner, "rotationY", { duration: 0.6, ease: EASE.soft });

        const onMove = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          rotX(-py * max * 2);
          rotY(px * max * 2);
        };
        const onLeave = () => {
          rotX(0);
          rotY(0);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope: ref, dependencies: [max] }
  );

  return (
    <div ref={ref} className={cn("[perspective:1200px]", className)}>
      <div className="h-full [transform-style:preserve-3d] will-change-transform">{children}</div>
    </div>
  );
}
