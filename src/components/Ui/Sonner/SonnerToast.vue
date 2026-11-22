<script setup lang="ts">
import { useLocale } from "../../../composables/useLocale";
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { AnimatePresence, motion } from "motion-v";
import type { PanInfo } from "motion-v";
import { tv } from "tailwind-variants";
import { useResizeObserver } from "@vueuse/core";
import {
  autoClose,
  dismiss,
  runDockAction,
  state,
} from "../../../composables/useSonner/state";
import type {
  DockAction,
  SonnerDock,
  SonnerToast,
} from "../../../composables/useSonner/state";
import UiIcon from "../Icon/Icon.vue";
import UiButton from "../Button/Button.vue";

/** Horizontal drag distance after which the toast is dismissed. */
const SWIPE_THRESHOLD = 80;

const props = defineProps<{
  toast: SonnerToast | SonnerDock;
  index: number;
  top: boolean;
  expanded: boolean;
  paused: boolean;
  offset: number;
  collapsedHeight: number;
}>();

const emit = defineEmits<{
  height: [value: number];
}>();

const icon = tv({
  base: "flex size-8 shrink-0 items-center justify-center rounded-xl [&_svg]:size-4",
  variants: {
    type: {
      default: "bg-muted text-foreground",
      info: "bg-info/10 text-info-600 dark:text-info-400",
      success: "bg-success/10 text-success-600 dark:text-success-400",
      warning: "bg-warning/10 text-warning-600 dark:text-warning-400",
      error: "bg-destructive/10 text-destructive-600 dark:text-destructive-400",
      loading: "bg-muted text-theme",
      dock: "bg-muted text-foreground",
    },
  },
});

const DEFAULT_ICONS: Record<(SonnerToast | SonnerDock)["type"], string | null> = {
  default: null,
  info: "lucide:info",
  success: "lucide:check-circle",
  warning: "lucide:alert-triangle",
  error: "lucide:alert-circle",
  loading: "lucide:loader",
  dock: null,
};

const iconName = computed(
  () => props.toast.icon ?? DEFAULT_ICONS[props.toast.type],
);
const isFront = computed(() => props.index === 0);
const dock = computed(() =>
  props.toast.type === "dock" ? props.toast : null,
);
// A dock goes away only when its condition does.
const dismissible = computed(
  () => !dock.value && (props.toast as SonnerToast).dismissible !== false,
);
const contentVisible = computed(() => isFront.value || props.expanded);

// Measure the natural height so the stack can lay toasts out.
const content = ref<HTMLElement | null>(null);
const height = ref(0);
useResizeObserver(content, () => {
  if (!content.value) return;
  height.value = content.value.offsetHeight;
  emit("height", height.value);
});

const animate = computed(() => {
  const direction = props.top ? 1 : -1;
  const ownHeight = height.value || "auto";

  return {
    opacity: 1,
    y: direction * props.offset,
    scale: props.expanded ? 1 : 1 - props.index * 0.05,
    height: contentVisible.value
      ? ownHeight
      : props.collapsedHeight || ownHeight,
  };
});

// Auto close timer, paused while the stack is hovered or the tab hidden.
let timer: ReturnType<typeof setTimeout> | undefined;
let startedAt = 0;
let remaining = 0;

const duration = () =>
  props.toast.type === "loading" || props.toast.type === "dock"
    ? Infinity
    : (props.toast.duration ?? state.config.duration);

function start() {
  clearTimeout(timer);
  if (!Number.isFinite(remaining) || props.paused) return;
  startedAt = Date.now();
  timer = setTimeout(() => autoClose(props.toast.id), remaining);
}

function pause() {
  clearTimeout(timer);
  if (!Number.isFinite(remaining)) return;
  remaining = Math.max(0, remaining - (Date.now() - startedAt));
}

function reset() {
  remaining = duration();
  start();
}

watch(
  () => props.paused,
  (paused) => (paused ? pause() : start()),
);
// Updated toast (e.g. promise settled) starts its full duration again.
watch(() => props.toast.version, reset);

