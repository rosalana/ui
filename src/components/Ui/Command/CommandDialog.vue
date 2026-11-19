<script setup lang="ts">
import { computed } from "vue";
import { useEventListener } from "@vueuse/core";
import type { DialogRootEmits, DialogRootProps } from "reka-ui";
import { useForwardPropsEmits } from "reka-ui";
import { useLocale } from "../../../composables/useLocale";
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
const props = defineProps<Props>();
const emit = defineEmits<DialogRootEmits>();
const rootProps = computed(() => ({
  open: props.open,
  defaultOpen: props.defaultOpen,
  modal: props.modal,
}));
const forwarded = useForwardPropsEmits(rootProps, emit);
const { t } = useLocale();
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
  <UiDialog data-slot="command-dialog" v-bind="forwarded">
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
