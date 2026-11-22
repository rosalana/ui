import {
  getCurrentInstance,
  getCurrentScope,
  markRaw,
  onMounted,
  onScopeDispose,
  toValue,
  watch,
} from "vue";
import type { MaybeRefOrGetter, WatchStopHandle } from "vue";
// Importing useSonner registers the toaster the dock lives in.
import "../useSonner";
import { closeDock, isDockContent, showDock } from "../useSonner/state";
import type { DockInput, SonnerId } from "../useSonner/state";

export type {
  DockAction,
  DockActionVariant,
  DockContent,
  DockInput,
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
 *
 * Instead of a message it can show custom content, a component or a VNode
 * made with `h()`. The content handles its own behavior, the dock only
 * gives it its surface.
 *
 * ```ts
 * useDock(editing, () => h(UnsavedChanges, { onSave: save }))
 * ```
 */
export function useDock(
  when: MaybeRefOrGetter<boolean>,
  message: MaybeRefOrGetter<DockInput>,
) {
  let id: SonnerId | null = null;
  let stop: WatchStopHandle | undefined;

  function start() {
    stop = watch(
      () => {
        if (!toValue(when)) return null;
        const content = toValue(message);
        // Raw, so the deep watch doesn't walk into a component.
        return isDockContent(content) ? markRaw(content) : content;
      },
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
