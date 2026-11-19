<script setup lang="ts">
import { shallowRef } from "vue";
import { CalendarDate, type DateValue } from "@internationalized/date";
import { UiCalendar } from "@rosalana/ui";

const day = shallowRef<DateValue | undefined>();
</script>

<template>
  <UiCalendar
    v-model="day"
    :number-of-months="2"
    :week-starts-on="1"
    :fixed-weeks="false"
    :default-placeholder="new CalendarDate(2026, 11, 1)"
    aria-label="Tournament day"
    class="rounded-2xl border border-border p-3"
  />
</template>
