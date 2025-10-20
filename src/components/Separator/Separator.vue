<script setup lang="ts">
import type { SeparatorProps as RekaSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Separator as RekaSeparator } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "Separator" })

const separator = tv({
  base: "shrink-0 bg-border",
  variants: {
    orientation: { horizontal: "h-px w-full", vertical: "w-px h-full" },
  },
  defaultVariants: { orientation: "horizontal" },
})

type SeparatorVariants = VariantProps<typeof separator>

interface Props extends RekaSeparatorProps {
  orientation?: SeparatorVariants["orientation"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type SeparatorProps = Props
</script>

<template>
  <RekaSeparator v-bind="{ ...props, class: [separator({ orientation }), props.class] }" />
</template>


