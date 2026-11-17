<script setup lang="ts">
import { ref } from "vue";
import { isWeekend, type DateValue } from "@internationalized/date";
import Section from "workbench/components/Section.vue";
import UiDateInput from "../../src/components/Ui/DateInput/DateInput.vue";
import UiLabel from "../../src/components/Ui/Label/Label.vue";
import UiButton from "../../src/components/Ui/Button/Button.vue";
import type { DateInputRange } from "../../src/components/Ui/DateInput/value";

const date = ref<string | null>("2026-11-16");
const dateTime = ref<string | null>("2026-11-16T14:30");
const time = ref<string | null>("09:15");
const withSeconds = ref<string | null>("2026-11-16T14:30:45");

const stay = ref<DateInputRange | null>({ start: "2026-12-20", end: "2026-12-27" });
const meeting = ref<DateInputRange | null>({ start: "2026-11-18T09:00", end: "2026-11-18T17:30" });
const shift = ref<DateInputRange | null>({ start: "08:00", end: "16:30" });

const empty = ref<string | null>(null);
const fromLaravel = ref<string | null>("2026-11-16T13:30:00.000000Z");

const booking = ref<string | null>(null);
const noWeekends = (value: DateValue) => isWeekend(value, "cs-CZ");

const birthday = ref<string | null>(null);
</script>

<template>
  <Section title="Date" class="max-w-md space-y-2">
    <UiLabel for="date">Date</UiLabel>
    <UiDateInput id="date" v-model="date" locale="cs-CZ" show-clear />
    <p class="text-xs text-theme">v-model: <code class="text-foreground">{{ JSON.stringify(date) }}</code></p>
  </Section>

  <Section title="Date & time" class="max-w-md space-y-2">
    <UiDateInput v-model="dateTime" time locale="cs-CZ" show-clear />
    <p class="text-xs text-theme">v-model: <code class="text-foreground">{{ JSON.stringify(dateTime) }}</code></p>
    <UiDateInput v-model="withSeconds" time seconds locale="cs-CZ" />
    <p class="text-xs text-theme">With seconds: <code class="text-foreground">{{ JSON.stringify(withSeconds) }}</code></p>
  </Section>

  <Section title="Time only" class="max-w-md space-y-2">
    <UiDateInput v-model="time" :date="false" time locale="cs-CZ" show-clear />
    <p class="text-xs text-theme">v-model: <code class="text-foreground">{{ JSON.stringify(time) }}</code></p>
  </Section>

  <Section title="Ranges" class="max-w-md space-y-4">
    <div class="space-y-2">
      <UiLabel>Stay</UiLabel>
      <UiDateInput v-model="stay" range locale="cs-CZ" show-clear />
      <p class="text-xs text-theme">v-model: <code class="text-foreground">{{ JSON.stringify(stay) }}</code></p>
    </div>
    <div class="space-y-2">
      <UiLabel>Meeting</UiLabel>
      <UiDateInput v-model="meeting" range time locale="cs-CZ" />
      <p class="text-xs text-theme">v-model: <code class="text-foreground">{{ JSON.stringify(meeting) }}</code></p>
    </div>
    <div class="space-y-2">
      <UiLabel>Shift</UiLabel>
      <UiDateInput v-model="shift" range :date="false" time locale="cs-CZ" />
      <p class="text-xs text-theme">v-model: <code class="text-foreground">{{ JSON.stringify(shift) }}</code></p>
    </div>
  </Section>

  <Section title="Locales" class="max-w-md space-y-2">
    <UiDateInput v-model="dateTime" time locale="cs-CZ" />
    <UiDateInput v-model="dateTime" time locale="en-US" />
    <UiDateInput v-model="dateTime" time locale="de-DE" />
  </Section>

  <Section title="Empty & set from outside" class="max-w-md space-y-2">
    <UiDateInput v-model="empty" locale="cs-CZ" show-clear />
    <div class="flex gap-2">
      <UiButton size="xs" variant="outline" @click="empty = '2026-01-01'">New Year</UiButton>
      <UiButton size="xs" variant="outline" @click="empty = '2026-12-24'">Christmas</UiButton>
      <UiButton size="xs" variant="outline" @click="empty = null">Clear</UiButton>
    </div>
    <p class="text-xs text-theme">v-model: <code class="text-foreground">{{ JSON.stringify(empty) }}</code></p>
  </Section>

  <Section title="Laravel timestamp (UTC → local)" class="max-w-md space-y-2">
    <UiDateInput v-model="fromLaravel" time locale="cs-CZ" />
    <p class="text-xs text-theme">
      Reads <code class="text-foreground">2026-11-16T13:30:00.000000Z</code>, writes local time:
      <code class="text-foreground">{{ JSON.stringify(fromLaravel) }}</code>
    </p>
  </Section>

  <Section title="Min / max & unavailable days" class="max-w-md space-y-4">
    <div class="space-y-2">
      <UiLabel>Booking (next 30 days, no weekends)</UiLabel>
      <UiDateInput
        v-model="booking"
        locale="cs-CZ"
        min="2026-11-16"
        max="2026-12-16"
        :is-date-unavailable="noWeekends"
      />
      <p class="text-xs text-theme">Typing a weekend or a day out of range marks the field red.</p>
    </div>
    <div class="space-y-2">
      <UiLabel>Birthday</UiLabel>
      <UiDateInput v-model="birthday" locale="cs-CZ" max="2026-11-16" />
    </div>
  </Section>

  <Section title="States" class="max-w-md space-y-2">
    <UiDateInput model-value="2026-11-16" locale="cs-CZ" disabled />
    <UiDateInput model-value="2026-11-16" locale="cs-CZ" readonly />
    <UiDateInput model-value="2026-11-16" locale="cs-CZ" variant="destructive" />
  </Section>
</template>
