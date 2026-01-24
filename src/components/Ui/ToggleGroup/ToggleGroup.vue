<script setup lang="ts">
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { ToggleGroupRoot, useForwardPropsEmits } from "reka-ui"
import { tv, type VariantProps } from "tailwind-variants"
import { provide } from "vue"

const toggleGroup = tv({
  base: "flex items-center justify-center gap-1",
})

type ToggleVariants = VariantProps<typeof toggleGroup>

interface Props extends ToggleGroupRootProps {
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
})

const emit = defineEmits<ToggleGroupRootEmits>()

const forwarded = useForwardPropsEmits(props, emit)

provide("toggleGroupVariant", props.variant)
provide("toggleGroupSize", props.size)
</script>

<template>
  <ToggleGroupRoot
    data-slot="toggle-group"
    v-bind="forwarded"
    :class="[toggleGroup(), props.class]"
  >
    <slot />
  </ToggleGroupRoot>
</template>
