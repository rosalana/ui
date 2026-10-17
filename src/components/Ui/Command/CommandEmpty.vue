<script setup lang="ts">
import { tv, type ClassValue } from "tailwind-variants";
import { AnimatePresence, motion } from "motion-v";
import UiIcon from "../Icon/Icon.vue";
import { injectCommandContext } from "./context";

const commandEmpty = tv({
  base: "flex flex-col items-center gap-2 py-6 text-center text-sm text-theme",
});

interface Props {
  class?: ClassValue;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: "lucide:search-x",
});

const { search, matches } = injectCommandContext();
</script>

<template>
  <!-- No exit animation: it would hold its space while the results come back -->
  <AnimatePresence>
    <motion.div
      v-if="search && matches === 0"
      data-slot="command-empty"
      role="presentation"
      :class="[commandEmpty({ class: props.class })]"
      :initial="{ opacity: 0, scale: 0.95 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
    >
      <UiIcon v-if="icon" :name="icon" class="size-5" />
      <slot />
    </motion.div>
  </AnimatePresence>
</template>
