<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { useForwardProps } from "reka-ui";
import { computed, onUnmounted, watch } from "vue";
import { TextEffectProps } from ".";

export interface PopProps extends TextEffectProps {}

const props = defineProps<PopProps>();
const forwarded = useForwardProps(props);

const emit = defineEmits<{
  animationstart: [];
  animationend: [];
}>();

const words = computed(() =>
  props.text.split(" ").map((word, i) => ({ word, i })),
);

// stiffness=600, damping=20 settles in ~350ms, stagger=60ms per word
const animDuration = computed(
  () => Math.max(0, (words.value.length - 1) * 60) + 350,
);

let startTimer: ReturnType<typeof setTimeout> | null = null;
let endTimer: ReturnType<typeof setTimeout> | null = null;

watch(
  () => props.text,
  () => {
    if (startTimer) clearTimeout(startTimer);
    if (endTimer) clearTimeout(endTimer);
    const delay = props.delay ?? 0;
    startTimer = setTimeout(() => emit("animationstart"), delay);
    endTimer = setTimeout(
      () => emit("animationend"),
      delay + animDuration.value,
    );
  },
  { immediate: true },
);

onUnmounted(() => {
  if (startTimer) clearTimeout(startTimer);
  if (endTimer) clearTimeout(endTimer);
});
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
            delay: (props.delay ?? 0) / 1000 + word.i * 0.06,
          }"
          class="inline-block mr-[0.25em] origin-bottom"
          >{{ word.word }}</motion.span
        >
      </motion.span>
    </AnimatePresence>
  </span>
</template>