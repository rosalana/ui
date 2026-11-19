<script setup lang="ts">
import { UiToggleGroup, UiToggleGroupItem } from "@rosalana/ui";

const variants = ["default", "secondary", "destructive", "outline", "ghost"] as const;
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <UiToggleGroup
      v-for="variant in variants"
      :key="variant"
      type="single"
      :variant="variant"
      default-value="week"
    >
      <UiToggleGroupItem value="day">Day</UiToggleGroupItem>
      <UiToggleGroupItem value="week">Week</UiToggleGroupItem>
      <UiToggleGroupItem value="month">Month</UiToggleGroupItem>
    </UiToggleGroup>
  </div>
</template>
