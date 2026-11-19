<script setup lang="ts">
import { useLocale } from "../../../composables/useLocale";
import { computed, onBeforeUnmount, reactive, ref, watch } from "vue";
import { AnimatePresence } from "motion-v";
import { tv } from "tailwind-variants";
import { useDocumentVisibility } from "@vueuse/core";
import { state } from "../../../composables/useSonner/state";
import type {
  SonnerDock,
  SonnerId,
  SonnerToast as Toast,
} from "../../../composables/useSonner/state";
import SonnerToast from "./SonnerToast.vue";

/** Space between toasts when the stack is expanded. */
const GAP = 12;
/** How much of each toast peeks out behind the front one when collapsed. */
const PEEK = 10;

const toaster = tv({
  base: [
    "fixed z-[100] w-[calc(100%-2rem)] sm:w-[356px]",
    "transition-[height] duration-300 ease-out",
  ],
  variants: {
    position: {
      "top-left": "top-4 left-4 sm:top-6 sm:left-6",
      "top-center": "top-4 left-1/2 -translate-x-1/2 sm:top-6",
      "top-right": "top-4 right-4 sm:top-6 sm:right-6",
      "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6",
      "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6",
      "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
    },
  },
});

const hovered = ref(false);
const heights = reactive<Record<SonnerId, number>>({});
const visibility = useDocumentVisibility();

const toasts = computed(() => state.toasts.slice(0, state.config.visible));
/** Only the newest dock is shown, older ones wait under it. */
const dock = computed(() => state.docks.at(-1));
const isTop = computed(() => state.config.position.startsWith("top"));
const expanded = computed(() => state.config.expand || hovered.value);
const paused = computed(() => hovered.value || visibility.value === "hidden");

const frontHeight = computed(() =>
  toasts.value[0] ? (heights[toasts.value[0].id] ?? 0) : 0,
);
const dockHeight = computed(() =>
  dock.value ? (heights[dock.value.id] ?? 0) : 0,
);
/** The dock stays at the edge, toasts stack behind it. */
const base = computed(() => (dock.value ? dockHeight.value + GAP : 0));

/** Distance of each toast from the dock (or the edge) when the stack is expanded. */
const offsets = computed(() => {
  let offset = 0;
  return toasts.value.map((toast) => {
    const current = offset;
    offset += (heights[toast.id] ?? 0) + GAP;
    return current;
  });
});

const toastsHeight = computed(() => {
  const count = toasts.value.length;
  if (!count) return 0;
  if (expanded.value) {
    const last = toasts.value[count - 1];
    return offsets.value[count - 1] + (heights[last.id] ?? 0);
  }
  return frontHeight.value + (count - 1) * PEEK;
});

const listHeight = computed(() =>
  toasts.value.length ? base.value + toastsHeight.value : dockHeight.value,
);

interface Item {
  toast: Toast | SonnerDock;
  index: number;
  count: number;
  expanded: boolean;
  offset: number;
  collapsedHeight: number;
}

// One list for toasts and the dock, so a dock turning into a toast
// keeps its element and animates to its new place.
const items = computed<Item[]>(() => {
  const count = toasts.value.length;
  const list: Item[] = toasts.value.map((toast, index) => ({
    toast,
    index,
    count,
    expanded: expanded.value,
    offset:
      base.value + (expanded.value ? offsets.value[index] : index * PEEK),
    collapsedHeight: frontHeight.value,
  }));

  if (dock.value) {
    list.push({
      toast: dock.value,
      index: 0,
      count: count + 1,
      expanded: true,
      offset: 0,
      collapsedHeight: 0,
    });
  }

  return list;
});

// Lets the app keep its content clear of the dock: padding-bottom: var(--dock-height).
watch(
  dockHeight,
  (height) => {
    const root = document.documentElement.style;
    if (height) root.setProperty("--dock-height", `calc(${height}px + 2.25rem)`);
    else root.removeProperty("--dock-height");
  },
  { immediate: true },
);
onBeforeUnmount(() =>
  document.documentElement.style.removeProperty("--dock-height"),
);

// Collapse again once the last toast is gone, the pointer may never leave.
watch(
  () => toasts.value.length,
  (count) => {
    if (!count) hovered.value = false;
  },
);

// Forget heights of toasts that no longer exist.
watch(
  () => [...state.toasts, ...state.docks].map((t) => t.id),
  (ids) => {
    for (const id of Object.keys(heights)) {
      if (!ids.some((i) => String(i) === id)) delete heights[id];
    }
  },
);

const { t } = useLocale();
</script>

<template>
  <section :aria-label="t('notifications.label')" tabindex="-1" aria-live="polite">
    <ol
      data-slot="sonner"
      :data-position="state.config.position"
      :data-expanded="expanded || undefined"
      :class="toaster({ position: state.config.position })"
      :style="{ height: `${listHeight}px` }"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <AnimatePresence>
        <SonnerToast
          v-for="item in items"
          :key="item.toast.id"
          :toast="item.toast"
          :index="item.index"
          :count="item.count"
          :top="isTop"
          :expanded="item.expanded"
          :paused="paused"
          :offset="item.offset"
          :collapsed-height="item.collapsedHeight"
          @height="heights[item.toast.id] = $event"
        />
      </AnimatePresence>
    </ol>
  </section>
</template>
