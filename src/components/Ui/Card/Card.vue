<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { tv } from "tailwind-variants"

const card = tv({
  base: "rounded-xl border bg-background text-foreground shadow",
})

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Primitive
    data-slot="card"
    :as="as ?? 'div'"
    :as-child="asChild"
    :class="[card(), props.class]"
  >
    <slot />
  </Primitive>
</template>
