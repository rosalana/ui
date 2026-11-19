<script setup lang="ts">
import { computed } from "vue";
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
</script>
<template>
  <UiDialog data-slot="command-dialog" v-bind="forwarded">
    <!-- Anchored near the top so the palette does not jump while results are filtered -->
    <UiDialogContent
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
