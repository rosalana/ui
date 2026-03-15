<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { useForwardProps } from "reka-ui";
import { computed } from "vue";
import { TextEffectProps } from "./types";

export interface RiseProps extends TextEffectProps {}

const props = defineProps<RiseProps>();
const forwarded = useForwardProps(props);

const words = computed(() =>
  props.whole
    ? [props.text].map((word, i) => ({ word, i }))
    : props.text.split(" ").map((word, i) => ({ word, i })),
);
</script>

<template>
  <span
    :class="props?.class"
    v-bind="forwarded"
    data-slot="text-effect-rise"
    class="inline-flex flex-wrap gap-x-[0.25em] overflow-hidden"
  >
    <AnimatePresence mode="wait">
      <motion.span
        :key="text"
        class="inline-flex flex-wrap gap-x-[0.25em]"
        :exit="{
          opacity: 0,
          y: -15,
          transition: { duration: 0.25, ease: 'easeIn' },
        }"
      >
        <motion.span
          v-for="word in words"
          :key="word.i"
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{
            duration: 0.6,
            delay: (props.delay ?? 0) + word.i * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }"
          class="inline-block"
          >{{ word.word }}</motion.span
        >
      </motion.span>
    </AnimatePresence>
  </span>
</template>
