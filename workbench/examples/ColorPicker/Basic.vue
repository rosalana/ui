<script setup lang="ts">
import { ref } from "vue";
import { UiColorPicker, UiLabel } from "@rosalana/ui";

const color = ref("#6366f1");
</script>

<template>
  <div class="flex w-full max-w-xs flex-col gap-3">
    <div class="flex flex-col gap-1.5">
      <UiLabel>Team color</UiLabel>
      <UiColorPicker v-model="color" />
    </div>
    <div
      class="rounded-xl px-4 py-3 text-sm font-medium text-white transition-colors"
      :style="{ backgroundColor: color }"
    >
      North Owls
    </div>
  </div>
</template>
