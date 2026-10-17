<script setup lang="ts">
import type { ComboboxItemProps } from "reka-ui";
import {
  ComboboxItem,
  injectComboboxRootContext,
  useForwardProps,
} from "reka-ui";
import { computed, ref } from "vue";
import { tv , type ClassValue } from "tailwind-variants";
import { motion } from "motion-v";

const commandItem = tv({
  base: [
    "relative flex cursor-pointer select-none items-center gap-2",
    "rounded-lg px-2.5 py-2 text-sm outline-none",
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

const { highlightedElement } = injectComboboxRootContext();

const itemRef = ref<{ $el: HTMLElement } | null>(null);
const isHighlighted = computed(
  () => !!itemRef.value?.$el && highlightedElement.value === itemRef.value.$el
);
</script>

<template>
  <ComboboxItem
    ref="itemRef"
    data-slot="command-item"
    v-bind="forwarded"
    :class="[commandItem({ class: props.class })]"
    as-child
  >
    <motion.div
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.15 }"
    >
      <!-- One highlight that slides between items (layoutId is scoped per command) -->
      <motion.div
        v-if="isHighlighted"
        layout-id="command-highlight"
        aria-hidden="true"
        class="absolute inset-0 -z-10 rounded-lg border border-border/40 bg-accent"
        :transition="{ type: 'spring', stiffness: 500, damping: 35 }"
      />
      <slot />
    </motion.div>
  </ComboboxItem>
</template>
