import { RosalanaUIContext, UiColorPalette } from "./types";
import { inject, provide, RegistryKey } from "./provider";
import tailwindColors from "tailwindcss/colors";

const ROSALANA_UI_COLORS: RegistryKey<UiColorPalette[]> =
  Symbol("RosalanaUIColors");

export function processConfigColors(context: RosalanaUIContext): void {
    registerTailwindPalettes();

    const processed = Object.values(context.colors || {}).map((col) => {
        return color(col) || col;
    });

    console.log("Processing colors...", processed);


    const primary = context.colors?.primary;
    document.documentElement.style.setProperty(
        "--primary",
        primary || "hsl(0 0% 9%)"
    );
    
    console.log("Registered palettes:", palettes());
}

export function palettes(): UiColorPalette[] {
  try {
    return inject(ROSALANA_UI_COLORS)!;
  } catch {
    const fresh: UiColorPalette[] = [];
    provide(ROSALANA_UI_COLORS, fresh);
    return fresh;
  }
}

export function createColor(name: string, shades: UiColorPalette["shades"]) {
  const registry = palettes();
  // odstranit případnou duplicitní definici
  const idx = registry.findIndex((p) => p.name === name);
  if (idx !== -1) registry.splice(idx, 1);
  registry.push({ name, shades });
}

export function color(name: string): UiColorPalette["shades"] | undefined {
  return palettes().find((color) => color.name === name)?.["shades"];
}

function registerTailwindPalettes(): void {
  Object.entries(tailwindColors).forEach(([name, shades]) => {
    createColor(name, shades as UiColorPalette["shades"]);
  });
}
