<script setup lang="ts">
import { ref } from "vue";
import { UiDateInput, UiLabel } from "@rosalana/ui";

const kickoff = ref<string | null>("2026-11-21T14:30");
</script>

<template>
  <div class="grid w-full max-w-xl gap-4 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <UiLabel for="kickoff-cs">Začátek zápasu</UiLabel>
      <UiDateInput id="kickoff-cs" v-model="kickoff" time locale="cs-CZ" />
    </div>
    <div class="flex flex-col gap-2">
      <UiLabel for="kickoff-us">Kick-off</UiLabel>
      <UiDateInput id="kickoff-us" v-model="kickoff" time locale="en-US" />
    </div>
  </div>
</template>
