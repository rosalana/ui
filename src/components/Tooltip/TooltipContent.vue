<script setup lang="ts">
import type { TooltipContentProps as RekaTooltipContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { TooltipContent as RekaTooltipContent } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "TooltipContent" })

const content = tv({
  base:
    "rounded-md bg-popover text-popover-foreground border shadow-xs px-2 py-1 text-xs outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  variants: {
    variant: { default: "", destructive: "border-destructive/30 text-destructive-foreground bg-destructive/10" },
    size: { sm: "text-[10px] px-1.5 py-0.5", default: "text-xs px-2 py-1", lg: "text-sm px-2.5 py-1.5" },
  },
  defaultVariants: { variant: "default", size: "default" },
})

type ContentVariants = VariantProps<typeof content>

interface Props extends RekaTooltipContentProps {
  variant?: ContentVariants["variant"]
  size?: ContentVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type TooltipContentProps = Props
</script>

<template>
  <RekaTooltipContent v-bind="{ ...props, class: [content({ variant, size }), props.class] }">
    <slot />
  </RekaTooltipContent>
</template>


