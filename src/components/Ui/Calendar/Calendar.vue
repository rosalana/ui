<script setup lang="ts">
import type { CalendarRootEmits, CalendarRootProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
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
import { tv } from "tailwind-variants";
import UiIcon from "../Icon/Icon.vue";

const calendarRoot = tv({
  base: "p-3",
});

const calendarHeader = tv({
  base: "flex items-center justify-between pt-1 relative",
});

const calendarHeading = tv({
  base: "text-sm font-medium",
});

const calendarNavButton = tv({
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
});

const calendarGrid = tv({
  base: "w-full border-collapse space-y-1",
});

const calendarHeadCell = tv({
  base: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
});

const calendarCell = tv({
  base: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
});

const calendarCellTrigger = tv({
  base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground size-8 p-0 aria-selected:opacity-100 data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50 data-[today]:bg-accent data-[today]:text-accent-foreground data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground data-[disabled]:text-muted-foreground data-[disabled]:opacity-50 data-[unavailable]:text-muted-foreground data-[unavailable]:line-through",
});

interface Props extends CalendarRootProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
const emit = defineEmits<CalendarRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <CalendarRoot
    data-slot="calendar"
    v-slot="{ grid, weekDays }"
    v-bind="forwarded"
    :class="[calendarRoot({ class: props.class })]"
  >
    <CalendarHeader :class="calendarHeader()">
      <CalendarPrev :class="calendarNavButton()">
        <UiIcon name="lucide:chevron-left" class="size-4" />
      </CalendarPrev>
      <CalendarHeading :class="calendarHeading()" />
      <CalendarNext :class="calendarNavButton()">
        <UiIcon name="lucide:chevron-right" class="size-4" />
      </CalendarNext>
    </CalendarHeader>

    <div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <CalendarGrid
        v-for="month in grid"
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
            :key="`weekDate-${index}`"
            class="flex w-full mt-2"
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
    </div>
  </CalendarRoot>
</template>
