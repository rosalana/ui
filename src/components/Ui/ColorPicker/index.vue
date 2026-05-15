<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { UiPopover, UiPopoverContent, UiPopoverTrigger } from "../..";
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

// ─── Internal HSVA state
// H must live as a ref — it cannot be recovered from an achromatic string like
// "#000000" or "oklch(0 0 0)". If we derived H from modelValue on every read,
// moving the Value slider to 0 would permanently reset H to 0.
const internalColor = ref<HSVA>({ h: 0, s: 0, v: 100, a: 1 });

// The last string we emitted ourselves. When modelValue echoes it back we skip
// the sync — otherwise every emission would trigger a re-derivation of H.
const lastEmitted = ref<string | null>(null);

watch(
  () => props.modelValue,
  (val) => {
    if (!val || val === lastEmitted.value) return;
    const rgba = parseColor(val);
    if (!rgba) return;
    const hsva = rgbaToHsva(rgba);
    internalColor.value = {
      // Preserve H when the incoming color is achromatic (black, white, gray).
      // Those colors have no meaningful hue, so we keep whatever the user had.
      h: hsva.s > 2 ? hsva.h : internalColor.value.h,
      s: hsva.s,
      v: hsva.v,
      a: hsva.a,
    };
  },
  { immediate: true },
);

// color is what every child component binds to via v-model
const color = computed<HSVA>({
  get: () => internalColor.value,
  set(newColor) {
    internalColor.value = newColor;
    const formatted = formatPublic(hsvaToRgba(newColor), props.format);
    lastEmitted.value = formatted;
    emit("update:modelValue", formatted);
  },
});

const preview = computed<string>(() => {
  const { r, g, b } = hsvaToRgba(internalColor.value);
  return `rgba(${r}, ${g}, ${b}, ${internalColor.value.a})`;
});

const formatted = computed<string>(() =>
  formatPublic(hsvaToRgba(internalColor.value), props.format),
);

const inputValue = ref(formatted.value);
const isInputFocused = ref(false);

watch(formatted, (val) => {
  if (!isInputFocused.value) inputValue.value = val;
});

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
    inputValue.value = formatted.value;
    return;
  }
  color.value = rgbaToHsva(parsed);
}
</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <ColorPickerTrigger
        :placeholder="props.placeholder"
        :value="preview"
        :text="formatted"
      />
    </UiPopoverTrigger>

    <UiPopoverContent class="p-0 flex w-max divide-x" align="start">
      <!-- ── Left: picker -->
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
