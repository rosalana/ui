<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import { getLocalTimeZone, today } from "@internationalized/date";
import { computed, nextTick, ref, useTemplateRef, watch } from "vue";
import { AnimatePresence, motion } from "motion-v";
import { onClickOutside, unrefElement } from "@vueuse/core";
import UiIcon from "../Icon/Icon.vue";
import { calendarHeadingButton, calendarNavButton, pickerOption } from "./calendar";
import { useLocale } from "../../../composables/useLocale";

/**
 * Quick jump for the calendar heading: the year switches with the arrows, the month is picked
 * from the grid below it.
 *
 * The panel opens inside the calendar, over the days, instead of in its own popover: the
 * calendar often sits in a popover itself (UiDateInput) and a nested one would close it.
 * The calendar root has to be `relative`.
 */
const props = defineProps<{
  /** First month shown by the calendar. */
  placeholder: DateValue;
  locale?: string;
  minValue?: DateValue;
  maxValue?: DateValue;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  select: [placeholder: DateValue];
}>();

const open = ref(false);
const year = ref(props.placeholder.year);
const direction = ref(1);

const trigger = useTemplateRef<HTMLButtonElement>("trigger");
// A component (motion.div), unrefElement gets its element
const panel = useTemplateRef("panel");

onClickOutside(panel, () => (open.value = false), { ignore: [trigger] });

// Every opening starts at the year the calendar shows, with the shown month focused
watch(open, async (isOpen) => {
  if (!isOpen) return;
  year.value = props.placeholder.year;
  await nextTick();
  unrefElement(panel)?.querySelector<HTMLElement>("[data-selected]")?.focus();
});

function close() {
  open.value = false;
  trigger.value?.focus();
}

const now = today(getLocalTimeZone());

const { locale, t } = useLocale(() => props.locale);

const monthNames = computed(() => {
  const format = new Intl.DateTimeFormat(locale.value, { month: "short" });
  return Array.from({ length: 12 }, (_, index) => format.format(new Date(2000, index, 1)));
});

const canGoBack = computed(() => !props.minValue || year.value > props.minValue.year);
const canGoForward = computed(() => !props.maxValue || year.value < props.maxValue.year);

function shiftYear(by: number) {
  direction.value = by;
  year.value += by;
}

/** Month out of min / max as a whole. */
function isOutOfRange(month: number) {
  const first = props.placeholder.set({ year: year.value, month, day: 1 });
  const last = first.add({ months: 1 }).subtract({ days: 1 });
  if (props.minValue && last.compare(props.minValue) < 0) return true;
  if (props.maxValue && first.compare(props.maxValue) > 0) return true;
  return false;
}

function isSelected(month: number) {
  return props.placeholder.year === year.value && props.placeholder.month === month;
}

function pick(month: number) {
  emit("select", props.placeholder.set({ year: year.value, month, day: 1 }));
  close();
}
</script>

<template>
  <button
    ref="trigger"
    type="button"
    :class="calendarHeadingButton()"
    :disabled="disabled"
    :aria-expanded="open"
    @click="open = !open"
  >
    <slot />
    <motion.span
      class="inline-flex text-theme"
      :animate="{ rotate: open ? 180 : 0 }"
      :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
    >
      <UiIcon name="lucide:chevron-down" class="size-3.5" />
    </motion.span>
  </button>

  <AnimatePresence>
    <motion.div
      v-if="open"
      ref="panel"
      data-slot="calendar-month-picker"
      class="absolute inset-x-0 top-13 z-30 mx-auto w-48 rounded-xl border bg-background p-2 shadow-[0_4px_16px_-4px,0_8px_32px_-8px] shadow-theme/15"
      :initial="{ opacity: 0, scale: 0.95, y: -6 }"
      :animate="{ opacity: 1, scale: 1, y: 0 }"
      :exit="{ opacity: 0, scale: 0.95, y: -6 }"
      :transition="{ type: 'spring', stiffness: 400, damping: 28 }"
      style="transform-origin: top center"
      @keydown.esc.stop.prevent="close"
    >
      <div class="flex items-center justify-between pb-2">
        <button type="button" :class="calendarNavButton()" :disabled="!canGoBack" :aria-label="t('calendar.previousYear')" @click="shiftYear(-1)">
          <UiIcon name="lucide:chevron-left" />
        </button>
        <div class="relative h-6 w-16 overflow-hidden text-center text-sm font-semibold tabular-nums">
          <AnimatePresence :initial="false" :custom="direction">
            <motion.span
              :key="year"
              class="absolute inset-0"
              :custom="direction"
              :initial="{ y: direction * 16, opacity: 0 }"
              :animate="{ y: 0, opacity: 1 }"
              :exit="{ y: -direction * 16, opacity: 0 }"
              :transition="{ type: 'spring', stiffness: 400, damping: 30 }"
            >
              {{ year }}
            </motion.span>
          </AnimatePresence>
        </div>
        <button type="button" :class="calendarNavButton()" :disabled="!canGoForward" :aria-label="t('calendar.nextYear')" @click="shiftYear(1)">
          <UiIcon name="lucide:chevron-right" />
        </button>
      </div>

      <div class="grid grid-cols-3 gap-1">
        <button
          v-for="(name, index) in monthNames"
          :key="name"
          type="button"
          class="capitalize"
          :class="pickerOption({
            selected: isSelected(index + 1),
            current: now.year === year && now.month === index + 1,
          })"
          :data-selected="isSelected(index + 1) || undefined"
          :disabled="isOutOfRange(index + 1)"
          @click="pick(index + 1)"
        >
          {{ name }}
        </button>
      </div>
    </motion.div>
  </AnimatePresence>
</template>
