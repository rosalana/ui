<script setup lang="ts">
import type { ProgressRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ProgressIndicator, ProgressRoot, useForwardProps } from "reka-ui"
import { tv, type VariantProps } from "tailwind-variants"
import { computed } from "vue"

const progressRoot = tv({
  base: "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
})

const progressIndicator = tv({
  base: "h-full w-full flex-1 transition-all",
  variants: {
    variant: {
      default: "bg-primary",
      success: "bg-success",
      warning: "bg-warning",
      destructive: "bg-destructive",
      info: "bg-info",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

type ProgressVariants = VariantProps<typeof progressIndicator>

interface Props extends ProgressRootProps {
  variant?: ProgressVariants["variant"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
})

const forwarded = useForwardProps(props)

const progressStyle = computed(() => ({
  transform: `translateX(-${100 - (props.modelValue ?? 0)}%)`,
}))
</script>

<template>
  <ProgressRoot
    data-slot="progress"
    v-bind="forwarded"
    :class="[progressRoot(), props.class]"
  >
    <ProgressIndicator
      :class="progressIndicator({ variant })"
      :style="progressStyle"
    />
  </ProgressRoot>
</template>
