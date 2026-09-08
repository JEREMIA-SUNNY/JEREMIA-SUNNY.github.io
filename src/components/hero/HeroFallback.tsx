import { cn } from "@/lib/utils";

/** Node positions on the outer ring, in degrees. */
const NODES = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * Static stand-in for the WebGL hero.
 *
 * Renders whenever the scene is skipped — no WebGL, a low-powered device, a
 * reduced-motion preference, or while the 3D chunk is still downloading. It is
 * built to look deliberate rather than like a loading state: same silhouette,
 * same palette, no motion and no JavaScript.
 */
export function HeroFallback({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Abstract layered sphere representing a full-stack architecture"
      className={cn("relative grid h-full w-full place-items-center", className)}
    >
      <div className="absolute inset-0 rounded-full bg-radial-glow" />

      {[100, 78, 56].map((size, i) => (
        <div
          key={size}
          style={{ width: `${size}%`, height: `${size}%` }}
          className={cn(
            "absolute rounded-full border",
            i === 1 ? "border-accent-2/25" : "border-accent/25"
          )}
        />
      ))}

      {/* Two flattened rings imply the axes the live scene actually rotates on. */}
      <div className="absolute h-[78%] w-[78%] rounded-full border border-accent/20 [transform:rotateX(72deg)]" />
      <div className="absolute h-[78%] w-[78%] rounded-full border border-accent-2/20 [transform:rotateY(72deg)]" />

      {/* Each node is a full-width rotated track with the dot pinned to its top
          edge, so the ring scales with the container instead of a fixed inset. */}
      {NODES.map((angle, i) => (
        <span
          key={angle}
          style={{ transform: `rotate(${angle}deg)` }}
          className="absolute h-[78%] w-[78%]"
        >
          <span
            className={cn(
              "absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full",
              i % 3 === 0 ? "bg-accent-2" : "bg-accent"
            )}
          />
        </span>
      ))}

      <div className="absolute h-[22%] w-[22%] rounded-full bg-accent/15 blur-xl" />
      <div className="absolute h-2.5 w-2.5 rounded-full bg-accent" />
    </div>
  );
}
