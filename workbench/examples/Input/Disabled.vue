<script setup lang="ts">
import { UiInput, UiLabel } from "@rosalana/ui";
</script>

<template>
  <div class="grid w-full max-w-sm gap-5">
    <div class="grid gap-2">
      <UiLabel for="league">League</UiLabel>
      <UiInput id="league" model-value="Summer League 2026" disabled />
    </div>
    <div class="grid gap-2">
      <UiLabel for="invite-code">Invite code</UiLabel>
      <UiInput id="invite-code" model-value="HAWKS-4821" readonly />
    </div>
  </div>
</template>
