<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from "vue";
import { animate } from "motion-v";

/**
 * One wheel of the time picker. Moves by click (the row goes to the middle), drag with a little
 * momentum, scroll (trackpad and touch natively with snapping, one row per mouse wheel notch)
 * and the arrow keys. The value is whatever ends up in the middle row.
 *
 * With `loop` the wheel is endless: the options are rendered several times over and, once the
 * wheel rests, it quietly jumps back to the same option in the middle copy.
 */
const props = defineProps<{
  options: { value: number; label: string }[];
  modelValue: number;
  /** Visible rows, odd so one sits in the middle. */
  rows: number;
  /** Endless wheel, 59 runs on into 00. */
  loop?: boolean;
  /**
   * Wheel and trackpad scrolling. Off leaves them to the page, and the wheel moves only by
   * click and drag (touch too).
   */
  scroll?: boolean;
  disabled?: boolean;
  label?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

/** Row height in px, matches `h-8`. */
const ROW = 32;

/** Pointer travel that turns a press into a drag. Below it the press is a click on a row. */
const DRAG_THRESHOLD_PX = 3;

/** Tilt of the rows away from the middle, for the wheel look. */
const TILT_DEG = 18;

const SPRING = { type: "spring", stiffness: 420, damping: 38 } as const;

/** A pause this long before letting go means a calm release, no throw. */
const THROW_IDLE_MS = 80;

/** How far a throw may carry, in rows. */
const MAX_THROW_ROWS = 8;

/** Wheel deltas at least this big are mouse wheel notches, smaller ones come from a trackpad. */
const WHEEL_NOTCH = 50;

const list = useTemplateRef<HTMLElement>("list");

const count = computed(() => props.options.length);

/**
 * Copies of the options on the wheel. Enough that the middle copy has room for the visible rows
 * plus the longest throw on both sides, so a spin never runs into an end before it recenters.
 */
const copies = computed(() => {
  if (!props.loop || !count.value) return 1;
  return 2 * Math.ceil((props.rows + MAX_THROW_ROWS) / count.value) + 1;
});

/** First row of the middle copy. */
const middle = computed(() => Math.floor(copies.value / 2) * count.value);

const rowsOnWheel = computed(() =>
  Array.from({ length: copies.value * count.value }, (_, row) => ({
    row,
    option: props.options[row % count.value]!,
  })),
);

const selectedIndex = computed(() =>
  Math.max(0, props.options.findIndex((option) => option.value === props.modelValue)),
);

const lastRow = computed(() => rowsOnWheel.value.length - 1);

/** While the code moves the wheel (drag, spring), native snapping would fight it. */
const controlled = ref(false);
let animation: ReturnType<typeof animate> | null = null;
/** Row the wheel is heading to, so quick key presses keep adding up. */
let target = 0;

const clampRow = (row: number) => Math.min(Math.max(row, 0), lastRow.value);
const rowAt = (scrollTop: number) => clampRow(Math.round(scrollTop / ROW));
const optionIndex = (row: number) => ((row % count.value) + count.value) % count.value;

/** The row showing `index` that is closest to `from`, so the wheel takes the short way round. */
function nearestRow(index: number, from: number) {
  if (!props.loop) return index;
  const forward = (index - optionIndex(from) + count.value) % count.value;
  const delta = forward > count.value / 2 ? forward - count.value : forward;
  return clampRow(from + delta);
}

/** Fades, shrinks and tilts the rows by their distance from the middle. */
function paint() {
  const element = list.value;
  if (!element) return;
  const scrollTop = element.scrollTop;
  element.querySelectorAll<HTMLElement>("[data-row]").forEach((row) => {
    const offset = (Number(row.dataset.row) * ROW - scrollTop) / ROW;
    const distance = Math.abs(offset);
    if (distance > props.rows) return;
    row.style.opacity = String(Math.max(0.25, 1 - distance * 0.3));
    row.style.transform = `rotateX(${-offset * TILT_DEG}deg) scale(${Math.max(0.82, 1 - distance * 0.07)})`;
  });
}

/** Jumps from a far copy back to the same option in the middle one. Looks the same, so it's invisible. */
function recenter() {
  const element = list.value;
  if (!props.loop || !element) return;
  const row = rowAt(element.scrollTop);
  const centered = middle.value + optionIndex(row);
  if (row === centered) return;
  element.scrollTop = centered * ROW;
  target = centered;
  paint();
}

function commit(row: number) {
  const option = props.options[optionIndex(row)];
  if (option && option.value !== props.modelValue) emit("update:modelValue", option.value);
}

function stop() {
  animation?.stop();
  animation = null;
}

function glideTo(row: number, velocity = 0) {
  const element = list.value;
  if (!element) return;
  stop();
  target = clampRow(row);
  controlled.value = true;
  animation = animate(element.scrollTop, target * ROW, {
    ...SPRING,
    velocity,
    onUpdate: (latest) => {
      element.scrollTop = latest;
    },
    onComplete: () => {
      animation = null;
      controlled.value = false;
      commit(target);
      recenter();
    },
  });
  // Keyboard and clicks answer right away, the wheel catches up
  commit(target);
}

/* ---------------------------------------------------------------- native scrolling */

let settleTimer: ReturnType<typeof setTimeout> | undefined;

function onScroll() {
  requestAnimationFrame(paint);
  if (controlled.value) return;
  clearTimeout(settleTimer);
  settleTimer = setTimeout(() => {
    if (!list.value) return;
    commit(rowAt(list.value.scrollTop));
    recenter();
  }, 120);
}

/* ---------------------------------------------------------------- mouse drag */

let drag: { startY: number; startTop: number; moved: boolean; lastY: number; lastTime: number; velocity: number } | null = null;

/** With scrolling on, touch and pen scroll natively, so their taps come in as plain clicks. */
let lastPointerType = "mouse";

/** Pointers this wheel drags itself: the mouse, and every pointer once native scrolling is off. */
const drags = (event: PointerEvent) => event.pointerType === "mouse" || props.scroll === false;

/**
 * Row under the pointer, worked out from its position: while dragging the wheel holds the
 * pointer capture, so the event target is the wheel and not the row.
 */
function rowFromPoint(clientY: number) {
  const element = list.value;
  if (!element) return null;
  const box = element.getBoundingClientRect();
  const top = ((props.rows - 1) / 2) * ROW;
  const row = Math.floor((clientY - box.top + element.scrollTop - top) / ROW);
  return row >= 0 && row <= lastRow.value ? row : null;
}

function onPointerDown(event: PointerEvent) {
  lastPointerType = event.pointerType;
  if (props.disabled || !drags(event) || event.button !== 0 || !list.value) return;
  stop();
  controlled.value = true;
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  drag = {
    startY: event.clientY,
    startTop: list.value.scrollTop,
    moved: false,
    lastY: event.clientY,
    lastTime: event.timeStamp,
    velocity: 0,
  };
}

function onPointerMove(event: PointerEvent) {
  if (!drag || !list.value) return;
  const travel = event.clientY - drag.startY;
  if (Math.abs(travel) >= DRAG_THRESHOLD_PX) drag.moved = true;
  if (!drag.moved) return;

  list.value.scrollTop = Math.min(Math.max(drag.startTop - travel, 0), lastRow.value * ROW);
  const elapsed = event.timeStamp - drag.lastTime;
  if (elapsed > 0) {
    // Smoothed, so one jumpy move event doesn't decide the throw
    const instant = (event.clientY - drag.lastY) / elapsed;
    drag.velocity = drag.velocity * 0.6 + instant * 0.4;
  }
  drag.lastY = event.clientY;
  drag.lastTime = event.timeStamp;
}

function onPointerUp(event: PointerEvent) {
  if (!drag || !list.value) return;
  const { moved } = drag;
  const velocity = event.timeStamp - drag.lastTime > THROW_IDLE_MS ? 0 : drag.velocity;
  drag = null;

  if (!moved) {
    // A click picks the row under the pointer
    const row = rowFromPoint(event.clientY);
    if (row !== null) glideTo(row);
    else controlled.value = false;
    return;
  }

  // Throw: carry on in the drag direction a bit, then land on a row
  const scrollVelocity = -velocity * 1000;
  const throwRows = Math.max(-MAX_THROW_ROWS, Math.min(MAX_THROW_ROWS, (scrollVelocity * 0.1) / ROW));
  glideTo(rowAt(list.value.scrollTop + throwRows * ROW), scrollVelocity);
}

// A tap on a row moves it to the middle (pointers the wheel drags itself are handled in onPointerUp)
function onClick(event: MouseEvent) {
  if (props.disabled || lastPointerType === "mouse" || props.scroll === false) return;
  const row = rowFromPoint(event.clientY);
  if (row !== null) glideTo(row);
}

/* ---------------------------------------------------------------- mouse wheel */

/** Row the wheel shows now, or is heading to. */
const currentRow = () => (animation ? target : list.value ? rowAt(list.value.scrollTop) : 0);

// A wheel notch moves one row, like a native picker. Trackpads keep scrolling natively.
function onWheel(event: WheelEvent) {
  if (props.disabled || props.scroll === false || Math.abs(event.deltaY) < WHEEL_NOTCH) return;
  event.preventDefault();
  glideTo(currentRow() + Math.sign(event.deltaY));
}

/* ---------------------------------------------------------------- keyboard */

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return;
  const from = currentRow();
  const moves: Record<string, number> = {
    ArrowUp: from - 1,
    ArrowDown: from + 1,
    PageUp: from - 5,
    PageDown: from + 5,
    Home: nearestRow(0, from),
    End: nearestRow(count.value - 1, from),
  };
  const next = moves[event.key];
  if (next === undefined) return;
  event.preventDefault();
  glideTo(next);
}

