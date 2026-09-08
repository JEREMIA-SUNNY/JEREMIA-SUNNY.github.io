"use client";

import { useSyncExternalStore } from "react";

/**
 * How much of the immersive hero a device should be asked to draw.
 *
 * - `high` — full scene, full pixel ratio
 * - `low`  — same scene, fewer particles and a capped pixel ratio
 * - `off`  — no WebGL at all; the static fallback renders instead
 */
export type RenderTier = "high" | "low" | "off";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

let webglSupported: boolean | null = null;

function hasWebgl() {
  if (webglSupported !== null) return webglSupported;
  try {
    const canvas = document.createElement("canvas");
    webglSupported = Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl")
    );
  } catch {
    webglSupported = false;
  }
  return webglSupported;
}

function detect(): RenderTier {
  if (window.matchMedia(REDUCED_MOTION).matches) return "off";
  if (!hasWebgl()) return "off";

  const cores = navigator.hardwareConcurrency || 4;
  // Non-standard but widely shipped on the low-end Android devices this is
  // meant to catch; absent on Safari, where the other signals carry the call.
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;

  if (cores <= 2 || memory <= 2) return "off";
  if (cores <= 4 || memory <= 4 || window.matchMedia("(pointer: coarse)").matches) {
    return "low";
  }
  return "high";
}

// Cached so getSnapshot is referentially stable — React compares snapshots with
// Object.is on every render and would loop forever on a fresh value each time.
let cached: RenderTier | null = null;

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION);
  const handler = () => {
    cached = null;
    onChange();
  };
  mql.addEventListener("change", handler);
  return () => mql.removeEventListener("change", handler);
}

function getSnapshot(): RenderTier {
  if (cached === null) cached = detect();
  return cached;
}

function getServerSnapshot(): RenderTier {
  return "off";
}

/**
 * Picks a render tier from the device's capabilities and motion preference.
 *
 * Server-renders as `off` so the static fallback is what ships in the HTML;
 * the client upgrades after hydration if the device can take it.
 */
export function useRenderTier(): RenderTier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
