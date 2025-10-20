<script setup lang="ts">
import type { DialogTitleProps as RekaDialogTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { DialogTitle as RekaDialogTitle } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "DialogTitle" })

const title = tv({
  base: "text-lg font-semibold leading-none tracking-tight",
  variants: {
    variant: { default: "" },
    size: { sm: "text-base", default: "text-lg", lg: "text-xl" },
  },
  defaultVariants: { variant: "default", size: "default" },
})

type TitleVariants = VariantProps<typeof title>

interface Props extends RekaDialogTitleProps {
  variant?: TitleVariants["variant"]
  size?: TitleVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type DialogTitleProps = Props
</script>

<template>
  <RekaDialogTitle v-bind="{ ...props, class: [title({ variant, size }), props.class] }">
    <slot />
  </RekaDialogTitle>
</template>


