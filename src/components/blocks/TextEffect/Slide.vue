<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { useForwardProps } from "reka-ui";
import { computed } from "vue";
import { TextEffectProps } from "./types";

export interface SlideProps extends TextEffectProps {}

const props = defineProps<SlideProps>();
const forwarded = useForwardProps(props);

const words = computed(() =>
  props.whole
    ? [props.text].map((word, i) => ({ word, i }))
    : props.text.split(" ").map((word, i) => ({ word, i })),
);
</script>

<template>
  <span :class="props?.class" v-bind="forwarded" data-slot="text-effect-slide">
    <AnimatePresence mode="wait">
      <motion.span
        :key="text"
        :exit="{
          opacity: 0,
          x: -10,
          transition: { duration: 0.2, ease: 'easeIn' },
        }"
        class="inline-block"
      >
        <motion.span
          v-for="word in words"
          :key="word.i"
          :initial="{ opacity: 0, x: -20 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{
            type: 'spring',
            stiffness: 400,
            damping: 22,
            delay: word.i * 0.08,
          }"
          class="inline-block mr-[0.25em]"
          >{{ word.word }}</motion.span
        >
      </motion.span>
    </AnimatePresence>
  </span>
</template>