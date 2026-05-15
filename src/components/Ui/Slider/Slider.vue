<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from "reka-ui"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from "reka-ui"
import { computed } from "vue"
import { tv, type ClassValue } from "tailwind-variants"

const sliderRoot = tv({
  base: "relative flex w-full touch-none select-none items-center",
})

const sliderTrack = tv({
  base: "relative h-2 w-full grow overflow-hidden rounded-full bg-primary/20 transition-colors duration-150",
})

const sliderRange = tv({
  base: "absolute h-full bg-primary transition-all duration-75",
})

const sliderThumb = tv({
  base: [
    "block size-4 rounded-full",
    "bg-white shadow-[0_1px_4px_rgba(0,0,0,0.25),0_2px_8px_rgba(0,0,0,0.10)]",
    "border border-black/10 ring-2 ring-white/50",
    "cursor-grab active:cursor-grabbing",
    "focus-visible:outline-none focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "transition-transform duration-100 ease-out",
    "hover:scale-110 active:scale-[0.82]",
  ],
})

interface Props extends SliderRootProps {
  class?: ClassValue
}

const props = defineProps<Props>()
const emit = defineEmits<SliderRootEmits>()

const forwarded = useForwardPropsEmits(props, emit)

const thumbCount = computed(
  () => props.modelValue?.length ?? props.defaultValue?.length ?? 1,
)
</script>

<template>
  <SliderRoot
    data-slot="slider"
    v-bind="forwarded"
    :class="sliderRoot({ class: props.class })"
  >
    <SliderTrack data-slot="slider-track" :class="sliderTrack()">
      <SliderRange data-slot="slider-range" :class="sliderRange()" />
    </SliderTrack>
    <SliderThumb
      v-for="(_, index) in thumbCount"
      :key="index"
      :class="sliderThumb()"
    />
  </SliderRoot>
</template>
