<script setup lang="ts">
import { Time } from "@internationalized/date";
import { computed } from "vue";
import { tv, type ClassValue } from "tailwind-variants";
import TimePickerColumn from "./TimePickerColumn.vue";

const timePicker = tv({
  base: "relative inline-flex items-center gap-1 p-2 select-none",
  variants: {
    disabled: { true: "opacity-50" },
  },
});

// Middle row, the same look as a selected day in the calendar
const timePickerBand = tv({
  base: "pointer-events-none absolute inset-x-2 top-1/2 h-8 -translate-y-1/2 rounded-md border border-border bg-muted",
});

interface Props {
  modelValue?: Time | null;
  /** Shown while there's no value yet. Defaults to the current time. */
  placeholder?: Time;
  /** Adds a seconds wheel. */
  seconds?: boolean;
  /** Minutes (and seconds) go in steps of this many. */
  minuteStep?: number;
  /** 12 or 24 hours. Defaults to what the locale uses. */
  hourCycle?: 12 | 24;
  locale?: string;
  /** Visible rows of each wheel, odd. */
  rows?: number;
  /** Endless wheels, 59 runs on into 00. Off stops them at the ends. */
  loop?: boolean;
  /** Wheel and trackpad scrolling. Off leaves them to the page; click and drag still work. */
  scroll?: boolean;
  disabled?: boolean;
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  seconds: false,
  minuteStep: 1,
  rows: 5,
  loop: true,
  scroll: true,
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: Time];
}>();

const resolvedLocale = computed(
  () => props.locale ?? (typeof navigator !== "undefined" ? navigator.language : "en"),
);

const twelveHour = computed(() => {
  if (props.hourCycle) return props.hourCycle === 12;
  const cycle = new Intl.DateTimeFormat(resolvedLocale.value, { hour: "numeric" }).resolvedOptions().hourCycle;
  return cycle === "h12" || cycle === "h11";
});

const fallback = computed(() => {
  if (props.placeholder) return props.placeholder;
  const now = new Date();
  const minute = Math.floor(now.getMinutes() / props.minuteStep) * props.minuteStep;
  return new Time(now.getHours(), minute);
});

const shown = computed(() => props.modelValue ?? fallback.value);

const pad = (value: number) => String(value).padStart(2, "0");
const steps = (count: number, step = 1) =>
  Array.from({ length: Math.ceil(count / step) }, (_, index) => index * step);

const hourOptions = computed(() =>
  twelveHour.value
    ? steps(12).map((value) => ({ value, label: String(value === 0 ? 12 : value) }))
    : steps(24).map((value) => ({ value, label: pad(value) })),
);
const minuteOptions = computed(() => steps(60, props.minuteStep).map((value) => ({ value, label: pad(value) })));
const secondOptions = computed(() => steps(60, props.minuteStep).map((value) => ({ value, label: pad(value) })));

/** AM / PM in the locale's words. */
const periodOptions = computed(() => {
  const format = new Intl.DateTimeFormat(resolvedLocale.value, { hour: "numeric", hour12: true });
  const label = (hour: number) =>
    format.formatToParts(new Date(2000, 0, 1, hour)).find((part) => part.type === "dayPeriod")?.value ??
    (hour < 12 ? "AM" : "PM");
  return [
    { value: 0, label: label(9) },
    { value: 1, label: label(21) },
  ];
});

/** Snaps a value that doesn't sit on the step (e.g. 14:07 with 5 minute steps) to its wheel. */
const snap = (value: number) => Math.floor(value / props.minuteStep) * props.minuteStep;

const hour = computed({
  get: () => (twelveHour.value ? shown.value.hour % 12 : shown.value.hour),
  set: (value: number) => update({ hour: twelveHour.value ? value + (period.value ? 12 : 0) : value }),
});

const minute = computed({
  get: () => snap(shown.value.minute),
  set: (value: number) => update({ minute: value }),
});

const second = computed({
  get: () => snap(shown.value.second),
  set: (value: number) => update({ second: value }),
});

const period = computed({
  get: () => (shown.value.hour >= 12 ? 1 : 0),
  set: (value: number) => update({ hour: (shown.value.hour % 12) + value * 12 }),
});

function update(change: Partial<{ hour: number; minute: number; second: number }>) {
  const base = shown.value;
  emit(
    "update:modelValue",
    new Time(
      change.hour ?? base.hour,
      change.minute ?? snap(base.minute),
      props.seconds ? (change.second ?? snap(base.second)) : 0,
    ),
  );
}
</script>

<template>
  <div
    data-slot="time-picker"
    :class="timePicker({ disabled, class: props.class })"
  >
    <div :class="timePickerBand()" />

    <TimePickerColumn v-model="hour" :options="hourOptions" :rows="rows" :loop="loop" :scroll="scroll" :disabled="disabled" label="Hours" />
    <span class="relative z-10 text-sm font-semibold text-theme">:</span>
    <TimePickerColumn v-model="minute" :options="minuteOptions" :rows="rows" :loop="loop" :scroll="scroll" :disabled="disabled" label="Minutes" />
    <template v-if="seconds">
      <span class="relative z-10 text-sm font-semibold text-theme">:</span>
      <TimePickerColumn v-model="second" :options="secondOptions" :rows="rows" :loop="loop" :scroll="scroll" :disabled="disabled" label="Seconds" />
    </template>
    <TimePickerColumn
      v-if="twelveHour"
      v-model="period"
      :options="periodOptions"
      :rows="rows"
      :disabled="disabled"
      label="AM / PM"
    />
  </div>
</template>
