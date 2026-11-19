<script setup lang="ts">
import { UiCheckbox, UiLabel } from "@rosalana/ui";
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <UiCheckbox id="locked-off" disabled />
      <UiLabel for="locked-off">Public team page</UiLabel>
    </div>
    <div class="flex items-center gap-2">
      <UiCheckbox id="locked-on" :model-value="true" disabled />
      <UiLabel for="locked-on">Email notifications (required)</UiLabel>
    </div>
  </div>
</template>
