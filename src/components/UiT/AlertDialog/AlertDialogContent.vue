<script setup lang="ts">
import type { AlertDialogContentProps as RekaAlertDialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { AlertDialogContent as RekaAlertDialogContent } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "AlertDialogContent" })

const content = tv({
  base:
    "bg-popover text-popover-foreground shadow-lg border rounded-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 p-6",
  variants: {
    variant: { default: "", destructive: "border-destructive/30" },
    size: { sm: "w-[22rem] p-4", default: "w-[28rem] p-6", lg: "w-[36rem] p-8" },
  },
  defaultVariants: { variant: "default", size: "default" },
})

type ContentVariants = VariantProps<typeof content>

interface Props extends RekaAlertDialogContentProps {
  variant?: ContentVariants["variant"]
  size?: ContentVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type AlertDialogContentProps = Props
</script>

<template>
  <RekaAlertDialogContent v-bind="{ ...props, class: [content({ variant, size }), props.class] }">
    <slot />
  </RekaAlertDialogContent>
</template>


