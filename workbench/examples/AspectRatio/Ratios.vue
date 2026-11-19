<script setup lang="ts">
import { UiAspectRatio } from "@rosalana/ui";

const ratios = [
  { label: "16 / 9", value: 16 / 9, class: "w-64" },
  { label: "4 / 3", value: 4 / 3, class: "w-48" },
  { label: "1 / 1", value: 1, class: "w-36" },
];
</script>

<template>
  <div class="flex flex-wrap items-end gap-6">
    <div v-for="ratio in ratios" :key="ratio.label" :class="ratio.class">
      <UiAspectRatio :ratio="ratio.value">
        <div
          class="flex size-full items-center justify-center rounded-2xl bg-primary/10 font-mono text-sm text-primary"
        >
          {{ ratio.label }}
        </div>
      </UiAspectRatio>
    </div>
  </div>
</template>
