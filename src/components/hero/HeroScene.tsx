"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { RenderTier } from "@/hooks/useRenderTier";
import { advanceOrbit } from "./orbit";

const NODE_COUNT = 12;
const CORE_RADIUS = 1.16;

/** Evenly spaced points on a sphere — no clumping at the poles. */
function fibonacciSphere(count: number, radius: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return new THREE.Vector3(
      Math.cos(theta) * ring * radius,
      y * radius,
      Math.sin(theta) * ring * radius
    );
  });
}

/**
 * Deterministic PRNG (mulberry32).
 *
 * `Math.random()` cannot be called during render — an unlucky re-render would
 * reshuffle every particle. A fixed seed also means the field looks identical
 * on every load, which is what makes it feel designed rather than noisy.
 */
function makeRandom(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function StackCore({
  accent,
  accent2,
  particleCount,
}: {
  accent: string;
  accent2: string;
  particleCount: number;
}) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const dust = useRef<THREE.Points>(null);

  const nodes = useMemo(() => fibonacciSphere(NODE_COUNT, CORE_RADIUS), []);

  const particles = useMemo(() => {
    const random = makeRandom(0x5eed);
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Sample a spherical shell so the field reads as depth around the core
      // rather than a flat cloud in front of it.
      const radius = 2.1 + random() * 2.6;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Dragging drives rotation directly; releasing hands it back to inertia
    // that decays into the idle spin.
    const orbit = advanceOrbit(delta);
    group.current.rotation.x = orbit.rotX;
    group.current.rotation.y = orbit.rotY;

    // Counter-rotating outer shell and a slow breath give the silhouette
    // something to read against while the core itself is still.
    const t = state.clock.elapsedTime;
    if (shell.current) {
      shell.current.rotation.y = -t * 0.08;
      shell.current.rotation.z = t * 0.05;
    }
    if (dust.current) {
      dust.current.rotation.y = t * 0.02;
    }
    group.current.scale.setScalar(1 + Math.sin(t * 0.6) * 0.02);
  });

  return (
    <>
      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          color={accent}
          transparent
          opacity={0.55}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <group ref={group}>
        <mesh ref={shell}>
          <icosahedronGeometry args={[1.72, 1]} />
          <meshBasicMaterial color={accent2} wireframe transparent opacity={0.16} />
        </mesh>

        <mesh>
          <icosahedronGeometry args={[CORE_RADIUS, 1]} />
          <meshBasicMaterial color={accent} wireframe transparent opacity={0.5} />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={0.14}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Three rings on different axes: the cue that this thing has volume. */}
        {[
          [Math.PI / 2, 0, 0],
          [0, 0, Math.PI / 3],
          [Math.PI / 3, Math.PI / 4, 0],
        ].map((rotation, i) => (
          <mesh key={i} rotation={rotation as [number, number, number]}>
            <torusGeometry args={[1.42 + i * 0.12, 0.004, 8, 128]} />
            <meshBasicMaterial
              color={i === 1 ? accent2 : accent}
              transparent
              opacity={0.42}
            />
          </mesh>
        ))}

        {nodes.map((position, i) => (
          <mesh key={i} position={position}>
            <sphereGeometry args={[0.038, 12, 12]} />
            <meshBasicMaterial color={i % 3 === 0 ? accent2 : accent} />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function HeroScene({
  tier,
  accent,
  accent2,
  active,
}: {
  tier: RenderTier;
  accent: string;
  accent2: string;
  /** False when the hero has scrolled out of view — stops the render loop. */
  active: boolean;
}) {
  const high = tier === "high";

  return (
    <Canvas
      // `flat` disables ACES tone mapping so the accent renders as the exact
      // brand colour rather than a desaturated approximation of it.
      flat
      frameloop={active ? "always" : "never"}
      dpr={high ? [1, 2] : [1, 1.5]}
      // A sphere of radius R is only fully in frame when the camera sits at
      // least R / sin(fov/2) away — 1.72 / sin(22.5°) ≈ 4.5. 5.3 clears that
      // with margin, so the outer shell never clips against the container edge.
      camera={{ position: [0, 0, 5.3], fov: 45 }}
      gl={{
        antialias: high,
        alpha: true,
        powerPreference: high ? "high-performance" : "default",
      }}
      style={{ touchAction: "pan-y" }}
    >
      <StackCore
        accent={accent}
        accent2={accent2}
        particleCount={high ? 700 : 260}
      />
    </Canvas>
  );
}
