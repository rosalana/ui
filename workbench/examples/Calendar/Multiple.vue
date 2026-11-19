<script setup lang="ts">
import { shallowRef } from "vue";
import { CalendarDate, type DateValue } from "@internationalized/date";
import { UiButton, UiCalendar } from "@rosalana/ui";

const trainingDays = shallowRef<DateValue[]>([
  new CalendarDate(2026, 11, 3),
  new CalendarDate(2026, 11, 10),
  new CalendarDate(2026, 11, 17),
]);
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <UiCalendar
      v-model="trainingDays"
      multiple
      :default-placeholder="new CalendarDate(2026, 11, 1)"
      aria-label="Training days"
      class="rounded-2xl border border-border p-3"
    />
    <div class="flex items-center gap-3">
      <p class="text-sm text-theme">{{ trainingDays.length }} training days planned</p>
      <UiButton variant="outline" size="sm" :disabled="!trainingDays.length" @click="trainingDays = []">
        Clear
      </UiButton>
    </div>
  </div>
</template>
