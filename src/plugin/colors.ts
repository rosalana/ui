import { RosalanaUIContext, UiColorPalette } from "./types";
import { inject, provide, RegistryKey } from "./provider";
import tailwindColors from "tailwindcss/colors";

const ROSALANA_UI_COLORS: RegistryKey<UiColorPalette[]> =
  Symbol("RosalanaUIColors");

export function processConfigColors(context: RosalanaUIContext): void {
  registerTailwindPalettes();

  const processed = Object.entries(context.colors || {}).map(([key, c]) => {
    return { key, color: color(c) || c };
  });

  apply("white", processed.find((c) => c.key === "white")?.color || "");
  apply("black", processed.find((c) => c.key === "black")?.color || "");
  apply("theme", processed.find((c) => c.key === "theme")?.color || ""); // TOTO JE TO CO SE MěNÍ s DARK/LIGHT MODEM
  apply("primary", processed.find((c) => c.key === "primary")?.color || "");
}

// POZOR NENÍ BRÁN V POTAZ ZATÍM REŽIM (dark/light)
function apply(name: string, color: UiColorPalette["shades"] | string) {
  if (typeof color === "string") {
    document.documentElement.style.setProperty(`--color-${name}`, color);
  } else {
    Object.entries(color).forEach(([shade, value]) => {
      document.documentElement.style.setProperty(
        `--color-${name}-${shade}`,
        value
      );

      if (shade === "500") {
        const whiteOrBlack = document.documentElement.style.getPropertyValue(
          `--color-${createColorContrast(value)}`
        );
        document.documentElement.style.setProperty(
          `--color-${name}-foreground`,
          whiteOrBlack
        );
      }
    });
  }
}

function createColorContrast(color: string): string {
    // Create a temporary element to parse any CSS color format
    const temp = document.createElement('div');
    temp.style.color = color;
    document.body.appendChild(temp);
    
    const computedColor = getComputedStyle(temp).color;
    document.body.removeChild(temp);
    
    // Handle oklch format
    const oklchMatch = computedColor.match(/oklch\(([^)]+)\)/);
    if (oklchMatch) {
        const values = oklchMatch[1].split(/\s+/);
        const lightness = parseFloat(values[0]);
        // In OKLCH, lightness ranges from 0-1, where 0.5 is roughly the midpoint
        return lightness > 0.65 ? "black" : "white";
    }
    
    // Parse rgb/rgba format
    const rgbMatch = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) {
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 140 ? "black" : "white";
    }
    
    // Fallback to original hex parsing
    if (color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 140 ? "black" : "white";
    }
    
    return "black"; // Default fallback
}

export function createColor(name: string, shades: UiColorPalette["shades"]) {
  const registry = palettes();
  // odstranit případnou duplicitní definici
  const idx = registry.findIndex((p) => p.name === name);
  if (idx !== -1) registry.splice(idx, 1);
  registry.push({ name, shades });
}

function palettes(): UiColorPalette[] {
  try {
    return inject(ROSALANA_UI_COLORS)!;
  } catch {
    const fresh: UiColorPalette[] = [];
    provide(ROSALANA_UI_COLORS, fresh);
    return fresh;
  }
}

function color(name: string): UiColorPalette["shades"] | undefined {
  return palettes().find((color) => color.name === name)?.["shades"];
}

function registerTailwindPalettes(): void {
  Object.entries(tailwindColors).forEach(([name, shades]) => {
    createColor(name, shades as UiColorPalette["shades"]);
  });
}
