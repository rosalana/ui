<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { useForwardProps } from "reka-ui";
import { computed } from "vue";
import { TextEffectProps } from "./types";

export interface TypingProps extends TextEffectProps {}

const props = defineProps<TypingProps>();

const forwarded = useForwardProps(props);

const letters = computed(() =>
  props.whole
    ? [props.text].map((char, i) => ({ char, i }))
    : props.text.split("").map((char, i) => ({ char, i })),
);
</script>

<template>
  <span :class="props?.class" v-bind="forwarded" data-slot="text-effect-typing">
    <AnimatePresence mode="wait">
      <motion.span
        :key="text"
        :exit="{
          opacity: 0,
          y: -6,
          transition: { duration: 0.18, ease: 'easeIn' },
        }"
        class="inline-block"
      >
        <motion.span
          v-for="letter in letters"
          :key="letter.i"
          :initial="{ opacity: 0, y: 14, scale: 0.82 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{
            type: 'spring',
            stiffness: 550,
            damping: 22,
            delay: letter.i * 0.032,
          }"
          class="inline-block"
          >{{ letter.char === " " ? "\u00A0" : letter.char }}</motion.span
        >
      </motion.span>
    </AnimatePresence>
  </span>
</template>
