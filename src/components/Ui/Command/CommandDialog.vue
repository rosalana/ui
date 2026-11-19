<script setup lang="ts">
import { useEventListener, useVModel } from "@vueuse/core";
import type { DialogRootEmits, DialogRootProps } from "reka-ui";
import { useLocale } from "../../../composables/useLocale";
import { defineShortcuts } from "../../../composables/useShortcuts";
import UiDialog from "../Dialog/Dialog.vue";
import UiDialogContent from "../Dialog/DialogContent.vue";
import UiDialogTitle from "../Dialog/DialogTitle.vue";
import UiDialogDescription from "../Dialog/DialogDescription.vue";
import Command from "./Command.vue";
interface Props extends DialogRootProps {
  /** Use externally filtered results, for example a documentation search index. */
  ignoreFilter?: boolean;
  loading?: boolean;
  title?: string;
  description?: string;
}
// `open: undefined`, or Vue would cast a missing `open` to `false` and `defaultOpen` would never apply.
const props = withDefaults(defineProps<Props>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
});
const emit = defineEmits<DialogRootEmits>();
const { t } = useLocale();

// Works with `v-model:open` as well as with `defaultOpen` only.
const open = useVModel(props, "open", emit, {
  passive: true,
  defaultValue: props.defaultOpen,
});

// The list's own dismissable layer catches Escape before the dialog does.
defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [() => !!open.value],
    handler: () => (open.value = false),
  },
});
/**
 * Reka focus scopes of the dialog and of the list take the focus on their own
 * container (`tabindex="-1"`), e.g. when the results change while typing. In a
 * command palette the focus always belongs to the search input.
 */
function focusInput(content: HTMLElement) {
  content
    .querySelectorAll('[data-slot="command-list"]')
    .forEach((el) => el.removeAttribute("tabindex"));
  content.removeAttribute("tabindex");
  content
    .querySelector<HTMLInputElement>('[data-slot="command-input"]')
    ?.focus();
}

function onOpenAutoFocus(event: Event) {
  event.preventDefault();
  focusInput(event.target as HTMLElement);
}

// Reka sends the open auto focus only while the focus is still outside the dialog,
// so it can't be the only guard: catch every focus that lands on a container.
useEventListener("focusin", (event) => {
  const target = event.target as HTMLElement;
  if (!target.matches?.('[data-slot="dialog-content"], [data-slot="command-list"]'))
    return;

  const content = target.closest<HTMLElement>('[data-slot="dialog-content"]');
  if (content?.querySelector('[data-slot="command-input"]')) focusInput(content);
});
</script>
<template>
  <UiDialog
    data-slot="command-dialog"
    :open="open"
    :modal="modal"
    @update:open="open = $event"
  >
    <!-- Anchored near the top so the palette does not jump while results are filtered -->
    <UiDialogContent
      @open-auto-focus="onOpenAutoFocus"
      hide-close-button
      class="top-[15vh] translate-y-0 gap-0 overflow-hidden p-0"
    >
      <UiDialogTitle class="sr-only">
        {{ props.title ?? t("command.title") }}
      </UiDialogTitle>
      <UiDialogDescription class="sr-only">
        {{ props.description ?? t("command.description") }}
      </UiDialogDescription>
      <Command
        class="rounded-none border-0 shadow-none"
        :ignore-filter="ignoreFilter"
        :loading="loading"
      >
        <slot />
      </Command>
    </UiDialogContent>
  </UiDialog>
</template>
