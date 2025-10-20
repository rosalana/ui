<script setup lang="ts">
import type { TabsRootProps as RekaTabsRootProps } from "reka-ui"
import { TabsRoot as RekaTabsRoot } from "reka-ui"
import { VariantProps, tv } from "tailwind-variants"

defineOptions({ name: "TabsRoot" })

const tabs = tv({
  base: "outline-none",
  variants: {
    variant: {
      default: "",
      underline: "[&_[data-slot=tab]]:border-b [&_[data-slot=tab][data-state=active]]:border-primary",
    },
    size: { sm: "text-sm", default: "text-base", lg: "text-lg" },
  },
  defaultVariants: { variant: "default", size: "default" },
})

type TabsVariants = VariantProps<typeof tabs>

interface Props extends RekaTabsRootProps {
  variant?: TabsVariants["variant"]
  size?: TabsVariants["size"]
}

const props = defineProps<Props>()

export type TabsRootProps = Props
</script>

<template>
  <RekaTabsRoot v-bind="props" :class="tabs({ variant, size })">
    <slot />
  </RekaTabsRoot>
</template>


