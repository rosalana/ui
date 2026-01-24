<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { tv } from "tailwind-variants"

const breadcrumbPage = tv({
  base: "font-normal text-foreground",
})

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Primitive
    data-slot="breadcrumb-page"
    :as="as ?? 'span'"
    :as-child="asChild"
    role="link"
    aria-disabled="true"
    aria-current="page"
    :class="[breadcrumbPage(), props.class]"
  >
    <slot />
  </Primitive>
</template>
