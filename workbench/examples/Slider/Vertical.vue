<script setup lang="ts">
import { ref } from "vue";
import { UiLabel, UiSlider } from "@rosalana/ui";

const bands = ref([
  { name: "Bass", value: [70] },
  { name: "Mid", value: [45] },
  { name: "High", value: [60] },
]);
</script>

<template>
  <div class="flex h-48 items-stretch gap-8">
    <div v-for="band in bands" :key="band.name" class="flex flex-col items-center gap-3">
      <UiSlider
        v-model="band.value"
        orientation="vertical"
        :aria-label="`${band.name} level`"
        tooltip="{value} dB"
      />
      <UiLabel>{{ band.name }}</UiLabel>
    </div>
  </div>
</template>
