<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { useForwardProps } from "reka-ui";
import { computed } from "vue";
import { TextEffectProps } from "./types";

export interface PopProps extends TextEffectProps {}

const props = defineProps<PopProps>();
const forwarded = useForwardProps(props);

const words = computed(() =>
  props.whole
    ? [props.text].map((word, i) => ({ word, i }))
    : props.text.split(" ").map((word, i) => ({ word, i })),
);
</script>

<template>
  <span :class="props?.class" v-bind="forwarded" data-slot="text-effect-pop">
    <AnimatePresence mode="wait">
      <motion.span
        :key="text"
        :exit="{
          opacity: 0,
          scale: 0.85,
          transition: { duration: 0.15, ease: 'easeIn' },
        }"
        class="inline-block"
      >
        <motion.span
          v-for="word in words"
          :key="word.i"
          :initial="{ opacity: 0, scale: 0 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{
            type: 'spring',
            stiffness: 600,
            damping: 20,
            delay: word.i * 0.06,
          }"
          class="inline-block mr-[0.25em] origin-bottom"
          >{{ word.word }}</motion.span
        >
      </motion.span>
    </AnimatePresence>
  </span>
</template>
