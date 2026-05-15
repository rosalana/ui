<script setup lang="ts">
import { computed, ref } from "vue";
import { UiPopover, UiPopoverContent, UiPopoverTrigger } from "@rosalana/ui";
import {
  formatPublic,
  hsvaToRgba,
  parseColor,
  rgbaToHsva,
  type HSVA,
} from "../../../composables/useColorConverter";
import type { ColorPickerProps } from "./types";
import ColorPickerTrigger from "./ColorPickerTrigger.vue";
import ColorPickerPalette from "./ColorPickerPalette.vue";
import ColorPickerCanvas from "./ColorPickerCanvas.vue";
import ColorPickerSliders from "./ColorPickerSliders.vue";
import { UiInput } from "../..";

const props = withDefaults(defineProps<ColorPickerProps>(), {
  placeholder: "Pick a color",
  format: "hex",
});

const emit = defineEmits<{ "update:modelValue": [string] }>();

const color = computed<HSVA>({
  get() {
    const rgba = parseColor(props.modelValue || "") || {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    };
    return rgbaToHsva(rgba);
  },
  set(newColor) {
    const rgba = hsvaToRgba(newColor);
    const formatted = formatPublic(rgba, props.format);
    emit("update:modelValue", formatted);
  },
});

const preview = computed<string>(() => {
  const { r, g, b } = hsvaToRgba(color.value);
  return `rgba(${r}, ${g}, ${b}, ${color.value.a})`;
});

const formatted = computed<string>(() =>
  formatPublic(hsvaToRgba(color.value), props.format),
);

const inputValue = ref(formatted.value);
const isInputFocused = ref(false);

function onInputFocus() {
  isInputFocused.value = true;
}
function onInputBlur() {
  isInputFocused.value = false;
  onInputCommit();
}

function onInputCommit() {
  const parsed = parseColor(inputValue.value.trim());
  if (!parsed) {
    inputValue.value = formatPublic(hsvaToRgba(color.value), props.format);
    return;
  }
  const hsva = rgbaToHsva(parsed);
  color.value = hsva;
}
</script>

<template>
  <span
    class="size-14 shrink-0 rounded-sm flex items-center justify-center"
    :style="{ background: preview }"
  />
  <UiPopover>
    <UiPopoverTrigger as-child>
      <ColorPickerTrigger
        :placeholder="props.placeholder"
        :value="preview"
        :text="formatted"
      />
    </UiPopoverTrigger>

    <UiPopoverContent class="p-0 flex w-max divide-x" align="start">
      <!-- ── Left: picker ──────────────────────────────────────────────── -->
      <div class="flex flex-1 flex-col gap-3 p-3">
        <!-- WebGL canvas -->
        <ColorPickerCanvas v-model="color" />

        <!-- Sliders -->
        <ColorPickerSliders v-model="color" />

        <!-- Preview swatch + value input -->
        <div class="flex items-center gap-2">
          <span
            class="size-8 shrink-0 rounded-lg border border-black/10"
            :style="{ background: preview }"
          />

          <UiInput
            v-model="inputValue"
            :placeholder="props.placeholder"
            @focus="onInputFocus"
            @blur="onInputBlur"
            @keydown.enter.prevent="onInputCommit"
          />
        </div>
      </div>

      <!-- Palettes -->
      <ColorPickerPalette v-model="color" />
    </UiPopoverContent>
  </UiPopover>
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
</style>
