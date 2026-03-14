<script setup lang="ts">
import { motion } from "motion-v";
import { useForwardProps } from "reka-ui";
import { computed } from "vue";
import { TextEffectProps } from "./types";

export interface WaveProps extends TextEffectProps {}

const props = defineProps<WaveProps>();
const forwarded = useForwardProps(props);

const letters = computed(() =>
  props.whole
    ? [props.text].map((char, i) => ({ char, i }))
    : props.text.split("").map((char, i) => ({ char, i })),
);
</script>

<template>
  <span :class="props?.class" v-bind="forwarded" data-slot="text-effect-wave">
    <motion.span
      v-for="letter in letters"
      :key="letter.i"
      :animate="{ y: [0, -8, 0] }"
      :transition="{
        duration: 1.2,
        repeat: Infinity,
        delay: letter.i * 0.08,
        ease: 'easeInOut',
      }"
      class="inline-block"
      >{{ letter.char === " " ? "\u00A0" : letter.char }}</motion.span
    >
  </span>
</template>
