<script setup lang="ts">
import { UiButton, UiIcon } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UiButton>
      <UiIcon name="lucide:download" />
      Download
    </UiButton>
    <UiButton variant="outline">
      Share
      <UiIcon name="lucide:share-2" />
    </UiButton>
    <UiButton size="icon" variant="ghost" aria-label="Settings">
      <UiIcon name="lucide:settings" />
    </UiButton>
  </div>
</template>
