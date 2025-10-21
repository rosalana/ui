<script setup lang="ts">
import type { RadioGroupItemProps as RekaRadioGroupItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { RadioGroupItem as RekaRadioGroupItem } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "RadioGroupItem" })

const item = tv({
  base:
    "inline-flex items-center justify-center rounded-full border transition-colors shrink-0 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=unchecked]:bg-background data-[state=unchecked]:text-foreground",
  variants: { size: { sm: "size-3", default: "size-4", lg: "size-5" } },
  defaultVariants: { size: "default" },
})

type ItemVariants = VariantProps<typeof item>

interface Props extends RekaRadioGroupItemProps {
  size?: ItemVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()

export type RadioGroupItemProps = Props
</script>

<template>
  <RekaRadioGroupItem v-bind="{ ...props, class: [item({ size }), props.class] }">
    <slot />
  </RekaRadioGroupItem>
</template>


