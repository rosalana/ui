<script setup lang="ts">
import type { ComboboxInputProps } from "reka-ui";
import {
  ComboboxInput,
  injectComboboxRootContext,
  useForwardProps,
} from "reka-ui";
import { tv , type ClassValue } from "tailwind-variants";
import { AnimatePresence, motion } from "motion-v";
import UiIcon from "../Icon/Icon.vue";
import UiButton from "../Button/Button.vue";

const commandInput = tv({
  base: [
    "flex h-11 w-full bg-transparent py-3 text-sm text-foreground outline-none",
    "placeholder:text-theme",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
});

interface Props extends ComboboxInputProps {
  class?: ClassValue;
}

// A command is not a select: never write the picked item's value into the search field.
const props = withDefaults(defineProps<Props>(), {
  displayValue: () => "",
});

// Attributes like `placeholder` belong to the input, not the wrapper.
defineOptions({ inheritAttrs: false });
const forwarded = useForwardProps(props);

const { filterSearch, inputElement } = injectComboboxRootContext();

/**
 * Clears through a real input event, so the input's own model, the filter and any `v-model`
 * all reset. `ComboboxCancel` only resets the DOM value, which the next render puts back.
 */
function clear() {
  const input = inputElement.value;
  if (!input) return;

  input.value = "";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.focus();
}
</script>

<template>
  <div
    class="flex items-center gap-2 border-b px-3"
    data-slot="command-input-wrapper"
  >
    <UiIcon name="lucide:search" class="size-4 shrink-0 text-theme" />
    <ComboboxInput
      data-slot="command-input"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="[commandInput({ class: props.class })]"
    />

    <AnimatePresence>
      <motion.div
        v-if="filterSearch"
        :initial="{ opacity: 0, scale: 0.5, rotate: -45 }"
        :animate="{ opacity: 1, scale: 1, rotate: 0 }"
        :exit="{ opacity: 0, scale: 0.5, rotate: 45 }"
        :transition="{ type: 'spring', stiffness: 300, damping: 20 }"
      >
        <UiButton
          variant="clear"
          size="icon-sm"
          tabindex="-1"
          type="button"
          class="size-7 text-destructive"
          @click="clear"
        >
          <UiIcon name="lucide:x" class="size-4" />
          <span class="sr-only">Clear search</span>
        </UiButton>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
