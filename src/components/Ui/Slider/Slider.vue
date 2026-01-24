<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from "reka-ui"
import { computed } from "vue"
import { tv } from "tailwind-variants"

const sliderRoot = tv({
  base: "relative flex w-full touch-none select-none items-center",
})

const sliderTrack = tv({
  base: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
})

const sliderRange = tv({
  base: "absolute h-full bg-primary",
})

const sliderThumb = tv({
  base: "block size-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
})

interface Props extends SliderRootProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const emit = defineEmits<SliderRootEmits>()

const forwarded = useForwardPropsEmits(props, emit)

const thumbCount = computed(() => props.modelValue?.length ?? props.defaultValue?.length ?? 1)
</script>

<template>
  <SliderRoot
    data-slot="slider"
    v-bind="forwarded"
    :class="[sliderRoot(), props.class]"
  >
    <SliderTrack :class="sliderTrack()">
      <SliderRange :class="sliderRange()" />
    </SliderTrack>
    <SliderThumb
      v-for="(_, index) in thumbCount"
      :key="index"
      :class="sliderThumb()"
    />
  </SliderRoot>
</template>
