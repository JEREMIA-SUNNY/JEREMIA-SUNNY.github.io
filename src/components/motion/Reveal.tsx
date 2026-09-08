"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, REVEAL_DISTANCE, REVEAL_START, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after the trigger fires. */
  delay?: number;
  /** Travel distance in px; negative values drop in from above. */
  y?: number;
  /** Animate direct children one after another instead of the wrapper. */
  stagger?: boolean;
  /**
   * CSS selector for the elements to stagger, scoped to this wrapper. Use it
   * when the animated elements must stay direct children of their real parent
   * for semantics — e.g. `<li>` inside a `<ul>`.
   */
  selector?: string;
  /** ScrollTrigger `start` string, if the default fires too early or late. */
  start?: string;
};

/**
 * Scroll-triggered entrance animation.
 *
 * The wrapper ships with `motion-hidden` so server-rendered content is not
 * visible before GSAP takes over — otherwise above-the-fold elements flash at
 * their final position during hydration. Everything runs inside
 * `gsap.matchMedia`, so reduced-motion visitors never get an animation built at
 * all and the CSS in `globals.css` restores full opacity for them.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = REVEAL_DISTANCE,
  stagger = false,
  selector,
  start = REVEAL_START,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const children = selector
          ? Array.from(el.querySelectorAll<HTMLElement>(selector))
          : Array.from(el.children);
        const isGroup = (stagger || Boolean(selector)) && children.length > 0;

        // In group mode the wrapper is only a trigger, so reveal it up front
        // and let its children carry the animation.
        if (isGroup) gsap.set(el, { opacity: 1 });

        gsap.fromTo(
          isGroup ? children : el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: DURATION.reveal,
            ease: EASE.out,
            delay,
            stagger: isGroup ? STAGGER : 0,
            scrollTrigger: { trigger: el, start, once: true },
          }
        );
      });
    },
    { scope: ref, dependencies: [delay, y, stagger, selector, start] }
  );

  return (
    <div ref={ref} className={cn("motion-hidden", className)}>
      {children}
    </div>
  );
}
