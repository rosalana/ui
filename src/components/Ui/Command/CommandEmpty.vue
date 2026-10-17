<script setup lang="ts">
import type { ComboboxEmptyProps } from "reka-ui";
import { ComboboxEmpty, useForwardProps } from "reka-ui";
import { inject, type Ref } from "vue";
import { tv , type ClassValue } from "tailwind-variants";
import { motion } from "motion-v";
import UiIcon from "../Icon/Icon.vue";

const commandEmpty = tv({
  base: "flex flex-col items-center gap-2 py-6 text-center text-sm text-theme",
});

interface Props extends ComboboxEmptyProps {
  class?: ClassValue;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);

const loading = inject<Ref<boolean>>("commandLoading");
</script>

<template>
  <ComboboxEmpty
    v-if="!loading"
    data-slot="command-empty"
    v-bind="forwarded"
    :class="[commandEmpty({ class: props.class })]"
    as-child
  >
    <motion.div
      :initial="{ opacity: 0, scale: 0.95 }"
      :animate="{ opacity: 1, scale: 1 }"
      :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
    >
      <UiIcon name="lucide:search-x" class="size-5" />
      <slot />
    </motion.div>
  </ComboboxEmpty>
</template>
