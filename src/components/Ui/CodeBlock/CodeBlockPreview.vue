<script setup lang="ts">
import { computed, inject, onBeforeUnmount, provide } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import { useLocale } from "../../../composables/useLocale";
import { codeBlockGroupKey } from "./context";

const preview = tv({
  base: "flex min-h-32 flex-wrap items-center justify-center gap-4 p-6",
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

const { t } = useLocale();

const group = inject(codeBlockGroupKey, null);

if (group) {
  const unregister = group.register({
    value: props.value,
    label: props.label ?? t("codeBlock.preview"),
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
  </div>
</template>
