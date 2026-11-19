<script setup lang="ts">
import { UiButton, UiIcon } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UiButton size="xs">Extra small</UiButton>
    <UiButton size="sm">Small</UiButton>
    <UiButton>Default</UiButton>
    <UiButton size="lg">Large</UiButton>
    <UiButton size="icon-sm" variant="outline" aria-label="Add">
      <UiIcon name="lucide:plus" />
    </UiButton>
    <UiButton size="icon" variant="outline" aria-label="Add">
      <UiIcon name="lucide:plus" />
    </UiButton>
  </div>
</template>
