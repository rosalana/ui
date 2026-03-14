<script setup lang="ts">
import { useForwardProps } from "reka-ui";
import { onUnmounted, ref, watch } from "vue";
import { TextEffectProps } from ".";

export interface ScrambleProps extends TextEffectProps {}

const props = defineProps<ScrambleProps>();
const forwarded = useForwardProps(props);

const emit = defineEmits<{
  animationstart: [];
  animationend: [];
}>();

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";

const displayed = ref(props.text);

let animFrame: number | null = null;
let delayTimer: ReturnType<typeof setTimeout> | null = null;

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

const scramble = (target: string) => {
  const length = target.length;
  let frame = 0;
  const totalFrames = length * 5;

  const tick = () => {
    displayed.value = target
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";
        const resolveAt = Math.floor((i / length) * totalFrames);
        return frame >= resolveAt ? char : randomChar();
      })
      .join("");

    frame++;

    if (frame <= totalFrames) {
      animFrame = requestAnimationFrame(tick);
    } else {
      displayed.value = target;
      emit("animationend");
    }
  };

  tick();
};

watch(
  () => props.text,
  (newText) => {
    if (animFrame) cancelAnimationFrame(animFrame);
    if (delayTimer) clearTimeout(delayTimer);

    // show scrambled immediately while waiting for delay
    displayed.value = newText
      .split("")
      .map((c) => (c === " " ? " " : randomChar()))
      .join("");

    const delay = props.delay ?? 0;
    delayTimer = setTimeout(() => {
      emit("animationstart");
      scramble(newText);
    }, delay);
  },
  { immediate: true },
);

onUnmounted(() => {
  if (animFrame) cancelAnimationFrame(animFrame);
  if (delayTimer) clearTimeout(delayTimer);
});
</script>

<template>
  <span
    :class="props?.class"
    v-bind="forwarded"
    data-slot="text-effect-scramble"
    >{{ displayed }}</span
  >
</template>
