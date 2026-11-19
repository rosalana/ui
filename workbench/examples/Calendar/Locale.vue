<script setup lang="ts">
import { shallowRef } from "vue";
import { CalendarDate, type DateValue } from "@internationalized/date";
import { UiCalendar } from "@rosalana/ui";

const day = shallowRef<DateValue | undefined>(new CalendarDate(2026, 11, 21));
const placeholder = new CalendarDate(2026, 11, 1);
</script>

<template>
  <div class="flex flex-wrap items-start justify-center gap-6">
    <UiCalendar
      v-model="day"
      locale="cs-CZ"
      :default-placeholder="placeholder"
      aria-label="Den zápasu"
      class="rounded-2xl border border-border p-3"
    />
    <UiCalendar
      v-model="day"
      locale="en-US"
      :default-placeholder="placeholder"
      aria-label="Match day"
      class="rounded-2xl border border-border p-3"
    />
  </div>
</template>
