<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { useForwardProps } from "reka-ui";
import { computed } from "vue";
import { TextEffectProps } from "./types";

export interface FlipProps extends TextEffectProps {}

const props = defineProps<FlipProps>();
const forwarded = useForwardProps(props);

const letters = computed(() =>
  props.whole
    ? [props.text].map((char, i) => ({ char, i }))
    : props.text.split("").map((char, i) => ({ char, i })),
);
</script>

<template>
  <span
    :class="props?.class"
    v-bind="forwarded"
    data-slot="text-effect-flip"
    style="perspective: 400px; display: inline-block"
  >
    <AnimatePresence mode="wait">
      <motion.span
        :key="text"
        :exit="{
          opacity: 0,
          rotateX: -90,
          transition: { duration: 0.2, ease: 'easeIn' },
        }"
        class="inline-block"
      >
        <motion.span
          v-for="letter in letters"
          :key="letter.i"
          :initial="{ opacity: 0, rotateX: 90 }"
          :animate="{ opacity: 1, rotateX: 0 }"
          :transition="{
            type: 'spring',
            stiffness: 500,
            damping: 25,
            delay: (props.delay ?? 0) + letter.i * 0.04,
          }"
          class="inline-block"
          >{{ letter.char === " " ? "\u00A0" : letter.char }}</motion.span
        >
      </motion.span>
    </AnimatePresence>
  </span>
</template>
