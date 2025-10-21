<script setup lang="ts">
import type { SwitchRootProps as RekaSwitchRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { SwitchRoot as RekaSwitchRoot } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "SwitchRoot" })

const root = tv({
  base:
    "inline-flex items-center rounded-full transition-colors shrink-0 cursor-pointer outline-none data-[state=checked]:bg-primary data-[state=unchecked]:bg-input border",
  variants: { size: { sm: "h-4 w-7 px-0.5", default: "h-5 w-9 px-0.5", lg: "h-6 w-11 px-1" } },
  defaultVariants: { size: "default" },
})

type RootVariants = VariantProps<typeof root>

interface Props extends RekaSwitchRootProps {
  size?: RootVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type SwitchRootProps = Props
</script>

<template>
  <RekaSwitchRoot v-bind="{ ...props, class: [root({ size }), props.class] }">
    <slot />
  </RekaSwitchRoot>
</template>


