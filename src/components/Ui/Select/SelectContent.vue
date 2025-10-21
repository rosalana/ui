<script setup lang="ts">
import type { SelectContentProps as RekaSelectContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SelectContent as RekaSelectContent } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "SelectContent" })

const content = tv({
  base:
    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none",
  variants: { size: { sm: "p-1", default: "p-2", lg: "p-3" } },
  defaultVariants: { size: "default" },
})

type ContentVariants = VariantProps<typeof content>

interface Props extends RekaSelectContentProps {
  size?: ContentVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type SelectContentProps = Props
</script>

<template>
  <RekaSelectContent v-bind="{ ...props, class: [content({ size }), props.class] }">
    <slot />
  </RekaSelectContent>
</template>


