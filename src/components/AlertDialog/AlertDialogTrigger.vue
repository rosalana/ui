<script setup lang="ts">
import type { AlertDialogTriggerProps as RekaAlertDialogTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { AlertDialogTrigger as RekaAlertDialogTrigger } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "AlertDialogTrigger" })

const trigger = tv({
  base:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  variants: {
    variant: { default: "", destructive: "bg-destructive text-white hover:bg-destructive/90" },
    size: { sm: "h-8 rounded-md gap-1.5 px-3", default: "h-9 px-4 py-2", lg: "h-10 rounded-md px-6" },
  },
  defaultVariants: { variant: "default", size: "default" },
})

type TriggerVariants = VariantProps<typeof trigger>

interface Props extends RekaAlertDialogTriggerProps {
  variant?: TriggerVariants["variant"]
  size?: TriggerVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type AlertDialogTriggerProps = Props
</script>

<template>
  <RekaAlertDialogTrigger v-bind="{ ...props, class: [trigger({ variant, size }), props.class] }">
    <slot />
  </RekaAlertDialogTrigger>
</template>


