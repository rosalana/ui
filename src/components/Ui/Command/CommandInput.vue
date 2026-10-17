<script setup lang="ts">
import type { ListboxFilterProps } from "reka-ui";
import { ListboxFilter, useForwardProps } from "reka-ui";
import { tv, type ClassValue } from "tailwind-variants";
import { AnimatePresence, motion } from "motion-v";
import UiIcon from "../Icon/Icon.vue";
import UiButton from "../Button/Button.vue";
import { injectCommandContext } from "./context";

const commandInput = tv({
  base: [
    "flex h-11 w-full bg-transparent py-3 text-sm text-foreground outline-none",
    "placeholder:text-theme",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
});

interface Props extends Omit<ListboxFilterProps, "modelValue"> {
  class?: ClassValue;
  placeholder?: string;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);

const { search } = injectCommandContext();
</script>

<template>
  <div
    data-slot="command-input-wrapper"
    class="flex items-center gap-2 border-b px-3"
  >
    <UiIcon name="lucide:search" class="size-4 shrink-0 text-theme" />
    <ListboxFilter
      v-model="search"
      data-slot="command-input"
      v-bind="forwarded"
      :class="[commandInput({ class: props.class })]"
    />

    <AnimatePresence>
      <motion.div
        v-if="search"
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
          @click="search = ''"
        >
          <UiIcon name="lucide:x" class="size-4" />
          <span class="sr-only">Clear search</span>
        </UiButton>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
