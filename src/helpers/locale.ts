/**
 * Locale codes.
 *
 * Apps pass whatever their backend uses, Laravel style `cs`, `en_GB`, `cs_CZ`. Everything that
 * formats (Intl, @internationalized/date, reka-ui) wants a BCP 47 tag, `cs-CZ`. These helpers turn
 * one into the other and match a locale against what is available, so a component or a
 * translation can fall back from `cs-CZ` to `cs` before it gives up and uses the default.
 */

/** Locale used when the app sets none. The same on the server and in the browser. */
export const DEFAULT_LOCALE = "en";

/**
 * BCP 47 tag of a locale code: `cs_CZ` → `cs-CZ`, `en-gb` → `en-GB`, `cs` → `cs`.
 * An empty or invalid code gives the fallback.
 */
export function normalizeLocale(
  code?: string | null,
  fallback: string = DEFAULT_LOCALE,
): string {
  const tag = code?.trim().replace(/_/g, "-");
  if (!tag) return fallback;

  try {
    return Intl.getCanonicalLocales(tag)[0] ?? fallback;
  } catch {
    return fallback;
  }
}

/** Language part of a locale code: `cs_CZ` → `cs`, `en-GB` → `en`. */
export function localeLanguage(code?: string | null): string {
  return normalizeLocale(code).split("-")[0].toLowerCase();
}

/**
 * The best of the available locales for a locale code: the exact tag, then the bare language,
 * then another region of the same language (`cs-SK` for `cs-CZ`), then nothing.
 *
 * ```ts
 * matchLocale("cs_CZ", ["en", "cs"]); // "cs"
 * matchLocale("de", ["en", "cs"]); // undefined
 * ```
 */
export function matchLocale<T extends string>(
  code: string | null | undefined,
  available: readonly T[],
): T | undefined {
  const tag = normalizeLocale(code);
  const language = localeLanguage(tag);
  const normalized = available.map((item) => normalizeLocale(item, ""));

  const exact = normalized.indexOf(tag);
  if (exact !== -1) return available[exact];

  const bare = normalized.indexOf(language);
  if (bare !== -1) return available[bare];

  const region = normalized.findIndex((item) => item && localeLanguage(item) === language);
  return region !== -1 ? available[region] : undefined;
}
