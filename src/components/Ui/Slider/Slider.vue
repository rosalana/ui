<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from "reka-ui"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from "reka-ui"
import { computed, onBeforeUnmount, ref, useSlots, useTemplateRef, watch } from "vue"
import { animate, motion, motionValue, type MotionValue } from "motion-v"
import { useElementSize } from "@vueuse/core"
import { tv, type ClassValue } from "tailwind-variants"
import { useLocale } from "../../../composables/useLocale"
import UiTooltip from "../Tooltip/Tooltip.vue"
import UiTooltipTrigger from "../Tooltip/TooltipTrigger.vue"
import UiTooltipContent from "../Tooltip/TooltipContent.vue"

/** A step at least this wide is worth animating while dragging, so the thumb hops between steps. */
const MIN_ANIMATED_STEP_PX = 12

/** Pointer travel that turns a press into a drag. Below it the press is a click. */
const DRAG_THRESHOLD_PX = 3

/** Click, keyboard or a value set from outside: glide over with a soft landing. */
const GLIDE = { type: "spring", stiffness: 380, damping: 30 } as const

/** Dragging over coarse steps: snappy hop to the next step. */
const HOP = { type: "spring", stiffness: 700, damping: 32 } as const

/** Thumb size in px, matches `size-4`. */
const THUMB_PX = 16

/** Space between a thumb and the track pieces on either side of it. */
const GAP_PX = 4

const sliderRoot = tv({
  base: [
    "relative flex w-full touch-none select-none items-center",
    "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
    // Dimmed like UiButton and other form controls, and fully inert
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ],
})

const sliderTrack = tv({
  base: [
    "relative h-2 w-full grow rounded-full transition-colors duration-150",
    "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
  ],
  variants: {
    transparent: { true: "bg-transparent", false: "bg-primary/20" },
    // The track is drawn by its pieces, the element itself only takes clicks
    split: { true: "bg-transparent" },
  },
  defaultVariants: { transparent: false },
})

/** One piece of the split track, between the edges and the thumbs. */
const sliderSegment = tv({
  base: [
    "absolute rounded-full transition-colors duration-150",
    "data-[orientation=horizontal]:inset-y-0 data-[orientation=vertical]:inset-x-0",
  ],
  variants: {
    filled: { true: "bg-primary", false: "bg-primary/20" },
    transparent: { true: "bg-transparent" },
  },
})

const sliderRange = tv({
  base: [
    "absolute h-full rounded-full data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-full",
  ],
  variants: {
    transparent: { true: "bg-transparent", false: "bg-primary" },
  },
  defaultVariants: { transparent: false },
})

const sliderThumb = tv({
  base: "block size-4 rounded-full outline-none cursor-grab active:cursor-grabbing",
  variants: {
    // Ring only for keyboard focus. reka-ui focuses the thumb on every click, which the browser
    // may report as `:focus-visible` too.
    focusRing: {
      true: "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    },
    /*
     * reka-ui positions the thumb with an inline style that jumps straight to the value.
     * This overrides it with the motion-driven `--slider-thumb` percentage (unitless, 0–100),
     * with the same in-bounds offset reka-ui applies.
     */
    animated: {
      true: [
        "data-[orientation=horizontal]:left-[calc(var(--slider-thumb)*1%+8px-var(--slider-thumb)*0.16px)]!",
        "data-[orientation=vertical]:bottom-[calc(var(--slider-thumb)*1%+8px-var(--slider-thumb)*0.16px)]!",
      ],
    },
  },
})

const sliderThumbDot = tv({
  base: [
    // Presses go to the thumb itself, which reka-ui treats as a grab that keeps the value
    "pointer-events-none block size-full rounded-full",
    "bg-white shadow-[0_1px_4px_rgba(0,0,0,0.25),0_2px_8px_rgba(0,0,0,0.10)]",
    "border border-black/10 ring-2 ring-white/50",
  ],
})

/** Text of a thumb's tooltip, from its value and its order among the thumbs. */
export type SliderTooltipFormat = (value: number, index: number) => string

const sliderTooltip = tv({
  // Never in the way of the pointer, and digits of one width so the bubble doesn't wobble while dragging
  base: "pointer-events-none select-none tabular-nums font-medium",
})

interface Props extends SliderRootProps {
  class?: ClassValue
  transparent?: boolean
  /**
   * A tooltip over each thumb with its value, shown on hover, drag and keyboard focus.
   * - `true` shows the value formatted in the app locale.
   * - A string is a template for every thumb, `{value}` is replaced by the value (`"{value} %"`).
   * - An array gives each thumb its own template by order: the first thumb gets the first one.
   * - A function returns the text from the value and the thumb's order.
   *
   * The `tooltip` slot (`{ value, index, text }`) replaces the text with any content.
   */
  tooltip?: boolean | string | string[] | SliderTooltipFormat
  /** Keeps the tooltips open all the time. Turns them on by itself. */
  tooltipAlways?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  orientation: "horizontal",
})
const emit = defineEmits<SliderRootEmits>()

