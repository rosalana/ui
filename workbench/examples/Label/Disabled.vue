<script setup lang="ts">
import { UiInput, UiLabel } from "@rosalana/ui";
</script>

<template>
  <div class="grid w-full max-w-sm gap-2">
    <UiLabel for="season">Season</UiLabel>
    <UiInput id="season" model-value="2026" disabled />
    <p class="text-sm text-theme">The label stays clickable, but a disabled control ignores focus.</p>
  </div>
</template>
