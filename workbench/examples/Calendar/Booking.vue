<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { CalendarDate, type DateValue } from "@internationalized/date";
import { UiButton, UiCalendar, useLocale } from "@rosalana/ui";

const { locale } = useLocale();

const day = shallowRef<DateValue | undefined>();
const booked = ref<string | null>(null);

const isWeekend = (date: DateValue) => [0, 6].includes(date.toDate("UTC").getUTCDay());

function book() {
  if (!day.value) return;
  // Formatting happens in an event handler, never during render
  booked.value = day.value.toDate("UTC").toLocaleDateString(locale.value, {
    dateStyle: "full",
    timeZone: "UTC",
  });
}
</script>

<template>
  <div class="flex w-full max-w-xs flex-col items-center gap-3 rounded-2xl border border-border p-4">
    <UiCalendar
      v-model="day"
      :default-placeholder="new CalendarDate(2026, 11, 1)"
      :min-value="new CalendarDate(2026, 11, 2)"
      :is-date-unavailable="isWeekend"
      aria-label="Training room day"
      @update:model-value="booked = null"
    />
    <UiButton class="w-full" :disabled="!day" @click="book">Book the training room</UiButton>
    <p v-if="booked" class="text-center text-sm text-theme">Booked for {{ booked }}.</p>
  </div>
</template>
