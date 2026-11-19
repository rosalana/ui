<script setup lang="ts">
import { UiButton, UiIcon } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UiButton size="icon" variant="outline" tooltip="Copy link" aria-label="Copy link">
      <UiIcon name="lucide:link" />
    </UiButton>
    <UiButton
      size="icon"
      variant="outline"
      tooltip="Deletes the project for everyone"
      tooltip-variant="destructive"
      aria-label="Delete project"
    >
      <UiIcon name="lucide:trash-2" />
    </UiButton>
  </div>
</template>
