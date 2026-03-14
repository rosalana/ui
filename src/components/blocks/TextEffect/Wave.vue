<script setup lang="ts">
import { motion } from "motion-v";
import { useForwardProps } from "reka-ui";
import { computed, onUnmounted, watch } from "vue";
import { TextEffectProps } from ".";

export interface WaveProps extends TextEffectProps {}

const props = defineProps<WaveProps>();
const forwarded = useForwardProps(props);

const emit = defineEmits<{
  animationstart: [];
  animationend: [];
}>();

const letters = computed(() =>
  props.text.split("").map((char, i) => ({ char, i })),
);

// continuous animation — emit animationend immediately after delay
let startTimer: ReturnType<typeof setTimeout> | null = null;

watch(
  () => props.text,
  () => {
    if (startTimer) clearTimeout(startTimer);
    const delay = props.delay ?? 0;
    startTimer = setTimeout(() => {
      emit("animationstart");
      emit("animationend");
    }, delay);
  },
  { immediate: true },
);

onUnmounted(() => {
  if (startTimer) clearTimeout(startTimer);
});
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
