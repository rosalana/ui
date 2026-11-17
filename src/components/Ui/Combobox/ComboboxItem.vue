<script setup lang="ts">
import type { ComboboxItemProps } from "reka-ui";
import {
  ComboboxItem,
  ComboboxItemIndicator,
  injectComboboxRootContext,
  useForwardProps,
} from "reka-ui";
import { computed, inject, onBeforeUnmount, onMounted, onUpdated, ref, useId, watchEffect } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import { motion } from "motion-v";
import UiIcon from "../Icon/Icon.vue";
import { COMBOBOX_CONTEXT, COMBOBOX_GROUP_CONTEXT } from "./context";

const comboboxItem = tv({
  base: [
    "relative flex cursor-pointer select-none items-center gap-2",
    "rounded-lg py-2 pl-2.5 pr-8 text-sm outline-none",
    "transition-colors duration-150",
    "data-[highlighted]:text-accent-foreground",
    "data-[disabled]:pointer-events-none data-[disabled]:text-theme-500",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
});

interface Props extends ComboboxItemProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);

const context = inject(COMBOBOX_CONTEXT)!;
const group = inject(COMBOBOX_GROUP_CONTEXT, null);
const { highlightedElement } = injectComboboxRootContext();

const itemRef = ref<{ $el: HTMLElement } | null>(null);

/** The rendered text, kept while the item is filtered out so it can come back. */
const renderedText = ref<string>();

function captureText() {
  const text = itemRef.value?.$el?.textContent?.trim();
  if (!text) return;
  renderedText.value = text;
  context.rememberLabel(props.value, text);
}

onMounted(captureText);
onUpdated(captureText);

/** What the filter matches against: `textValue`, else what the item shows, else the value. */
const text = computed(() => {
  if (props.textValue) return props.textValue;
  if (renderedText.value) return renderedText.value;
  const value = props.value;
  return value === null || typeof value === "object" ? "" : String(value);
});

const visible = computed(() => {
  const matches = context.matches.value;
  const search = context.search.value.trim();
  return !matches || !search || matches(text.value, search);
});

// Tells the group whether it still has something to show
const id = useId();
watchEffect(() => group?.set(id, visible.value));
onBeforeUnmount(() => group?.delete(id));

const isHighlighted = computed(
  () => !!itemRef.value?.$el && highlightedElement.value === itemRef.value.$el,
);
</script>

<template>
  <ComboboxItem
    v-if="visible"
    ref="itemRef"
    data-slot="combobox-item"
    v-bind="forwarded"
    :class="comboboxItem({ class: props.class })"
    as-child
  >
    <motion.div
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.15 }"
    >
      <!-- One highlight that slides between items (layoutId is scoped per combobox) -->
      <motion.div
        v-if="isHighlighted"
        layout-id="combobox-highlight"
        aria-hidden="true"
        class="absolute inset-0 -z-10 rounded-lg border border-border/40 bg-accent"
        :transition="{ type: 'spring', stiffness: 500, damping: 35 }"
      />
      <slot />
      <ComboboxItemIndicator as-child>
        <motion.span
          class="absolute right-2.5 flex text-primary"
          :initial="{ opacity: 0, scale: 0.5 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ type: 'spring', stiffness: 500, damping: 25 }"
        >
          <UiIcon name="lucide:check" />
        </motion.span>
      </ComboboxItemIndicator>
    </motion.div>
  </ComboboxItem>
</template>
