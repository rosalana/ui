<script setup lang="ts">
import { ref } from "vue";
import type { DateValue } from "@internationalized/date";
import { UiDateInput, UiLabel } from "@rosalana/ui";

const practice = ref<string | null>(null);
const late = ref<string | null>("2026-12-24");

// No practice on weekends
const isWeekend = (date: DateValue) => [0, 6].includes(date.toDate("UTC").getUTCDay());
</script>

<template>
  <div class="flex w-full max-w-xs flex-col gap-5">
    <div class="flex flex-col gap-2">
      <UiLabel for="practice">Practice day</UiLabel>
      <UiDateInput
        id="practice"
        v-model="practice"
        min="2026-11-02"
        max="2026-12-18"
        :is-date-unavailable="isWeekend"
      />
      <p class="text-xs text-theme">Weekdays from 2 November to 18 December.</p>
    </div>
    <div class="flex flex-col gap-2">
      <UiLabel for="late">Late registration</UiLabel>
      <UiDateInput id="late" v-model="late" variant="destructive" max="2026-12-18" />
      <p class="text-xs text-destructive">Registration closed on 18 December.</p>
    </div>
  </div>
</template>
