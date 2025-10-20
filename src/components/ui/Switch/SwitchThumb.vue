<script setup lang="ts">
import type { SwitchThumbProps as RekaSwitchThumbProps } from "reka-ui"
import { SwitchThumb as RekaSwitchThumb } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "SwitchThumb" })

const thumb = tv({
  base:
    "block rounded-full bg-background shadow-sm transition-transform data-[state=checked]:translate-x-full data-[state=unchecked]:translate-x-0",
  variants: { size: { sm: "size-3", default: "size-4", lg: "size-5" } },
  defaultVariants: { size: "default" },
})

type ThumbVariants = VariantProps<typeof thumb>

interface Props extends RekaSwitchThumbProps {
  size?: ThumbVariants["size"]
}

const props = defineProps<Props>()

export type SwitchThumbProps = Props
</script>

<template>
  <RekaSwitchThumb v-bind="{ ...props, class: thumb({ size }) }" />
</template>


