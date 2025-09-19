import { RosalanaUIContext, TailwindShadeLevel, UiColorPalette } from "./types";
import { inject, provide, RegistryKey } from "./provider";
import tailwindColors from "tailwindcss/colors";

const ROSALANA_UI_COLORS: RegistryKey<UiColorPalette[]> =
  Symbol("RosalanaUIColors");

export function processConfigColors(context: RosalanaUIContext): void {
  registerTailwindPalettes();

  const processed = process(context.colors);

  console.log("New process:", processed);

  simpleApply(
    "white",
    (processed.find((c) => c?.key === "white")?.color as string) || ""
  ); // !
  simpleApply(
    "black",
    (processed.find((c) => c?.key === "black")?.color as string) || ""
  ); // !

  applyFullColors(
    "theme",
    (processed.find((c) => c?.key === "theme")
      ?.color as UiColorPalette["shades"])!
  ); // !
  applyFullColors(
    "primary",
    (processed.find((c) => c?.key === "primary")
      ?.color as UiColorPalette["shades"])!
  ); // !

  applyDefaults(
    "theme",
    processed.find((c) => c?.key === "theme")
  ); // !
  applyDefaults(
    "primary",
    processed.find((c) => c?.key === "primary")
  ); // !

  // ještě nám chybí aplikovat background, text, border, ring atd...
}

function simpleApply(name: string, color: string) {
  document.documentElement.style.setProperty(`--color-${name}`, color);
}

function applyFullColors(name: string, color: UiColorPalette["shades"]) {
  Object.entries(color).forEach(([shade, value]) => {
    document.documentElement.style.setProperty(
      `--color-${name}-${shade}`,
      value
    );
  });
}

function applyDefaults(name: string, slot: any) {
  if (!slot) return;

  Object.entries(slot.default).forEach(([mode, c]) => {
    // c je color - mode - light/dark

    if (mode === "light") {
      const whiteOrBlack = document.documentElement.style.getPropertyValue(
        `--color-${pickContrast(c)}`
      );

      document.documentElement.style.setProperty(
        `--color-${name}-foreground`,
        whiteOrBlack
      );

      document.documentElement.style.setProperty(`--color-${name}`, c);

    } else if (mode === "dark") {
      const whiteOrBlack = document.documentElement.style.getPropertyValue(
        `--color-${pickContrast(c)}`
      );

      // tady se to musí udělat k html.dark
      // což ale nejde udělat předem takže celé by to mělo být jako
      //       const style = document.createElement("style");
      //       style.innerHTML = `
      //   :root {
      //     --color-primary: ${lightValue};
      //     --color-primary-foreground: ${pickContrast(lightValue)};
      //   }
      //   .dark {
      //     --color-primary: ${darkValue};
      //     --color-primary-foreground: ${pickContrast(darkValue)};
      //   }
      // `;
      //       document.head.appendChild(style);
    }
  });
}

// POZOR NENÍ BRÁN V POTAZ ZATÍM REŽIM (dark/light)
// TOTO APLIKUJE FULL COLORS I JEDNOTLIVE BARVY

// -> mělo by se aplikovat prvně full colors do tailwindu a potom až jednotlivé barvy např. co má být {light: má být primary-500 nebo primary-800 nebo tak a pak se dopočítá foreground}
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
          `--color-${pickContrast(value)}`
        );
        document.documentElement.style.setProperty(
          `--color-${name}-foreground`,
          whiteOrBlack
        );
      }
    });
  }
}

function process(colors: RosalanaUIContext["colors"]) {
  return Object.entries(colors || {}).map(([key, value]) => {
    if (typeof value === "string") {
      return { key, color: color(value) || value };
    }

    if (typeof value === "object" && value.color) {
      const c = color(value.color) || value.color;

      return {
        key,
        color: c,
        default: applyParentColor(parseColorProperty(value.default), c),
        ...Object.fromEntries(
          Object.entries(value)
            .filter(([k]) => k !== "color" && k !== "default")
            .map(([k, v]) => {
              return [k, applyParentColor(parseColorProperty(v as string), c)];
            })
        ),
      };
    }
  });
}

function applyParentColor(
  prop: { light: string; dark: string },
  parentColor: string | Record<TailwindShadeLevel, string>
) {
  if (typeof parentColor === "string") return prop; // wrong usage

  Object.entries(prop).forEach(([mode, c]) => {
    if (isNaN(Number(c))) {
      // je to se stringem takže zkusíme najít tu barvu
      const findColor = color(c.split("-")[0]);
      if (findColor) {
        prop[mode as "light" | "dark"] =
          findColor[c.split("-")[1] as TailwindShadeLevel] || c;
      }
    } else {
      // je to číslo takže použijeme parent
      prop[mode as "light" | "dark"] =
        parentColor[c as TailwindShadeLevel] || c;
    }
  });

  return prop;
}

function parseColorProperty(prop?: string) {
  let light: string = "500";
  let dark: string = "500";
  if (!prop) return { light, dark };

  const parts = prop.split(" ");

  parts.forEach((p) => {
    if (p.includes("dark")) {
      dark = p.replace("dark:", "") || dark;
    } else {
      light = p || light;
    }
  });

  return { light, dark };
}

function pickContrast(color: string): string {
  // Create a temporary element to parse any CSS color format
  const temp = document.createElement("div");
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
  if (color.startsWith("#")) {
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
