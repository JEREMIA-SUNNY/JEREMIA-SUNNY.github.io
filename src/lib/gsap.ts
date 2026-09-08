"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Single registration point for GSAP plugins.
 *
 * Plugins must be registered before any tween that uses them, and registering
 * twice is wasteful, so every client component imports GSAP from here rather
 * than from `gsap` directly. `useGSAP` is registered as a plugin so its
 * `gsap.context()` cleanup runs on unmount.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger);

export { gsap, ScrollTrigger, useGSAP };
