/**
 * Brand colours in a form WebGL can consume.
 *
 * three.js materials take literal colour values, not CSS custom properties, so
 * these mirror `--accent` / `--accent-2` in `globals.css`. Keep the two in sync
 * — they are the only place the palette is written twice.
 */
export const sceneColors = {
  light: { accent: "#0891b2", accent2: "#7c3aed" },
  dark: { accent: "#22d3ee", accent2: "#a78bfa" },
} as const;

export function getSceneColors(resolvedTheme: string | undefined) {
  return resolvedTheme === "light" ? sceneColors.light : sceneColors.dark;
}
