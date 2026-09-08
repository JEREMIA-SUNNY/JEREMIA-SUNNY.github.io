"use client";

import { Fragment, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, REVEAL_START } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p";

type SplitRevealProps = {
  text: string;
  as?: Tag;
  id?: string;
  className?: string;
  delay?: number;
};

/**
 * Headline that rises into view a word at a time from behind a mask.
 *
 * The split spans are `aria-hidden` and the real string is exposed once via
 * `aria-label`, so assistive tech reads a single clean sentence instead of a
 * word-by-word stutter.
 */
export function SplitReveal({
  text,
  as: Tag = "h2",
  id,
  className,
  delay = 0,
}: SplitRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(el, { opacity: 1 });
        gsap.fromTo(
          el.querySelectorAll<HTMLElement>("[data-word]"),
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1,
            ease: EASE.out,
            delay,
            stagger: 0.055,
            scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
          }
        );
      });
    },
    { scope: ref, dependencies: [text, delay] }
  );

  const words = text.split(" ");

  return (
    <Tag ref={ref} id={id} aria-label={text} className={cn("motion-hidden", className)}>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            {/* The mask is what the word slides out from; `pb-[0.12em]` keeps
                descenders (g, y, p) from being clipped by the overflow. */}
            <span className="inline-flex overflow-hidden pb-[0.12em] align-bottom">
              <span data-word className="inline-block will-change-transform">
                {word}
              </span>
            </span>
            {/* A real space, not a sized spacer: the heading's textContent is
                what search engines index and what a reader copies. */}
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
