<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { computed } from "vue";
import { TextEffectProps } from "./types";

export interface FadeProps extends TextEffectProps {}

const props = defineProps<FadeProps>();

const letters = computed(() =>
  props.whole
    ? [props.text].map((char, i) => ({ char, i }))
    : props.text.split("").map((char, i) => ({ char, i })),
);
</script>

<template>
  <span :class="props.class" data-slot="text-effect-fade">
    <AnimatePresence mode="wait">
      <motion.span
        :key="props.text"
        :exit="{ opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } }"
        class="inline-block"
      >
        <motion.span
          v-for="letter in letters"
          :key="letter.i"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{
            duration: 0.3,
            delay: letter.i * 0.04,
            ease: 'easeOut',
          }"
          class="inline-block"
          >{{ letter.char === " " ? "\u00A0" : letter.char }}</motion.span
        >
      </motion.span>
    </AnimatePresence>
  </span>
</template>
