"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/lib/motion";

const MEDIA = "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)";

/** Elements the ring should expand over to signal "this does something". */
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, [data-cursor="hover"]';

/**
 * Trailing cursor ring for precise-pointer desktops.
 *
 * The native cursor is only hidden once this is actually running (via the
 * `custom-cursor-active` class), so touch, coarse-pointer and reduced-motion
 * visitors — and anyone whose JS fails — keep a normal pointer.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const mm = gsap.matchMedia();
    mm.add(MEDIA, () => {
      const root = document.documentElement;
      root.classList.add("custom-cursor-active");

      // The ring lags the dot slightly; that gap is what reads as weight.
      const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "none" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "none" });
      const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: EASE.soft });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: EASE.soft });

      const onMove = (event: PointerEvent) => {
        dotX(event.clientX);
        dotY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
      };

      const onLeave = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2, overwrite: "auto" });

      // Delegated so cards and links added later still get the hover state.
      const onOver = (event: PointerEvent) => {
        const hit = (event.target as Element | null)?.closest?.(INTERACTIVE);
        gsap.to(ring, {
          scale: hit ? 1.9 : 1,
          borderColor: hit ? "var(--accent)" : "var(--border-strong)",
          duration: 0.3,
          ease: EASE.soft,
          overwrite: "auto",
        });
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerover", onOver, { passive: true });
      document.addEventListener("pointerleave", onLeave);

      return () => {
        root.classList.remove("custom-cursor-active");
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerover", onOver);
        document.removeEventListener("pointerleave", onLeave);
      };
    });
  });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ringRef}
        className="invisible absolute -left-4 -top-4 h-8 w-8 rounded-full border border-border-strong opacity-0 mix-blend-difference"
      />
      <div
        ref={dotRef}
        className="invisible absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-accent opacity-0"
      />
    </div>
  );
}
