<template>
  <CheckboxRoot
    v-slot="slotProps"
    data-slot="checkbox"
    v-bind="forwarded"
    :class="styles({ size, class: props.class })"
  >
    <slot v-bind="slotProps">
      <UiCheckboxIndicator v-bind="slotProps" :class="indicatorStyles({ size })" />
    </slot>
  </CheckboxRoot>
</template>

<script lang="ts" setup>
import { reactiveOmit } from "@vueuse/core"
import { CheckboxRoot, useForwardPropsEmits } from "reka-ui"
import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { tv, type VariantProps } from "tailwind-variants"
import { UiCheckboxIndicator } from "../index"

defineOptions({ name: "Checkbox" })

const styles = tv({
  base:
    "peer shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary",
  variants: {
    size: {
      sm: "size-3",
      default: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: { size: "default" },
})

const indicatorStyles = tv({
  variants: {
    size: { sm: "size-3", default: "size-4", lg: "size-5" },
  },
  defaultVariants: { size: "default" },
})

type CheckboxSize = VariantProps<typeof styles>["size"]

const props = defineProps<CheckboxRootProps & {
  class?: HTMLAttributes["class"]
  size?: CheckboxSize
}>()

const emit = defineEmits<CheckboxRootEmits>()
const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "size"), emit)

export type CheckboxProps = typeof props
</script>

