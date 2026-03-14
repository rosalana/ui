<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { useForwardProps } from "reka-ui";
import { computed } from "vue";
import { TextEffectProps } from "./types";

export interface BounceProps extends TextEffectProps {}

const props = defineProps<BounceProps>();
const forwarded = useForwardProps(props);

const letters = computed(() =>
  props.whole
    ? [props.text].map((char, i) => ({ char, i }))
    : props.text.split("").map((char, i) => ({ char, i })),
);
</script>

<template>
  <span :class="props?.class" v-bind="forwarded" data-slot="text-effect-bounce">
    <AnimatePresence mode="wait">
      <motion.span
        :key="text"
        :exit="{
          opacity: 0,
          y: 10,
          transition: { duration: 0.15, ease: 'easeIn' },
        }"
        class="inline-block"
      >
        <motion.span
          v-for="letter in letters"
          :key="letter.i"
          :initial="{ opacity: 0, y: -40 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{
            type: 'spring',
            stiffness: 800,
            damping: 12,
            mass: 0.6,
            delay: letter.i * 0.045,
          }"
          class="inline-block"
          >{{ letter.char === " " ? "\u00A0" : letter.char }}</motion.span
        >
      </motion.span>
    </AnimatePresence>
  </span>
</template>
