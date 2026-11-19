<script setup lang="ts">
import { shallowRef } from "vue";
import { CalendarDate, type DateValue } from "@internationalized/date";
import { UiRangeCalendar } from "@rosalana/ui";

type Range = { start: DateValue | undefined; end: DateValue | undefined };

// Fixed dates keep the first render identical on the server and in the browser
const camp = shallowRef<Range>({
  start: new CalendarDate(2026, 11, 9),
  end: new CalendarDate(2026, 11, 13),
});
</script>

<template>
  <UiRangeCalendar
    v-model="camp"
    :default-placeholder="new CalendarDate(2026, 11, 1)"
    aria-label="Training camp"
    class="rounded-2xl border border-border p-3"
  />
</template>
