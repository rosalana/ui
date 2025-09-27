import {
  ColorsConfig,
  CreateRosalanaUIOptions,
  RosalanaUIContext,
  TailwindShadeLevel,
  UiColorPalette,
  UiColorProp,
} from "./types";
import { flush, inject, provide, RegistryKey } from "./provider";
import tailwindColors from "tailwindcss/colors";

let darkStyles: string[] = [];
let lightStyles: string[] = [];

const ROSALANA_UI_COLORS: RegistryKey<UiColorPalette[]> =
  Symbol("RosalanaUIColors");

export function processConfigColors(context: RosalanaUIContext): void {
  registerTailwindPalettes();

  const processed = process(context.colors);
  const css = createCSS(processed as UiColorPalette[]);

  injectCSSVars(css);

  flush(ROSALANA_UI_COLORS);
}

function createCSS(processed: UiColorPalette[]): string {
  darkStyles = [];
  lightStyles = [];

  processed.forEach((p) => {
    if (typeof p.shades === "string") {
      return applyProp(p.name, p.shades);
    }

    if (typeof p.shades === "object") {
      const { default: slot, shades, name, ...others } = p;
      Object.entries(others).forEach(([k, v]) => {
        const { light, dark } = v as UiColorProp;
        if (light && dark) {
          applyProp(`${k}`, light, "light");
          applyProp(`${k}`, dark, "dark");
        }
      });
    }

    return applySlot(p);
  });

  return `
:root {
${"\t" + lightStyles.join("\n\t")}
}

.dark { 
${"\t" + darkStyles.join("\n\t")}
}
`;
}

function applyProp(
  name: string,
  color: string,
  mode: "light" | "dark" = "light"
) {
  if (mode === "light") {
    lightStyles.push(`--color-${name}: ${color};`);
  } else {
    darkStyles.push(`--color-${name}: ${color};`);
  }
}

function applySlot(pallete: UiColorPalette) {
  if (!pallete) return;
  const { name, shades, default: slot } = pallete;
  const { light, dark } = slot;

  Object.entries(shades).forEach(([shade, value]) => {
    lightStyles.push(`--color-${name}-${shade}: ${value};`);
  });

  lightStyles.push(
    `--color-${name}: ${light};`,
    `--color-${name}-foreground: ${pickContrast(light)};`
  );

  darkStyles.push(
    `--color-${name}: ${dark};`,
    `--color-${name}-foreground: ${pickContrast(dark)};`
  );
}

function injectCSSVars(css: string) {
  const id = "rosalana-ui-colors";
  let style = document.getElementById(id) as HTMLStyleElement;
  if (!style) {
    style = document.createElement("style");
    style.id = id;
    document.head.appendChild(style);
  }
  style.innerHTML = css;
}

function process(colors: RosalanaUIContext["colors"]) {
  return Object.entries(colors || {}).map(([name, value]) => {
    if (typeof value === "string") {
      return { name, shades: color(value) || value };
    }

    if (typeof value === "object" && value.color) {
      const c = color(value.color) || value.color;

      return {
        name,
        shades: c,
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
        if (typeof findColor === "string") {
          prop[mode as "light" | "dark"] = findColor;
        } else {
          prop[mode as "light" | "dark"] =
            findColor[c.split("-")[1] as TailwindShadeLevel] || c;
        }
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
  let dark: string | undefined;

  if (!prop) return { light, dark: light };

  const parts = prop.split(" ");

  parts.forEach((p) => {
    if (p.startsWith("dark:")) {
      dark = p.replace("dark:", "") || light;
    } else {
      light = p || light;
    }
  });

  return { light, dark: dark ?? light };
}

function pickContrast(c: string): string {
  // Parse oklch format
  const oklchMatch = c.match(/oklch\(([^)]+)\)/);
  if (oklchMatch) {
    const values = oklchMatch[1].split(/\s+/);
    const lightness = parseFloat(values[0]);
    return lightness > 65
      ? (color("black") as string)
      : (color("white") as string);
  }

  // Parse rgb/rgba format
  const rgbMatch = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]);
    const g = parseInt(rgbMatch[2]);
    const b = parseInt(rgbMatch[3]);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 140
      ? (color("black") as string)
      : (color("white") as string);
  }

  // Parse hex format
  if (c.startsWith("#")) {
    const r = parseInt(c.slice(1, 3), 16);
    const g = parseInt(c.slice(3, 5), 16);
    const b = parseInt(c.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 140
      ? (color("black") as string)
      : (color("white") as string);
  }

  return color("black") as string; // Default fallback
}

export function createColor(name: string, shades: UiColorPalette["shades"]) {
  const registry = palettes();
  // odstranit případnou duplicitní definici
  const idx = registry.findIndex((p) => p.name === name);
  if (idx !== -1) registry.splice(idx, 1);
  registry.push({ name, shades } as UiColorPalette);
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

function color(name: string): UiColorPalette["shades"] | string {
  return palettes().find((color) => color.name === name)?.["shades"] || name;
}

function registerTailwindPalettes(): void {
  Object.entries(tailwindColors).forEach(([name, shades]) => {
    createColor(name, shades as UiColorPalette["shades"]);
  });
}

/* ↓↓ DEFAULTS FOR COLORS CONFIG ↓↓ */

export function mergeConfigColors(
  config: CreateRosalanaUIOptions["colors"]
): ColorsConfig {
  return {
    white: config?.white || "white",
    black: config?.black || "black",
    theme: { ...theme(), ...(config?.theme || {}) },
    primary: { ...primary(), ...(config?.primary || {}) },
    secondary: { ...secondary(), ...(config?.secondary || {}) },
    muted: { ...muted(), ...(config?.muted || {}) },
    destructive: { ...destructive(), ...(config?.destructive || {}) },
    info: { ...info(), ...(config?.info || {}) },
    success: { ...success(), ...(config?.success || {}) },
    warning: { ...warning(), ...(config?.warning || {}) },
    //... more colors here later
  };
}

const theme = (): NonNullable<Required<ColorsConfig["theme"]>> => ({
  color: "neutral",
  default: "500",
  background: "50 dark:950",
  foreground: "black dark:white",
  border: "200 dark:800",
  input: "200 dark:800",
  ring: "950 dark:300",
});

const primary = (): NonNullable<Required<ColorsConfig["primary"]>> => ({
  color: "neutral",
  default: "500",
});

const secondary = (): NonNullable<Required<ColorsConfig["secondary"]>> => ({
  color: theme().color, // shared color with Theme
  default: "200 dark:800",
});

const muted = (): NonNullable<Required<ColorsConfig["muted"]>> => ({
  color: theme().color, // shared color with Theme
  default: "100 dark:700",
});

const destructive = (): NonNullable<Required<ColorsConfig["destructive"]>> => ({
  color: "red",
  default: "600",
});

const info = (): NonNullable<Required<ColorsConfig["info"]>> => ({
  color: "blue",
  default: "500 dark:400",
});

const success = (): NonNullable<Required<ColorsConfig["success"]>> => ({
  color: "green",
  default: "600 dark:500",
});

const warning = (): NonNullable<Required<ColorsConfig["warning"]>> => ({
  color: "yellow",
  default: "500 dark:400",
});
