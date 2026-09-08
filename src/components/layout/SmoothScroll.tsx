"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

const NAV_OFFSET = -16;

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        anchors: { offset: NAV_OFFSET },
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
