import { usePage } from "@inertiajs/vue3";
import { useAppContext } from "../../plugin/context";
import { UserWithExtras } from "./types";


/**
 * Composable to access the current authenticated user.
 */
export const useUser = <
  T extends Record<string, any> = {}
>(): UserWithExtras<T> | null => {
  const ctx = useAppContext();
  const page = usePage().props as any;
  ctx.user = page.auth.user || null;

  return ctx.user as UserWithExtras<T> | null;
};
