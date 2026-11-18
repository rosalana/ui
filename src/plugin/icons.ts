import { addCollection } from "@iconify/vue";

/** The collection the app's own icons live in, used as `local:{name}`. */
export const LOCAL_ICON_PREFIX = "local";

/** Attributes of the root `<svg>` that describe the file, not how its shapes are drawn. */
const FILE_ATTRIBUTES = ["xmlns", "xmlns:xlink", "width", "height", "viewBox", "class", "style", "id"];

/**
 * Registers the app's own SVG icons, so `UiIcon` shows them as `local:{name}` like any bundled
 * set: on the server and in the browser alike, with no request.
 *
 * Each icon is the markup of an SVG file. Its `viewBox` sizes it, and the drawing attributes of
 * the root (`fill="currentColor"`, `stroke-width`…) are kept around its shapes, so an icon drawn
 * in `currentColor` takes the text color.
 *
 * ```ts
 * addLocalIcons({ "single-elimination": "<svg viewBox=\"0 0 512 512\">…</svg>" })
 * // <UiIcon name="local:single-elimination" />
 * ```
 */
export function addLocalIcons(icons: Record<string, string>): void {
  addCollection({
    prefix: LOCAL_ICON_PREFIX,
    icons: Object.fromEntries(
      Object.entries(icons).map(([name, svg]) => [name, parseSvg(svg)]),
    ),
  });
}

function parseSvg(svg: string): { body: string; width: number; height: number } {
  const root = svg.match(/<svg\b([^>]*)>/i);
  const inner = svg.replace(/^[\s\S]*?<svg\b[^>]*>/i, "").replace(/<\/svg>\s*$/i, "").trim();
  const attributes = [...(root?.[1] ?? "").matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)];

  const viewBox = attributes.find(([, name]) => name === "viewBox")?.[2].split(/[\s,]+/).map(Number);
  const [, , width = 24, height = 24] = viewBox ?? [];

  const drawing = attributes
    .filter(([, name]) => !FILE_ATTRIBUTES.includes(name))
    .map(([attribute]) => attribute)
    .join(" ");

  return { body: drawing ? `<g ${drawing}>${inner}</g>` : inner, width, height };
}
