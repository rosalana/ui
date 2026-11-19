<script setup lang="ts">
import { ref } from "vue";
import { UiColorPicker, UiLabel } from "@rosalana/ui";

const accent = ref("#ec4899");
const banner = ref("#0ea5e9");
</script>

<template>
  <div class="grid w-full max-w-md gap-4 sm:grid-cols-2">
    <div class="flex flex-col gap-1.5">
      <UiLabel>With palettes</UiLabel>
      <!-- palette adds a button that opens ready-made color swatches -->
      <UiColorPicker v-model="accent" palette />
    </div>
    <div class="flex flex-col gap-1.5">
      <UiLabel>Without the text input</UiLabel>
      <UiColorPicker v-model="banner" :input="false" placeholder="Pick a banner color" />
    </div>
  </div>
</template>
