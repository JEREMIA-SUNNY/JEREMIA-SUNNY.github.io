"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { useTheme } from "next-themes";
import { useRenderTier } from "@/hooks/useRenderTier";
import { getSceneColors } from "@/lib/theme-colors";
import { HeroFallback } from "@/components/hero/HeroFallback";
import { beginDrag, dragBy, endDrag, nudge } from "@/components/hero/orbit";

// three.js and the fibre renderer are ~450kB of the bundle. Splitting them out
// keeps them off the critical path, and `ssr: false` skips a server render that
// would only be thrown away — WebGL cannot run there.
const HeroScene = dynamic(() => import("@/components/hero/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

/** Radians of rotation per pixel dragged. */
const DRAG_SENSITIVITY = 0.006;
/** Velocity injected per arrow-key press; damping turns it into a smooth arc. */
const KEY_IMPULSE = 0.05;

const KEY_VECTORS: Record<string, [yaw: number, pitch: number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
};

/**
 * The hero's 360° visual, plus every reason it might not run.
 *
 * Drag (mouse, pen or touch) and the arrow keys both spin the object on two
 * axes; releasing hands off to inertia that settles back into an idle spin.
 */
export function HeroVisual() {
  const tier = useRenderTier();
  const { resolvedTheme } = useTheme();
  const colors = getSceneColors(resolvedTheme);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastPointer = useRef({ x: 0, y: 0 });

  const [active, setActive] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Rendering a scene nobody can see is pure battery drain, so the render loop
  // is parked whenever the hero scrolls away.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "150px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (tier === "off") {
    return <HeroFallback />;
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    beginDrag();
    lastPointer.current = { x: event.clientX, y: event.clientY };
    setHasInteracted(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    dragBy(
      (event.clientX - lastPointer.current.x) * DRAG_SENSITIVITY,
      (event.clientY - lastPointer.current.y) * DRAG_SENSITIVITY
    );
    lastPointer.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    endDrag();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const vector = KEY_VECTORS[event.key];
    if (!vector) return;
    // Arrow keys would otherwise scroll the page out from under the visual.
    event.preventDefault();
    nudge(vector[0] * KEY_IMPULSE, vector[1] * KEY_IMPULSE);
    setHasInteracted(true);
  };

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Interactive 3D visual of a layered full-stack architecture. Drag it, or press the arrow keys, to rotate it in any direction."
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      className="relative h-full w-full cursor-grab touch-pan-y rounded-full active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
      data-cursor="hover"
    >
      <HeroScene
        tier={tier}
        accent={colors.accent}
        accent2={colors.accent2}
        active={active}
      />

      <span
        aria-hidden="true"
        // Pinned to the top: the terminal card that floats over this visual
        // covers its bottom-left, which is where a hint would normally sit.
        className={`pointer-events-none absolute inset-x-0 top-0 text-center font-mono text-xs text-muted-foreground transition-opacity duration-500 ${
          hasInteracted ? "opacity-0" : "opacity-100"
        }`}
      >
        drag to rotate
      </span>
    </div>
  );
}
