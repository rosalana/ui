<script setup lang="ts">
import type { TooltipTriggerProps as RekaTooltipTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { TooltipTrigger as RekaTooltipTrigger } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "TooltipTrigger" })

const trigger = tv({
  base:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  variants: {
    variant: { default: "" },
    size: { sm: "h-8 rounded-md gap-1.5 px-3", default: "h-9 px-4 py-2", lg: "h-10 rounded-md px-6" },
  },
  defaultVariants: { variant: "default", size: "default" },
})

type TriggerVariants = VariantProps<typeof trigger>

interface Props extends RekaTooltipTriggerProps {
  variant?: TriggerVariants["variant"]
  size?: TriggerVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type TooltipTriggerProps = Props
</script>

<template>
  <RekaTooltipTrigger v-bind="{ ...props, class: [trigger({ variant, size }), props.class] }">
    <slot />
  </RekaTooltipTrigger>
</template>


