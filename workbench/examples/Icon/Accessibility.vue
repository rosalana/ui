<script setup lang="ts">
import { UiButton, UiIcon } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-4">
    <!-- Next to a label the icon is decoration -->
    <UiButton variant="outline">
      <UiIcon name="lucide:calendar" aria-hidden="true" />
      Schedule match
    </UiButton>

    <!-- Alone it needs a name for assistive technology, on its button -->
    <UiButton size="icon" variant="outline" aria-label="Delete team">
      <UiIcon name="lucide:trash-2" aria-hidden="true" />
    </UiButton>
  </div>
</template>
