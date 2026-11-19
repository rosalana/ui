<script setup lang="ts">
import type { RangeCalendarRootEmits, RangeCalendarRootProps } from "reka-ui";
import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
  RangeCalendarHeader,
  RangeCalendarHeading,
  RangeCalendarNext,
  RangeCalendarPrev,
  RangeCalendarRoot,
  useForwardPropsEmits,
} from "reka-ui";
import { computed, shallowRef, watch } from "vue";
import type { DateValue } from "@internationalized/date";
import type { ClassValue } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";
import { useLocale } from "../../../composables/useLocale";
import { useDate } from "../../../composables/useDate";
import CalendarMonthPicker from "./CalendarMonthPicker.vue";
import CalendarMonthTrack from "./CalendarMonthTrack.vue";
import {
  calendarCell,
  calendarCellTrigger,
  calendarGrid,
  calendarHeadCell,
  calendarHeader,
  calendarHeading,
  calendarNavButton,
  calendarRoot,
  rangeCell,
} from "./calendar";

interface Props extends RangeCalendarRootProps {
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  fixedWeeks: true,
  weekdayFormat: "short",
});
const emit = defineEmits<RangeCalendarRootEmits>();

const delegated = computed(() => {
  const { class: _, placeholder: __, defaultPlaceholder: ___, ...rest } = props;
  return rest;
});

const forwarded = useForwardPropsEmits(delegated, emit);

// The app locale unless the `locale` prop overrides it
const { locale } = useLocale(() => props.locale);


const { today } = useDate();

/**
 * The month in view, kept here so the month / year picker can move it. Without a date from the
 * app it opens on today, which the server doesn't know: until mounted nothing is shown then.
 */
const placeholder = shallowRef<DateValue | undefined>(
  props.placeholder ??
    props.defaultPlaceholder ??
    props.modelValue?.start ??
    props.defaultValue?.start ??
    today.value,
);

watch(today, (value) => {
  if (!placeholder.value && value) placeholder.value = value;
});

watch(
  () => props.placeholder,
  (value) => {
    if (value) placeholder.value = value;
  },
);

function setPlaceholder(value: DateValue) {
  placeholder.value = value;
}

function jumpTo(value: DateValue) {
  setPlaceholder(value);
  emit("update:placeholder", value);
}
</script>

<template>
  <div v-if="!placeholder" data-slot="range-calendar" :class="calendarRoot({ class: props.class })" />
  <RangeCalendarRoot
    v-else
    v-slot="{ grid, weekDays }"
    data-slot="range-calendar"
    v-bind="forwarded"
    :class="calendarRoot({ class: props.class })"
    :locale="locale"
    :placeholder="placeholder"
    @update:placeholder="setPlaceholder"
  >
    <RangeCalendarHeader :class="calendarHeader()">
      <RangeCalendarPrev :class="calendarNavButton()">
        <UiIcon name="lucide:chevron-left" />
      </RangeCalendarPrev>
      <CalendarMonthPicker
        :placeholder="placeholder"
        :locale="locale"
        :min-value="minValue"
        :max-value="maxValue"
        :disabled="disabled"
        @select="jumpTo"
      >
        <RangeCalendarHeading :class="calendarHeading()" />
      </CalendarMonthPicker>
      <RangeCalendarNext :class="calendarNavButton()">
        <UiIcon name="lucide:chevron-right" />
      </RangeCalendarNext>
    </RangeCalendarHeader>

    <CalendarMonthTrack v-slot="{ months }" :grid="grid">
      <RangeCalendarGrid
        v-for="month in months"
        :key="month.value.toString()"
        :class="calendarGrid()"
      >
        <RangeCalendarGridHead>
          <RangeCalendarGridRow class="flex">
            <RangeCalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              :class="calendarHeadCell()"
            >
              {{ day }}
            </RangeCalendarHeadCell>
          </RangeCalendarGridRow>
        </RangeCalendarGridHead>
        <RangeCalendarGridBody>
          <RangeCalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`week-${index}`"
            class="flex w-full"
          >
            <RangeCalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              :class="calendarCell({ class: rangeCell() })"
            >
              <RangeCalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                :class="calendarCellTrigger({ mode: 'range' })"
              />
            </RangeCalendarCell>
          </RangeCalendarGridRow>
        </RangeCalendarGridBody>
      </RangeCalendarGrid>
    </CalendarMonthTrack>
  </RangeCalendarRoot>
</template>
