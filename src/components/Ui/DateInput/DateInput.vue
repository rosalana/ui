<script setup lang="ts">
import {
  DateFieldInput,
  DateFieldRoot,
  DateRangeFieldInput,
  DateRangeFieldRoot,
  TimeFieldInput,
  TimeFieldRoot,
  TimeRangeFieldInput,
  TimeRangeFieldRoot,
  type DateRange,
} from "reka-ui";
import type { DateValue, Time } from "@internationalized/date";
import { computed, ref, shallowRef, watch } from "vue";
import { AnimatePresence, motion } from "motion-v";
import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import { UiButton, UiIcon } from "../../index";
import Popover from "../Popover/Popover.vue";
import PopoverAnchor from "../Popover/PopoverAnchor.vue";
import PopoverTrigger from "../Popover/PopoverTrigger.vue";
import PopoverContent from "../Popover/PopoverContent.vue";
import Calendar from "../Calendar/Calendar.vue";
import RangeCalendar from "../Calendar/RangeCalendar.vue";
import TimePicker from "../TimePicker/TimePicker.vue";
import { useLocale } from "../../../composables/useLocale";
import {
  parseValue,
  serializeValue,
  timeOf,
  toDay,
  withPickedDay,
  withPickedTime,
  type DateInputKind,
  type DateInputRange,
  type DateInputValue,
} from "./value";

