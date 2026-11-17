<script setup lang="ts" generic="T extends ComboboxItem">
import {
  ComboboxItem as ComboboxItemPrimitive,
  ComboboxItemIndicator,
  injectComboboxRootContext,
} from "reka-ui";
import { computed, ref } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import { motion } from "motion-v";
import UiIcon from "../Icon/Icon.vue";
import UiComboboxShortcut from "./ComboboxShortcut.vue";
import type { ComboboxItem } from "./context";

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

// Inline rather than a named interface, see Combobox.vue.
const props = defineProps<{
  /** The option. Everything about it comes from here, a custom look goes in the default slot. */
  item: T;
  class?: ClassValue;
}>();

defineSlots<{
  /** The inside of the option, in place of its icon, label and shortcut. */
  default?(props: { item: T }): any;
}>();

const { highlightedElement } = injectComboboxRootContext();

const itemRef = ref<{ $el: HTMLElement } | null>(null);
const isHighlighted = computed(
  () => !!itemRef.value?.$el && highlightedElement.value === itemRef.value.$el,
);
</script>

<template>
  <ComboboxItemPrimitive
    ref="itemRef"
    data-slot="combobox-item"
    :value="item.value"
    :text-value="item.label"
    :disabled="item.disabled"
    :class="comboboxItem({ class: props.class })"
    as-child
  >
    <motion.div
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.15 }"
    >
      <!-- One highlight that slides between options (layoutId is scoped per combobox) -->
      <motion.div
        v-if="isHighlighted"
        layout-id="combobox-highlight"
        aria-hidden="true"
        class="absolute inset-0 -z-10 rounded-lg border border-border/40 bg-accent"
        :transition="{ type: 'spring', stiffness: 500, damping: 35 }"
      />

      <slot :item="item">
        <UiIcon v-if="item.icon" :name="item.icon" class="text-theme" />
        <span class="truncate">{{ item.label }}</span>
        <UiComboboxShortcut v-if="item.shortcut">{{ item.shortcut }}</UiComboboxShortcut>
      </slot>

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
  </ComboboxItemPrimitive>
</template>