const delegated = computed(() => {
  const { class: _, transparent, tooltip, tooltipAlways, ...rest } = props
  return rest
})

const forwarded = useForwardPropsEmits(delegated, emit)

/** Mirrors reka-ui's value, so it works with both `v-model` and `default-value`. */
const values = ref<number[]>([...(props.modelValue ?? props.defaultValue ?? [props.min])])

watch(
  () => props.modelValue,
  (value) => {
    if (value) values.value = [...value]
  },
)

function onUpdate(value: number[] | undefined) {
  if (value) values.value = [...value]
}

const thumbCount = computed(() => values.value.length)

const slots = useSlots()
const { locale } = useLocale()

const numberFormat = computed(() => new Intl.NumberFormat(locale.value))

const hasTooltip = computed(
  () => (props.tooltip !== undefined && props.tooltip !== false) || props.tooltipAlways || !!slots.tooltip,
)

function tooltipText(index: number) {
  const value = values.value[index] ?? props.min
  const tooltip = props.tooltip
  if (typeof tooltip === "function") return tooltip(value, index)

  const formatted = numberFormat.value.format(value)
  const template = Array.isArray(tooltip) ? tooltip[index] : typeof tooltip === "string" ? tooltip : undefined
  return template === undefined ? formatted : template.replaceAll("{value}", formatted)
}

// The motion overrides and the split track only know the default left-to-right / bottom-to-top layout
const animated = computed(() => !props.inverted && props.dir !== "rtl")

const track = useTemplateRef<InstanceType<typeof SliderTrack>>("track")
const { width: trackWidth, height: trackHeight } = useElementSize(() => track.value?.$el)

/** Steps wide enough to see the thumb hop from one to the next. */
const coarseSteps = computed(() => {
  const length = props.orientation === "vertical" ? trackHeight.value : trackWidth.value
  const steps = (props.max - props.min) / props.step
  return steps > 0 && length / steps >= MIN_ANIMATED_STEP_PX
})

const pressing = ref(false)
const dragging = ref(false)
const hovered = ref<number | null>(null)
const activeThumb = ref<number | null>(null)
const focusedThumb = ref<number | null>(null)
/** Cleared by the pointer, set again by the keyboard or once focus leaves the slider. */
const keyboardFocus = ref(true)
/** Only a press on a thumb drags. A press on the track is a click: one jump, then it's done. */
const pressOnThumb = ref(false)
let pressStart = { x: 0, y: 0 }

function onPointerDown(event: PointerEvent) {
  if (props.disabled) return
  pressing.value = true
  dragging.value = false
  keyboardFocus.value = false
  pressOnThumb.value = !!(event.target as HTMLElement).closest("[data-slot=slider-thumb]")
  pressStart = { x: event.clientX, y: event.clientY }
}

/**
 * Runs before reka-ui's own handler and swallows the moves of a track press, so a click
 * that slips a few pixels (e.g. a trackpad tap) never turns into a drag.
 */
function blockTrackDrag(event: PointerEvent) {
  if (pressing.value && !pressOnThumb.value) event.stopImmediatePropagation()
}

// Focus hopping between the thumbs of a range slider still counts as the same interaction
function onFocusOut(event: FocusEvent) {
  const root = event.currentTarget as HTMLElement
  if (!root.contains(event.relatedTarget as Node | null)) keyboardFocus.value = true
}

function onPointerMove(event: PointerEvent) {
  if (!pressing.value || dragging.value) return
  const distance = Math.hypot(event.clientX - pressStart.x, event.clientY - pressStart.y)
  if (distance >= DRAG_THRESHOLD_PX) dragging.value = true
}

function onPointerUp() {
  pressing.value = false
  dragging.value = false
}

function toPercent(value: number) {
  const range = props.max - props.min
  return range === 0 ? 0 : ((value - props.min) / range) * 100
}

/** One motion value per thumb, holding its on-screen position in percent. */
const positions: MotionValue<number>[] = []
const rendered = ref<number[]>([])
const unsubscribers: (() => void)[] = []

function ensurePosition(index: number, percent: number) {
  if (positions[index]) return positions[index]
  const position = motionValue(percent)
  unsubscribers.push(
    position.on("change", (latest) => {
      rendered.value[index] = latest
    }),
  )
  positions[index] = position
  rendered.value[index] = percent
  return position
}

watch(
  () => values.value.map(toPercent),
  (targets) => {
    targets.forEach((target, index) => {
      const position = ensurePosition(index, target)
      if (position.get() === target) return

      // Fine steps follow the pointer 1:1, any easing would lag behind it
      if (dragging.value && !coarseSteps.value) position.jump(target)
      else animate(position, target, dragging.value ? HOP : GLIDE)
    })
    rendered.value.length = targets.length
  },
  { immediate: true },
)

