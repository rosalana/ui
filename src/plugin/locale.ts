import { DEFAULT_LOCALE, normalizeLocale } from "../helpers/locale";
import { useAppContext } from "./context";
import type { UiMessages, UiMessagesConfig } from "./messages";

/**
 * The locale the app set, or the default one before the plugin is installed. Works anywhere,
 * also outside components.
 */
export function currentLocale(): string {
  try {
    return useAppContext().locale;
  } catch {
    return DEFAULT_LOCALE;
  }
}

/**
 * The texts the app set for the components, or none before the plugin is installed. Works
 * anywhere, also outside components.
 */
export function currentMessages(): UiMessagesConfig {
  try {
    return useAppContext().messages;
  } catch {
    return {};
  }
}

/**
 * Switches the locale of every component at runtime, e.g. after the user picks a language.
 * Takes a Laravel style code too (`cs_CZ`).
 *
 * Works outside components, so an app can call it from a router event.
 */
export function setLocale(code: string | null | undefined): void {
  useAppContext().locale = normalizeLocale(code);
}

/**
 * Adds or replaces texts of the components for a locale (`cs`, `cs_CZ`), on top of what is
 * already there. Keys left out keep falling back to the language, then to English.
 */
export function setMessages(code: string, messages: Partial<UiMessages>): void {
  const ctx = useAppContext();
  ctx.messages = {
    ...ctx.messages,
    [code]: { ...ctx.messages[code], ...messages },
  } satisfies UiMessagesConfig;
}
