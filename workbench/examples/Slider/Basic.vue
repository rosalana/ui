<script setup lang="ts">
import { ref } from "vue";
import { UiLabel, UiSlider } from "@rosalana/ui";

// The model is an array, even with one thumb
const volume = ref([60]);
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-3">
    <div class="flex items-center justify-between">
      <UiLabel for="stream-volume">Stream volume</UiLabel>
      <span class="text-sm tabular-nums text-theme">{{ volume[0] }} %</span>
    </div>
    <UiSlider id="stream-volume" v-model="volume" :max="100" :step="1" />
  </div>
</template>
