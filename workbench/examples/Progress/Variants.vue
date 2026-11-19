<script setup lang="ts">
import { UiLabel, UiProgress } from "@rosalana/ui";

const bars = [
  { label: "Registration", variant: "default", value: 75 },
  { label: "Group stage", variant: "info", value: 60 },
  { label: "Prize pool", variant: "success", value: 90 },
  { label: "Roster spots left", variant: "warning", value: 25 },
  { label: "Server capacity", variant: "destructive", value: 98 },
] as const;
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-4">
    <div v-for="bar in bars" :key="bar.label" class="flex flex-col gap-1.5">
      <div class="flex justify-between text-sm">
        <UiLabel>{{ bar.label }}</UiLabel>
        <span class="text-theme">{{ bar.value }}%</span>
      </div>
      <UiProgress :model-value="bar.value" :variant="bar.variant" :aria-label="bar.label" />
    </div>
  </div>
</template>
