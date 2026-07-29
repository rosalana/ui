/**
 * v-model modifiers.
 *
 * Vue applies `.lazy`, `.number` and `.trim` itself only to native elements. A component gets
 * them as a `modelModifiers` prop and has to honor them, so a component that ignores the prop
 * makes `v-model.lazy` look like it works while it changes nothing.
 */
export type ModelModifiers = {
  /** Emit on `change` — blur or Enter — instead of on every keystroke. */
  lazy?: boolean;
  /** Emit a number once the value parses as one. */
  number?: boolean;
  /** Strip surrounding whitespace before emitting. */
  trim?: boolean;
};

/** Modifiers that make sense for a value that is always text. */
export type TextModelModifiers = Pick<ModelModifiers, "lazy" | "trim">;

/**
 * Applies `.trim` and `.number` to a raw input value.
 *
 * Mirrors Vue's own `looseToNumber`: a value that does not parse as a number is passed through
 * untouched, so an emptied field emits `""` rather than `NaN` and a half-typed `"1e"` survives
 * until the next keystroke.
 */
export function applyModelModifiers(
  value: string,
  modifiers: ModelModifiers = {}
): string | number {
  const text = modifiers.trim ? value.trim() : value;

  if (!modifiers.number) return text;

  const parsed = Number.parseFloat(text);

  return Number.isNaN(parsed) ? text : parsed;
}
