<template>
  <Primitive
    data-slot="input"
    v-bind="forwarded"
    :as="props.as ?? 'input'"
    :as-child="props.asChild"
    :class="styles({ size, class: props.class })"
  />
</template>

<script lang="ts" setup>
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { tv, type VariantProps } from "tailwind-variants"
import { reactiveOmit } from "@vueuse/core"

defineOptions({ name: "Input" })

const styles = tv({
  base:
    "flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    size: { sm: "h-8 px-2 text-xs", default: "h-9 px-3 text-sm", lg: "h-10 px-4 text-base" },
  },
  defaultVariants: { size: "default" },
})

type InputSize = VariantProps<typeof styles>["size"]

const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes["class"]
  size?: InputSize
}>()

const forwarded = reactiveOmit(props, "class", "size")

export type InputProps = typeof props
</script>

