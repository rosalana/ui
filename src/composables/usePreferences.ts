import type { Preferences } from "../plugin/types";
import { createAdapter } from "../plugin/adapter";
import { useComputedPage } from "./useComputedPage";

/**
 * Composable to access user preferences.
 */
export const usePreferences = <T extends Record<string, any> = {}>() => createAdapter<Preferences, T>({
  source: useComputedPage<Preferences & T>('preferences'),
  name: "preferences",
});
