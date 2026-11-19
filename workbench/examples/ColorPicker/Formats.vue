<script setup lang="ts">
import { ref } from "vue";
import { UiColorPicker, UiLabel } from "@rosalana/ui";

// The model keeps the format it was given, whatever the user picks
const hex = ref("#f97316");
const rgb = ref("rgb(34, 197, 94)");
const hsl = ref("hsl(199, 89%, 48%)");
const oklch = ref("oklch(0.66 0.2 330)");
</script>

<template>
  <div class="grid w-full max-w-md gap-4 sm:grid-cols-2">
    <div class="flex flex-col gap-1.5">
      <UiLabel>hex</UiLabel>
      <UiColorPicker v-model="hex" format="hex" />
    </div>
    <div class="flex flex-col gap-1.5">
      <UiLabel>rgb</UiLabel>
      <UiColorPicker v-model="rgb" format="rgb" />
    </div>
    <div class="flex flex-col gap-1.5">
      <UiLabel>hsl</UiLabel>
      <UiColorPicker v-model="hsl" format="hsl" />
    </div>
    <div class="flex flex-col gap-1.5">
      <UiLabel>oklch</UiLabel>
      <UiColorPicker v-model="oklch" format="oklch" />
    </div>
  </div>
</template>
