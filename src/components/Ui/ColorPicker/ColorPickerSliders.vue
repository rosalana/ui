<script setup lang="ts">
import { computed } from "vue";
import { type HSVA, hsvaToRgba } from "../../../composables/useColorConverter";
import { UiSlider } from "../..";

const props = defineProps<{
  modelValue: HSVA;
}>();

const emit = defineEmits(["update:modelValue"]);

const color = computed<HSVA>({
  get() {
    return props.modelValue;
  },
  set(newColor) {
    emit("update:modelValue", newColor);
  },
});

const alphaTrackStyle = computed(() => {
  const { r, g, b } = hsvaToRgba(color.value);
  return {
    background: `linear-gradient(to right, rgba(${r},${g},${b},0), rgb(${r},${g},${b})), repeating-conic-gradient(#ccc 0% 25%, white 0% 50%) 0 0 / 8px 8px`,
  };
});

const hue = computed({
  get: () => [color.value.h],
  set: ([h]: number[]) => {
    color.value = { ...color.value, h };
  },
});

const saturation = computed({
  get: () => [color.value.s],
  set: ([s]: number[]) => {
    color.value = { ...color.value, s };
  },
});

const value = computed({
  get: () => [color.value.v],
  set: ([v]: number[]) => {
    color.value = { ...color.value, v };
  },
});

const alpha = computed({
  get: () => [color.value.a * 100],
  set: ([a]: number[]) => {
    color.value = { ...color.value, a: a / 100 };
  },
});
</script>
<template>
  <!-- Hue slider -->
  <div class="hue-slider-wrap relative flex items-center">
    <div
      class="pointer-events-none absolute inset-y-0 my-auto h-2 w-full rounded-full"
      style="
        background: linear-gradient(
          to right,
          #f00 0%,
          #ff0 17%,
          #0f0 33%,
          #0ff 50%,
          #00f 67%,
          #f0f 83%,
          #f00 100%
        );
      "
    />
    <UiSlider v-model="hue" :min="0" :max="360" :step="1" class="relative" />
  </div>

  <!-- Saturation slider -->
  <div class="saturation-slider-wrap relative flex items-center">
    <div
      class="pointer-events-none absolute inset-y-0 my-auto h-2 w-full rounded-full"
      :style="{
        background: `linear-gradient(to right, hsl(${color.h}, 0%, 50%), hsl(${color.h}, 100%, 50%))`,
      }"
    />

    <UiSlider
      v-model="saturation"
      :min="0"
      :max="100"
      :step="1"
      class="relative"
    />
  </div>

  <!-- Value slider -->
  <div class="value-slider-wrap relative flex items-center">
    <div
      class="pointer-events-none absolute inset-y-0 my-auto h-2 w-full rounded-full"
      :style="{
        background: `linear-gradient(to right, hsl(${color.h}, ${color.s}%, 0%), hsl(${color.h}, ${color.s}%, 50%), hsl(${color.h}, ${color.s}%, 100%))`,
      }"
    />
    <UiSlider v-model="value" :min="0" :max="100" :step="1" class="relative" />
  </div>

  <!-- Alpha slider -->
  <div class="alpha-slider-wrap relative flex items-center">
    <div
      class="pointer-events-none absolute inset-y-0 my-auto h-2 w-full rounded-full"
      :style="alphaTrackStyle"
    />
    <UiSlider v-model="alpha" :min="0" :max="100" :step="1" class="relative" />
  </div>
</template>
<style scoped>
/* Make track and range transparent so the gradient backgrounds show through */
.hue-slider-wrap :deep([data-slot="slider-track"]),
.alpha-slider-wrap :deep([data-slot="slider-track"]) {
  background: transparent;
}
.hue-slider-wrap :deep([data-slot="slider-range"]),
.alpha-slider-wrap :deep([data-slot="slider-range"]) {
  background: transparent;
}
.saturation-slider-wrap :deep([data-slot="slider-track"]) {
  background: transparent;
}
.saturation-slider-wrap :deep([data-slot="slider-range"]) {
  background: transparent;
}
.value-slider-wrap :deep([data-slot="slider-track"]) {
  background: transparent;
}
.value-slider-wrap :deep([data-slot="slider-range"]) {
  background: transparent;
}
</style>