// Same frame as UiInput
const dateInput = tv({
  base: [
    "flex h-9 w-full items-center gap-1 rounded-xl border border-border bg-background pl-3 pr-1 text-sm text-foreground",
    "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40",
    "hover:shadow-muted dark:shadow-muted/20 dark:hover:shadow-muted/80",
    "transition-shadow duration-200 ease-out",
    "focus-within:ring-1 focus-within:ring-ring",
    // Out of min/max or an unavailable day
    "has-[[data-invalid]]:border-destructive has-[[data-invalid]]:focus-within:ring-destructive",
  ],
  variants: {
    variant: {
      default: "",
      destructive: "border-destructive focus-within:ring-destructive",
    },
    disabled: {
      true: "cursor-not-allowed opacity-50",
    },
    // Without typing the whole field is the trigger, so it looks and presses like UiSelect's
    pickOnly: {
      true: [
        "cursor-pointer hover:bg-muted active:scale-[0.99] transition-all",
        // Segments can't be edited, so no caret look and no edit highlight on them
        "[&_[data-reka-date-field-segment]]:cursor-pointer [&_[data-reka-time-field-segment]]:cursor-pointer",
        "[&_[data-reka-date-field-segment]:focus]:bg-transparent [&_[data-reka-time-field-segment]:focus]:bg-transparent",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const segment = tv({
  base: "rounded-md px-0.5 py-0.5 tabular-nums outline-none caret-transparent transition-colors duration-150",
  variants: {
    literal: {
      true: "px-0 text-theme",
      false: "focus:bg-primary/15 focus:text-foreground data-[invalid]:text-destructive",
    },
    placeholder: {
      true: "text-theme",
    },
  },
});

type DateInputVariants = VariantProps<typeof dateInput>;

// Not exported by reka-ui
type TimeRange = NonNullable<InstanceType<typeof TimeRangeFieldRoot>["$props"]["modelValue"]>;

interface Props {
  /** ISO string (`2026-11-16`, `2026-11-16T14:30`, `14:30`), or `{ start, end }` with `range`. */
  modelValue?: string | null | DateInputRange;
  /** Edit the date part. On by default. */
  date?: boolean;
  /** Edit the time part. With `date` off the input is time only. */
  time?: boolean;
  /** Pick a start and an end. */
  range?: boolean;
  /** Edit seconds too, written as `HH:mm:ss`. */
  seconds?: boolean;
  /** Earliest allowed value, ISO string. */
  min?: string;
  /** Latest allowed value, ISO string. */
  max?: string;
  /** Days that can't be picked, e.g. weekends. */
  isDateUnavailable?: (date: DateValue) => boolean;
  /** Overrides the app locale (`useLocale()`) for this input. */
  locale?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  /** Sends the value with a native form submit. A range sends `name[start]` and `name[end]`. */
  name?: string;
  id?: string;
  variant?: DateInputVariants["variant"];
  showClear?: boolean;
  /**
   * Typing into the field. Off, the value is only picked in the popover, which opens on a click
   * anywhere in the field (or Enter / Space / ↓).
   */
  manual?: boolean;
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  date: true,
  time: false,
  range: false,
  seconds: false,
  disabled: false,
  readonly: false,
  required: false,
  variant: "default",
  showClear: false,
  manual: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | null | DateInputRange];
}>();

const kind = computed<DateInputKind>(() => {
  if (props.date && props.time) return "datetime";
  if (!props.date && props.time) return "time";
  return "date";
});

const granularity = computed(() => {
  if (kind.value === "date") return "day" as const;
  return props.seconds ? ("second" as const) : ("minute" as const);
});

const { locale, t } = useLocale(() => props.locale);

const parse = (value: string | null | undefined) => parseValue(value, kind.value);
const serialize = (value: DateValue | Time | null | undefined) =>
  serializeValue(value, kind.value, props.seconds);

const minValue = computed(() => parse(props.min) ?? undefined);
const maxValue = computed(() => parse(props.max) ?? undefined);

/* ---------------------------------------------------------------- single value */

// Shallow: a deep ref would unwrap the date classes and lose their types
const single = shallowRef<DateInputValue | null>(null);

/* ---------------------------------------------------------------- range value */

interface InnerRange {
  start: DateInputValue | null;
  end: DateInputValue | null;
}

const rangeValue = shallowRef<InnerRange | null>(null);

/**
 * reka-ui's range fields only follow their own segments once mounted, a value set from outside
 * (calendar, time picker, clear, v-model) never reaches them. Bumping this remounts them with it.
 * Changes typed into the field itself don't go through here.
 */
const rangeFieldKey = ref(0);

function setRangeFromOutside(value: InnerRange | null) {
  rangeValue.value = value;
  rangeFieldKey.value++;
}

function serializeRange(value: InnerRange | null): DateInputRange | null {
  const start = serialize(value?.start);
  const end = serialize(value?.end);
  return start || end ? { start, end } : null;
}

function parseRange(value: DateInputRange | null | undefined): InnerRange | null {
  if (!value) return null;
  const start = parse(value.start);
  const end = parse(value.end);
  return start || end ? { start, end } : null;
}

/* ---------------------------------------------------------------- sync with v-model */

const current = computed(() =>
  props.range ? serializeRange(rangeValue.value) : serialize(single.value),
);

const same = (a: unknown, b: unknown) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

// Adopts outside changes, skipping echoes of what the field just emitted
watch(
  () => [props.modelValue, props.range, kind.value, props.seconds] as const,
  ([value]) => {
    if (props.range) {
      const next = typeof value === "object" ? value : null;
      if (!same(serializeRange(parseRange(next)), current.value)) setRangeFromOutside(parseRange(next));
    } else {
      const next = typeof value === "string" ? value : null;
      if (!same(serialize(parse(next)), current.value)) single.value = parse(next);
    }
  },
  { immediate: true },
);

watch(current, (value) => {
  if (!same(value, props.modelValue)) emit("update:modelValue", value);
});

/* ---------------------------------------------------------------- field models */

const dateModel = computed({
  get: () => (single.value ?? undefined) as DateValue | undefined,
  set: (value: DateValue | null | undefined) => (single.value = (value as DateInputValue) ?? null),
});

const timeModel = computed({
  get: () => (single.value ?? undefined) as Time | undefined,
  set: (value: unknown) => (single.value = (value as Time) ?? null),
});

const dateRangeModel = computed({
  get: () =>
    ({
      start: rangeValue.value?.start ?? undefined,
      end: rangeValue.value?.end ?? undefined,
    }) as DateRange,
  set: (value: DateRange | null) => {
    rangeValue.value = value
      ? { start: (value.start as DateInputValue) ?? null, end: (value.end as DateInputValue) ?? null }
      : null;
  },
});

const timeRangeModel = computed({
  get: () =>
    ({
      start: rangeValue.value?.start ?? undefined,
      end: rangeValue.value?.end ?? undefined,
    }) as TimeRange,
  set: (value: TimeRange | null | undefined) => {
    rangeValue.value = value
      ? { start: (value.start as Time) ?? null, end: (value.end as Time) ?? null }
      : null;
  },
});

/* ---------------------------------------------------------------- popover: calendar and time */

const open = ref(false);
const hasCalendar = computed(() => kind.value !== "time");
const hasTime = computed(() => kind.value !== "date");

// A pick only closes the popover when there's nothing else left to set in it
const closeOnPick = computed(() => !hasTime.value);

const calendarMin = computed(() => toDay(minValue.value));
const calendarMax = computed(() => toDay(maxValue.value));

const calendarModel = computed({
  get: () => toDay(single.value),
  set: (day: DateValue | undefined) => {
    if (!day) return;
    single.value = withPickedDay(day, single.value, kind.value);
    if (closeOnPick.value) open.value = false;
  },
});

const rangeCalendarModel = computed({
  get: () =>
    ({ start: toDay(rangeValue.value?.start), end: toDay(rangeValue.value?.end) }) as DateRange,
  set: (value: DateRange | null) => {
    if (!value?.start) return;
    setRangeFromOutside({
      start: withPickedDay(value.start, rangeValue.value?.start, kind.value),
      end: value.end ? withPickedDay(value.end, rangeValue.value?.end, kind.value) : null,
    });
    if (value.end && closeOnPick.value) open.value = false;
  },
});

const pickedTime = computed({
  get: () => timeOf(single.value),
  set: (time: Time | null) => {
    if (time) single.value = withPickedTime(time, single.value, kind.value);
  },
});

const startTimeModel = computed({
  get: () => timeOf(rangeValue.value?.start),
  set: (time: Time | null) => {
    if (!time) return;
    setRangeFromOutside({
      start: withPickedTime(time, rangeValue.value?.start, kind.value),
      end: rangeValue.value?.end ?? null,
    });
  },
});

const endTimeModel = computed({
  get: () => timeOf(rangeValue.value?.end),
  set: (time: Time | null) => {
    if (!time) return;
    setRangeFromOutside({
      start: rangeValue.value?.start ?? null,
      end: withPickedTime(time, rangeValue.value?.end, kind.value),
    });
  },
});

const timePickerProps = computed(() => ({
  locale: locale.value,
  seconds: props.seconds,
  disabled: props.disabled || props.readonly,
}));

/* ---------------------------------------------------------------- clear */

const hasValue = computed(() => current.value !== null);
const canClear = computed(() => props.showClear && hasValue.value && !props.disabled && !props.readonly);

function clear() {
  single.value = null;
  if (props.range) setRangeFromOutside(null);
}

/* ---------------------------------------------------------------- shared */

const pickOnly = computed(() => !props.manual && !props.disabled && !props.readonly);

/*
 * Clicking the field while the popover is open first closes it (outside pointerdown), then the
 * click would open it again. Remembering the state from before the pointerdown makes it a toggle.
 */
let openBeforePress = false;

function onFieldPointerDown() {
  openBeforePress = open.value;
}

function onFieldClick(event: MouseEvent) {
  if (!pickOnly.value) return;
  // The buttons inside do their own thing
  if ((event.target as HTMLElement).closest("button")) return;
  open.value = !openBeforePress;
}

function onFieldKeydown(event: KeyboardEvent) {
  if (!pickOnly.value || !["Enter", " ", "ArrowDown"].includes(event.key)) return;
  event.preventDefault();
  open.value = true;
}

const fieldProps = computed(() => ({
  locale: locale.value,
  granularity: granularity.value,
  disabled: props.disabled,
  // Without manual typing the segments stay focusable but take no input
  readonly: props.readonly || !props.manual,
  required: props.required,
  id: props.id,
}));

/*
 * Segments are contenteditable and reka-ui reads the keys on keydown without stopping the
 * browser from typing the character in as well, so the last digit showed up twice ("9:242").
 * Every segment cancels `beforeinput` to keep the text to what reka-ui renders.
 */
const isPlaceholder = (item: { part: string; value: string }) =>
  item.part !== "literal" && item.part !== "dayPeriod" && !/\d/.test(item.value);

const segmentClass = (item: { part: string; value: string }) =>
  segment({ literal: item.part === "literal", placeholder: isPlaceholder(item) });

/*
 * Node's ICU puts a narrow no-break space before AM / PM where browsers put a plain one, so the
 * server and the browser would render different text. Both get the plain space.
 */
const segmentText = (item: { value: string }) => item.value.replace(/\u202F/g, " ");

const fieldClass = "flex min-w-0 flex-1 items-center whitespace-nowrap";
</script>

<template>
  <Popover v-model:open="open">
    <PopoverAnchor as-child>
      <div
        data-slot="date-input"
        :class="dateInput({ variant, disabled, pickOnly, class: props.class })"
        @pointerdown="onFieldPointerDown"
        @click="onFieldClick"
        @keydown="onFieldKeydown"
      >
        <!-- Date / date-time -->
        <DateFieldRoot
          v-if="!range && kind !== 'time'"
          v-slot="{ segments }"
          v-model="dateModel"
          v-bind="fieldProps"
          :min-value="minValue as DateValue | undefined"
          :max-value="maxValue as DateValue | undefined"
          :is-date-unavailable="isDateUnavailable"
          :class="fieldClass"
        >
          <DateFieldInput
            v-for="(item, index) in segments"
            :key="`${item.part}-${index}`"
            :part="item.part"
            :class="segmentClass(item)"
            @beforeinput.prevent
          >
            {{ segmentText(item) }}
          </DateFieldInput>
        </DateFieldRoot>

        <!-- Time -->
        <TimeFieldRoot
          v-else-if="!range"
          v-slot="{ segments }"
          v-model="timeModel"
          v-bind="fieldProps"
          :granularity="granularity === 'day' ? 'minute' : granularity"
          :min-value="minValue as Time | undefined"
          :max-value="maxValue as Time | undefined"
          :class="fieldClass"
        >
          <TimeFieldInput
            v-for="(item, index) in segments"
            :key="`${item.part}-${index}`"
            :part="item.part"
            :class="segmentClass(item)"
            @beforeinput.prevent
          >
            {{ segmentText(item) }}
          </TimeFieldInput>
        </TimeFieldRoot>

        <!-- Date / date-time range -->
        <DateRangeFieldRoot
          v-else-if="kind !== 'time'"
          :key="`date-range-${rangeFieldKey}`"
          v-slot="{ segments }"
          v-model="dateRangeModel"
          v-bind="fieldProps"
          :min-value="minValue as DateValue | undefined"
          :max-value="maxValue as DateValue | undefined"
          :is-date-unavailable="isDateUnavailable"
          :class="fieldClass"
        >
          <template v-for="type in (['start', 'end'] as const)" :key="type">
            <span v-if="type === 'end'" class="px-1.5 text-theme">–</span>
            <DateRangeFieldInput
              v-for="(item, index) in segments[type]"
              :key="`${type}-${item.part}-${index}`"
              :part="item.part"
              :type="type"
              :class="segmentClass(item)"
            @beforeinput.prevent
            >
              {{ segmentText(item) }}
            </DateRangeFieldInput>
          </template>
        </DateRangeFieldRoot>

        <!-- Time range -->
        <TimeRangeFieldRoot
          v-else
          :key="`time-range-${rangeFieldKey}`"
          v-slot="{ segments }"
          v-model="timeRangeModel"
          v-bind="fieldProps"
          :granularity="granularity === 'day' ? 'minute' : granularity"
          :min-value="minValue as Time | undefined"
          :max-value="maxValue as Time | undefined"
          :class="fieldClass"
        >
          <template v-for="type in (['start', 'end'] as const)" :key="type">
            <span v-if="type === 'end'" class="px-1.5 text-theme">–</span>
            <TimeRangeFieldInput
              v-for="(item, index) in segments[type]"
              :key="`${type}-${item.part}-${index}`"
              :part="item.part"
              :type="type"
              :class="segmentClass(item)"
            @beforeinput.prevent
            >
              {{ segmentText(item) }}
            </TimeRangeFieldInput>
          </template>
        </TimeRangeFieldRoot>

        <!-- Actions, same buttons as UiInput -->
        <div class="flex shrink-0 items-center">
          <AnimatePresence>
            <motion.div
              v-if="canClear"
              :initial="{ opacity: 0, scale: 0.5, rotate: -45 }"
              :animate="{ opacity: 1, scale: 1, rotate: 0 }"
              :exit="{ opacity: 0, scale: 0.5, rotate: 45 }"
              :transition="{ type: 'spring', stiffness: 300, damping: 20 }"
            >
              <UiButton
                variant="clear"
                size="icon-sm"
                type="button"
                tabindex="-1"
                :aria-label="t('dateInput.clear')"
                class="size-7 text-destructive"
                @click="clear"
              >
                <UiIcon name="lucide:x" class="size-4" />
              </UiButton>
            </motion.div>
          </AnimatePresence>

          <PopoverTrigger as-child :disabled="disabled || readonly">
            <UiButton
              variant="clear"
              size="icon-sm"
              type="button"
              :aria-label="t(hasCalendar ? 'dateInput.openCalendar' : 'dateInput.openTimePicker')"
              class="size-7 text-primary"
              :disabled="disabled || readonly"
            >
              <UiIcon :name="hasCalendar ? 'lucide:calendar' : 'lucide:clock'" class="size-4" />
            </UiButton>
          </PopoverTrigger>
        </div>

        <!-- Native form submit -->
        <template v-if="name">
          <template v-if="range">
            <input type="hidden" :name="`${name}[start]`" :value="(current as DateInputRange | null)?.start ?? ''" />
            <input type="hidden" :name="`${name}[end]`" :value="(current as DateInputRange | null)?.end ?? ''" />
          </template>
          <input v-else type="hidden" :name="name" :value="current ?? ''" />
        </template>
      </div>
    </PopoverAnchor>

    <PopoverContent align="end" class="w-auto p-0">
      <!-- Range: calendar on top, start and end time below -->
      <div v-if="range" data-slot="date-input-popover" class="flex flex-col">
        <RangeCalendar
          v-if="hasCalendar"
          v-model="rangeCalendarModel"
          :locale="locale"
          :min-value="calendarMin"
          :max-value="calendarMax"
          :is-date-unavailable="isDateUnavailable"
          :default-placeholder="rangeCalendarModel.start"
          :number-of-months="2"
          initial-focus
        />
        <div
          v-if="hasTime"
          class="flex items-center justify-center gap-2"
          :class="hasCalendar && 'border-t border-border'"
        >
          <TimePicker v-model="startTimeModel" v-bind="timePickerProps" :rows="hasCalendar ? 3 : 5" />
          <span class="text-theme">–</span>
          <TimePicker v-model="endTimeModel" v-bind="timePickerProps" :rows="hasCalendar ? 3 : 5" />
        </div>
      </div>

      <!-- Single: calendar with the time next to it -->
      <div v-else data-slot="date-input-popover" class="flex items-stretch">
        <Calendar
          v-if="hasCalendar"
          v-model="calendarModel"
          :locale="locale"
          :min-value="calendarMin"
          :max-value="calendarMax"
          :is-date-unavailable="isDateUnavailable"
          :default-placeholder="calendarModel"
          prevent-deselect
          initial-focus
        />
        <div
          v-if="hasTime"
          class="flex items-center"
          :class="hasCalendar && 'border-l border-border'"
        >
          <TimePicker v-model="pickedTime" v-bind="timePickerProps" :rows="hasCalendar ? 7 : 5" />
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
