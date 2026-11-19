<script setup lang="ts">
import { UiIcon, UiToggle } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UiToggle disabled variant="outline">
      <UiIcon name="lucide:lock" />
      Private
    </UiToggle>
    <UiToggle disabled default-value>
      <UiIcon name="lucide:check" />
      Verified
    </UiToggle>
  </div>
</template>
