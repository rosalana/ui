import { usePage } from "@inertiajs/vue3";
import { computed, ComputedRef } from "vue";

/**
 * A composable that returns a computed ref of the Inertia page props typed as T.
 * @param key Optional key to access a specific prop (use '.' for mapping).
 * @returns ComputedRef<T>
 */
export function useComputedPage<T>(key?: string): ComputedRef<T> {
  const page = usePage();
  return computed<T>(() => {
    const props = page.props as T;
    if (!key) return props as T;
    return key.split(".").reduce((acc: any, part: any) => acc?.[part], props);
  });
}
