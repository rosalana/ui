import { usePage } from "@inertiajs/vue3";
import type { Preferences } from "../plugin/types";
import { createAdapter } from "../plugin/adapter";

/**
 * Composable to access user preferences.
 */
export const usePreferences = <T extends Record<string, any> = {}>() => createAdapter<Preferences, T>({
  source: () => usePage().props.preferences as Preferences & T || null,
  name: "preferences",
});
