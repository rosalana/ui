<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { tv } from "tailwind-variants"

const alertTitle = tv({
  base: "mb-1 font-medium leading-none tracking-tight",
})

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Primitive
    data-slot="alert-title"
    :as="as ?? 'h5'"
    :as-child="asChild"
    :class="[alertTitle(), props.class]"
  >
    <slot />
  </Primitive>
</template>
