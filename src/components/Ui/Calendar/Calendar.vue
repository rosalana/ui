<script setup lang="ts">
import type { CalendarRootEmits, CalendarRootProps } from "reka-ui";
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
  useForwardPropsEmits,
} from "reka-ui";
import { computed, shallowRef, watch } from "vue";
import { getLocalTimeZone, today, type DateValue } from "@internationalized/date";
import type { ClassValue } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";
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
} from "./calendar";

interface Props extends CalendarRootProps {
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  fixedWeeks: true,
  weekdayFormat: "short",
});
const emit = defineEmits<CalendarRootEmits>();

const delegated = computed(() => {
  const { class: _, placeholder: __, defaultPlaceholder: ___, ...rest } = props;
  return rest;
});

const forwarded = useForwardPropsEmits(delegated, emit);


const firstDay = (value: DateValue | DateValue[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

/** The month in view, kept here so the month / year picker can move it. */
const placeholder = shallowRef<DateValue>(
  props.placeholder ?? props.defaultPlaceholder ?? firstDay(props.modelValue) ?? today(getLocalTimeZone()),
);

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
  <CalendarRoot
    v-slot="{ grid, weekDays }"
    data-slot="calendar"
    v-bind="forwarded"
    :class="calendarRoot({ class: props.class })"
    :placeholder="placeholder"
    @update:placeholder="setPlaceholder"
  >
    <CalendarHeader :class="calendarHeader()">
      <CalendarPrev :class="calendarNavButton()">
        <UiIcon name="lucide:chevron-left" />
      </CalendarPrev>
      <CalendarMonthPicker
        :placeholder="placeholder"
        :locale="locale"
        :min-value="minValue"
        :max-value="maxValue"
        :disabled="disabled"
        @select="jumpTo"
      >
        <CalendarHeading :class="calendarHeading()" />
      </CalendarMonthPicker>
      <CalendarNext :class="calendarNavButton()">
        <UiIcon name="lucide:chevron-right" />
      </CalendarNext>
    </CalendarHeader>

    <CalendarMonthTrack v-slot="{ months }" :grid="grid">
      <CalendarGrid
        v-for="month in months"
        :key="month.value.toString()"
        :class="calendarGrid()"
      >
        <CalendarGridHead>
          <CalendarGridRow class="flex">
            <CalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              :class="calendarHeadCell()"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody>
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`week-${index}`"
            class="flex w-full"
          >
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              :class="calendarCell()"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                :class="calendarCellTrigger()"
              />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </CalendarMonthTrack>
  </CalendarRoot>
</template>
