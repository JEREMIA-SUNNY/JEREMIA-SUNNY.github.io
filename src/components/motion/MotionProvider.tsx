"use client";

import { useEffect, type ReactNode } from "react";
import { useLenis } from "lenis/react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Wires the smooth-scroll engine to the animation engine.
 *
 * Lenis moves the page on its own rAF loop, so ScrollTrigger's native `scroll`
 * listener sees stale positions and triggers fire late. Pushing every Lenis
 * tick into `ScrollTrigger.update()` keeps the two in lockstep.
 *
 * Must be rendered inside `<ReactLenis>` — `useLenis` reads its context.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);
    return () => {
      lenis.off("scroll", update);
    };
  }, [lenis]);

  useEffect(() => {
    // Web fonts swap in after first paint and change element heights, so any
    // trigger position measured before that is wrong. Re-measure once fonts
    // settle, and again whenever an image finishes decoding.
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);
    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
    };
  }, []);

  return <>{children}</>;
}
