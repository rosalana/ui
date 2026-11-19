<script setup lang="ts">
import { ref } from "vue";
import { UiDateInput, UiLabel } from "@rosalana/ui";

// The model is an ISO string, the same shape a backend sends and stores
const birthday = ref<string | null>("2008-03-14");
</script>

<template>
  <div class="flex w-full max-w-xs flex-col gap-2">
    <UiLabel for="birthday">Player birthday</UiLabel>
    <UiDateInput id="birthday" v-model="birthday" />
  </div>
</template>
