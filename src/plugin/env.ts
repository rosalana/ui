/**
 * True when running in a browser.
 *
 * Anything touching `document`, `window` or `localStorage` has to be skipped
 * on the server, otherwise the plugin throws during SSR.
 */
export const isBrowser = (): boolean =>
  typeof document !== "undefined" && typeof window !== "undefined";
