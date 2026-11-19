<script setup lang="ts">
import { ref } from "vue";
import { UiDateInput, UiLabel } from "@rosalana/ui";

const typed = ref<string | null>("2026-11-21");
const picked = ref<string | null>("2026-11-28");
const disabled = ref<string | null>("2026-12-05");
const readonly = ref<string | null>("2026-12-12");
</script>

<template>
  <div class="grid w-full max-w-xl gap-4 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <UiLabel for="typed">Typed, with clear button</UiLabel>
      <UiDateInput id="typed" v-model="typed" show-clear />
    </div>
    <div class="flex flex-col gap-2">
      <UiLabel for="picked">Pick only</UiLabel>
      <UiDateInput id="picked" v-model="picked" :manual="false" show-clear />
    </div>
    <div class="flex flex-col gap-2">
      <UiLabel for="disabled">Disabled</UiLabel>
      <UiDateInput id="disabled" v-model="disabled" disabled />
    </div>
    <div class="flex flex-col gap-2">
      <UiLabel for="readonly">Read-only</UiLabel>
      <UiDateInput id="readonly" v-model="readonly" readonly />
    </div>
  </div>
</template>
