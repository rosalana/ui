import { useAppContext } from "./context";

/**
 * The time zone the app set, or `null` when dates show in the browser's zone (also before the
 * plugin is installed). Works anywhere, also outside components.
 */
export function currentTimeZone(): string | null {
  try {
    return useAppContext().timeZone ?? null;
  } catch {
    return null;
  }
}

/**
 * Switches the time zone dates show in, e.g. after the user changes it in their settings.
 * `null` goes back to the browser's zone. Works outside components.
 */
export function setTimeZone(zone: string | null | undefined): void {
  useAppContext().timeZone = zone || null;
}
