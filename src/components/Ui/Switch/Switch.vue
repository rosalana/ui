<template>
  <SwitchRoot
    v-slot="slotProps"
    data-slot="switch"
    v-bind="forwarded"
    :class="rootStyles({ size, class: props.class })"
  >
    <slot v-bind="slotProps">
      <SwitchThumb :class="thumbStyles({ size })" />
    </slot>
  </SwitchRoot>
</template>

<script lang="ts" setup>
import { reactiveOmit } from "@vueuse/core"
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from "reka-ui"
import type { SwitchRootEmits, SwitchRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { tv, type VariantProps } from "tailwind-variants"

defineOptions({ name: "Switch" })

const rootStyles = tv({
  base:
    "inline-flex items-center rounded-full transition-colors shrink-0 cursor-pointer outline-none data-[state=checked]:bg-primary data-[state=unchecked]:bg-input border",
  variants: { size: { sm: "h-4 w-7 px-0.5", default: "h-5 w-9 px-0.5", lg: "h-6 w-11 px-1" } },
  defaultVariants: { size: "default" },
})

const thumbStyles = tv({
  base:
    "block rounded-full bg-background shadow-sm transition-transform data-[state=checked]:translate-x-full data-[state=unchecked]:translate-x-0",
  variants: { size: { sm: "size-3", default: "size-4", lg: "size-5" } },
  defaultVariants: { size: "default" },
})

type SwitchSize = VariantProps<typeof rootStyles>["size"]

const props = defineProps<SwitchRootProps & {
  class?: HTMLAttributes["class"]
  size?: SwitchSize
}>()

const emit = defineEmits<SwitchRootEmits>()
const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "size"), emit)

export type SwitchProps = typeof props
</script>

