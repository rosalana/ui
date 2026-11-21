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
/** Docks have their own stack at the edge, the newest in front. */
const docks = computed(() =>
  state.docks.slice(-state.config.visible).reverse(),
);
const isTop = computed(() => state.config.position.startsWith("top"));
const expanded = computed(() => state.config.expand || hovered.value);
const paused = computed(() => hovered.value || visibility.value === "hidden");

/** Layout of one stack: offsets of its items and its height. */
function layout(list: (Toast | SonnerDock)[]) {
  const front = list[0] ? (heights[list[0].id] ?? 0) : 0;
  let offset = 0;
  const offsets = list.map((item) => {
    const current = offset;
    offset += (heights[item.id] ?? 0) + GAP;
    return current;
  });
  const collapsed = list.length ? front + (list.length - 1) * PEEK : 0;
  const height = !list.length
    ? 0
    : expanded.value
      ? offset - GAP
      : collapsed;
  return { front, offsets, collapsed, height };
}

const toastStack = computed(() => layout(toasts.value));
const dockStack = computed(() => layout(docks.value));

/** The docks stay at the edge, toasts stack behind them. */
const base = computed(() =>
  docks.value.length ? dockStack.value.height + GAP : 0,
);

const listHeight = computed(() =>
  toasts.value.length
    ? base.value + toastStack.value.height
    : dockStack.value.height,
);

interface Item {
  toast: Toast | SonnerDock;
  index: number;
  expanded: boolean;
  offset: number;
  collapsedHeight: number;
}

// One list for toasts and docks, so a dock turning into a toast
// keeps its element and animates to its new place.
// Ordered back to front (older toasts, toasts, docks): the DOM order is
// the paint order, and a leaving item keeps its place while it animates
// out, so it never pops above the items that stay.
const items = computed<Item[]>(() => {
  const stack = (
    list: (Toast | SonnerDock)[],
    { offsets, front }: ReturnType<typeof layout>,
    start: number,
  ): Item[] =>
    list
      .map((toast, index) => ({
        toast,
        index,
        expanded: expanded.value,
        offset: start + (expanded.value ? offsets[index] : index * PEEK),
        collapsedHeight: front,
      }))
      .reverse();

  return [
    ...stack(toasts.value, toastStack.value, base.value),
    ...stack(docks.value, dockStack.value, 0),
  ];
});

// Lets the app keep its content clear of the dock: padding-bottom: var(--dock-height).
// The collapsed height, so the page doesn't jump while the stack is hovered.
watch(
  () => dockStack.value.collapsed,
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
