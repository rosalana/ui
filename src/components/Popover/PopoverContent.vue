<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core"
import type { PopoverContentProps as RekaPopoverContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { PopoverContent as RekaPopoverContent, useForwardPropsEmits } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "PopoverContent" })

const content = tv({
  base:
    "bg-popover text-popover-foreground shadow-md border rounded-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  variants: {
    variant: { default: "", outline: "border-border" },
    size: { sm: "w-48 p-2", default: "w-64 p-3", lg: "w-80 p-4" },
  },
  defaultVariants: { variant: "default", size: "default" },
})

type ContentVariants = VariantProps<typeof content>

interface Props extends RekaPopoverContentProps {
  variant?: ContentVariants["variant"]
  size?: ContentVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "variant", "size"))

export type PopoverContentProps = Props
</script>

<template>
  <RekaPopoverContent v-bind="{ ...forwarded, class: [content({ variant, size }), props.class] }">
    <slot />
  </RekaPopoverContent>
</template>


