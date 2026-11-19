<script setup lang="ts">
import { shallowRef } from "vue";
import { CalendarDate, type DateValue } from "@internationalized/date";
import { UiCalendar } from "@rosalana/ui";

const placeholder = new CalendarDate(2026, 11, 1);
const courtDay = shallowRef<DateValue | undefined>();
const locked = shallowRef<DateValue | undefined>(new CalendarDate(2026, 11, 14));

// The gym is closed on weekends
const isWeekend = (date: DateValue) => [0, 6].includes(date.toDate("UTC").getUTCDay());
</script>

<template>
  <div class="flex flex-wrap items-start justify-center gap-6">
    <div class="flex flex-col items-center gap-2">
      <p class="text-sm font-medium">Open weekdays in November</p>
      <UiCalendar
        v-model="courtDay"
        :default-placeholder="placeholder"
        :min-value="new CalendarDate(2026, 11, 4)"
        :max-value="new CalendarDate(2026, 11, 27)"
        :is-date-unavailable="isWeekend"
        aria-label="Court booking day"
        class="rounded-2xl border border-border p-3"
      />
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="text-sm font-medium text-theme">Read-only</p>
      <UiCalendar
        v-model="locked"
        :default-placeholder="placeholder"
        readonly
        aria-label="Confirmed match day"
        class="rounded-2xl border border-border p-3"
      />
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="text-sm font-medium text-theme">Disabled</p>
      <UiCalendar
        :default-placeholder="placeholder"
        disabled
        aria-label="Closed season"
        class="rounded-2xl border border-border p-3"
      />
    </div>
  </div>
</template>
