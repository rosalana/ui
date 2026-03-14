<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { useForwardProps } from "reka-ui";
import { computed, onUnmounted, watch } from "vue";
import { TextEffectProps } from ".";

export interface FlipProps extends TextEffectProps {}

const props = defineProps<FlipProps>();
const forwarded = useForwardProps(props);

const emit = defineEmits<{
  animationstart: [];
  animationend: [];
}>();

const letters = computed(() =>
  props.text.split("").map((char, i) => ({ char, i })),
);

// stiffness=500, damping=25 settles ~400ms, stagger=40ms per letter
const animDuration = computed(
  () => Math.max(0, (letters.value.length - 1) * 40) + 400,
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
            delay: (props.delay ?? 0) / 1000 + letter.i * 0.04,
          }"
          class="inline-block"
          >{{ letter.char === " " ? "\u00A0" : letter.char }}</motion.span
        >
      </motion.span>
    </AnimatePresence>
  </span>
</template>
