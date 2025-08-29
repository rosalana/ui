import { usePage } from "@inertiajs/vue3";
import { computed, ComputedRef } from "vue";

/**
 * A composable that returns a computed ref of the Inertia page props typed as T.
 * @returns ComputedRef<T>
 */
export function useComputedPage<T>(): ComputedRef<T> {
    return computed<T>(() => usePage().props as T);
}