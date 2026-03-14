<script setup lang="ts">
import {
  type HTMLAttributes,
  computed,
  onMounted,
  onUnmounted,
  ref,
} from "vue";
import { Primitive, PrimitiveProps } from "reka-ui";
import None from "./None.vue";

export interface LoopProps {
  texts: string[];
  class?: HTMLAttributes["class"];
  delay?: number;
  interval?: number;
  effect?: PrimitiveProps["as"];
}

const props = withDefaults(defineProps<LoopProps>(), {
  interval: 3500,
  effect: None,
});

const currentIndex = ref(0);
const currentText = computed(() => props.texts[currentIndex.value] ?? "");

let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  if (props.texts.length > 1) {
    if (props.delay) {
      timer = setTimeout(() => {
        timer = setInterval(() => {
          currentIndex.value = (currentIndex.value + 1) % props.texts.length;
        }, props.interval);
      }, props.delay);
    } else {
      timer = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % props.texts.length;
      }, props.interval);
    }
  }
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <Primitive :as="props.effect" :text="currentText" :class="props?.class" />
</template>
