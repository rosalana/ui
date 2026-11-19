<script setup lang="ts">
import { computed, ref, shallowRef } from "vue";
import { CalendarDate, type DateValue } from "@internationalized/date";
import { UiButton, UiRangeCalendar } from "@rosalana/ui";

const stay = shallowRef<{ start: DateValue | undefined; end: DateValue | undefined }>({
  start: undefined,
  end: undefined,
});
const reserved = ref(false);

const complete = computed(() => !!stay.value.start && !!stay.value.end);
const nights = computed(() =>
  stay.value.start && stay.value.end ? stay.value.end.compare(stay.value.start) : 0,
);
</script>

<template>
  <div class="flex w-full max-w-xs flex-col items-center gap-3 rounded-2xl border border-border p-4">
    <UiRangeCalendar
      v-model="stay"
      :default-placeholder="new CalendarDate(2026, 11, 1)"
      :min-value="new CalendarDate(2026, 11, 2)"
      prevent-deselect
      aria-label="Cabin stay"
      @update:model-value="reserved = false"
    />
    <UiButton class="w-full" :disabled="!complete" @click="reserved = true">
      {{ complete ? `Reserve (nights: ${nights})` : "Pick arrival and departure" }}
    </UiButton>
    <p v-if="reserved" class="text-sm text-theme">The cabin is reserved for your team.</p>
  </div>
</template>
