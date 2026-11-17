<script setup lang="ts">
import { shallowRef } from "vue";
import { getLocalTimeZone, isWeekend, today, type DateValue } from "@internationalized/date";
import type { DateRange } from "reka-ui";
import UiCalendar from "../../src/components/Ui/Calendar/Calendar.vue";
import UiRangeCalendar from "../../src/components/Ui/Calendar/RangeCalendar.vue";
import Section from "workbench/components/Section.vue";

const now = today(getLocalTimeZone());

const selected = shallowRef<DateValue | undefined>(now);
const range = shallowRef<DateRange>({ start: now.subtract({ days: 3 }), end: now.add({ days: 4 }) });
const weekday = shallowRef<DateValue | undefined>();

const noWeekends = (date: DateValue) => isWeekend(date, "cs-CZ");
</script>

<template>
  <Section title="Single date" class="flex flex-wrap items-start gap-6">
    <div class="inline-block rounded-xl border border-border bg-background">
      <UiCalendar v-model="selected" locale="cs-CZ" />
    </div>
    <div class="inline-block rounded-xl border border-border bg-background">
      <UiCalendar v-model="selected" locale="en-US" />
    </div>
    <p class="text-xs text-theme">Selected: <strong class="text-foreground">{{ selected ?? "—" }}</strong></p>
  </Section>

  <Section title="Range (two months)" class="space-y-3">
    <div class="inline-block rounded-xl border border-border bg-background">
      <UiRangeCalendar v-model="range" locale="cs-CZ" :number-of-months="2" />
    </div>
    <p class="text-xs text-theme">
      {{ range.start ?? "—" }} → {{ range.end ?? "—" }}
    </p>
  </Section>

  <Section title="Min / max & unavailable days" class="flex flex-wrap items-start gap-6">
    <div class="inline-block rounded-xl border border-border bg-background">
      <UiCalendar
        v-model="weekday"
        locale="cs-CZ"
        :min-value="now"
        :max-value="now.add({ days: 30 })"
        :is-date-unavailable="noWeekends"
      />
    </div>
    <p class="max-w-56 text-xs text-theme">
      Only the next 30 days, weekends crossed out.
    </p>
  </Section>

  <Section title="Disabled">
    <div class="inline-block rounded-xl border border-border bg-background">
      <UiCalendar :default-value="now" locale="cs-CZ" disabled />
    </div>
  </Section>
</template>