onMounted(reset);
onBeforeUnmount(() => clearTimeout(timer));

function close() {
  if (dismissible.value) dismiss(props.toast.id);
}

// By index, the dock content is rebuilt on every change of its condition.
const running = reactive(new Set<number>());

async function onAction(action: DockAction, index: number) {
  if (!dock.value) return;
  running.add(index);
  try {
    await runDockAction(dock.value, action);
  } finally {
    running.delete(index);
  }
}

function onDragEnd(_event: PointerEvent, info: PanInfo) {
  if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) close();
}

const { t } = useLocale();
</script>

<template>
  <motion.li
    :data-slot="dock ? 'sonner-dock' : 'sonner-toast'"
    :data-type="toast.type"
    :data-front="isFront || undefined"
    :role="toast.type === 'error' ? 'alert' : 'status'"
    :class="[
      'group absolute inset-x-0 touch-pan-y select-none',
      top ? 'top-0' : 'bottom-0',
      'rounded-2xl bg-background text-foreground ring-1 ring-border',
      'shadow-[0_2px_8px_-3px,0_4px_20px_-4px] shadow-muted/40',
    ]"
    :style="{
      transformOrigin: top ? 'top center' : 'bottom center',
    }"
    :initial="{ opacity: 0, y: top ? -24 : 24, scale: 0.96 }"
    :animate="animate"
    :exit="{ opacity: 0, scale: 0.94 }"
    :transition="{ type: 'spring', stiffness: 400, damping: 32 }"
    :drag="dismissible ? 'x' : false"
    :drag-snap-to-origin="true"
    :drag-elastic="0.6"
    @drag-end="onDragEnd"
  >
    <div
      ref="content"
      :class="[
        'p-4 transition-opacity duration-200',
        contentVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
      ]"
    >
      <component :is="dock.content" v-if="dock?.content" />

      <div v-else class="flex items-center gap-3">
        <AnimatePresence mode="wait" :initial="false">
          <motion.span
            v-if="iconName"
            :key="`${toast.type}-${iconName}`"
            :class="icon({ type: toast.type })"
            :initial="{ opacity: 0, scale: 0.6 }"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0, scale: 0.6 }"
            :transition="{ type: 'spring', stiffness: 500, damping: 25 }"
          >
            <UiIcon
              :name="iconName"
              :class="toast.type === 'loading' ? 'animate-spin' : undefined"
            />
          </motion.span>
        </AnimatePresence>

        <div class="min-w-0 flex-1">
          <p data-slot="sonner-title" class="text-sm font-medium leading-snug">
            {{ toast.title }}
          </p>
          <p
            v-if="toast.description"
            data-slot="sonner-description"
            class="mt-0.5 text-xs leading-snug text-theme"
          >
            {{ toast.description }}
          </p>
        </div>
      </div>

      <div
        v-if="dock?.actions?.length"
        data-slot="sonner-dock-actions"
        class="mt-3 flex flex-wrap justify-end gap-2"
      >
        <UiButton
          v-for="(action, i) in dock.actions"
          :key="i"
          size="sm"
          :variant="action.variant ?? 'outline'"
          :loading="running.has(i)"
          @click="onAction(action, i)"
        >
          <UiIcon v-if="action.icon" :name="action.icon" />
          {{ action.label }}
        </UiButton>
      </div>
    </div>

    <button
      v-if="dismissible"
      type="button"
      :aria-label="t('notifications.close')"
      data-slot="sonner-close"
      :class="[
        'absolute -top-2 -left-2 flex size-5 cursor-pointer items-center justify-center',
        'rounded-full border border-border bg-background text-theme',
        'opacity-0 transition-all duration-200 hover:text-foreground active:scale-[0.9]',
        'group-hover:opacity-100 focus-visible:opacity-100',
        contentVisible ? '' : 'pointer-events-none',
      ]"
      @click="close"
    >
      <UiIcon name="lucide:x" class="size-3" />
    </button>
  </motion.li>
</template>
