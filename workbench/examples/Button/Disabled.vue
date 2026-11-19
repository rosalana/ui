<script setup lang="ts">
import { ref } from "vue";
import { UiButton, UiCheckbox, UiLabel } from "@rosalana/ui";

const accepted = ref(false);
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="flex items-center gap-2">
      <UiCheckbox id="terms" v-model="accepted" />
      <UiLabel for="terms">I accept the terms</UiLabel>
    </div>
    <UiButton :disabled="!accepted">Create account</UiButton>
  </div>
</template>
