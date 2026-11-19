import {
  getCurrentInstance,
  getCurrentScope,
  onMounted,
  onScopeDispose,
  toValue,
  watch,
} from "vue";
import type { MaybeRefOrGetter, WatchStopHandle } from "vue";
// Importing useSonner registers the toaster the dock lives in.
import "../useSonner";
import { closeDock, showDock } from "../useSonner/state";
import type { DockMessage, SonnerId } from "../useSonner/state";

export type {
  DockAction,
  DockActionVariant,
  DockMessage,
} from "../useSonner/state";

/**
 * Shows a persistent dock with actions at the bottom of the toast stack
 * while the condition holds. The user can't close it, it goes away only
 * when the condition stops holding or the component unmounts.
 *
 * A success toast shown while one of its actions runs (e.g. a flash
 * message from the response) takes the dock's place instead of
 * appearing next to it.
 *
 * ```ts
 * useDock(
 *   () => selected.value.length > 0,
 *   () => ({ title: `${selected.value.length} selected`, actions: [...] }),
 * )
 * ```
 */
export function useDock(
  when: MaybeRefOrGetter<boolean>,
  message: MaybeRefOrGetter<DockMessage>,
) {
  let id: SonnerId | null = null;
  let stop: WatchStopHandle | undefined;

  function start() {
    stop = watch(
      () => (toValue(when) ? toValue(message) : null),
      (content) => {
        if (content) id = showDock(id, content);
        else if (id !== null) closeDock(id);
      },
      { immediate: true, deep: true },
    );
  }

  // The toaster lives only in the browser, start there to keep SSR clean.
  if (getCurrentInstance()) onMounted(start);
  else start();

  if (getCurrentScope()) {
    onScopeDispose(() => {
      stop?.();
      if (id !== null) closeDock(id);
    });
  }
}
