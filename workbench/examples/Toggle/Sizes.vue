<script setup lang="ts">
import { UiIcon, UiToggle } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UiToggle size="xs">Extra small</UiToggle>
    <UiToggle size="sm">Small</UiToggle>
    <UiToggle>Default</UiToggle>
    <UiToggle size="lg">Large</UiToggle>
    <UiToggle size="icon-sm" variant="outline" aria-label="Favorite">
      <UiIcon name="lucide:heart" />
    </UiToggle>
    <UiToggle size="icon" variant="outline" aria-label="Favorite">
      <UiIcon name="lucide:heart" />
    </UiToggle>
  </div>
</template>
