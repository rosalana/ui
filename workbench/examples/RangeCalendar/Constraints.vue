<script setup lang="ts">
import { shallowRef } from "vue";
import { CalendarDate, type DateValue } from "@internationalized/date";
import { UiRangeCalendar } from "@rosalana/ui";

type Range = { start: DateValue | undefined; end: DateValue | undefined };

const stay = shallowRef<Range>({ start: undefined, end: undefined });
const confirmed = shallowRef<Range>({
  start: new CalendarDate(2026, 11, 16),
  end: new CalendarDate(2026, 11, 20),
});
const placeholder = new CalendarDate(2026, 11, 1);

// The hall is taken for the club party
const isBooked = (date: DateValue) => date.compare(new CalendarDate(2026, 11, 25)) === 0;
</script>

<template>
  <div class="flex flex-wrap items-start justify-center gap-6">
    <div class="flex flex-col items-center gap-2">
      <p class="text-sm font-medium">Hall, up to 7 nights</p>
      <UiRangeCalendar
        v-model="stay"
        :default-placeholder="placeholder"
        :min-value="new CalendarDate(2026, 11, 3)"
        :max-value="new CalendarDate(2026, 12, 15)"
        :maximum-days="7"
        :is-date-unavailable="isBooked"
        aria-label="Hall booking"
        class="rounded-2xl border border-border p-3"
      />
    </div>
    <div class="flex flex-col items-center gap-2">
      <p class="text-sm font-medium text-theme">Read-only</p>
      <UiRangeCalendar
        v-model="confirmed"
        :default-placeholder="placeholder"
        readonly
        aria-label="Confirmed stay"
        class="rounded-2xl border border-border p-3"
      />
    </div>
  </div>
</template>
