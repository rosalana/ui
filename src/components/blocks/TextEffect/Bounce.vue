<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { useForwardProps } from "reka-ui";
import { computed, onUnmounted, watch } from "vue";
import { TextEffectProps } from ".";

export interface BounceProps extends TextEffectProps {}

const props = defineProps<BounceProps>();
const forwarded = useForwardProps(props);

const emit = defineEmits<{
  animationstart: [];
  animationend: [];
}>();

const letters = computed(() =>
  props.text.split("").map((char, i) => ({ char, i })),
);

// stiffness=800, damping=12 has strong overshoot, settles ~600ms, stagger=45ms
const animDuration = computed(
  () => Math.max(0, (letters.value.length - 1) * 45) + 600,
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
    data-slot="text-effect-bounce"
  >
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
            delay: (props.delay ?? 0) / 1000 + letter.i * 0.045,
          }"
          class="inline-block"
          >{{ letter.char === " " ? "\u00A0" : letter.char }}</motion.span
        >
      </motion.span>
    </AnimatePresence>
  </span>
</template>
