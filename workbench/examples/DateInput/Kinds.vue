<script setup lang="ts">
import { ref } from "vue";
import { UiDateInput, UiLabel } from "@rosalana/ui";

const registration = ref<string | null>("2026-11-02");
const kickoff = ref<string | null>("2026-11-21T14:30");
const warmUp = ref<string | null>("13:45");
const stopwatch = ref<string | null>("00:12:30");
</script>

<template>
  <div class="grid w-full max-w-xl gap-4 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <UiLabel for="registration">Registration closes</UiLabel>
      <UiDateInput id="registration" v-model="registration" />
    </div>
    <div class="flex flex-col gap-2">
      <UiLabel for="kickoff">Kick-off</UiLabel>
      <UiDateInput id="kickoff" v-model="kickoff" time />
    </div>
    <div class="flex flex-col gap-2">
      <UiLabel for="warmup">Warm-up starts</UiLabel>
      <UiDateInput id="warmup" v-model="warmUp" :date="false" time />
    </div>
    <div class="flex flex-col gap-2">
      <UiLabel for="stopwatch">First lap time</UiLabel>
      <UiDateInput id="stopwatch" v-model="stopwatch" :date="false" time seconds />
    </div>
  </div>
</template>