/* ---------------------------------------------------------------- outside changes */

watch(selectedIndex, (index) => {
  if (drag || controlled.value || !list.value) return;
  const from = rowAt(list.value.scrollTop);
  if (optionIndex(from) !== index) glideTo(nearestRow(index, from));
});

onMounted(() => {
  if (!list.value) return;
  list.value.scrollTop = (middle.value + selectedIndex.value) * ROW;
  paint();
});

onBeforeUnmount(() => {
  stop();
  clearTimeout(settleTimer);
});

const current = computed(() => props.options[selectedIndex.value]);
</script>

<template>
  <div
    ref="list"
    data-slot="time-picker-column"
    role="spinbutton"
    :tabindex="disabled ? -1 : 0"
    :aria-label="label"
    :aria-valuenow="modelValue"
    :aria-valuetext="current?.label"
    :aria-disabled="disabled || undefined"
    class="relative z-10 w-12 cursor-grab overscroll-contain rounded-md outline-none select-none [perspective:400px] [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-ring/30 active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
    :class="[
      scroll === false ? 'touch-none overflow-y-hidden' : 'overflow-y-scroll',
      !controlled && scroll !== false && 'snap-y snap-mandatory',
      disabled && 'pointer-events-none',
    ]"
    :style="{ height: `${rows * ROW}px`, paddingBlock: `${((rows - 1) / 2) * ROW}px` }"
    @scroll="onScroll"
    @wheel="onWheel"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @keydown="onKeydown"
    @click="onClick"
  >
    <div
      v-for="{ row, option } in rowsOnWheel"
      :key="row"
      :data-row="row"
      class="flex h-8 snap-center items-center justify-center text-sm tabular-nums will-change-transform"
      :class="optionIndex(row) === selectedIndex ? 'font-semibold text-foreground' : 'text-theme'"
    >
      {{ option.label }}
    </div>
  </div>
</template>
