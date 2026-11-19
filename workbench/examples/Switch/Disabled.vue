<script setup lang="ts">
import { UiLabel, UiSwitch } from "@rosalana/ui";
</script>

<template>
  <div class="grid w-full max-w-sm gap-5">
    <div class="flex items-center justify-between gap-4">
      <UiLabel for="live-scores">Live scores</UiLabel>
      <UiSwitch id="live-scores" disabled />
    </div>
    <div class="flex items-center justify-between gap-4">
      <UiLabel for="account-emails">Account emails (required)</UiLabel>
      <UiSwitch id="account-emails" :model-value="true" disabled />
    </div>
  </div>
</template>
