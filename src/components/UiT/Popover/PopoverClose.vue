<script setup lang="ts">
import type { PopoverCloseProps as RekaPopoverCloseProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { PopoverClose as RekaPopoverClose } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "PopoverClose" })

const close = tv({
  base:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  variants: { variant: { default: "" }, size: { sm: "h-8 px-3", default: "h-9 px-4", lg: "h-10 px-6" } },
  defaultVariants: { variant: "default", size: "default" },
})

type CloseVariants = VariantProps<typeof close>

interface Props extends RekaPopoverCloseProps {
  variant?: CloseVariants["variant"]
  size?: CloseVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type PopoverCloseProps = Props
</script>

<template>
  <RekaPopoverClose v-bind="{ ...props, class: [close({ variant, size }), props.class] }">
    <slot />
  </RekaPopoverClose>
</template>


