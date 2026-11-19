<script setup lang="ts">
import { shallowRef } from "vue";
import { CalendarDate, type DateValue } from "@internationalized/date";
import { UiCalendar } from "@rosalana/ui";

// A fixed date keeps the first render identical on the server and in the browser
const matchDay = shallowRef<DateValue | undefined>(new CalendarDate(2026, 11, 21));
</script>

<template>
  <UiCalendar
    v-model="matchDay"
    :default-placeholder="new CalendarDate(2026, 11, 1)"
    aria-label="Match day"
    class="rounded-2xl border border-border p-3"
  />
</template>
