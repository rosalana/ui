<script setup lang="ts">
import { shallowRef } from "vue";
import { CalendarDate, type DateValue } from "@internationalized/date";
import { UiRangeCalendar } from "@rosalana/ui";

const season = shallowRef<{ start: DateValue | undefined; end: DateValue | undefined }>({
  start: undefined,
  end: undefined,
});
</script>

<template>
  <UiRangeCalendar
    v-model="season"
    :number-of-months="2"
    :week-starts-on="1"
    :default-placeholder="new CalendarDate(2026, 11, 1)"
    aria-label="Season"
    class="rounded-2xl border border-border p-3"
  />
</template>
