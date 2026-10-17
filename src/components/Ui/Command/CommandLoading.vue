<script setup lang="ts">
import { inject, type Ref } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import { motion } from "motion-v";
import UiIcon from "../Icon/Icon.vue";

const commandLoading = tv({
  base: "flex flex-col items-center gap-2 py-6 text-center text-sm text-theme",
});

interface Props {
  class?: ClassValue;
}

const props = defineProps<Props>();

const loading = inject<Ref<boolean>>("commandLoading");
</script>

<template>
  <motion.div
    v-if="loading"
    data-slot="command-loading"
    role="status"
    :class="[commandLoading({ class: props.class })]"
    :initial="{ opacity: 0, scale: 0.95 }"
    :animate="{ opacity: 1, scale: 1 }"
    :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
  >
    <UiIcon name="lucide:loader" class="size-5 animate-spin" />
    <slot />
  </motion.div>
</template>
