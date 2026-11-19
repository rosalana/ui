<script setup lang="ts">
import { ref } from "vue";
import { UiLabel, UiSlider } from "@rosalana/ui";

// Two values make two thumbs, the track is filled between them
const price = ref([200, 600]);
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-3">
    <UiLabel>Entry fee range</UiLabel>
    <UiSlider
      v-model="price"
      :min="0"
      :max="1000"
      :step="50"
      :min-steps-between-thumbs="1"
      :tooltip="['from {value} €', 'to {value} €']"
      aria-label="Entry fee range"
    />
    <p class="text-sm text-theme">Showing tournaments from {{ price[0] }} to {{ price[1] }} €.</p>
  </div>
</template>
