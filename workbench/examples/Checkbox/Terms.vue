<script setup lang="ts">
import { ref } from "vue";
import { UiButton, UiCheckbox, UiLabel } from "@rosalana/ui";

const accepted = ref(false);
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <div class="flex items-center gap-2">
      <UiCheckbox id="terms" v-model="accepted" />
      <UiLabel for="terms">I accept the tournament rules</UiLabel>
    </div>
    <UiButton :disabled="!accepted">Register my team</UiButton>
  </div>
</template>
