<script setup lang="ts">
import type { DropdownMenuContentProps as RekaDropdownContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DropdownMenuContent as RekaDropdownMenuContent } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "DropdownMenuContent" })

const content = tv({
  base:
    "bg-popover text-popover-foreground border rounded-md shadow-md py-2 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  variants: {
    variant: { default: "", outline: "border-border" },
    size: { sm: "min-w-40 p-1", default: "min-w-48 p-2", lg: "min-w-56 p-3" },
  },
  defaultVariants: { variant: "default", size: "default" },
})

type ContentVariants = VariantProps<typeof content>

interface Props extends RekaDropdownContentProps {
  variant?: ContentVariants["variant"]
  size?: ContentVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type DropdownMenuContentProps = Props
</script>

<template>
  <RekaDropdownMenuContent v-bind="{ ...props, class: [content({ variant, size }), props.class] }">
    <slot />
  </RekaDropdownMenuContent>
</template>


