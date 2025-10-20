<script setup lang="ts">
import type { SelectTriggerProps as RekaSelectTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SelectTrigger as RekaSelectTrigger } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "SelectTrigger" })

const trigger = tv({
  base:
    "inline-flex w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    size: { sm: "h-8 px-2 text-xs", default: "h-9 px-3 text-sm", lg: "h-10 px-4 text-base" },
    variant: { default: "border-input", outline: "border-border" },
  },
  defaultVariants: { size: "default", variant: "default" },
})

type TriggerVariants = VariantProps<typeof trigger>

interface Props extends RekaSelectTriggerProps {
  size?: TriggerVariants["size"]
  variant?: TriggerVariants["variant"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type SelectTriggerProps = Props
</script>

<template>
  <RekaSelectTrigger v-bind="{ ...props, class: [trigger({ size, variant }), props.class] }">
    <slot />
  </RekaSelectTrigger>
</template>


