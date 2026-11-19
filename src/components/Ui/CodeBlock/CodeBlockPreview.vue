<script setup lang="ts">
import { computed, inject, onBeforeUnmount, provide, useSlots } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import { useLocale } from "../../../composables/useLocale";
import { codeBlockGroupKey } from "./context";

const preview = tv({
  base: "relative flex min-h-32 flex-wrap items-center justify-center gap-4 p-6",
});

interface Props {
  /** Item value inside a UiCodeBlockGroup. */
  value?: string;
  /** Label inside a UiCodeBlockGroup. Defaults to "Preview". */
  label?: string;
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  value: "preview",
});

defineSlots<{
  default?: () => unknown;
  /** Buttons for the preview, e.g. a reset. In a group they sit in the header next to the copy button. */
  actions?: () => unknown;
}>();
const slots = useSlots();

const { t } = useLocale();

const group = inject(codeBlockGroupKey, null);

if (group) {
  const unregister = group.register({
    value: props.value,
    label: props.label ?? t("codeBlock.preview"),
    actions: () => slots.actions,
  });
  onBeforeUnmount(unregister);
}

const shown = computed(() => !group || group.current.value === props.value);

// A code block shown in the preview stands on its own, it doesn't join this group.
provide(codeBlockGroupKey, null);
</script>

<template>
  <!-- v-show keeps the preview's own state while the code is shown -->
  <div
    v-show="shown"
    data-slot="code-block-preview"
    :class="preview({ class: props.class })"
  >
    <slot />
    <div
      v-if="!group && $slots.actions"
      data-slot="code-block-preview-actions"
      class="absolute top-2 right-2 flex items-center gap-1"
    >
      <slot name="actions" />
    </div>
  </div>
</template>
