<script setup lang="ts">
import { useForwardProps } from "reka-ui";
import { onUnmounted, ref, watch } from "vue";
import { TextEffectProps } from "./types";

export interface ScrambleProps extends TextEffectProps {}

const props = defineProps<ScrambleProps>();
const forwarded = useForwardProps(props);

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&";

const displayed = ref(props.text);
let animFrame: number | null = null;

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
        // whole=true: all chars resolve simultaneously at the end
        const resolveAt = props.whole
          ? totalFrames
          : Math.floor((i / length) * totalFrames);
        return frame >= resolveAt ? char : randomChar();
      })
      .join("");

    frame++;

    if (frame <= totalFrames) {
      animFrame = requestAnimationFrame(tick);
    } else {
      displayed.value = target;
    }
  };

  tick();
};

watch(
  () => props.text,
  (newText) => {
    if (animFrame) cancelAnimationFrame(animFrame);
    displayed.value = newText
      .split("")
      .map((c) => (c === " " ? " " : randomChar()))
      .join("");
    scramble(newText);
  },
  { immediate: true },
);

onUnmounted(() => {
  if (animFrame) cancelAnimationFrame(animFrame);
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
