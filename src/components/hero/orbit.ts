/**
 * Orbit store for the hero visual.
 *
 * The DOM event handlers live outside the WebGL canvas and the render loop
 * lives inside it, so the rotation has to be shared between them. It is held as
 * a module-scoped mutable object rather than a React ref passed down as a prop:
 * a ref would be mutated from inside `useFrame`, which is a render-rule
 * violation, and state would re-render the tree 60 times a second.
 *
 * There is exactly one hero on the site, so one instance is the right count.
 *
 * Deliberately free of any `three` import — `HeroVisual` needs this module to
 * handle input, and pulling three.js in here would undo the dynamic import that
 * keeps it out of the initial bundle.
 */

export type OrbitState = {
  /** Pitch in radians, clamped to keep the object off its poles. */
  rotX: number;
  /** Yaw in radians — unbounded, so the object turns a full 360°. */
  rotY: number;
  velX: number;
  velY: number;
  dragging: boolean;
};

/** Keeps the object from tumbling past its poles, where it reads as broken. */
const MAX_PITCH = 1.05;

/** Idle spin, radians per second. */
const AUTO_SPIN = 0.16;

/** Fraction of flick velocity retained per 60fps frame. */
const DAMPING = 0.94;

// Opens slightly off-axis so the very first frame already looks dimensional.
const state: OrbitState = {
  rotX: -0.16,
  rotY: 0.45,
  velX: 0,
  velY: 0,
  dragging: false,
};

function clampPitch(value: number) {
  return Math.min(MAX_PITCH, Math.max(-MAX_PITCH, value));
}

export function beginDrag() {
  state.dragging = true;
  state.velX = 0;
  state.velY = 0;
}

export function endDrag() {
  state.dragging = false;
}

/** Applies a pointer delta, already scaled to radians. */
export function dragBy(yaw: number, pitch: number) {
  state.rotY += yaw;
  state.rotX = clampPitch(state.rotX + pitch);
  state.velY = yaw;
  state.velX = pitch;
}

/** Adds velocity without moving anything directly — how the arrow keys glide. */
export function nudge(yaw: number, pitch: number) {
  state.velY += yaw;
  state.velX += pitch;
}

/**
 * Advances one frame of inertia and idle spin, and returns the current
 * rotation. While a drag is in progress the pointer is authoritative, so this
 * only reads.
 */
export function advanceOrbit(delta: number): OrbitState {
  if (!state.dragging) {
    // Exponential decay by elapsed time, so a 120Hz display damps at the same
    // rate as a 60Hz one instead of twice as fast.
    const decay = Math.pow(DAMPING, delta * 60);
    state.rotY += state.velY + AUTO_SPIN * delta;
    state.rotX = clampPitch(state.rotX + state.velX);
    state.velX *= decay;
    state.velY *= decay;
  }
  return state;
}
