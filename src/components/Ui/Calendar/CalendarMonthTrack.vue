<script setup lang="ts" generic="M extends { value: DateValue }">
import type { DateValue } from "@internationalized/date";
import { computed, shallowRef, useTemplateRef, watch } from "vue";
import { motion } from "motion-v";
import { useElementSize } from "@vueuse/core";

/**
 * Lays the months out on one endless strip and springs it to the months in view, like a
 * carousel. Every month keeps its spot on the strip, so changing direction mid-way, or paging
 * fast, just retargets the same motion. Months that slid out stay rendered until it settles.
 */
const props = defineProps<{
  /** Months in view, `grid` from the calendar root's slot. */
  grid: M[];
}>();

defineSlots<{
  default: (props: { months: M[] }) => any;
}>();

/** Gap between months in view, matches `gap-4`. */
const GAP_PX = 16;

interface Entry {
  key: string;
  /** Spot on the strip, in months. */
  position: number;
  months: M[];
}

const monthIndex = (date: DateValue) => date.year * 12 + date.month;

const entries = shallowRef<Entry[]>([]);
const current = shallowRef<Entry>();

watch(
  () => props.grid,
  (grid) => {
    const first = grid[0];
    if (!first) return;
    const key = first.value.toString();
    const known = entries.value.find((entry) => entry.key === key);

    if (known) {
      known.months = grid;
      current.value = known;
    } else {
      const from = current.value;
      const shown = grid.length;
      let position = 0;
      if (from) {
        // A long jump (month / year picker) slides in like the next page instead of crossing empty strip
        const delta = monthIndex(first.value) - monthIndex(from.months[0]!.value);
        position = from.position + (Math.abs(delta) <= shown ? delta : Math.sign(delta) * shown);
      }
      const entry = { key, position, months: grid };
      entries.value = [...entries.value, entry];
      current.value = entry;
    }
    entries.value = [...entries.value];
  },
  { immediate: true },
);

const viewport = useTemplateRef<HTMLElement>("viewport");
const { width } = useElementSize(viewport);

/** Width of one month plus the gap after it. */
const step = computed(() => {
  const shown = props.grid.length || 1;
  return (width.value + GAP_PX) / shown;
});

const x = computed(() => -(current.value?.position ?? 0) * step.value);

function settle() {
  if (current.value) entries.value = [current.value];
}
</script>

<template>
  <div ref="viewport" class="relative overflow-hidden">
    <motion.div
      class="relative"
      :initial="false"
      :animate="{ x }"
      :transition="{ type: 'spring', stiffness: 380, damping: 40 }"
      @animation-complete="settle"
    >
      <div
        v-for="entry in entries"
        :key="entry.key"
        class="flex gap-4"
        :class="entry === current ? 'relative' : 'absolute inset-y-0 w-full'"
        :style="{ left: `${entry.position * step}px` }"
        :aria-hidden="entry === current ? undefined : true"
        :inert="entry === current ? undefined : true"
      >
        <slot :months="entry.months" />
      </div>
    </motion.div>
  </div>
</template>
