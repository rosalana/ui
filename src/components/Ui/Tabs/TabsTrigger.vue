<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core"
import type { TabsTriggerProps as RekaTabsTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { TabsTrigger as RekaTabsTrigger, useForwardPropsEmits } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "TabsTrigger" })

const trigger = tv({
  base:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] data-[state=active]:bg-accent data-[state=active]:text-accent-foreground",
  variants: {
    variant: { default: "" },
    size: { sm: "h-8 px-3", default: "h-9 px-4", lg: "h-10 px-6" },
  },
  defaultVariants: { variant: "default", size: "default" },
})

type TriggerVariants = VariantProps<typeof trigger>

interface Props extends RekaTabsTriggerProps {
  variant?: TriggerVariants["variant"]
  size?: TriggerVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const forwarded = useForwardPropsEmits(reactiveOmit(props, "class", "variant", "size"))

export type TabsTriggerProps = Props
</script>

<template>
  <RekaTabsTrigger v-bind="{ ...forwarded, class: [trigger({ variant, size }), props.class] }">
    <slot />
  </RekaTabsTrigger>
</template>


