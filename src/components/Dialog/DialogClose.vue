<script setup lang="ts">
import type { DialogCloseProps as RekaDialogCloseProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DialogClose as RekaDialogClose } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "DialogClose" })

const close = tv({
  base:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  variants: { variant: { default: "" }, size: { sm: "h-8 px-3", default: "h-9 px-4", lg: "h-10 px-6" } },
  defaultVariants: { variant: "default", size: "default" },
})

type CloseVariants = VariantProps<typeof close>

interface Props extends RekaDialogCloseProps {
  variant?: CloseVariants["variant"]
  size?: CloseVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type DialogCloseProps = Props
</script>

<template>
  <RekaDialogClose v-bind="{ ...props, class: [close({ variant, size }), props.class] }">
    <slot />
  </RekaDialogClose>
</template>


