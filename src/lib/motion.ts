/**
 * Motion design tokens.
 *
 * The CSS-side equivalents live in `globals.css` (`--duration-*`, `--ease-*`);
 * these are the GSAP-side values so a CSS transition and a GSAP tween on the
 * same element read as one motion language.
 */

export const DURATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.5,
  reveal: 0.9,
} as const;

export const EASE = {
  /** Decisive entrances — matches --ease-out-expo. */
  out: "expo.out",
  /** Softer settle for hover/pointer follow. */
  soft: "power3.out",
  /** Slight overshoot for playful micro-interactions. */
  spring: "back.out(1.7)",
} as const;

/** How far a revealing element travels before settling, in px. */
export const REVEAL_DISTANCE = 28;

/** Delay between staggered siblings, in seconds. */
export const STAGGER = 0.09;

/** ScrollTrigger start position: fire once the element is comfortably in view. */
export const REVEAL_START = "top 88%";
