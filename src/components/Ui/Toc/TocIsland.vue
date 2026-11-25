<script setup lang="ts">
import { provide, ref } from "vue";
import { AnimatePresence, motion } from "motion-v";
import { tv, type ClassValue } from "tailwind-variants";
import { useLocale } from "../../../composables/useLocale";
import type { TocHeading } from "./types";
import { tocKey, useTocState } from "./state";
import Toc from "./Toc.vue";

const island = tv({
  base: "fixed top-1/2 right-8 z-40 -translate-y-1/2",
});

const panel = tv({
  base: [
    "max-h-[70vh] w-64 overflow-y-auto rounded-xl border bg-background p-3",
    "shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40",
  ],
});

interface Props {
  headings: TocHeading[];
  /** Distance from the top of the scrolling area (the viewport when the page scrolls) at which a heading counts as being read. */
  offset?: number;
  /** Write the heading's id to the URL hash on a jump. Turn off for a hash-based router. */
  hash?: boolean;
  /** Placement of the island, fixed to the right edge by default. */
  class?: ClassValue;
}

const props = withDefaults(defineProps<Props>(), {
  offset: 120,
  hash: true,
});

const emit = defineEmits<{
  /** A heading was chosen, after the page started scrolling to it. */
  select: [id: string];
}>();

const { t } = useLocale();

const state = useTocState(
  () => ({ headings: props.headings, offset: props.offset, hash: props.hash }),
  (id) => emit("select", id),
);
provide(tocKey, state);
const { active, jump } = state;

const open = ref(false);

function onFocusOut(event: FocusEvent) {
  const root = event.currentTarget as HTMLElement;
  if (!root.contains(event.relatedTarget as Node | null)) open.value = false;
}
</script>

<template>
  <div
    v-if="headings.length"
    data-slot="toc-island"
    :class="island({ class: props.class })"
    @mouseenter="open = true"
    @mouseleave="open = false"
    @focusin="open = true"
    @focusout="onFocusOut"
  >
    <!-- One mark per heading: the overview at a glance, the list on hover or focus -->
    <ul
      class="flex flex-col items-end gap-2.5 py-2 pl-4"
      :aria-label="t('toc.label')"
    >
      <li v-for="heading in headings" :key="heading.id" class="flex">
        <button
          type="button"
          class="flex h-2 cursor-pointer items-center justify-end"
          :class="heading.level === 3 ? 'w-2.5' : 'w-4'"
          :aria-label="heading.text"
          :aria-current="active === heading.id ? 'true' : undefined"
          @click="jump(heading.id)"
        >
          <motion.span
            class="h-0.5 w-full origin-right rounded-full bg-foreground"
            :animate="{
              opacity: active === heading.id ? 1 : 0.25,
              scaleX: active === heading.id ? 1.25 : 1,
            }"
            :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
          />
        </button>
      </li>
    </ul>

    <AnimatePresence>
      <motion.div
        v-if="open"
        class="absolute top-1/2 right-full origin-right pr-2"
        :initial="{ opacity: 0, x: 8, y: '-50%', scale: 0.96 }"
        :animate="{ opacity: 1, x: 0, y: '-50%', scale: 1 }"
        :exit="{ opacity: 0, x: 8, y: '-50%', scale: 0.96 }"
        :transition="{ type: 'spring', stiffness: 400, damping: 30 }"
      >
        <div :class="panel()">
          <Toc :headings="headings" />
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
