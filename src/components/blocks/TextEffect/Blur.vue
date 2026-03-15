<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { useForwardProps } from "reka-ui";
import { computed } from "vue";
import { TextEffectProps } from "./types";

export interface BlurProps extends TextEffectProps {}

const props = defineProps<BlurProps>();
const forwarded = useForwardProps(props);

const words = computed(() =>
  props.whole
    ? [props.text].map((word, i) => ({ word, i }))
    : props.text.split(" ").map((word, i) => ({ word, i })),
);
</script>

<template>
  <span :class="props?.class" v-bind="forwarded" data-slot="text-effect-blur">
    <AnimatePresence mode="wait">
      <motion.span
        :key="text"
        :exit="{
          opacity: 0,
          filter: 'blur(8px)',
          transition: { duration: 0.2, ease: 'easeIn' },
        }"
        class="inline-block"
      >
        <motion.span
          v-for="word in words"
          :key="word.i"
          :initial="{ opacity: 0, filter: 'blur(12px)' }"
          :animate="{ opacity: 1, filter: 'blur(0px)' }"
          :transition="{
            duration: 0.5,
            delay: (props.delay ?? 0) + word.i * 0.08,
            ease: 'easeOut',
          }"
          class="inline-block mr-[0.25em]"
          >{{ word.word }}</motion.span
        >
      </motion.span>
    </AnimatePresence>
  </span>
</template>
