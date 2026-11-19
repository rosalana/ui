<script setup lang="ts">
import { ref } from "vue";
import { UiDateInput, UiLabel, type DateInputRange } from "@rosalana/ui";

const season = ref<DateInputRange | null>({ start: "2026-09-05", end: "2026-12-12" });
const match = ref<DateInputRange | null>({
  start: "2026-11-21T14:00",
  end: "2026-11-21T15:30",
});
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <div class="flex flex-col gap-2">
      <UiLabel for="season">Season</UiLabel>
      <UiDateInput id="season" v-model="season" range />
    </div>
    <div class="flex flex-col gap-2">
      <UiLabel for="match">Match slot</UiLabel>
      <UiDateInput id="match" v-model="match" range time />
    </div>
  </div>
</template>