onBeforeUnmount(() => unsubscribers.forEach((unsubscribe) => unsubscribe()))

/**
 * Where a thumb's center sits, as a CSS length along the track. Includes the in-bounds offset
 * reka-ui applies, so the thumb stays inside the track at both ends.
 */
function thumbCenter(percent: number, shiftPx = 0) {
  const offset = THUMB_PX / 2 - (percent / 100) * THUMB_PX + shiftPx
  return `calc(${percent}% + ${offset}px)`
}

const edge = THUMB_PX / 2 + GAP_PX

/**
 * The split track: a piece from each edge or thumb to the next one, kept clear of the thumbs.
 * A single thumb fills the piece before it, a range fills the pieces between its thumbs.
 * A piece squeezed below zero length (a thumb at the very end) simply disappears.
 */
const segments = computed(() => {
  const thumbs = rendered.value
  const vertical = props.orientation === "vertical"
  const [start, end] = vertical ? ["bottom", "top"] : ["left", "right"]

  return Array.from({ length: thumbs.length + 1 }, (_, index) => {
    const from = thumbs[index - 1]
    const to = thumbs[index]
    const style: Record<string, string> = {
      [start]: from === undefined ? "0px" : thumbCenter(from, edge),
      [end]: to === undefined ? "0px" : `calc(100% - ${thumbCenter(to, -edge)})`,
    }
    const filled = thumbs.length === 1 ? index === 0 : index > 0 && index < thumbs.length
    return { style, filled }
  })
})

/** Open while the thumb is hovered, held or focused from the keyboard, or always with `tooltipAlways`. */
function tooltipOpen(index: number) {
  if (!hasTooltip.value) return false
  if (props.tooltipAlways) return true
  if (props.disabled) return false
  return (
    hovered.value === index ||
    (pressing.value && activeThumb.value === index) ||
    (keyboardFocus.value && focusedThumb.value === index)
  )
}

/** Squeezed while held, springs past its size on release so it lands with a little bounce. */
function dotScale(index: number) {
  if (pressing.value && activeThumb.value === index) return 0.82
  if (hovered.value === index) return 1.1
  return 1
}
</script>

<template>
  <SliderRoot
    data-slot="slider"
    v-bind="forwarded"
    :class="sliderRoot({ class: props.class })"
    @update:model-value="onUpdate"
    @pointerdown="onPointerDown"
    @pointermove.capture="blockTrackDrag"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @lostpointercapture="onPointerUp"
    @keydown="keyboardFocus = true"
    @focusout="onFocusOut"
  >
    <SliderTrack
      ref="track"
      data-slot="slider-track"
      :class="sliderTrack({ transparent: !!props.transparent, split: animated })"
    >
      <template v-if="animated">
        <span
          v-for="(segment, index) in segments"
          :key="index"
          data-slot="slider-segment"
          :data-orientation="orientation"
          :style="segment.style"
          :class="sliderSegment({ filled: segment.filled, transparent: !!props.transparent })"
        />
      </template>
      <!-- reka-ui's own range, for the right-to-left and inverted layouts the split track doesn't cover -->
      <SliderRange
        v-else
        data-slot="slider-range"
        :class="sliderRange({ transparent: !!props.transparent })"
      />
    </SliderTrack>
    <!-- Tooltips go to the thumbs by order, the first thumb gets the first one -->
    <UiTooltip
      v-for="(_, index) in thumbCount"
      :key="index"
      :open="tooltipOpen(index)"
      :delay-duration="0"
    >
      <UiTooltipTrigger as-child>
        <SliderThumb
          data-slot="slider-thumb"
          :style="{ '--slider-thumb': rendered[index] ?? 0 }"
          :class="sliderThumb({ animated, focusRing: keyboardFocus })"
          @focus="activeThumb = index; focusedThumb = index"
          @blur="focusedThumb = null"
          @pointerenter="hovered = index"
          @pointerleave="hovered = null"
        >
          <motion.span
            data-slot="slider-thumb-dot"
            :class="sliderThumbDot()"
            :animate="{ scale: dotScale(index) }"
            :transition="{ type: 'spring', stiffness: 600, damping: 14 }"
          />
        </SliderThumb>
      </UiTooltipTrigger>
      <!-- Follows the thumb frame by frame while it springs to a new value -->
      <UiTooltipContent
        v-if="hasTooltip"
        data-slot="slider-tooltip"
        :side="orientation === 'vertical' ? 'right' : 'top'"
        :side-offset="6"
        update-position-strategy="always"
        :class="sliderTooltip()"
      >
        <slot name="tooltip" :value="values[index]" :index="index" :text="tooltipText(index)">
          {{ tooltipText(index) }}
        </slot>
      </UiTooltipContent>
    </UiTooltip>
  </SliderRoot>
</template>
